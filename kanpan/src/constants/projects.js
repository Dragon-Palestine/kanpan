export const projectStatusOptions = [
  { value: "all", label: "All Status" },
  { value: "IN PROGRESS", label: "In Progress" },
  { value: "ON HOLD", label: "On Hold" },
  { value: "DRAFTING", label: "Drafting" },
  { value: "DONE", label: "Done" },
];

export const projectSortOptions = [
  { value: "priority", label: "Sort by Priority" },
  { value: "status", label: "Sort by Status" },
  { value: "name", label: "Sort by Name" },
];

export const projectViewModes = [
  { value: "grid", label: "Grid view" },
  { value: "list", label: "List view" },
];

export const projectsPageCopy = {
  title: "Projects",
  descriptionPrefix: "Manage and monitor",
  emptyState: "No projects found",
  searchPlaceholder: "Search projects, tasks, or team...",
};
