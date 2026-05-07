import { useState, useMemo, useCallback } from "react";
import { useBoardState, useProjectsContext } from "../context/BoardContext";
import { teamMembers as mockTeamMembers } from "../api/mocks/project";

/**
 * useTeamData - provides team member data scoped to a project
 * Reads from the central BoardContext (normalized projects & tasks maps)
 * for O(1) project lookup.
 */
export const useTeamData = (projectId = null) => {
  const state = useBoardState();
  const { isInitialized, addMemberToProject: ctxAddMember } = useProjectsContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [memberAssignments, setMemberAssignments] = useState({});
  const itemsPerPage = 4;

  // Get team members enriched with live active task counts
  const getTeamMembers = useCallback(() => {
    const allTasks = Object.values(state.tasks);

    const enrichWithActiveTasks = (members) =>
      members.map((member) => ({
        ...member,
        activeTasks: allTasks.filter(
          (t) => t.assignees?.includes(member.id) && t.status !== "done",
        ).length,
      }));

    if (!projectId) {
      return enrichWithActiveTasks(mockTeamMembers);
    }

    // O(1) project lookup via normalized map
    const project = state.projects[projectId];
    if (!project) return enrichWithActiveTasks(mockTeamMembers);

    const projectMemberIds = new Set(project.members || []);
    return enrichWithActiveTasks(
      mockTeamMembers.filter((m) => projectMemberIds.has(m.id)),
    );
  }, [state.tasks, state.projects, projectId]);

  const getAvailableMembersToAdd = useCallback(() => {
    if (!projectId) return [];
    const project = state.projects[projectId];
    if (!project) return [];
    const existing = new Set(project.members || []);
    return mockTeamMembers.filter((m) => !existing.has(m.id));
  }, [state.projects, projectId]);

  const teamData = useMemo(() => getTeamMembers(), [getTeamMembers]);

  // Pagination
  const totalPages = Math.ceil(teamData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMembers = teamData.slice(startIndex, startIndex + itemsPerPage);

  // Stats derived from live task data
  const teamStats = useMemo(() => {
    const totalMembers = teamData.length;
    const activeTasks = teamData.reduce((s, m) => s + m.activeTasks, 0);
    const avgWorkload =
      totalMembers > 0
        ? Math.round(
            teamData.reduce((s, m) => s + (m.workloadPercent || 0), 0) /
              totalMembers,
          )
        : 0;
    return {
      totalMembers,
      newThisMonth: 2,
      activeTasks,
      completionRate: 85,
      liveBoards: 12,
      avgWorkload,
    };
  }, [teamData]);

  // Availability helpers
  const getAvailabilityColor = useCallback(
    (availability) =>
      ({
        Available: "text-emerald-600",
        "In Meeting": "text-amber-600",
        Offline: "text-gray-600",
      })[availability] || "text-gray-600",
    [],
  );

  const getAvailabilityDotColor = useCallback(
    (availability) =>
      ({
        Available: "bg-emerald-500",
        "In Meeting": "bg-amber-500",
        Offline: "bg-gray-400",
      })[availability] || "bg-gray-400",
    [],
  );

  // Task assignment tracking (local state only)
  const assignTaskToMember = useCallback(
    (memberId, taskId, projectIdForTask) => {
      const key = `${projectIdForTask}-${memberId}-${taskId}`;
      setMemberAssignments((prev) => ({ ...prev, [key]: true }));
    },
    [],
  );

  const removeTaskFromMember = useCallback(
    (memberId, taskId, projectIdForTask) => {
      const key = `${projectIdForTask}-${memberId}-${taskId}`;
      setMemberAssignments((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    [],
  );

  // Scoped add member (binds projectId automatically)
  const addMemberToProject = useCallback(
    (memberId) => {
      if (projectId) ctxAddMember(projectId, memberId);
    },
    [projectId, ctxAddMember],
  );

  return {
    teamMembers: paginatedMembers,
    allTeamMembers: teamData,
    availableMembersToAdd: getAvailableMembersToAdd(),
    teamStats,
    currentPage,
    totalPages,
    setCurrentPage,
    getAvailabilityColor,
    getAvailabilityDotColor,
    assignTaskToMember,
    removeTaskFromMember,
    memberAssignments,
    addMemberToProject,
    isLoading: !isInitialized,
  };
};
