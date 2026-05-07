import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useState, useCallback } from "react";
import { getPriorityBadgeColor, getTeamMember } from "../../utils/taskHelpers";
import TaskMemberAssigner from "../team/TaskMemberAssigner";

/**
 * Individual task card for Kanban board
 * Wrapped in React.memo to prevent re-renders when sibling cards update.
 */
const KanbanCard = memo(({ task, onUpdateAssignees, onTaskClick }) => {
  const [localAssignees, setLocalAssignees] = useState(task.assignees || []);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: task.id,
      data: { task },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    transition: "all 200ms ease",
  };

  const handleAddMember = useCallback((taskId, memberId, projectId) => {
    const newAssignees = [...localAssignees, memberId];
    setLocalAssignees(newAssignees);
    if (onUpdateAssignees) onUpdateAssignees(taskId, newAssignees, projectId);
  }, [localAssignees, onUpdateAssignees]);

  const handleRemoveMember = useCallback((taskId, memberId, projectId) => {
    const newAssignees = localAssignees.filter((id) => id !== memberId);
    setLocalAssignees(newAssignees);
    if (onUpdateAssignees) onUpdateAssignees(taskId, newAssignees, projectId);
  }, [localAssignees, onUpdateAssignees]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onTaskClick && onTaskClick(task)}
      className="bg-white border border-slate-200 rounded-lg p-3 cursor-pointer hover:shadow-md transition-all group relative"
    >
      {/* Drag Handle */}
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute top-2 right-2 p-1 text-slate-300 hover:text-slate-600 cursor-grab active:cursor-grabbing"
        onClick={(e) => e.stopPropagation()}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 11.001 4.001A2 2 0 017 2zm0 6a2 2 0 11.001 4.001A2 2 0 017 8zm0 6a2 2 0 11.001 4.001A2 2 0 017 14zm6-12a2 2 0 11.001 4.001A2 2 0 0113 2zm0 6a2 2 0 11.001 4.001A2 2 0 0113 8zm0 6a2 2 0 11.001 4.001A2 2 0 0113 14z" />
        </svg>
      </div>
      {task.priority && (
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityBadgeColor(
              task.priority,
            )}`}
          >
            {task.priority}
          </span>
        </div>
      )}

      <h4 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {task.title}
      </h4>

      <p className="text-xs text-slate-600 mb-2 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
        <span className="font-medium">{task.id}</span>
        {task.estimatedHours && (
          <span className="text-slate-400">{task.estimatedHours}h</span>
        )}
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex gap-1 mb-2 flex-wrap">
          {task.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {localAssignees && localAssignees.length > 0 ? (
            <div className="flex -space-x-1">
              {localAssignees.slice(0, 2).map((memberId) => {
                const member = getTeamMember(memberId);
                return member ? (
                  <img
                    key={member.id}
                    src={member.avatar}
                    alt={member.initials}
                    className="w-5 h-5 rounded-full border border-white shadow-sm"
                    title={member.name}
                  />
                ) : null;
              })}
              {localAssignees.length > 2 && (
                <div className="w-5 h-5 rounded-full border border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                  +{localAssignees.length - 2}
                </div>
              )}
            </div>
          ) : (
            <div className="w-5 h-5" />
          )}
          <TaskMemberAssigner
            taskId={task.id}
            projectId={task.projectId}
            currentAssignees={localAssignees}
            onAddMember={handleAddMember}
            onRemoveMember={handleRemoveMember}
          />
        </div>

        {task.commentsCount > 0 && (
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <span>💬</span>
            <span>{task.commentsCount}</span>
          </div>
        )}
      </div>

      {task.dueDateLabel && (
        <div className="text-xs text-slate-500 mt-2 font-medium">
          📅 {task.dueDateLabel}
        </div>
      )}
    </div>
  );
});

KanbanCard.displayName = "KanbanCard";

export default KanbanCard;
