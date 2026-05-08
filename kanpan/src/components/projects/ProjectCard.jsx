import { useNavigate } from "react-router-dom";
import {
  getStatusColor,
  getPriorityColor,
  getTeamMember,
} from "../../utils/projectHelpers";
import { teamMembers } from "../../api/mocks/project";

/**
 * ProjectCard Component - Displays a single project card
 * Supports both grid and list view modes
 * Clickable to navigate to project tasks
 */
const ProjectCard = ({ project, viewMode }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/tasks/${project.id}`);
  };
  if (viewMode === "list") {
    return (
      <div
        onClick={handleCardClick}
        className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-4 flex-1">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: project.color }}
          >
            {project.code}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-slate-500 line-clamp-1">
              {project.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/team/${project.id}`);
            }}
            className="text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            View Team
          </button>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(
              project.status,
            )}`}
          >
            {project.status}
          </span>
          <div className="w-32">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-600">
                {project.tasksCompleted}/{project.tasksTotal}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{
                  width: `${(project.tasksCompleted / project.tasksTotal) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="flex -space-x-2">
            {project.members.slice(0, 3).map((memberId) => {
              const member = getTeamMember(memberId, teamMembers);
              return member ? (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={member.initials}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  title={member.name}
                />
              ) : null;
            })}
            {project.extraMembersCount > 0 && (
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                +{project.extraMembersCount}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-slate-200 rounded-lg overflow-hidden card-hover group cursor-pointer"
    >
      <div className="h-2" style={{ backgroundColor: project.color }}></div>

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-700 rounded">
                {project.code}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(
                  project.status,
                )}`}
              >
                {project.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-3 group-hover:text-blue-600 transition-colors line-clamp-2">
              {project.name}
            </h3>
          </div>
          {project.isCritical && (
            <div className="flex-shrink-0 flex items-center gap-1 bg-red-50 px-2 py-1 rounded">
              <span className="text-red-600 font-bold text-xl">●</span>
              <span className="text-xs font-semibold text-red-600">
                Critical
              </span>
            </div>
          )}
        </div>

        <p className="text-sm text-slate-600 line-clamp-2">
          {project.description}
        </p>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">
              Tasks: {project.tasksCompleted || 0}/{project.tasksTotal || 0}
            </span>
            <span
              className={`text-xs font-bold ${
                project.isDelayed ? "text-red-600" : "text-slate-500"
              }`}
            >
              {project.dueDateLabel}
            </span>
          </div>
          
          <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                project.status === 'DONE' ? 'bg-emerald-500' : 'bg-blue-500'
              }`}
              style={{ width: `${project.progress || 0}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Priority:</span>
              <span className={`text-xs font-black ${getPriorityColor(project.priority)}`}>
                {project.priority}
              </span>
            </div>
            <div className="flex items-center -space-x-2">
              {project.members.slice(0, 3).map((memberId) => {
                const member = getTeamMember(memberId, teamMembers);
                return member ? (
                  <img
                    key={member.id}
                    src={member.avatar}
                    alt={member.initials}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                    title={member.name}
                  />
                ) : null;
              })}
              {project.extraMembersCount > 0 && (
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                  +{project.extraMembersCount}
                </div>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/team/${project.id}`);
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View Team →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
