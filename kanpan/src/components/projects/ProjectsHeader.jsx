import { projectsPageCopy } from "../../constants/projects";

/**
 * ProjectsHeader Component - Header section with title and new project button
 */
const ProjectsHeader = ({ projectsCount, onNewProject }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {projectsPageCopy.title}
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            {projectsPageCopy.descriptionPrefix} {projectsCount} active projects
          </p>
        </div>
        <button 
          onClick={onNewProject}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsHeader;
