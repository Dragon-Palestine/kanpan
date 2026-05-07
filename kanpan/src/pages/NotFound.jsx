import { useNavigate } from "react-router-dom";

/**
 * NotFound Page - fallback for undefined routes
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="text-9xl font-black text-slate-100 select-none">404</div>
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Oops! Page Not Found
        </h1>
        <p className="text-slate-500 font-medium max-w-md">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
      <button
        onClick={() => navigate("/dashboard")}
        className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
