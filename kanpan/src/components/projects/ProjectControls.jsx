import { useState, useEffect } from "react";
import {
  projectSortOptions,
  projectStatusOptions,
  projectViewModes,
  projectsPageCopy,
} from "../../constants/projects";

/**
 * ProjectControls Component - Controls for search, filter, sort, and view mode
 */
const ProjectControls = ({
  viewMode,
  setViewMode,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery || "");

  // Debounce search input
  useEffect(() => {
    if (localSearch === (searchQuery || "")) return;
    const timer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery]);

  // Sync local search with external (URL) changes
  useEffect(() => {
    setLocalSearch(searchQuery || "");
  }, [searchQuery]);

  const isSearching = localSearch !== (searchQuery || "");
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex-1 min-w-62.5 relative group">
        <input
          type="text"
          placeholder={projectsPageCopy.searchPlaceholder}
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className={`w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            isSearching ? "border-blue-300 ring-2 ring-blue-500/10" : "border-slate-200"
          }`}
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
          {isSearching ? (
            <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          )}
        </span>
      </div>

      <div className="flex gap-1 border border-slate-200 rounded-lg p-1">
        {projectViewModes.map((mode) => (
          <button
            key={mode.value}
            onClick={() => setViewMode(mode.value)}
            className={`px-3 py-1.5 rounded transition-colors ${
              viewMode === mode.value ? "bg-slate-100" : "hover:bg-slate-50"
            }`}
            title={mode.label}
          >
            {mode.value === "grid" ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={viewMode === mode.value ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            )}
          </button>
        ))}
      </div>

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {projectStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {projectSortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectControls;
