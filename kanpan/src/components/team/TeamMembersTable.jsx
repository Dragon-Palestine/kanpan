import MemberAvatar from "./MemberAvatar";
import { TableRowSkeleton } from "../common/Skeleton";

const TeamMembersTable = ({
  members,
  onAssignTask,
  getAvailabilityColor,
  getAvailabilityDotColor,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Member Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Active Tasks
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Workload
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Availability
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              [1, 2, 3, 4].map((i) => (
                <tr key={i}>
                  <td colSpan="6">
                    <TableRowSkeleton />
                  </td>
                </tr>
              ))
            ) : (
              members.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* ... rest of the row code ... */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <MemberAvatar member={member} size="md" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                      {member.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
                      {member.activeTasks}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 w-32">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            member.workloadPercent <= 50
                              ? "bg-emerald-500"
                              : member.workloadPercent <= 80
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${member.workloadPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600 w-8">
                        {member.workloadPercent}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`${getAvailabilityDotColor(member.availability)} w-2 h-2 rounded-full`}
                      />
                      <span
                        className={`text-sm font-medium ${getAvailabilityColor(member.availability)}`}
                      >
                        {member.availability}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => onAssignTask(member.id)}
                      className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Assign Task
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * 4 + 1} of{" "}
          {(currentPage - 1) * 4 + members.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMembersTable;
