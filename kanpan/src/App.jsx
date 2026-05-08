import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { BoardProvider } from "./context/BoardContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Tasks from "./pages/Tasks";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "projects", element: <Projects /> },
      { path: "tasks", element: <Tasks /> },
      { path: "tasks/:projectId", element: <Tasks /> },
      { path: "team", element: <Team /> },
      { path: "team/:projectId", element: <Team /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <BoardProvider>
        <RouterProvider router={router} />
      </BoardProvider>
    </ErrorBoundary>
  );
}

export default App;
