import { useState } from "react";
import { getTeamMember } from "../../utils/taskHelpers";
import { teamMembers as allTeamMembers } from "../../api/mocks/project";
import { useBoardState } from "../../context/BoardContext";
import Portal from "../common/Portal";

const TaskDetailModal = ({ task, onClose, onUpdateAssignees, onUpdateTask, onDeleteTask }) => {
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task?.title || "");
  const [editedDescription, setEditedDescription] = useState(task?.description || "");

  if (!task) return null;

  const state = useBoardState();
  const project = state.projects[task.projectId] || null;
  const projectMemberIds = project?.members || [];
  const projectMembers = allTeamMembers.filter((m) => projectMemberIds.includes(m.id));

  const assignedMembers = allTeamMembers.filter((m) =>
    task.assignees?.includes(m.id),
  );

  const unassignedProjectMembers = projectMembers.filter(
    (m) => !task.assignees?.includes(m.id),
  );

  const handleSave = () => {
    if (onUpdateTask) {
      onUpdateTask(task.id, {
        title: editedTitle,
        description: editedDescription,
      });
    }
    setIsEditing(false);
  };

  const handleAddMember = (memberId) => {
    const newAssignees = [...(task.assignees || []), memberId];
    if (onUpdateAssignees) {
      onUpdateAssignees(task.id, newAssignees, task.projectId);
    }
    setIsAddingMember(false);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      URGENT: "bg-red-100 text-red-700 border-red-200",
      HIGH: "bg-orange-100 text-orange-700 border-orange-200",
      MEDIUM: "bg-blue-100 text-blue-700 border-blue-200",
      LOW: "bg-slate-100 text-slate-700 border-slate-200",
    };
    return colors[priority] || colors.LOW;
  };

  return (
    <Portal>
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-2xl">
              📋
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>{project?.name || "Project"}</span>
                <span>/</span>
                <span>{task.id}</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-2xl font-bold text-slate-900 mt-1 bg-white border border-slate-200 rounded-lg px-2 py-1 w-full focus:ring-2 focus:ring-slate-900 outline-none"
                  autoFocus
                />
              ) : (
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {task.title}
                </h2>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-sm"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Task
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-4">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Description
                </div>
                {isEditing ? (
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    rows={4}
                    className="w-full text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none resize-none"
                    placeholder="Enter task description..."
                  />
                ) : (
                  <p className="text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    {task.description || "No description provided."}
                  </p>
                )}
              </section>

              {/* Time Tracking */}
              <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Time Tracking
                  </div>
                  <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <span>+</span> Log Time
                  </button>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                  <span>Estimated: {task.estimatedHours || "0"}h</span>
                  <span>Logged: {task.loggedHours || "0"}h</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-slate-900 h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(100, ((task.loggedHours || 0) / (task.estimatedHours || 1)) * 100)}%` 
                    }}
                  ></div>
                </div>
                {task.timeEntries && task.timeEntries.length > 0 && (
                  <div className="flex gap-4 mt-6">
                    {task.timeEntries.slice(0, 3).map((entry, idx) => {
                      const member = getTeamMember(entry.userId);
                      return member ? (
                        <div key={idx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100 flex-1 min-w-0">
                          <img src={member.avatar} className="w-6 h-6 rounded-full" alt="" />
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold text-slate-900 truncate">{member.name}</div>
                            <div className="text-[9px] text-slate-500">Logged {entry.hours}h</div>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </section>

              {/* Activity History */}
              <section>
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-6">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Activity History
                </div>
                <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {task.activityLog && task.activityLog.length > 0 ? (
                    task.activityLog.map((log, idx) => {
                      const member = getTeamMember(log.userId);
                      return (
                        <div key={log.id || idx} className="relative pl-8">
                          <div className={`absolute left-0 top-1.5 w-4 h-4 bg-white border-2 rounded-full z-10 ${idx === 0 ? "border-slate-900 shadow-sm" : "border-slate-200"}`}></div>
                          <div className="text-sm">
                            <span className="font-bold text-slate-900">{member?.name || "System"}</span>
                            <span className="text-slate-500 mx-2">{log.action}</span>
                            {log.target && (
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-bold uppercase tracking-tight">
                                {log.target}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 font-bold mt-1 uppercase">
                            {new Date(log.date).toLocaleDateString()} • {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-slate-400 text-sm italic pl-8">No activity recorded yet.</div>
                  )}
                </div>
              </section>
            </div>

            {/* Right Column: Metadata */}
            <div className="space-y-8">
              {/* Priority */}
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Priority</h4>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-black uppercase ${getPriorityColor(task.priority)}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {task.priority || "MEDIUM"}
                </div>
              </div>

              {/* Deadline */}
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Deadline</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{task.dueDateLabel || "No deadline"}</div>
                    {task.dueDateLabel && !task.dueDateLabel.includes("Completed") && (
                      <div className="text-[10px] font-bold text-red-500 uppercase">Active Deadline</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Assigned Members */}
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Assigned Members</h4>
                <div className="space-y-3 mb-4">
                  {assignedMembers.map(member => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={member.avatar} className="w-8 h-8 rounded-full border border-slate-200" alt="" />
                        <div>
                          <div className="text-sm font-bold text-slate-900">{member.name}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{member.role}</div>
                        </div>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${member.availability === "Available" ? "bg-emerald-500" : "bg-slate-300"}`}></div>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsAddingMember(!isAddingMember)}
                    className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-slate-300 hover:text-slate-600 transition-all flex items-center justify-center gap-2 font-bold text-sm"
                  >
                    <span className="text-lg">+</span> Add Member
                  </button>

                  {isAddingMember && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden max-h-60 overflow-y-auto">
                      {unassignedProjectMembers.length > 0 ? (
                        unassignedProjectMembers.map((member) => (
                          <button
                            key={member.id}
                            onClick={() => handleAddMember(member.id)}
                            className="w-full px-4 py-2 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left"
                          >
                            <img
                              src={member.avatar}
                              className="w-6 h-6 rounded-full"
                              alt=""
                            />
                            <div>
                              <div className="text-sm font-bold text-slate-900">
                                {member.name}
                              </div>
                              <div className="text-[10px] text-slate-500 uppercase">
                                {member.role}
                              </div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-xs text-slate-500 text-center italic">
                          All project members are already assigned
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {task.tags?.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
                      {tag}
                    </span>
                  ))}
                  <button className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 border border-slate-100 flex items-center justify-center hover:bg-slate-100 transition-colors">
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-8 border-t border-slate-100">
                {onDeleteTask && (
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="flex items-center gap-3 text-slate-400 hover:text-red-500 transition-colors font-bold text-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Task
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex gap-6">
            <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">
              <span>💬</span> {task.commentsCount || 0} Comments
            </button>
            <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">
              <span>📎</span> {task.attachments?.length || 0} Attachments
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 text-slate-900 font-black uppercase text-xs tracking-widest hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    </Portal>
  );
};

export default TaskDetailModal;
