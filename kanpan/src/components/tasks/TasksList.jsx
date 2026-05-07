import TaskCard from "./TaskCard";

/**
 * Tasks list container with empty state
 * Renders all tasks for a project or shows empty state message
 */
const TasksList = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 bg-slate-50 rounded-lg border border-dashed border-slate-200">
        <div className="text-center">
          <p className="text-slate-500">No tasks found for this project</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksList;
