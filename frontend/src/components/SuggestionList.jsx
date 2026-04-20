import { useState } from 'react';

function SuggestionItem({ item, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.improved).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-slate-900/60 rounded-lg border border-slate-700 overflow-hidden">
      <div className="px-4 py-2 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">Bullet #{index + 1}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-500 hover:text-slate-200 transition-colors px-2 py-0.5 rounded hover:bg-slate-700"
        >
          {copied ? '✓ Copied' : 'Copy improved'}
        </button>
      </div>

      <div className="p-4 space-y-3">
        {/* Original */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Before</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed line-through decoration-slate-600">
            {item.original}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-slate-600 text-xs">improved</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        {/* Improved */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">After</span>
          </div>
          <p className="text-sm text-emerald-300 leading-relaxed font-medium">
            {item.improved}
          </p>
        </div>

        {/* Reason */}
        {item.reason && (
          <div className="pt-2 border-t border-slate-700/60">
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="text-slate-400 font-medium">Why: </span>
              {item.reason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SuggestionList({ improvements = [] }) {
  if (!improvements.length) return null;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-base">✨</span>
        <h2 className="text-sm font-semibold text-slate-200">AI-Improved Bullet Points</h2>
        <span className="ml-auto text-xs text-slate-500">{improvements.length} suggestions</span>
      </div>

      <div className="space-y-4">
        {improvements.map((item, i) => (
          <SuggestionItem key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
