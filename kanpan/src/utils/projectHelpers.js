/**
 * Get status badge styling based on project status
 */
export const getStatusColor = (status) => {
  const colors = {
    "IN PROGRESS": "bg-blue-100 text-blue-800",
    "ON HOLD": "bg-amber-100 text-amber-800",
    DRAFTING: "bg-slate-100 text-slate-800",
    DONE: "bg-green-100 text-green-800",
  };
  return colors[status] || "bg-slate-100 text-slate-800";
};

/**
 * Get priority color styling based on priority level
 */
export const getPriorityColor = (priority) => {
  const colors = {
    CRITICAL: "text-red-600",
    HIGH: "text-orange-600",
    MEDIUM: "text-yellow-600",
    LOW: "text-slate-600",
  };
  return colors[priority] || "text-slate-600";
};

/**
 * Filter projects by status
 */
export const filterProjectsByStatus = (projects, status) => {
  if (status === "all") {
    return projects;
  }
  return projects.filter((p) => p.status === status);
};

/**
 * Sort projects based on criteria
 */
export const sortProjects = (projects, sortBy) => {
  const sorted = [...projects];

  if (sortBy === "priority") {
    const priorityMap = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    sorted.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
  } else if (sortBy === "status") {
    sorted.sort((a, b) => a.status.localeCompare(b.status));
  } else if (sortBy === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  return sorted;
};

/**
 * Get team member by ID from array
 */
export const getTeamMember = (memberId, teamMembers) => {
  return teamMembers.find((m) => m.id === memberId);
};
