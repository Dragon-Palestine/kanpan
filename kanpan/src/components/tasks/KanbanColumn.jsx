import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { memo } from "react";
import KanbanCard from "./KanbanCard";
import { TaskCardSkeleton } from "../common/Skeleton";
import { kanbanColumns, taskPageCopy } from "../../constants/tasks";

/**
 * Kanban column component - memoized to prevent re-renders from sibling columns.
 */
const KanbanColumn = memo(({ status, tasks = [], onUpdateAssignees, onTaskClick, isLoading }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${status}`,
    data: { status },
  });

  const info = kanbanColumns[status];
  const taskIds = tasks.map((task) => task.id);

  return (
    <div className="flex flex-col bg-slate-50 rounded-lg p-4 min-w-80 max-w-96 h-full">
      <div className="mb-4 pb-3 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">{info.label}</h3>
          <span
            className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${info.badgeClass}`}
          >
            {tasks.length}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 space-y-3 rounded-lg transition-all ${
          isOver ? `${info.highlightClass} p-2` : "p-0"
        } min-h-96`}
      >
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <TaskCardSkeleton key={i} />)}
          </div>
        ) : (
          <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <KanbanCard
                  key={task.id}
                  task={task}
                  onUpdateAssignees={onUpdateAssignees}
                  onTaskClick={onTaskClick}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full py-8">
                <p className="text-sm text-slate-400 text-center">
                  {taskPageCopy.emptyBoardMessage}
                </p>
              </div>
            )}
          </SortableContext>
        )}
      </div>
    </div>
  );
});

KanbanColumn.displayName = "KanbanColumn";

export default KanbanColumn;
