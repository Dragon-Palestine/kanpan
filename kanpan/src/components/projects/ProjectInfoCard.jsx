/**
 * Project information card showing status, task count, and progress
 */
const ProjectInfoCard = ({ project, tasksCount }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: project.color }}
        >
          {project.code}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-600">
              {project.status}
            </span>
            <span className="text-sm text-slate-500">•</span>
            <span className="text-sm text-slate-600">{tasksCount} tasks</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Progress</div>
          <div className="text-lg font-bold text-slate-900">
            {project.tasksCompleted}/{project.tasksTotal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoCard;
