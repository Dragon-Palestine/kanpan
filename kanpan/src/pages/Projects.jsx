import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectControls from "../components/projects/ProjectControls";
import ProjectsList from "../components/projects/ProjectsList";
import CreateProjectModal from "../components/projects/CreateProjectModal";
import { ProjectCardSkeleton } from "../components/common/Skeleton";

/**
 * Projects Page - Main projects management page
 * Displays projects in grid or list view with filtering and sorting
 */
const Projects = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const {
    projectsData,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    isLoading,
    addProject,
  } = useProjects();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <ProjectsHeader 
        projectsCount={projectsData.length} 
        onNewProject={() => setShowCreateModal(true)}
      />

      {/* Controls Section */}
      <ProjectControls
        viewMode={viewMode}
        setViewMode={setViewMode}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Projects List/Grid */}
      {isLoading ? (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
          {[1, 2, 3, 4, 5, 6].map(i => <ProjectCardSkeleton key={i} />)}
        </div>
      ) : (
        <ProjectsList projects={projectsData} viewMode={viewMode} />
      )}

      {/* Create Project Modal - via Portal */}
      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onAdd={addProject}
        />
      )}
    </div>
  );
};

export default Projects;
