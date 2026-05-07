/**
 * Base Skeleton component for loading states
 * Provides a customizable shimmer effect container
 */
const Skeleton = ({ className = "", width, height, borderRadius = "0.5rem" }) => {
  const style = {
    width: width || "100%",
    height: height || "1rem",
    borderRadius,
  };

  return (
    <div 
      className={`skeleton ${className}`} 
      style={style}
      aria-hidden="true"
    />
  );
};

/**
 * Skeleton for Project Cards
 */
export const ProjectCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <Skeleton width="2.5rem" height="2.5rem" borderRadius="0.75rem" />
        <div className="space-y-2">
          <Skeleton width="8rem" height="1rem" />
          <Skeleton width="4rem" height="0.75rem" />
        </div>
      </div>
      <Skeleton width="1.5rem" height="1.5rem" />
    </div>
    <Skeleton height="3rem" />
    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
      <div className="flex -space-x-2">
        {[1, 2, 3].map(i => <Skeleton key={i} width="1.5rem" height="1.5rem" borderRadius="9999px" />)}
      </div>
      <Skeleton width="5rem" height="1.5rem" borderRadius="9999px" />
    </div>
  </div>
);

/**
 * Skeleton for Task Cards
 */
export const TaskCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-3">
    <Skeleton width="4rem" height="1.25rem" borderRadius="9999px" />
    <Skeleton height="1rem" />
    <Skeleton height="0.75rem" width="80%" />
    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
      <Skeleton width="1.5rem" height="1.5rem" borderRadius="9999px" />
      <Skeleton width="3rem" height="1rem" />
    </div>
  </div>
);

/**
 * Skeleton for Table Rows (Team Page)
 */
export const TableRowSkeleton = () => (
  <div className="flex items-center gap-4 py-4 px-6 border-b border-slate-50">
    <Skeleton width="2.5rem" height="2.5rem" borderRadius="9999px" />
    <div className="flex-1 space-y-2">
      <Skeleton width="10rem" height="1rem" />
      <Skeleton width="6rem" height="0.75rem" />
    </div>
    <Skeleton width="5rem" height="1rem" />
    <Skeleton width="4rem" height="1rem" />
    <Skeleton width="2rem" height="2rem" borderRadius="0.5rem" />
  </div>
);

export default Skeleton;
