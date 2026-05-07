import { navbarProfile, navbarSearchPlaceholder } from "../../constants/layout";

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200 px-8 py-3">
      <div className="flex items-center justify-between max-w-400 mx-auto">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative group w-96">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 group-focus-within:text-primary transition-colors">
              🔍
            </span>
            <input
              type="text"
              placeholder={navbarSearchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl transition-colors relative group">
            <span className="text-xl">🔔</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>

          <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl transition-colors">
            <span className="text-xl">📅</span>
          </button>

          <div className="h-8 w-px bg-slate-200 mx-2"></div>

          <div className="flex items-center gap-3 pr-2 group cursor-pointer">
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-800 leading-none">
                {navbarProfile.name}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {navbarProfile.role}
              </p>
            </div>
            <div className="w-10 h-10 bg-linear-to-tr from-primary to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              {navbarProfile.initials}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
