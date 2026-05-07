import { useBoardState, useBoardDispatch } from "../../context/BoardContext";
import { REMOVE_TOAST } from "../../context/boardActions";
import Portal from "./Portal";

/**
 * Individual Toast component
 */
const Toast = ({ id, message, type }) => {
  const dispatch = useBoardDispatch();

  const handleClose = () => {
    dispatch({ type: REMOVE_TOAST, payload: { id } });
  };

  const typeStyles = {
    success: "bg-emerald-500 border-emerald-600",
    error: "bg-red-500 border-red-600",
    info: "bg-indigo-500 border-indigo-600",
  };

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-white font-medium animate-in slide-in-from-right-full duration-300 pointer-events-auto ${typeStyles[type] || typeStyles.info}`}
    >
      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 text-sm">
        {icons[type] || icons.info}
      </span>
      <span className="text-sm">{message}</span>
      <button
        onClick={handleClose}
        className="ml-2 hover:bg-white/20 w-6 h-6 rounded-lg transition-colors flex items-center justify-center"
      >
        ✕
      </button>
    </div>
  );
};

/**
 * ToastContainer - manages the stack of toasts
 * Rendered globally in BoardProvider via Portal
 */
const ToastContainer = () => {
  const { toasts = [] } = useBoardState();

  if (toasts.length === 0) return null;

  return (
    <Portal>
      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none max-w-xs w-full">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </Portal>
  );
};

export default ToastContainer;
