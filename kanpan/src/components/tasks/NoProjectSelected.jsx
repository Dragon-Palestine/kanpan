import { useNavigate } from "react-router-dom";
import { taskPageCopy } from "../../constants/tasks";

/**
 * Empty state component shown when no project is selected
 */
const NoProjectSelected = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {taskPageCopy.title}
          </h1>
          <p className="text-slate-500 mt-1">
            {taskPageCopy.emptyStateDescription}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center py-16 bg-slate-50 rounded-lg border border-dashed border-slate-200">
        <div className="text-center">
          <p className="text-slate-500 mb-4">{taskPageCopy.emptyStateTitle}</p>
          <button
            onClick={() => navigate("/projects")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {taskPageCopy.backButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoProjectSelected;
