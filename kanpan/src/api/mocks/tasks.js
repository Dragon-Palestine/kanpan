// ============================================================
//  KanbanPro — Mock Data: Tasks
//  Generated from Stitch design: project 8500468687534971318
// ============================================================

// ----------------------------------------------------------
//  Tasks for board-005: Alpha Launch Pipeline
// ----------------------------------------------------------
export const tasks = [

  // ── TO DO column ────────────────────────────────────────
  {
    id: "TASK-101",
    boardId: "board-005",
    columnId: "col-todo",
    projectId: "proj-005",
    title: "Design System Audit for Mobile responsiveness",
    description:
      "Audit every component in the current design system for mobile-screen breakpoints. Flag inconsistencies and propose fixes using existing token variables.",
    priority: "HIGH",           // "URGENT" | "HIGH" | "MEDIUM" | "LOW"
    status: "todo",
    subtasks: { completed: 0, total: 12 },
    comments: [],
    commentsCount: 0,
    attachments: [],
    tags: ["Design", "Mobile", "Audit"],
    assignees: ["u-001"],
    dueDate: null,
    dueDateLabel: null,
    isSyncing: false,
    isPriority: false,
    estimatedHours: 8,
    loggedHours: 0,
    timeEntries: [],
    activityLog: [
      {
        id: "act-101-1",
        userId: "u-001",
        action: "created this task",
        date: "2026-04-20T10:00:00Z",
      },
    ],
    order: 0,
    createdAt: "2026-04-20T10:00:00Z",
    updatedAt: "2026-04-20T10:00:00Z",
  },

  {
    id: "TASK-102",
    boardId: "board-005",
    columnId: "col-todo",
    projectId: "proj-005",
    title: "User Research: Q4 Feedback analysis",
    description:
      "Compile and analyze the Q4 user feedback surveys. Categorize themes, identify top pain-points, and present actionable recommendations to the product team.",
    priority: "MEDIUM",
    status: "todo",
    subtasks: { completed: 0, total: 0 },
    comments: [
      { id: "c-102-1", userId: "u-002", text: "Should we include NPS scores?", date: "2026-04-22T09:15:00Z" },
      { id: "c-102-2", userId: "u-003", text: "Yes, include NPS + CSAT.", date: "2026-04-22T09:45:00Z" },
      { id: "c-102-3", userId: "u-001", text: "On it, will share draft by Friday.", date: "2026-04-23T11:00:00Z" },
      { id: "c-102-4", userId: "u-006", text: "Can you share the raw data file too?", date: "2026-04-24T14:30:00Z" },
    ],
    commentsCount: 4,
    attachments: [],
    tags: ["Research", "UX", "Q4"],
    assignees: ["u-003"],
    dueDate: null,
    dueDateLabel: null,
    isSyncing: false,
    isPriority: false,
    estimatedHours: 6,
    loggedHours: 0,
    timeEntries: [],
    activityLog: [
      { id: "act-102-1", userId: "u-003", action: "created this task", date: "2026-04-21T08:00:00Z" },
    ],
    order: 1,
    createdAt: "2026-04-21T08:00:00Z",
    updatedAt: "2026-04-24T14:30:00Z",
  },

  {
    id: "TASK-103",
    boardId: "board-005",
    columnId: "col-todo",
    projectId: "proj-005",
    title: "Set up staging environment for Q2 release",
    description:
      "Configure the staging environment on AWS to mirror production. Include environment variables, SSL certificates, and database seeding scripts.",
    priority: "HIGH",
    status: "todo",
    subtasks: { completed: 2, total: 6 },
    comments: [],
    commentsCount: 0,
    attachments: [],
    tags: ["DevOps", "AWS", "Staging"],
    assignees: ["u-008"],
    dueDate: "2026-05-10T00:00:00Z",
    dueDateLabel: "Due in 5d",
    isSyncing: false,
    isPriority: false,
    estimatedHours: 10,
    loggedHours: 3,
    timeEntries: [
      { userId: "u-008", hours: 3, date: "2026-04-28T09:00:00Z" },
    ],
    activityLog: [
      { id: "act-103-1", userId: "u-008", action: "created this task", date: "2026-04-22T10:00:00Z" },
    ],
    order: 2,
    createdAt: "2026-04-22T10:00:00Z",
    updatedAt: "2026-04-28T09:00:00Z",
  },

  {
    id: "TASK-104",
    boardId: "board-005",
    columnId: "col-todo",
    projectId: "proj-005",
    title: "Write onboarding documentation for new APIs",
    description:
      "Create developer-facing docs for the new v2 API endpoints including authentication, rate limits, and example requests/responses.",
    priority: "LOW",
    status: "todo",
    subtasks: { completed: 0, total: 4 },
    comments: [],
    commentsCount: 0,
    attachments: [],
    tags: ["Docs", "API", "v2"],
    assignees: ["u-007"],
    dueDate: null,
    dueDateLabel: null,
    isSyncing: false,
    isPriority: false,
    estimatedHours: 5,
    loggedHours: 0,
    timeEntries: [],
    activityLog: [
      { id: "act-104-1", userId: "u-007", action: "created this task", date: "2026-04-25T13:00:00Z" },
    ],
    order: 3,
    createdAt: "2026-04-25T13:00:00Z",
    updatedAt: "2026-04-25T13:00:00Z",
  },

  // ── IN PROGRESS column ───────────────────────────────────
  {
    id: "TASK-201",
    boardId: "board-005",
    columnId: "col-inprogress",
    projectId: "proj-005",
    title: "API Infrastructure Scaling for Q1 Growth",
    description:
      "Scale the API gateway and underlying microservices to handle a projected 3× traffic increase in Q1. Includes load balancer tuning, horizontal pod autoscaling, and CDN optimization.",
    priority: "URGENT",
    status: "in-progress",
    subtasks: { completed: 4, total: 9 },
    comments: [
      { id: "c-201-1", userId: "u-005", text: "HPA config pushed to staging, monitoring for 24h.", date: "2026-05-01T08:30:00Z" },
      { id: "c-201-2", userId: "u-002", text: "Latency looks good — p99 dropped by 40ms.", date: "2026-05-02T11:00:00Z" },
    ],
    commentsCount: 2,
    attachments: [
      { id: "att-201-1", name: "scaling_plan_v3.pdf", size: "512 KB", uploadedBy: "u-005", date: "2026-04-30T09:00:00Z" },
    ],
    tags: ["Backend", "Infra", "Scaling", "Q1"],
    assignees: ["u-005", "u-002"],
    dueDate: "2026-05-07T00:00:00Z",
    dueDateLabel: "Due soon",
    isSyncing: true,
    isPriority: false,
    estimatedHours: 20,
    loggedHours: 14,
    timeEntries: [
      { userId: "u-005", hours: 9, date: "2026-04-29T09:00:00Z" },
      { userId: "u-002", hours: 5, date: "2026-04-30T10:00:00Z" },
    ],
    activityLog: [
      { id: "act-201-1", userId: "u-005", action: "created this task", date: "2026-04-18T09:00:00Z" },
      { id: "act-201-2", userId: "u-002", action: "moved this task to In Progress", date: "2026-04-25T10:00:00Z" },
      { id: "act-201-3", userId: "u-005", action: "changed priority from HIGH to URGENT", date: "2026-04-27T14:00:00Z" },
    ],
    order: 0,
    createdAt: "2026-04-18T09:00:00Z",
    updatedAt: "2026-05-02T11:00:00Z",
  },

  {
    id: "TASK-202",
    boardId: "board-005",
    columnId: "col-inprogress",
    projectId: "proj-005",
    title: "Update Branding Assets for Newsletter",
    description:
      "Refresh all logo, color, and typography assets used in the monthly newsletter template to align with the new brand guidelines released in the Design System V2.",
    priority: "LOW",
    status: "in-progress",
    subtasks: { completed: 1, total: 3 },
    comments: [],
    commentsCount: 0,
    attachments: [
      { id: "att-202-1", name: "brand_guidelines_v2.pdf", size: "2.1 MB", uploadedBy: "u-001", date: "2026-05-03T09:00:00Z" },
    ],
    tags: ["Design", "Branding", "Newsletter"],
    assignees: ["u-001"],
    dueDate: "2026-05-06T00:00:00Z",
    dueDateLabel: "Due tomorrow",
    isSyncing: false,
    isPriority: false,
    estimatedHours: 4,
    loggedHours: 2,
    timeEntries: [
      { userId: "u-001", hours: 2, date: "2026-05-04T10:00:00Z" },
    ],
    activityLog: [
      { id: "act-202-1", userId: "u-001", action: "created this task", date: "2026-04-28T11:00:00Z" },
      { id: "act-202-2", userId: "u-001", action: "moved this task to In Progress", date: "2026-05-03T09:00:00Z" },
    ],
    order: 1,
    createdAt: "2026-04-28T11:00:00Z",
    updatedAt: "2026-05-04T10:00:00Z",
  },

  // ── REVIEW column ────────────────────────────────────────
  {
    id: "TASK-301",
    boardId: "board-005",
    columnId: "col-review",
    projectId: "proj-005",
    title: "Dark Mode CSS implementation audit",
    description:
      "Verify every page and component renders correctly in dark mode. Check token usage, contrast ratios (WCAG AA), and flag any hard-coded color values that break theming.",
    priority: "MEDIUM",
    status: "review",
    subtasks: { completed: 7, total: 8 },
    comments: [
      { id: "c-301-1", userId: "u-004", text: "Found 3 components with hard-coded #fff values.", date: "2026-05-03T14:00:00Z" },
    ],
    commentsCount: 1,
    attachments: [],
    tags: ["Design", "CSS", "Dark Mode", "Accessibility"],
    assignees: ["u-003"],
    dueDate: "2026-05-08T00:00:00Z",
    dueDateLabel: "Due in 3d",
    isSyncing: false,
    isPriority: true,
    estimatedHours: 6,
    loggedHours: 5.5,
    timeEntries: [
      { userId: "u-003", hours: 5.5, date: "2026-05-02T09:00:00Z" },
    ],
    activityLog: [
      { id: "act-301-1", userId: "u-001", action: "created this task", date: "2026-04-26T10:00:00Z" },
      { id: "act-301-2", userId: "u-003", action: "moved this task to Review", date: "2026-05-02T16:00:00Z" },
    ],
    order: 0,
    createdAt: "2026-04-26T10:00:00Z",
    updatedAt: "2026-05-03T14:00:00Z",
  },

  // ── DONE column ──────────────────────────────────────────
  {
    id: "TASK-401",
    boardId: "board-005",
    columnId: "col-done",
    projectId: "proj-005",
    title: "Define project scope and milestones",
    description: "Document the project scope, key milestones, and delivery dates for Alpha Launch Pipeline.",
    priority: "HIGH",
    status: "done",
    subtasks: { completed: 3, total: 3 },
    comments: [],
    commentsCount: 0,
    attachments: [],
    tags: ["Planning"],
    assignees: ["u-003"],
    dueDate: "2026-04-15T00:00:00Z",
    dueDateLabel: "Completed",
    isSyncing: false,
    isPriority: false,
    estimatedHours: 3,
    loggedHours: 3,
    timeEntries: [{ userId: "u-003", hours: 3, date: "2026-04-14T09:00:00Z" }],
    activityLog: [
      { id: "act-401-1", userId: "u-003", action: "created this task", date: "2026-04-10T09:00:00Z" },
      { id: "act-401-2", userId: "u-003", action: "moved this task to Done", date: "2026-04-15T16:00:00Z" },
    ],
    order: 0,
    createdAt: "2026-04-10T09:00:00Z",
    updatedAt: "2026-04-15T16:00:00Z",
  },

  // ----------------------------------------------------------
  //  TASK-204 — Full detail task (from task detail modal screenshot)
  // ----------------------------------------------------------
  {
    id: "TASK-204",
    boardId: "board-001",
    columnId: "qs-inprogress",
    projectId: "proj-001",
    title: "Refactor Authentication Flow",
    description:
      "The current authentication flow is experiencing significant latency issues during the OAuth2 handshake. We need to refactor the middleware to handle token refreshing more efficiently.\n\nKey objectives:\n- Reduce cold start times for the auth Lambda function by 40%.\n- Implement biometric (FaceID/TouchID) fallback mechanisms for mobile clients.\n- Update the documentation for the /api/v2/auth endpoint to reflect structural changes in the response payload.",
    priority: "CRITICAL",
    status: "in-progress",
    subtasks: { completed: 0, total: 0 },
    comments: Array.from({ length: 14 }, (_, i) => ({
      id: `c-204-${i + 1}`,
      userId: i % 2 === 0 ? "u-005" : "u-003",
      text: [
        "Starting the OAuth2 middleware refactor today.",
        "Lambda cold start is at 1.8s currently, target is under 1.1s.",
        "Biometric fallback spec shared in Notion.",
        "Token refresh logic updated — needs review.",
        "FaceID integration tested on iPhone 14 — working.",
        "TouchID working on older devices too.",
        "Updated /api/v2/auth response schema in Swagger.",
        "Cold start now at 1.05s after Lambda layer optimization.",
        "Should we add a circuit breaker for the refresh endpoint?",
        "Good idea — adding that to the scope.",
        "Circuit breaker implemented with exponential backoff.",
        "Docs PR is open: #342.",
        "Reviewed docs PR — minor wording changes requested.",
        "All changes merged. Ready for QA.",
      ][i],
      date: new Date(2023, 9, 10 + Math.floor(i / 2), 9 + i).toISOString(),
    })),
    commentsCount: 14,
    attachments: [
      { id: "att-204-1", name: "auth_flow_diagram.pdf",    size: "1.2 MB", uploadedBy: "u-005", date: "2023-10-10T09:00:00Z" },
      { id: "att-204-2", name: "lambda_benchmark.xlsx",    size: "340 KB", uploadedBy: "u-005", date: "2023-10-12T11:00:00Z" },
      { id: "att-204-3", name: "biometric_spec_v1.docx",   size: "890 KB", uploadedBy: "u-003", date: "2023-10-13T15:00:00Z" },
    ],
    tags: ["Backend", "Security", "v2.4.0"],
    assignees: ["u-005", "u-003"],
    dueDate: "2023-10-24T00:00:00Z",
    dueDateLabel: "12 days left",
    isSyncing: false,
    isPriority: false,
    estimatedHours: 12,
    loggedHours: 8.75,
    timeEntries: [
      { userId: "u-005", hours: 5.5,  label: "5h 30m", date: "2023-10-10T09:00:00Z" },
      { userId: "u-003", hours: 3.25, label: "3h 15m", date: "2023-10-11T10:00:00Z" },
    ],
    activityLog: [
      { id: "act-204-1", userId: "u-005", action: "moved this task to", target: "In Progress", date: "2023-10-10T09:42:00Z" },
      { id: "act-204-2", userId: "u-003", action: "changed priority from", target: "Medium to High", date: "2023-10-11T08:15:00Z" },
      { id: "act-204-3", userId: "u-005", action: "changed priority from", target: "High to Critical", date: "2023-10-12T14:00:00Z" },
      { id: "act-204-4", userId: "u-003", action: "added attachment", target: "biometric_spec_v1.docx", date: "2023-10-13T15:00:00Z" },
    ],
    order: 0,
    createdAt: "2023-10-08T09:00:00Z",
    updatedAt: "2023-10-13T15:00:00Z",
  },

  // ----------------------------------------------------------
  //  Additional tasks for other boards
  // ----------------------------------------------------------

  // Quantum Sync Core tasks
  {
    id: "TASK-205",
    boardId: "board-001",
    columnId: "qs-todo",
    projectId: "proj-001",
    title: "Implement event-sourcing for sync state",
    description: "Replace the current polling mechanism with an event-sourcing pattern to reduce database load and improve real-time accuracy.",
    priority: "HIGH",
    status: "todo",
    subtasks: { completed: 0, total: 5 },
    comments: [], commentsCount: 0, attachments: [],
    tags: ["Backend", "Architecture"],
    assignees: ["u-002"],
    dueDate: "2026-05-15T00:00:00Z", dueDateLabel: "Due in 10d",
    isSyncing: false, isPriority: false,
    estimatedHours: 16, loggedHours: 0, timeEntries: [],
    activityLog: [{ id: "act-205-1", userId: "u-002", action: "created this task", date: "2026-04-20T09:00:00Z" }],
    order: 0, createdAt: "2026-04-20T09:00:00Z", updatedAt: "2026-04-20T09:00:00Z",
  },
  {
    id: "TASK-206",
    boardId: "board-001",
    columnId: "qs-review",
    projectId: "proj-001",
    title: "WebSocket connection stability fixes",
    description: "Address intermittent disconnections under high concurrency (500+ concurrent clients) and implement exponential backoff on reconnect.",
    priority: "URGENT",
    status: "review",
    subtasks: { completed: 6, total: 6 },
    comments: [{ id: "c-206-1", userId: "u-004", text: "Tested with 600 concurrent clients — stable now.", date: "2026-05-01T10:00:00Z" }],
    commentsCount: 1, attachments: [],
    tags: ["Backend", "WebSocket", "Performance"],
    assignees: ["u-007", "u-004"],
    dueDate: "2026-05-06T00:00:00Z", dueDateLabel: "Due tomorrow",
    isSyncing: false, isPriority: true,
    estimatedHours: 10, loggedHours: 10,
    timeEntries: [
      { userId: "u-007", hours: 7, date: "2026-04-29T09:00:00Z" },
      { userId: "u-004", hours: 3, date: "2026-04-30T09:00:00Z" },
    ],
    activityLog: [
      { id: "act-206-1", userId: "u-007", action: "created this task", date: "2026-04-22T09:00:00Z" },
      { id: "act-206-2", userId: "u-007", action: "moved this task to Review", date: "2026-05-01T09:00:00Z" },
    ],
    order: 0, createdAt: "2026-04-22T09:00:00Z", updatedAt: "2026-05-01T10:00:00Z",
  },

  // Design System V2 tasks
  {
    id: "TASK-301-UI",
    boardId: "board-003",
    columnId: "ui-inprogress",
    projectId: "proj-003",
    title: "Button component accessibility overhaul",
    description: "Update all Button variants to meet WCAG 2.1 AA. Add aria-labels, keyboard navigation, and focus-visible ring styles.",
    priority: "HIGH",
    status: "in-progress",
    subtasks: { completed: 4, total: 5 },
    comments: [], commentsCount: 0, attachments: [],
    tags: ["Design System", "Accessibility", "Components"],
    assignees: ["u-001", "u-006"],
    dueDate: "2026-05-08T00:00:00Z", dueDateLabel: "Due in 3d",
    isSyncing: false, isPriority: false,
    estimatedHours: 8, loggedHours: 6,
    timeEntries: [
      { userId: "u-001", hours: 4, date: "2026-05-03T10:00:00Z" },
      { userId: "u-006", hours: 2, date: "2026-05-04T10:00:00Z" },
    ],
    activityLog: [{ id: "act-ui-301-1", userId: "u-001", action: "created this task", date: "2026-04-28T09:00:00Z" }],
    order: 0, createdAt: "2026-04-28T09:00:00Z", updatedAt: "2026-05-04T10:00:00Z",
  },
];

// ----------------------------------------------------------
//  Helper: get tasks by board and column
// ----------------------------------------------------------
export const getTasksByColumn = (boardId, columnId) =>
  tasks.filter((t) => t.boardId === boardId && t.columnId === columnId).sort((a, b) => a.order - b.order);

export const getTasksByBoard = (boardId) =>
  tasks.filter((t) => t.boardId === boardId).sort((a, b) => a.order - b.order);

export const getTaskById = (taskId) =>
  tasks.find((t) => t.id === taskId) ?? null;

export default tasks;
