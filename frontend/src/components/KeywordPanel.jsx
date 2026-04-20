export default function KeywordPanel({ matched = [], missing = [] }) {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-base">🔑</span>
        <h2 className="text-sm font-semibold text-slate-200">Keyword Analysis</h2>
        <span className="ml-auto text-xs text-slate-500">
          {matched.length} matched · {missing.length} missing
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Matched */}
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
              Matched ({matched.length})
            </h3>
          </div>
          {matched.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No matching keywords found.</p>
          ) : (
            <ul className="space-y-1.5">
              {matched.map((kw, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                  <span>{kw}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Missing */}
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wide">
              Missing ({missing.length})
            </h3>
          </div>
          {missing.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No missing keywords — great coverage!</p>
          ) : (
            <ul className="space-y-1.5">
              {missing.map((kw, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                  <span>{kw}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
