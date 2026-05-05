import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import ErrorBoundary from "./components/ErrorBoundary";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "projects", element: <Projects /> },
      { path: "team", element: <Team /> },
    ],
  },
]);

function App() {
  return <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
}

export default App;