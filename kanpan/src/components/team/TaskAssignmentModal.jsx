import { useState } from "react";
import { useBoardState } from "../../context/BoardContext";
import Portal from "../common/Portal";

/**
 * TaskAssignmentModal - assign tasks to a team member
 * Uses Portal to avoid z-index stacking issues.
 * Reads tasks from the normalized BoardContext state (O(1) access).
 */
const TaskAssignmentModal = ({
  memberId,
  memberName,
  projectId,
  onClose,
  onAssign,
}) => {
  const state = useBoardState();

  // Derive projects list from normalized state
  const projectsList = Object.values(state.projects);

  const [selectedProject, setSelectedProject] = useState(
    projectId || projectsList[0]?.id || "",
  );
  const [selectedTasks, setSelectedTasks] = useState(new Set());

  // Get unassigned tasks for the selected project from normalized store (O(1))
  const projectTasks = Object.values(state.tasks).filter(
    (task) =>
      task.projectId === selectedProject &&
      (!task.assignees || !task.assignees.includes(memberId)),
  );

  const handleTaskToggle = (taskId) => {
    const next = new Set(selectedTasks);
    if (next.has(taskId)) {
      next.delete(taskId);
    } else {
      next.add(taskId);
    }
    setSelectedTasks(next);
  };

  const handleAssign = () => {
    if (selectedTasks.size > 0) {
      onAssign(memberId, Array.from(selectedTasks), selectedProject);
      setSelectedTasks(new Set());
      onClose();
    }
  };

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Assign Tasks to {memberName}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {projectId
                  ? "Choose tasks from this project to assign"
                  : "Select a project and choose tasks to assign"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4 max-h-96 overflow-y-auto">
            {/* Project Selection */}
            {!projectId && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => {
                    setSelectedProject(e.target.value);
                    setSelectedTasks(new Set());
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {projectsList.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name} ({project.code})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Tasks List */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Tasks
              </label>
              {projectTasks.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-500 text-sm">
                    No unassigned tasks in this project
                  </p>
                </div>
              ) : (
                <div className="space-y-2 border border-gray-200 rounded-lg p-3 bg-gray-50">
                  {projectTasks.map((task) => (
                    <label
                      key={task.id}
                      className="flex items-start gap-3 p-2 hover:bg-white rounded cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTasks.has(task.id)}
                        onChange={() => handleTaskToggle(task.id)}
                        className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 break-words">
                          {task.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          <span className="font-medium">{task.id}</span>
                          {" • "}
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-white text-xs font-semibold ${
                              task.priority === "URGENT"
                                ? "bg-red-500"
                                : task.priority === "HIGH"
                                  ? "bg-orange-500"
                                  : task.priority === "MEDIUM"
                                    ? "bg-blue-500"
                                    : "bg-gray-500"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={selectedTasks.size === 0}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Assign {selectedTasks.size > 0 && `(${selectedTasks.size})`}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default TaskAssignmentModal;
