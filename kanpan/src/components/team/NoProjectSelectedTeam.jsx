import { useNavigate } from "react-router-dom";

/**
 * Empty state component shown when no project is selected for team management
 */
const NoProjectSelectedTeam = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-auto bg-slate-50">
      <div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900">Team Management</h1>
          <p className="text-slate-500 mt-2">
            Select a project to view and manage its team members
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-slate-200 shadow-sm max-w-2xl w-full">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-slate-700 font-semibold text-lg mb-2">No Project Selected</p>
          <p className="text-slate-500 text-center mb-8">
            To view team members and their task assignments, you must first select a project from your dashboard.
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Go to Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoProjectSelectedTeam;
