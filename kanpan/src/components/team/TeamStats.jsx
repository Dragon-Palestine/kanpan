const TeamStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Total Members */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Total Members
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <div className="text-3xl font-bold text-gray-900">
            {stats.totalMembers}
          </div>
          <span className="text-sm text-emerald-600 font-medium">
            +{stats.newThisMonth} this month
          </span>
        </div>
      </div>

      {/* Active Tasks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Active Tasks
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <div className="text-3xl font-bold text-gray-900">
            {stats.activeTasks}
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {stats.completionRate}% completion rate
          </span>
        </div>
      </div>

      {/* Project Load */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Project Load
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <div className="text-3xl font-bold text-gray-900">
            {stats.liveBoards}
          </div>
          <span className="text-sm text-gray-600 font-medium">Live boards</span>
        </div>
      </div>

      {/* Avg Workload */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Avg. Workload
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <div className="text-3xl font-bold text-gray-900">
            {stats.avgWorkload}%
          </div>
          <span className="text-sm text-gray-600 font-medium">Capacity</span>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;
