import ProjectCard from "./ProjectCard";

/**
 * ProjectsList Component - Displays projects in grid or list view
 */
const ProjectsList = ({ projects, viewMode }) => {
  if (projects.length > 0) {
    return (
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-16 bg-slate-50 rounded-lg border border-dashed border-slate-200">
      <div className="text-center">
        <p className="text-slate-500">No projects found</p>
      </div>
    </div>
  );
};

export default ProjectsList;
