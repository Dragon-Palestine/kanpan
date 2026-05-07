import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useProjectsContext } from "../context/BoardContext";
import { filterProjectsByStatus, sortProjects } from "../utils/projectHelpers";
import {
  projectSortOptions,
  projectStatusOptions,
} from "../constants/projects";

/**
 * useProjects - wraps the central BoardContext with project-specific
 * filtering, sorting, and URL-driven state.
 *
 * Architecture: thin layer over useProjectsContext.
 * All mutations go through the context dispatch (Normalized Store).
 */
export const useProjects = () => {
  const { projects, projectsList, isInitialized, updateProject, addProject } =
    useProjectsContext();

  const [searchParams, setSearchParams] = useSearchParams();

  // UI state (not stored globally – local to this page)
  const viewMode = searchParams.get("view") || "grid";
  const sortBy = searchParams.get("sort") || projectSortOptions[0].value;
  const filterStatus =
    searchParams.get("status") || projectStatusOptions[0].value;
  const searchQuery = searchParams.get("search") || "";

  /** Writes a filter key to the URL (removes key if falsy/ALL) */
  const setFilter = useCallback(
    (key, value) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value && value !== "ALL") {
            next.set(key, value);
          } else {
            next.delete(key);
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  // Filter → sort pipeline (memoized)
  const processedProjects = useMemo(() => {
    let filtered = filterProjectsByStatus(projectsList, filterStatus);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.code?.toLowerCase().includes(q),
      );
    }

    return sortProjects(filtered, sortBy);
  }, [projectsList, filterStatus, searchQuery, sortBy]);

  return {
    // Data
    projectsData: processedProjects,
    projects,          // normalized map { id → project }
    isLoading: !isInitialized,

    // URL-driven UI state
    viewMode,
    sortBy,
    filterStatus,
    searchQuery,

    // Setters (URL-based)
    setViewMode: (v) => setFilter("view", v),
    setSortBy: (v) => setFilter("sort", v),
    setFilterStatus: (v) => setFilter("status", v),
    setSearchQuery: (v) => setFilter("search", v),

    // Mutations (go through context → reducer → localStorage)
    updateProject,
    addProject,
  };
};
