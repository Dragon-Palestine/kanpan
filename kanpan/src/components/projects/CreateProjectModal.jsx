import { useState } from "react";
import Portal from "../common/Portal";

/**
 * CreateProjectModal - form to create a new project
 */
const CreateProjectModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    const newProject = {
      id: `PRJ-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      code: code.trim().toUpperCase(),
      description: description.trim(),
      status: "DRAFTING",
      members: [], // Initial member list
      progress: 0,
      createdAt: new Date().toISOString(),
    };

    onAdd(newProject);
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
              <h2 className="text-xl font-black text-slate-900">Create New Project</h2>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Start a new collaboration</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-200/50 text-slate-400 hover:text-slate-900 transition-all"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {/* Name */}
              <div className="col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Project Name
                </label>
                <input
                  autoFocus
                  type="text"
                  placeholder="e.g. Website Redesign"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-medium"
                  required
                />
              </div>

              {/* Code */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Code
                </label>
                <input
                  type="text"
                  placeholder="WRD"
                  value={code}
                  maxLength={5}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-medium text-center uppercase"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                Description
              </label>
              <textarea
                placeholder="What is this project about?"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-medium resize-none"
              />
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
                disabled={!name.trim() || !code.trim()}
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};

export default CreateProjectModal;
