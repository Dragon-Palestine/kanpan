import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getTasks, getProjects, updateTask } from "../utils/storage";
import { taskStatuses } from "../constants/tasks";

const emptyBoardState = {
  todo: [],
  "in-progress": [],
  review: [],
  done: [],
};

/**
 * Custom hook for managing Kanban board tasks
 * Organizes tasks by status for Kanban view
 */
export const useKanbanTasks = (projectId) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasksByStatus, setTasksByStatus] = useState(emptyBoardState);
  const [isLoading, setIsLoading] = useState(false);

  // Get filter values from URL
  const searchQuery = searchParams.get("search") || "";
  const priorityFilter = searchParams.get("priority") || "ALL";

  // Initialize tasks on mount and when projectId or filters change
  useEffect(() => {
    if (!projectId) return;

    // We don't use setTimeout here for filters to make it feel snappy
    const allTasks = getTasks();
    const allProjects = getProjects();
    
    // Find the selected project
    const project = allProjects.find((p) => p.id === projectId);
    setSelectedProject(project || null);

    // Filter and organize tasks by status
    let projectTasks = allTasks.filter(
      (task) => task.projectId === projectId,
    );

    // Apply Global Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      projectTasks = projectTasks.filter(
        (task) => 
          task.title.toLowerCase().includes(query) || 
          task.description?.toLowerCase().includes(query) ||
          task.id.toLowerCase().includes(query)
      );
    }

    // Apply Priority Filter
    if (priorityFilter !== "ALL") {
      projectTasks = projectTasks.filter(
        (task) => task.priority === priorityFilter
      );
    }

    const organized = {
      todo: [],
      "in-progress": [],
      review: [],
      done: [],
    };

    projectTasks.forEach((task) => {
      if (organized[task.status]) {
        organized[task.status].push(task);
      }
    });

    setTasksByStatus(organized);
    setIsLoading(false);
  }, [projectId, searchQuery, priorityFilter]);

  // Update filters in URL
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

  // Move task from one status to another
  const moveTask = useCallback((taskId, newStatus) => {
    // Persist to storage
    updateTask(taskId, { status: newStatus });

    setTasksByStatus((prev) => {
      const newState = { ...prev };

      // Find and remove task from current status
      let movedTask = null;
      for (const status of taskStatuses) {
        const index = newState[status].findIndex((t) => t.id === taskId);
        if (index !== -1) {
          [movedTask] = newState[status].splice(index, 1);
          break;
        }
      }

      // Add task to new status
      if (movedTask && newState[newStatus]) {
        newState[newStatus].push(movedTask);
      }

      return newState;
    });
  }, []);

  // Update task assignees
  const updateTaskAssignees = useCallback((taskId, assignees) => {
    // Persist to storage
    updateTask(taskId, { assignees });

    setTasksByStatus((prev) => {
      const newState = { ...prev };

      // Find and update task in current status
      for (const status of taskStatuses) {
        const taskIndex = newState[status].findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          newState[status][taskIndex] = {
            ...newState[status][taskIndex],
            assignees,
          };
          break;
        }
      }

      return newState;
    });
  }, []);

  // Update task details (generic)
  const editTask = useCallback((taskId, updates) => {
    // Persist to storage
    updateTask(taskId, updates);

    setTasksByStatus((prev) => {
      const newState = { ...prev };

      // Find and update task
      for (const status of taskStatuses) {
        const taskIndex = newState[status].findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          newState[status][taskIndex] = {
            ...newState[status][taskIndex],
            ...updates,
          };
          break;
        }
      }

      return newState;
    });
  }, []);

  return {
    selectedProject: projectId ? selectedProject : null,
    tasksByStatus: projectId ? tasksByStatus : emptyBoardState,
    isLoading: projectId ? isLoading : false,
    filters: {
      search: searchQuery,
      priority: priorityFilter,
    },
    setFilter,
    moveTask,
    updateTaskAssignees,
    editTask,
  };
};
