import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTeamData } from "../hooks/useTeamData";
import { useProjects } from "../hooks/useProjects";
import TeamStats from "../components/team/TeamStats";
import TeamMembersTable from "../components/team/TeamMembersTable";
import TaskAssignmentModal from "../components/team/TaskAssignmentModal";
import AddMemberModal from "../components/team/AddMemberModal";
import NoProjectSelectedTeam from "../components/team/NoProjectSelectedTeam";

const Team = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projectsData } = useProjects();
  const project = projectId ? projectsData.find((p) => p.id === projectId) : null;

  const {
    teamMembers,
    allTeamMembers,
    availableMembersToAdd,
    teamStats,
    currentPage,
    totalPages,
    setCurrentPage,
    getAvailabilityColor,
    getAvailabilityDotColor,
    assignTaskToMember,
    removeTaskFromMember,
    addMemberToProject,
    isLoading,
  } = useTeamData(projectId);

  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedMemberName, setSelectedMemberName] = useState("");
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const handleAssignTask = (memberId) => {
    const member = teamMembers.find((m) => m.id === memberId);
    setSelectedMemberId(memberId);
    setSelectedMemberName(member?.name || "Team Member");
    setShowAssignmentModal(true);
  };

  const handleAssignTasksToMember = (memberId, taskIds, projectIdForTask) => {
    taskIds.forEach((taskId) => {
      assignTaskToMember(memberId, taskId, projectIdForTask);
    });
  };

  const handleAddMembers = (memberIds) => {
    memberIds.forEach((memberId) => {
      addMemberToProject(memberId);
    });
    setShowAddMemberModal(false);
  };

  // Show empty state if no project is selected
  if (!projectId) {
    return <NoProjectSelectedTeam />;
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate("/team")}
              className="text-gray-600 hover:text-gray-900 font-semibold"
            >
              ← Back
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {project?.name} - Team
          </h1>
          <p className="text-gray-600 mt-2">
            Manage team members and assignments for this project.
          </p>
        </div>

        {/* Stats */}
        <TeamStats stats={teamStats} />

        {/* Header with Export Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Project Members ({allTeamMembers.length})
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddMemberModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
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
              Add Member
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export Report
            </button>
          </div>
        </div>

        {/* Members Table */}
        <TeamMembersTable
          members={teamMembers}
          onAssignTask={handleAssignTask}
          getAvailabilityColor={getAvailabilityColor}
          getAvailabilityDotColor={getAvailabilityDotColor}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      </div>

      {/* Assignment Modal */}
      {showAssignmentModal && (
        <TaskAssignmentModal
          memberId={selectedMemberId}
          memberName={selectedMemberName}
          projectId={projectId}
          onClose={() => setShowAssignmentModal(false)}
          onAssign={handleAssignTasksToMember}
        />
      )}

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <AddMemberModal
          projectId={projectId}
          availableMembers={availableMembersToAdd}
          onClose={() => setShowAddMemberModal(false)}
          onAdd={handleAddMembers}
        />
      )}
    </div>
  );
};

export default Team;
