import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: "📈" },
  { path: "/projects", label: "Projects", icon: "📋" },
  { path: "/team", label: "Team", icon: "👥" },
  { path: "/settings", label: "Settings", icon: "⚙️" },
];

const Sidebar = () => {
  return (
    <aside className="w-sidebar bg-white border-r border-slate-200 flex flex-col shadow-sm z-10">
      <div className="p-6">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-white text-xl font-bold">K</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Kanpan
          </h2>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <span className="text-xl group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase mb-2">
            Workspace
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
              DP
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">Design Team</p>
              <p className="text-xs text-slate-400">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
