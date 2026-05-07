export const taskStatuses = ["todo", "in-progress", "review", "done"];

export const kanbanColumns = {
  todo: {
    label: "To Do",
    badgeClass: "bg-slate-200 text-slate-800",
    highlightClass: "bg-slate-100",
  },
  "in-progress": {
    label: "In Progress",
    badgeClass: "bg-blue-200 text-blue-800",
    highlightClass: "bg-blue-100",
  },
  review: {
    label: "Review",
    badgeClass: "bg-amber-200 text-amber-800",
    highlightClass: "bg-amber-100",
  },
  done: {
    label: "Done",
    badgeClass: "bg-green-200 text-green-800",
    highlightClass: "bg-green-100",
  },
};

export const taskPageCopy = {
  title: "Tasks",
  emptyStateTitle: "No project selected",
  emptyStateDescription: "Select a project to view its tasks",
  emptyBoardMessage: "No tasks yet",
  backButtonLabel: "← Back to Projects",
};
