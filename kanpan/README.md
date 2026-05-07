# Kanpan

Kanpan is a React + Vite project management app built around a Kanban workflow. It includes project tracking, task boards, team management, drag-and-drop task handling, undo/redo history, and browser-local persistence for mock data and user changes.

## Features

- Dashboard with workspace-level metrics and recent project progress
- Projects view with search, sort, status filtering, and grid/list modes
- Tasks board with Kanban columns, drag and drop, task details, create/edit/delete flows, and URL-driven filters
- Team view for project members, task assignment, pagination, and member management
- Undo and redo support for board actions
- Responsive UI with reusable components and modal portals
- Local persistence through `localStorage` with seeded mock data when storage is empty

## Tech Stack

- React 19
- Vite
- React Router
- Tailwind CSS
- dnd-kit

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint the project

```bash
npm run lint
```

## Application Routes

- `/dashboard` - workspace overview
- `/projects` - projects management screen
- `/tasks` - tasks board empty state / global entry point
- `/tasks/:projectId` - tasks board for a specific project
- `/team` - team overview empty state / global entry point
- `/team/:projectId` - team management for a specific project

## Data and Storage

The app initializes its data from mock project and task sets stored in `src/api/mocks`. On first load, that data is copied into browser `localStorage` using the keys `kanban_projects` and `kanban_tasks`.

If you want to reset everything back to the seeded mock data, use the developer reset button on the Dashboard or clear the browser storage for the site.

## Project Structure

- `src/App.jsx` - router and app-level providers
- `src/context/BoardContext.jsx` - central board state, actions, and undo/redo
- `src/pages/` - route pages
- `src/components/` - reusable UI and feature components
- `src/hooks/` - data and UI logic hooks
- `src/utils/` - helpers and storage utilities
- `src/api/mocks/` - seeded mock projects and tasks

## Notes

- The board uses normalized state for projects and tasks.
- Tasks are filtered through the URL query string on the board page.
- The UI is split into small feature components so pages stay easy to maintain.
