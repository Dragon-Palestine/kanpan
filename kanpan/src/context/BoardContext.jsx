import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from "react";
import { boardReducer, initialBoardState } from "./boardReducer";
import {
  INIT_BOARD,
  MOVE_TASK,
  UPDATE_TASK,
  UPDATE_TASK_ASSIGNEES,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_PROJECT,
  ADD_PROJECT,
  ADD_MEMBER_TO_PROJECT,
  UNDO,
  REDO,
  ADD_TOAST,
  REMOVE_TOAST,
} from "./boardActions";
import { getTasks, getProjects } from "../utils/storage";
import ToastContainer from "../components/common/ToastContainer";

// ─── Context Creation ────────────────────────────────────────────────────────
const BoardStateContext = createContext(null);
const BoardDispatchContext = createContext(null);

// ─── Provider ────────────────────────────────────────────────────────────────
export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, initialBoardState);

  // Initialize from localStorage on mount
  useEffect(() => {
    const tasks = getTasks();
    const projects = getProjects();
    dispatch({ type: INIT_BOARD, payload: { tasks, projects } });
  }, []);

  return (
    <BoardStateContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
        <ToastContainer />
      </BoardDispatchContext.Provider>
    </BoardStateContext.Provider>
  );
};

// ─── Low-level Hooks ─────────────────────────────────────────────────────────

/** Access raw state - prefer the domain hooks below */
export const useBoardState = () => {
  const ctx = useContext(BoardStateContext);
  if (!ctx) throw new Error("useBoardState must be used inside <BoardProvider>");
  return ctx;
};

/** Access dispatch - prefer the action hooks below */
export const useBoardDispatch = () => {
  const ctx = useContext(BoardDispatchContext);
  if (!ctx) throw new Error("useBoardDispatch must be used inside <BoardProvider>");
  return ctx;
};

// ─── Domain Hooks (Memoized) ──────────────────────────────────────────────────

/**
 * useBoard - main hook for the Kanban board
 * Returns tasks organized by status for a specific project, plus actions.
 */
export const useBoard = (projectId) => {
  const state = useBoardState();
  const dispatch = useBoardDispatch();

  // Get tasks for this project, organized by status (O(1) lookups)
  const tasksByStatus = useMemo(() => {
    const byStatus = { todo: [], "in-progress": [], review: [], done: [] };
    if (!projectId) return byStatus;

    Object.values(state.tasks).forEach((task) => {
      if (task.projectId === projectId && byStatus[task.status] !== undefined) {
        byStatus[task.status].push(task);
      }
    });
    return byStatus;
  }, [state.tasks, projectId]);

  const selectedProject = useMemo(
    () => (projectId ? state.projects[projectId] || null : null),
    [state.projects, projectId]
  );

  const showToast = useCallback(
    (message, type = "success") => {
      const id = Date.now();
      dispatch({ type: ADD_TOAST, payload: { id, message, type } });
      setTimeout(() => {
        dispatch({ type: REMOVE_TOAST, payload: { id } });
      }, 3000);
    },
    [dispatch]
  );

  // ── Actions (all memoized) ────────────────────────────────────────────────

  const moveTask = useCallback(
    (taskId, newStatus) => {
      dispatch({ type: MOVE_TASK, payload: { taskId, newStatus } });
      showToast(`Task moved to ${newStatus}`);
    },
    [dispatch, showToast]
  );

  const editTask = useCallback(
    (taskId, updates) =>
      dispatch({ type: UPDATE_TASK, payload: { taskId, updates } }),
    [dispatch]
  );

  const updateTaskAssignees = useCallback(
    (taskId, assignees) =>
      dispatch({ type: UPDATE_TASK_ASSIGNEES, payload: { taskId, assignees } }),
    [dispatch]
  );

  const addTask = useCallback(
    (task) => dispatch({ type: ADD_TASK, payload: { task } }),
    [dispatch]
  );

  const deleteTask = useCallback(
    (taskId) => dispatch({ type: DELETE_TASK, payload: { taskId } }),
    [dispatch]
  );

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
    showToast("Action undone", "info");
  }, [dispatch, showToast]);

  const redo = useCallback(() => {
    dispatch({ type: REDO });
    showToast("Action redone", "info");
  }, [dispatch, showToast]);

  return {
    selectedProject,
    tasksByStatus,
    isInitialized: state.isInitialized,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    historySize: state.past.length,
    moveTask,
    editTask,
    updateTaskAssignees,
    addTask,
    deleteTask,
    undo,
    redo,
    showToast,
  };
};

/**
 * useProjects - hook for project management
 */
export const useProjectsContext = () => {
  const state = useBoardState();
  const dispatch = useBoardDispatch();

  const projectsList = useMemo(() => {
    const list = Object.values(state.projects);
    const allTasks = Object.values(state.tasks);

    return list.map((project) => {
      const projectTasks = allTasks.filter((t) => t.projectId === project.id);
      const total = projectTasks.length;
      const completed = projectTasks.filter((t) => t.status === "done").length;

      return {
        ...project,
        tasksTotal: total,
        tasksCompleted: completed,
        progress: total > 0 ? Math.round((completed / total) * 100) : 0,
        extraMembersCount: Math.max(0, (project.members?.length || 0) - 3),
      };
    });
  }, [state.projects, state.tasks]);

  const updateProject = useCallback(
    (projectId, updates) =>
      dispatch({ type: UPDATE_PROJECT, payload: { projectId, updates } }),
    [dispatch]
  );

  const addProject = useCallback(
    (project) => dispatch({ type: ADD_PROJECT, payload: { project } }),
    [dispatch]
  );

  const addMemberToProject = useCallback(
    (projectId, memberId) =>
      dispatch({ type: ADD_MEMBER_TO_PROJECT, payload: { projectId, memberId } }),
    [dispatch]
  );

  return {
    projects: state.projects, // normalized map
    projectsList,             // array for iteration
    isInitialized: state.isInitialized,
    updateProject,
    addProject,
    addMemberToProject,
  };
};
