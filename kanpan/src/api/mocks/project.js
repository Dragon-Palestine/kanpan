// ============================================================
//  KanbanPro — Mock Data: Projects
//  Generated from Stitch design: project 8500468687534971318
// ============================================================

export const currentUser = {
  id: "u-001",
  name: "Alex Rivera",
  email: "alex.rivera@kanbanpro.com",
  role: "Project Director",
  avatar: "https://i.pravatar.cc/150?img=47",
  initials: "AR",
};

// ----------------------------------------------------------
//  Team Members
// ----------------------------------------------------------
export const teamMembers = [
  {
    id: "u-001",
    name: "Alex Rivera",
    email: "alex.rivera@kanbanpro.com",
    role: "Lead Designer",
    avatar: "https://i.pravatar.cc/150?img=47",
    initials: "AR",
    activeTasks: 12,
    availability: "Available",   // "Available" | "In Meeting" | "Offline"
    workloadPercent: 80,
  },
  {
    id: "u-002",
    name: "Jordan Smith",
    email: "j.smith@kanbanpro.com",
    role: "Senior Developer",
    avatar: "https://i.pravatar.cc/150?img=12",
    initials: "JS",
    activeTasks: 5,
    availability: "In Meeting",
    workloadPercent: 50,
  },
  {
    id: "u-003",
    name: "Sarah Chen",
    email: "s.chen@kanbanpro.com",
    role: "Product Manager",
    avatar: "https://i.pravatar.cc/150?img=25",
    initials: "SC",
    activeTasks: 18,
    availability: "Available",
    workloadPercent: 90,
  },
  {
    id: "u-004",
    name: "Marcus Thorne",
    email: "m.thorne@kanbanpro.com",
    role: "QA Engineer",
    avatar: "https://i.pravatar.cc/150?img=33",
    initials: "MT",
    activeTasks: 3,
    availability: "Offline",
    workloadPercent: 30,
  },
  {
    id: "u-005",
    name: "Alex Johnson",
    email: "a.johnson@kanbanpro.com",
    role: "Lead Engineer",
    avatar: "https://i.pravatar.cc/150?img=8",
    initials: "AJ",
    activeTasks: 9,
    availability: "Available",
    workloadPercent: 70,
  },
  {
    id: "u-006",
    name: "Nina Patel",
    email: "n.patel@kanbanpro.com",
    role: "UX Researcher",
    avatar: "https://i.pravatar.cc/150?img=16",
    initials: "NP",
    activeTasks: 6,
    availability: "Available",
    workloadPercent: 60,
  },
  {
    id: "u-007",
    name: "Carlos Ruiz",
    email: "c.ruiz@kanbanpro.com",
    role: "Backend Developer",
    avatar: "https://i.pravatar.cc/150?img=11",
    initials: "CR",
    activeTasks: 11,
    availability: "In Meeting",
    workloadPercent: 75,
  },
  {
    id: "u-008",
    name: "Leila Hassan",
    email: "l.hassan@kanbanpro.com",
    role: "DevOps Engineer",
    avatar: "https://i.pravatar.cc/150?img=23",
    initials: "LH",
    activeTasks: 7,
    availability: "Available",
    workloadPercent: 65,
  },
];

export const teamStats = {
  totalMembers: 24,
  newThisMonth: 2,
  activeTasks: 142,
  completionRate: 85,
  liveBoards: 12,
  avgVelocity: 8.4,
  velocityUnit: "Tasks / Week",
};

// ----------------------------------------------------------
//  Dashboard Stats
// ----------------------------------------------------------
export const dashboardStats = {
  velocityScore: 84.2,
  velocityChange: +12,
  completedTasks: 1482,
  completedTasksChange: +24,
  blockedIssues: 8,
  blockedIssuesStatus: "Stable",
};

// ----------------------------------------------------------
//  Projects
// ----------------------------------------------------------
export const projects = [
  {
    id: "proj-001",
    code: "QS",
    name: "Quantum Sync Core",
    description:
      "Real-time database synchronization engine for distributed microservices architecture.",
    status: "IN PROGRESS",        // "IN PROGRESS" | "ON HOLD" | "DRAFTING" | "DONE"
    priority: "HIGH",
    color: "#6366f1",             // indigo
    tasksCompleted: 18,
    tasksTotal: 24,
    dueDate: "2026-05-09",        // "Due in 4d" from screenshot
    dueDateLabel: "Due in 4d",
    isDelayed: false,
    isCritical: false,
    members: ["u-001", "u-002", "u-003"],
    extraMembersCount: 3,
    workspace: "Active Projects",
    boardId: "board-001",
  },
  {
    id: "proj-002",
    code: "PA",
    name: "Phoenix Analytics",
    description:
      "Customer behavior modeling using machine learning and real-time event streaming.",
    status: "ON HOLD",
    priority: "MEDIUM",
    color: "#f59e0b",             // amber
    tasksCompleted: 5,
    tasksTotal: 20,
    dueDate: null,
    dueDateLabel: "Delayed",
    isDelayed: true,
    isCritical: false,
    members: ["u-004", "u-005"],
    extraMembersCount: 0,
    workspace: "Active Projects",
    boardId: "board-002",
  },
  {
    id: "proj-003",
    code: "UI",
    name: "Design System V2",
    description:
      "Centralized component library and token-based styling for a unified product experience.",
    status: "IN PROGRESS",
    priority: "CRITICAL",
    color: "#8b5cf6",             // violet
    tasksCompleted: 142,
    tasksTotal: 150,
    dueDate: "2026-05-10",
    dueDateLabel: "Critical",
    isDelayed: false,
    isCritical: true,
    members: ["u-001"],
    extraMembersCount: 0,
    workspace: "Product Design",
    boardId: "board-003",
  },
  {
    id: "proj-004",
    code: "MD",
    name: "Mobile Dashboards",
    description:
      "Native iOS and Android expansion for real-time analytics and executive reporting.",
    status: "DRAFTING",
    priority: "LOW",
    color: "#64748b",             // slate
    tasksCompleted: 0,
    tasksTotal: 12,
    dueDate: null,
    dueDateLabel: "Planning",
    isDelayed: false,
    isCritical: false,
    members: ["u-006"],
    extraMembersCount: 0,
    workspace: "Mobile",
    boardId: "board-004",
  },
  {
    id: "proj-005",
    code: "AL",
    name: "Alpha Launch Pipeline",
    description:
      "End-to-end launch pipeline for the Alpha product including design, development and QA.",
    status: "IN PROGRESS",
    priority: "HIGH",
    color: "#0ea5e9",             // sky
    tasksCompleted: 7,
    tasksTotal: 15,
    dueDate: "2026-05-20",
    dueDateLabel: "Due in 15d",
    isDelayed: false,
    isCritical: false,
    members: ["u-001", "u-002", "u-003", "u-004", "u-005"],
    extraMembersCount: 12,
    workspace: "Product Design",
    boardId: "board-005",
  },
  {
    id: "proj-006",
    code: "CX",
    name: "Customer XP Revamp",
    description:
      "Overhaul of the customer-facing portal with improved UX flows and accessibility.",
    status: "IN PROGRESS",
    priority: "MEDIUM",
    color: "#10b981",             // emerald
    tasksCompleted: 11,
    tasksTotal: 30,
    dueDate: "2026-06-01",
    dueDateLabel: "Due in 27d",
    isDelayed: false,
    isCritical: false,
    members: ["u-003", "u-006", "u-007"],
    extraMembersCount: 0,
    workspace: "Active Projects",
    boardId: "board-006",
  },
];

// ----------------------------------------------------------
//  Boards (columns per project)
// ----------------------------------------------------------
export const boards = [
  // Alpha Launch Pipeline board (matches screenshot exactly)
  {
    id: "board-005",
    projectId: "proj-005",
    name: "Alpha Launch Pipeline",
    workspace: "Product Design",
    columns: [
      { id: "col-todo",        title: "To Do",       order: 0, color: "#94a3b8" },
      { id: "col-inprogress",  title: "In Progress", order: 1, color: "#6366f1" },
      { id: "col-review",      title: "Review",      order: 2, color: "#f59e0b" },
      { id: "col-done",        title: "Done",        order: 3, color: "#10b981" },
    ],
  },
  {
    id: "board-001",
    projectId: "proj-001",
    name: "Quantum Sync Core",
    workspace: "Active Projects",
    columns: [
      { id: "qs-todo",        title: "Backlog",      order: 0, color: "#94a3b8" },
      { id: "qs-inprogress",  title: "In Progress",  order: 1, color: "#6366f1" },
      { id: "qs-review",      title: "Review",       order: 2, color: "#f59e0b" },
      { id: "qs-done",        title: "Done",         order: 3, color: "#10b981" },
    ],
  },
  {
    id: "board-002",
    projectId: "proj-002",
    name: "Phoenix Analytics",
    workspace: "Active Projects",
    columns: [
      { id: "pa-todo",       title: "To Do",        order: 0, color: "#94a3b8" },
      { id: "pa-inprogress", title: "In Progress",  order: 1, color: "#6366f1" },
      { id: "pa-blocked",    title: "Blocked",      order: 2, color: "#ef4444" },
      { id: "pa-done",       title: "Done",         order: 3, color: "#10b981" },
    ],
  },
  {
    id: "board-003",
    projectId: "proj-003",
    name: "Design System V2",
    workspace: "Product Design",
    columns: [
      { id: "ui-todo",       title: "To Do",        order: 0, color: "#94a3b8" },
      { id: "ui-inprogress", title: "In Progress",  order: 1, color: "#8b5cf6" },
      { id: "ui-review",     title: "Review",       order: 2, color: "#f59e0b" },
      { id: "ui-done",       title: "Done",         order: 3, color: "#10b981" },
    ],
  },
  {
    id: "board-004",
    projectId: "proj-004",
    name: "Mobile Dashboards",
    workspace: "Mobile",
    columns: [
      { id: "md-planning",   title: "Planning",     order: 0, color: "#64748b" },
      { id: "md-todo",       title: "To Do",        order: 1, color: "#94a3b8" },
      { id: "md-inprogress", title: "In Progress",  order: 2, color: "#0ea5e9" },
      { id: "md-done",       title: "Done",         order: 3, color: "#10b981" },
    ],
  },
];

export default { currentUser, teamMembers, teamStats, dashboardStats, projects, boards };
