import { teamMembers } from "../api/mocks/project";

/**
 * Get team member by ID
 */
export const getTeamMember = (memberId) => {
  return teamMembers.find((m) => m.id === memberId);
};

/**
 * Get status color classes for task badge
 */
export const getStatusBadgeColor = (status) => {
  const colors = {
    todo: "bg-slate-100 text-slate-800",
    "in-progress": "bg-blue-100 text-blue-800",
    review: "bg-amber-100 text-amber-800",
    done: "bg-green-100 text-green-800",
  };
  return colors[status] || "bg-slate-100 text-slate-800";
};

/**
 * Get priority color classes for priority badge
 */
export const getPriorityBadgeColor = (priority) => {
  const colors = {
    URGENT: "bg-red-100 text-red-800",
    HIGH: "bg-orange-100 text-orange-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    LOW: "bg-slate-100 text-slate-800",
  };
  return colors[priority] || "bg-slate-100 text-slate-800";
};

/**
 * Format status text (convert "in-progress" to "In Progress")
 */
export const formatStatusText = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ");
};
