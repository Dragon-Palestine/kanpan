import { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useBoard } from "../context/BoardContext";
import { useSearchParams } from "react-router-dom";
import TasksHeader from "../components/tasks/TasksHeader";
import ProjectInfoCard from "../components/projects/ProjectInfoCard";
import KanbanBoard from "../components/tasks/KanbanBoard";
import NoProjectSelected from "../components/tasks/NoProjectSelected";
import TaskDetailModal from "../components/tasks/TaskDetailModal";
import CreateTaskModal from "../components/tasks/CreateTaskModal";
import UndoRedoBar from "../components/tasks/UndoRedoBar";

/**
 * Tasks Page - Kanban board view for managing project tasks
 * Uses central BoardContext (useReducer) for state management
 * URL-driven filters: ?search=...&priority=...
 */
const Tasks = () => {
  const { projectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const {
    selectedProject,
    tasksByStatus: allTasksByStatus,
    isInitialized,
    canUndo,
    canRedo,
    historySize,
    moveTask,
    editTask,
    updateTaskAssignees,
    addTask,
    deleteTask,
    undo,
    redo,
  } = useBoard(projectId);

  // ── URL-Driven Filters ────────────────────────────────────────────────────
  const searchQuery  = searchParams.get("search")   || "";
  const priorityFilter = searchParams.get("priority") || "ALL";

  const setFilter = useCallback((key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value && value !== "ALL") {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const filters = { search: searchQuery, priority: priorityFilter };

  // ── Apply Filters to Board State ──────────────────────────────────────────
  const tasksByStatus = useMemo(() => {
    const applyFilters = (tasks) => {
      let result = tasks;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        result = result.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.description?.toLowerCase().includes(q) ||
            t.id.toLowerCase().includes(q)
        );
      }
      if (priorityFilter !== "ALL") {
        result = result.filter((t) => t.priority === priorityFilter);
      }
      return result;
    };

    return {
      todo:          applyFilters(allTasksByStatus.todo),
      "in-progress": applyFilters(allTasksByStatus["in-progress"]),
      review:        applyFilters(allTasksByStatus.review),
      done:          applyFilters(allTasksByStatus.done),
    };
  }, [allTasksByStatus, searchQuery, priorityFilter]);

  // Show empty state if no project is selected
  if (!projectId) return <NoProjectSelected />;

  // Calculate total tasks
  const totalTasks = Object.values(allTasksByStatus).reduce(
    (sum, tasks) => sum + tasks.length,
    0
  );

  // Find the latest version of the selected task in normalized state
  const activeTask = selectedTask
    ? Object.values(allTasksByStatus).flat().find((t) => t.id === selectedTask.id) ||
      selectedTask
    : null;

  return (
    <div className="space-y-6 pb-6">
      {/* Sticky header with search & filters */}
      <div className="sticky top-0 bg-white z-10 pb-4">
        <TasksHeader
          project={selectedProject}
          filters={filters}
          onFilterChange={setFilter}
          onAddTask={() => setShowCreateModal(true)}
        />

        {selectedProject && (
          <div className="mt-6">
            <ProjectInfoCard project={selectedProject} tasksCount={totalTasks} />
          </div>
        )}
      </div>

      {/* Undo/Redo bar */}
      <UndoRedoBar
        canUndo={canUndo}
        canRedo={canRedo}
        historySize={historySize}
        onUndo={undo}
        onRedo={redo}
      />

      {/* Kanban board */}
      <KanbanBoard
        tasksByStatus={tasksByStatus}
        onTaskMove={moveTask}
        onUpdateAssignees={updateTaskAssignees}
        onTaskClick={setSelectedTask}
        isLoading={!isInitialized}
      />

      {/* Task Detail Modal - via Portal */}
      {activeTask && (
        <TaskDetailModal
          task={activeTask}
          onClose={() => setSelectedTask(null)}
          onUpdateAssignees={updateTaskAssignees}
          onUpdateTask={editTask}
          onDeleteTask={(taskId) => {
            deleteTask(taskId);
            setSelectedTask(null);
          }}
        />
      )}

      {/* Create Task Modal - via Portal */}
      {showCreateModal && (
        <CreateTaskModal
          projectId={projectId}
          onClose={() => setShowCreateModal(false)}
          onAdd={addTask}
        />
      )}
    </div>
  );
};

export default Tasks;
