import { memo, useCallback } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";

/**
 * KanbanBoard - memoized board container
 * Manages DnD across columns. Each column is independently memoized.
 */
const KanbanBoard = memo(({
  tasksByStatus,
  onTaskMove,
  onUpdateAssignees,
  onTaskClick,
  isLoading,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id;
      const overId = over.id;

      // Find status of the 'over' container or the 'over' item
      let overStatus = "";
      let overTaskId = null;

      if (over.data?.current?.type === "Column") {
        // Dropped over an empty column or column header
        overStatus = over.id.toString().replace("column-", "");
      } else {
        // Dropped over a task card
        const overTask = over.data?.current?.task;
        if (overTask) {
          overStatus = overTask.status;
          overTaskId = overId;
        } else {
          // Fallback
          overStatus = overId.toString().includes("column-") 
            ? overId.toString().replace("column-", "")
            : "";
        }
      }

      if (overStatus && (activeId !== overId)) {
        onTaskMove(activeId, overStatus, overTaskId);
      }
    },
    [onTaskMove],
  );

  const columns = ["todo", "in-progress", "review", "done"];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-4 min-h-screen">
        {columns.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasksByStatus[status]}
            onUpdateAssignees={onUpdateAssignees}
            onTaskClick={onTaskClick}
            isLoading={isLoading}
          />
        ))}
      </div>
    </DndContext>
  );
});

KanbanBoard.displayName = "KanbanBoard";

export default KanbanBoard;
