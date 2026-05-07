import { useMemo } from "react";
import { useBoardState } from "../context/BoardContext";

/**
 * useTasksFilter - provides filtered tasks for a project
 * Thin wrapper over BoardContext that reads from the normalized tasks map.
 * No loading simulation needed – data is already in the context store.
 */
export const useTasksFilter = (projectId) => {
  const state = useBoardState();

  const { projectTasks, selectedProject } = useMemo(() => {
    if (!projectId) {
      return { projectTasks: [], selectedProject: null };
    }

    // O(1) project lookup from normalized map
    const project = state.projects[projectId] || null;

    // Filter tasks for this project from the normalized tasks object
    const filtered = Object.values(state.tasks).filter(
      (task) => task.projectId === projectId,
    );

    return { projectTasks: filtered, selectedProject: project };
  }, [state.tasks, state.projects, projectId]);

  return {
    projectTasks,
    selectedProject,
    isLoading: !state.isInitialized,
  };
};
