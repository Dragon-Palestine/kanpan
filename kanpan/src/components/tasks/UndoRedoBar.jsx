import { memo, useCallback } from "react";

/**
 * UndoRedoBar - Displays the undo/redo controls and history counter
 * Memoized to only re-render when canUndo/canRedo changes.
 */
const UndoRedoBar = memo(({ canUndo, canRedo, historySize, onUndo, onRedo }) => {
  if (!canUndo && !canRedo) return null;

  return (
    <div className="flex items-center gap-2 px-1">
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          title={`Undo (${historySize} moves available)`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          Undo
        </button>

        {historySize > 0 && (
          <span className="text-xs text-slate-400 px-1 font-mono">{historySize}</span>
        )}

        <div className="w-px h-5 bg-slate-200" />

        <button
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          Redo
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
          </svg>
        </button>
      </div>

      <span className="text-xs text-slate-400 font-medium">
        Last {historySize} move{historySize !== 1 ? "s" : ""} saved
      </span>
    </div>
  );
});

UndoRedoBar.displayName = "UndoRedoBar";

export default UndoRedoBar;
