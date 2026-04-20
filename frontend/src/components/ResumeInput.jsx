export default function ResumeInput({ value, onChange, disabled }) {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">📋</span>
          <h2 className="text-sm font-semibold text-slate-200">Resume</h2>
        </div>
        <span className="text-xs text-slate-500">{value.length} chars</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Paste your full resume text here...&#10;&#10;Include your work experience, skills, education, and any other relevant sections."
        rows={12}
        className="w-full bg-transparent text-slate-300 placeholder-slate-600 text-sm p-4 resize-none focus:outline-none focus:ring-0 disabled:opacity-50 scrollbar-thin"
      />
    </div>
  );
}
