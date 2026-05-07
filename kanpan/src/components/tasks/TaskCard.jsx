import {
  getStatusBadgeColor,
  getPriorityBadgeColor,
  getTeamMember,
  formatStatusText,
} from "../../utils/taskHelpers";

/**
 * Individual task card component
 * Displays task details: status, priority, assignees, tags, hours, etc.
 */
const TaskCard = ({ task }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-card transition-all cursor-pointer group">
      <div className="flex items-start gap-4">
        <div className="shrink-0 pt-1">
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-slate-300 cursor-pointer"
            defaultChecked={task.status === "done"}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                {task.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                {task.description}
              </p>
            </div>
          </div>

          {task.tags && task.tags.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {task.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <span className="font-medium">ID: {task.id}</span>
            {task.estimatedHours && <span>Est: {task.estimatedHours}h</span>}
            {task.loggedHours > 0 && <span>Logged: {task.loggedHours}h</span>}
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="flex gap-2">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusBadgeColor(
                task.status,
              )}`}
            >
              {formatStatusText(task.status)}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityBadgeColor(
                task.priority,
              )}`}
            >
              {task.priority}
            </span>
          </div>

          {task.assignees && task.assignees.length > 0 && (
            <div className="flex -space-x-2">
              {task.assignees.slice(0, 3).map((memberId) => {
                const member = getTeamMember(memberId);
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
              {task.assignees.length > 3 && (
                <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                  +{task.assignees.length - 3}
                </div>
              )}
            </div>
          )}

          {task.commentsCount > 0 && (
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>💬</span>
              <span>{task.commentsCount}</span>
            </div>
          )}

          {task.dueDateLabel && (
            <div className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
              {task.dueDateLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
