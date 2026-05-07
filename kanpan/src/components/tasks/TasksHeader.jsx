import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { taskPageCopy } from "../../constants/tasks";

/**
 * Tasks page header with back button, title, and description
 */
const TasksHeader = ({ project, filters, onFilterChange, onAddTask }) => {
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState(filters?.search || "");

  // Debounce search input
  useEffect(() => {
    // Don't trigger search if it's already the same as current filter
    if (localSearch === (filters?.search || "")) return;

    const timer = setTimeout(() => {
      onFilterChange("search", localSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, onFilterChange]);

  // Sync local search with external filter (e.g. if URL changes via browser back/forward)
  useEffect(() => {
    const urlSearch = filters?.search || "";
    if (urlSearch !== localSearch) {
      setLocalSearch(urlSearch);
    }
  }, [filters?.search]);

  const isSearching = localSearch !== (filters?.search || "");

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <button
          onClick={() => navigate("/projects")}
          className="text-slate-500 hover:text-slate-900 text-sm font-bold mb-3 flex items-center gap-1 transition-colors uppercase tracking-wider"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {taskPageCopy.backButtonLabel}
        </button>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          {project?.name || taskPageCopy.title}
        </h1>
        <p className="text-slate-500 mt-2 font-medium max-w-xl line-clamp-1">{project?.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Search Input */}
        <div className="relative group min-w-[300px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900 transition-colors">
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>
          <input
            type="text"
            placeholder="Search tasks, IDs, or members..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className={`block w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-medium shadow-sm ${isSearching ? 'bg-white ring-2 ring-slate-900/10' : ''}`}
          />
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {["ALL", "URGENT", "HIGH", "MEDIUM", "LOW"].map((priority) => (
            <button
              key={priority}
              onClick={() => onFilterChange("priority", priority)}
              className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                filters?.priority === priority
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {priority}
            </button>
          ))}
        </div>

        {/* Add Task Button */}
        <button
          onClick={onAddTask}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TasksHeader;
