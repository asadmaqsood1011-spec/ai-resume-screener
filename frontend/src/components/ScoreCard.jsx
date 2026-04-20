function getScoreStyle(score) {
  if (score >= 80) return { color: 'text-emerald-400', ring: 'ring-emerald-500/40', bg: 'bg-emerald-500/10', label: 'Strong Match' };
  if (score >= 60) return { color: 'text-yellow-400', ring: 'ring-yellow-500/40', bg: 'bg-yellow-500/10', label: 'Moderate Match' };
  if (score >= 40) return { color: 'text-orange-400', ring: 'ring-orange-500/40', bg: 'bg-orange-500/10', label: 'Weak Match' };
  return { color: 'text-red-400', ring: 'ring-red-500/40', bg: 'bg-red-500/10', label: 'Poor Match' };
}

export default function ScoreCard({ score, summary }) {
  const style = getScoreStyle(score);

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-base">🎯</span>
        <h2 className="text-sm font-semibold text-slate-200">ATS Fit Score</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Score circle */}
        <div className={`shrink-0 w-24 h-24 rounded-full ring-4 ${style.ring} ${style.bg} flex flex-col items-center justify-center`}>
          <span className={`text-4xl font-black leading-none ${style.color}`}>{score}</span>
          <span className="text-xs text-slate-500 mt-0.5">/ 100</span>
        </div>

        {/* Summary */}
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${style.bg} ${style.color}`}>
            {style.label}
          </span>
          <p className="text-sm text-slate-300 leading-relaxed">{summary}</p>
        </div>
      </div>

      {/* Score bar */}
      <div className="mt-5">
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-yellow-500' : score >= 40 ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-slate-600">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}
