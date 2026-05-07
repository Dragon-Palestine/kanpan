import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useBoardState } from "../context/BoardContext";

/**
 * Dashboard Page
 * Displays real-time project statistics from the central BoardContext.
 * No extra data fetching needed – reads from the normalized store.
 */
const Dashboard = () => {
  const state = useBoardState();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const projectsList = Object.values(state.projects);
    const tasksList = Object.values(state.tasks);

    const totalProjects = projectsList.length;
    const totalTasks = tasksList.length;
    const completedTasks = tasksList.filter((t) => t.status === "done").length;
    const inProgressTasks=tasksList.filter((t)=>t.status=== "in-progress").length;
    const reviewTasks=tasksList.filter((t)=>t.status==="review").length;
    const urgentTasks = tasksList.filter((t) => t.priority === "URGENT" && t.status !== "done").length;

    const completionRate =
      totalTasks>0?Math.round((completedTasks/totalTasks)*100):0;

    return {
      totalProjects,
      totalTasks,
      completedTasks,
      inProgressTasks,
      reviewTasks,
      urgentTasks,
      completionRate,
      projectsList: projectsList.slice(0, 5),
    };
  }, [state.projects, state.tasks]);

  const statCards = [
    {
      label: "Total Projects",
      value: stats.totalProjects,
      icon: "📁",
      color: "bg-blue-50 text-blue-700",
      border: "border-blue-100",
    },
    {
      label: "Tasks Completed",
      value: `${stats.completedTasks}/${stats.totalTasks}`,
      icon: "✅",
      color: "bg-emerald-50 text-emerald-700",
      border: "border-emerald-100",
    },
    {
      label: "In Progress",
      value: stats.inProgressTasks,
      icon: "⚡",
      color: "bg-amber-50 text-amber-700",
      border: "border-amber-100",
    },
    {
      label: "Urgent Tasks",
      value: stats.urgentTasks,
      icon: "🔥",
      color: "bg-red-50 text-red-700",
      border: "border-red-100",
    },
  ];

  if (!state.isInitialized) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-slate-100 rounded-xl w-64" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-100 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Real-time overview of your workspace
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`bg-white rounded-2xl p-5 border ${card.border} shadow-sm`}
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="text-2xl font-black text-slate-900">{card.value}</div>
            <div className="text-sm font-semibold text-slate-500 mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Completion Rate */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Overall Completion</h2>
          <span className="text-2xl font-black text-emerald-600">{stats.completionRate}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700"
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-semibold text-slate-400 mt-2">
          <span>{stats.completedTasks} done</span>
          <span>{stats.totalTasks - stats.completedTasks} remaining</span>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">Recent Projects</h2>
          <button
            onClick={() => navigate("/projects")}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View all →
          </button>
        </div>

        <div className="space-y-3">
          {stats.projectsList.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-4">
              No projects yet
            </p>
          ) : (
            stats.projectsList.map((project) => {
              const projectTasks = Object.values(state.tasks).filter(
                (t) => t.projectId === project.id,
              );
              const done = projectTasks.filter((t) => t.status === "done").length;
              const total = projectTasks.length;
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;

              return (
                <div
                  key={project.id}
                  onClick={() => navigate(`/tasks/${project.id}`)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {project.code?.slice(0, 2) || "??"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 text-sm group-hover:text-indigo-700 transition-colors truncate">
                      {project.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-500 w-10 text-right">
                        {pct}%
                      </span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-400">
                    {done}/{total}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Admin/Debug Section */}
      <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Developer Tools
        </div>
        <button
          onClick={() => {
            if (confirm("Are you sure? This will clear all changes and reload with mock data.")) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-red-100 transition-colors"
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
