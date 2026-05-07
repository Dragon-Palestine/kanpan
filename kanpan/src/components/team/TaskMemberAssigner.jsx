import { useState } from "react";
import { useBoardState } from "../../context/BoardContext";
import { teamMembers as allTeamMembers } from "../../api/mocks/project";

const TaskMemberAssigner = ({
  taskId,
  projectId,
  currentAssignees = [],
  onAddMember,
  onRemoveMember,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // O(1) lookup from normalized state
  const state = useBoardState();
  const project = state.projects[projectId] || null;
  const projectMemberIds = new Set(project?.members || []);

  const projectMembers = allTeamMembers.filter((m) =>
    projectMemberIds.has(m.id),
  );

  const assignedMembers = projectMembers.filter((m) =>
    currentAssignees.includes(m.id),
  );
  const unassignedMembers = projectMembers.filter(
    (m) =>
      !currentAssignees.includes(m.id) &&
      m.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddMember = (memberId) => {
    onAddMember(taskId, memberId, projectId);
    setSearchTerm("");
  };

  const handleRemoveMember = (memberId) => {
    onRemoveMember(taskId, memberId, projectId);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
        title="Add or remove team members"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        {currentAssignees.length > 0 ? `+${currentAssignees.length}` : "Add"}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {/* Current Assignees */}
          {assignedMembers.length > 0 && (
            <div className="border-b border-gray-200 p-3">
              <div className="text-xs font-semibold text-gray-700 mb-2">
                Assigned To:
              </div>
              <div className="space-y-1">
                {assignedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between gap-2 px-2 py-1 bg-indigo-50 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center">
                        {member.initials}
                      </div>
                      <span className="text-sm text-gray-900">
                        {member.name}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-gray-500 hover:text-red-600 text-lg"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Member */}
          <div className="p-3">
            <input
              type="text"
              placeholder="Search member..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-transparent mb-2"
              autoFocus
            />
            {unassignedMembers.length > 0 ? (
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {unassignedMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => handleAddMember(member.id)}
                    className="w-full text-left flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded text-sm transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-gray-400 text-white text-xs font-semibold flex items-center justify-center">
                      {member.initials}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 font-medium">
                        {member.name}
                      </div>
                      <div className="text-xs text-gray-500">{member.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-2 text-sm text-gray-500">
                {searchTerm
                  ? "No members found"
                  : "All members already assigned"}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-200"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskMemberAssigner;
