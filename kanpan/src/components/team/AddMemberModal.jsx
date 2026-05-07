import { useState } from "react";
import { useBoardState } from "../../context/BoardContext";
import Portal from "../common/Portal";

/**
 * AddMemberModal - adds existing team members to a project
 * Uses Portal to avoid z-index stacking issues.
 * Reads project data from the normalized BoardContext state (O(1)).
 */
const AddMemberModal = ({ projectId, availableMembers, onClose, onAdd }) => {
  const state = useBoardState();
  const [selectedMembers, setSelectedMembers] = useState(new Set());

  // O(1) project lookup from normalized map
  const project = state.projects[projectId] || null;

  const handleMemberToggle = (memberId) => {
    const next = new Set(selectedMembers);
    if (next.has(memberId)) {
      next.delete(memberId);
    } else {
      next.add(memberId);
    }
    setSelectedMembers(next);
  };

  const handleAddMembers = () => {
    if (selectedMembers.size > 0) {
      onAdd(Array.from(selectedMembers));
      setSelectedMembers(new Set());
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
                Add Members to {project?.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Select members to add to this project
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
            {availableMembers.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500 text-sm">
                  All team members are already part of this project
                </p>
              </div>
            ) : (
              <div className="space-y-2 border border-gray-200 rounded-lg p-3 bg-gray-50">
                {availableMembers.map((member) => (
                  <label
                    key={member.id}
                    className="flex items-start gap-3 p-2 hover:bg-white rounded cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMembers.has(member.id)}
                      onChange={() => handleMemberToggle(member.id)}
                      className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                          {member.initials}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {member.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
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
              onClick={handleAddMembers}
              disabled={selectedMembers.size === 0}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add {selectedMembers.size > 0 && `(${selectedMembers.size})`}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default AddMemberModal;
