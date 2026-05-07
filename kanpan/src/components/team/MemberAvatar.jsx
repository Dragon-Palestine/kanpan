const MemberAvatar = ({ member, size = "md", showName = false }) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold flex items-center justify-center flex-shrink-0`}
        title={member.name}
      >
        {member.initials}
      </div>
      {showName && (
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900">{member.name}</div>
          <div className="text-xs text-gray-500">{member.email}</div>
        </div>
      )}
    </div>
  );
};

export default MemberAvatar;
