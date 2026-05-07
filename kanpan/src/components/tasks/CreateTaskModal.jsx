import { useState } from "react";
import Portal from "../common/Portal";

/**
 * CreateTaskModal - form to create a new task
 */
const CreateTaskModal = ({ projectId, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: `TASK-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      description: description.trim(),
      priority,
      status: "todo",
      projectId,
      assignees: [],
      createdAt: new Date().toISOString(),
    };

    onAdd(newTask);
    onClose();
  };

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in slide-in-from-bottom-8 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-xl font-black text-slate-900">Create New Task</h2>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Add a task to the backlog</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-200/50 text-slate-400 hover:text-slate-900 transition-all"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                Task Title
              </label>
              <input
                autoFocus
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-medium"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                Description
              </label>
              <textarea
                placeholder="Add more details..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-medium resize-none"
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                Priority
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["URGENT", "HIGH", "MEDIUM", "LOW"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all border-2 ${
                      priority === p
                        ? "bg-slate-900 border-slate-900 text-white shadow-md"
                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-slate-400 hover:text-slate-900 font-black uppercase text-xs tracking-widest transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                disabled={!title.trim()}
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};

export default CreateTaskModal;
