/**
 * Board Action Types
 * Centralized constants for all state mutations in boardReducer
 */

// Task Actions
export const MOVE_TASK = "MOVE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const UPDATE_TASK_ASSIGNEES = "UPDATE_TASK_ASSIGNEES";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";

// Project Actions
export const SET_PROJECTS = "SET_PROJECTS";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const ADD_PROJECT = "ADD_PROJECT";
export const ADD_MEMBER_TO_PROJECT = "ADD_MEMBER_TO_PROJECT";

// Board Initialization
export const INIT_BOARD = "INIT_BOARD";

// Undo / Redo
export const UNDO = "UNDO";
export const REDO = "REDO";

// Notification Actions
export const ADD_TOAST = "ADD_TOAST";
export const REMOVE_TOAST = "REMOVE_TOAST";

// Max history size for undo/redo
export const MAX_HISTORY = 5;
