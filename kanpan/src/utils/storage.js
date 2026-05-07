import { projects as mockProjects } from "../api/mocks/project";
import { tasks as mockTasks } from "../api/mocks/tasks";

const PROJECTS_KEY = "kanban_projects";
const TASKS_KEY = "kanban_tasks";

/**
 * Initialize storage with mock data if not already present
 */
export const initStorage = () => {
  if (!localStorage.getItem(PROJECTS_KEY)) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(mockProjects));
  }
  if (!localStorage.getItem(TASKS_KEY)) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(mockTasks));
  }
};

/**
 * Get all projects from storage
 */
export const getProjects = () => {
  initStorage();
  return JSON.parse(localStorage.getItem(PROJECTS_KEY));
};

/**
 * Save projects to storage
 */
export const saveProjects = (projects) => {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

/**
 * Get all tasks from storage
 */
export const getTasks = () => {
  initStorage();
  return JSON.parse(localStorage.getItem(TASKS_KEY));
};

/**
 * Save tasks to storage
 */
export const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

/**
 * Update a specific project
 */
export const updateProject = (projectId, updates) => {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === projectId);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates };
    saveProjects(projects);
    return projects[index];
  }
  return null;
};

/**
 * Update a specific task
 */
export const updateTask = (taskId, updates) => {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates };
    saveTasks(tasks);
    return tasks[index];
  }
  return null;
};

/**
 * Add a member to a project
 */
export const addMemberToProjectStorage = (projectId, memberId) => {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === projectId);
  if (index !== -1) {
    const project = projects[index];
    if (!project.members) project.members = [];
    if (!project.members.includes(memberId)) {
      project.members.push(memberId);
      saveProjects(projects);
    }
    return project;
  }
  return null;
};

/**
 * Assign a task to a member
 */
export const assignTaskToMemberStorage = (taskId, memberId) => {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    const task = tasks[index];
    if (!task.assignees) task.assignees = [];
    if (!task.assignees.includes(memberId)) {
      task.assignees.push(memberId);
      saveTasks(tasks);
    }
    return task;
  }
  return null;
};
