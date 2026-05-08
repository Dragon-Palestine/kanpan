import {
  MOVE_TASK,
  UPDATE_TASK,
  UPDATE_TASK_ASSIGNEES,
  ADD_TASK,
  DELETE_TASK,
  SET_PROJECTS,
  UPDATE_PROJECT,
  ADD_PROJECT,
  ADD_MEMBER_TO_PROJECT,
  INIT_BOARD,
  UNDO,
  REDO,
  ADD_TOAST,
  REMOVE_TOAST,
  MAX_HISTORY,
} from "./boardActions";
import { arrayMove } from "@dnd-kit/sortable";
import { saveTasks, saveProjects } from "../utils/storage";

/**
 * Converts an array to a normalized entity map { id → object }
 * Enables O(1) access by id instead of O(n) array.find()
 */
export const normalize = (array) =>
  array.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

/**
 * Initial state shape - fully normalized
 */
export const initialBoardState = {
  // Normalized entity maps
  tasks: {},       // { [taskId]: task }
  projects: {},    // { [projectId]: project }

  // Ordered IDs per column (for display order)
  taskIdsByStatus: {
    todo: [],
    "in-progress": [],
    review: [],
    done: [],
  },

  isInitialized: false,

  // UI State
  toasts: [], // array of { id, message, type: 'success'|'error'|'info' }

  // Undo/Redo stacks (store snapshots of {tasks, taskIdsByStatus})
  past: [],   // array of past snapshots (max MAX_HISTORY)
  future: [], // array of future snapshots for redo
};

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Rebuild taskIdsByStatus from the normalized tasks map */
const buildTaskIdsByStatus = (tasks) => {
  const byStatus = { todo: [], "in-progress": [], review: [], done: [] };
  // Sort tasks by order before building ID arrays to maintain position
  const sortedTasks = Object.values(tasks).sort((a, b) => (a.order || 0) - (b.order || 0));
  
  sortedTasks.forEach((task) => {
    if (byStatus[task.status] !== undefined) {
      byStatus[task.status].push(task.id);
    }
  });
  return byStatus;
};

/** Save a snapshot for undo (trim to MAX_HISTORY) */
const pushHistory = (state) => {
  const snapshot = {
    tasks: state.tasks,
    taskIdsByStatus: state.taskIdsByStatus,
  };
  const past = [snapshot, ...state.past].slice(0, MAX_HISTORY);
  return { past, future: [] }; // any new action clears redo stack
};

// ─── Reducer ────────────────────────────────────────────────────────────────

export const boardReducer = (state, action) => {
  switch (action.type) {

    // ── Initialization ───────────────────────────────────────────────────
    case INIT_BOARD: {
      const { tasks, projects } = action.payload;
      const normalizedTasks = normalize(tasks);
      const normalizedProjects = normalize(projects);
      return {
        ...initialBoardState,
        tasks: normalizedTasks,
        projects: normalizedProjects,
        taskIdsByStatus: buildTaskIdsByStatus(normalizedTasks),
        isInitialized: true,
        past: [],
        future: [],
      };
    }

    // ── Task: Move between columns ────────────────────────────────────────
    case MOVE_TASK: {
      const { taskId, newStatus, overTaskId } = action.payload;
      const task = state.tasks[taskId];
      if (!task) return state;

      // Snapshot for undo
      const history = pushHistory(state);

      const oldStatus = task.status;
      const updatedTask = { ...task, status: newStatus };
      const updatedTasks = { ...state.tasks, [taskId]: updatedTask };

      let newByStatus = { ...state.taskIdsByStatus };

      if (oldStatus === newStatus) {
        // Reordering in same column
        const columnIds = [...state.taskIdsByStatus[newStatus]];
        const oldIndex = columnIds.indexOf(taskId);
        const newIndex = overTaskId ? columnIds.indexOf(overTaskId) : oldIndex;

        if (oldIndex !== newIndex) {
          newByStatus[newStatus] = arrayMove(columnIds, oldIndex, newIndex);
        } else {
          return state; // No change
        }
      } else {
        // Moving to a different column
        const oldColumnIds = state.taskIdsByStatus[oldStatus].filter((id) => id !== taskId);
        const newColumnIds = [...state.taskIdsByStatus[newStatus]];
        
        const overIndex = overTaskId ? newColumnIds.indexOf(overTaskId) : newColumnIds.length;
        newColumnIds.splice(overIndex, 0, taskId);

        newByStatus = {
          ...state.taskIdsByStatus,
          [oldStatus]: oldColumnIds,
          [newStatus]: newColumnIds,
        };
      }

      // Persist
      saveTasks(Object.values(updatedTasks));

      return {
        ...state,
        tasks: updatedTasks,
        taskIdsByStatus: newByStatus,
        ...history,
      };
    }

    // ── Task: Generic Update ───────────────────────────────────────────────
    case UPDATE_TASK: {
      const { taskId, updates } = action.payload;
      if (!state.tasks[taskId]) return state;

      const history = pushHistory(state);
      const updatedTask = { ...state.tasks[taskId], ...updates };
      const updatedTasks = { ...state.tasks, [taskId]: updatedTask };

      saveTasks(Object.values(updatedTasks));

      return {
        ...state,
        tasks: updatedTasks,
        ...history,
      };
    }

    // ── Task: Update Assignees ────────────────────────────────────────────
    case UPDATE_TASK_ASSIGNEES: {
      const { taskId, assignees } = action.payload;
      if (!state.tasks[taskId]) return state;

      const updatedTask = { ...state.tasks[taskId], assignees };
      const updatedTasks = { ...state.tasks, [taskId]: updatedTask };

      saveTasks(Object.values(updatedTasks));

      return { ...state, tasks: updatedTasks };
    }

    // ── Task: Add New ─────────────────────────────────────────────────────
    case ADD_TASK: {
      const { task } = action.payload;
      const history = pushHistory(state);

      const updatedTasks = { ...state.tasks, [task.id]: task };
      const status = task.status || "todo";
      const newByStatus = {
        ...state.taskIdsByStatus,
        [status]: [task.id, ...state.taskIdsByStatus[status]],
      };

      saveTasks(Object.values(updatedTasks));

      return {
        ...state,
        tasks: updatedTasks,
        taskIdsByStatus: newByStatus,
        ...history,
      };
    }

    // ── Task: Delete ─────────────────────────────────────────────────────
    case DELETE_TASK: {
      const { taskId } = action.payload;
      const task = state.tasks[taskId];
      if (!task) return state;

      const history = pushHistory(state);
      const { [taskId]: _removed, ...remainingTasks } = state.tasks;
      const newByStatus = {
        ...state.taskIdsByStatus,
        [task.status]: state.taskIdsByStatus[task.status].filter((id) => id !== taskId),
      };

      saveTasks(Object.values(remainingTasks));

      return {
        ...state,
        tasks: remainingTasks,
        taskIdsByStatus: newByStatus,
        ...history,
      };
    }

    // ── Projects ──────────────────────────────────────────────────────────
    case SET_PROJECTS: {
      return {
        ...state,
        projects: normalize(action.payload.projects),
      };
    }

    case UPDATE_PROJECT: {
      const { projectId, updates } = action.payload;
      if (!state.projects[projectId]) return state;

      const updatedProject = { ...state.projects[projectId], ...updates };
      const updatedProjects = { ...state.projects, [projectId]: updatedProject };

      saveProjects(Object.values(updatedProjects));

      return { ...state, projects: updatedProjects };
    }

    case ADD_PROJECT: {
      const { project } = action.payload;
      const updatedProjects = { ...state.projects, [project.id]: project };

      saveProjects(Object.values(updatedProjects));

      return { ...state, projects: updatedProjects };
    }

    case ADD_MEMBER_TO_PROJECT: {
      const { projectId, memberId } = action.payload;
      const project = state.projects[projectId];
      if (!project) return state;

      const currentMembers = project.members || [];
      if (currentMembers.includes(memberId)) return state;

      const updatedProject = { ...project, members: [...currentMembers, memberId] };
      const updatedProjects = { ...state.projects, [projectId]: updatedProject };

      saveProjects(Object.values(updatedProjects));

      return { ...state, projects: updatedProjects };
    }

    // ── Undo ─────────────────────────────────────────────────────────────
    case UNDO: {
      if (state.past.length === 0) return state;

      const [previous, ...remainingPast] = state.past;
      const currentSnapshot = {
        tasks: state.tasks,
        taskIdsByStatus: state.taskIdsByStatus,
      };

      // Revert storage to the previous snapshot
      saveTasks(Object.values(previous.tasks));

      return {
        ...state,
        tasks: previous.tasks,
        taskIdsByStatus: previous.taskIdsByStatus,
        past: remainingPast,
        future: [currentSnapshot, ...state.future].slice(0, MAX_HISTORY),
      };
    }

    // ── Redo ─────────────────────────────────────────────────────────────
    case REDO: {
      if (state.future.length === 0) return state;

      const [next, ...remainingFuture] = state.future;
      const currentSnapshot = {
        tasks: state.tasks,
        taskIdsByStatus: state.taskIdsByStatus,
      };

      saveTasks(Object.values(next.tasks));

      return {
        ...state,
        tasks: next.tasks,
        taskIdsByStatus: next.taskIdsByStatus,
        past: [currentSnapshot, ...state.past].slice(0, MAX_HISTORY),
        future: remainingFuture,
      };
    }

    // ── Toasts ───────────────────────────────────────────────────────────
    case ADD_TOAST: {
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    }

    case REMOVE_TOAST: {
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload.id),
      };
    }

    default:
      return state;
  }
};
