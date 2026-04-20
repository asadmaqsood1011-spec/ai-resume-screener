import { useState } from 'react';
import axios from 'axios';
import ResumeInput from './components/ResumeInput';
import JobDescInput from './components/JobDescInput';
import ScoreCard from './components/ScoreCard';
import KeywordPanel from './components/KeywordPanel';
import SuggestionList from './components/SuggestionList';
import LoadingSpinner from './components/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError('Please fill in both the resume and job description fields.');
      return;
    }
    if (resumeText.trim().length < 50) {
      setError('Resume text is too short. Please paste the full resume content.');
      return;
    }
    if (jobDescription.trim().length < 30) {
      setError('Job description is too short. Please paste the full job description.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.post(
        `${API_URL}/api/analyze`,
        { resumeText, jobDescription },
        { timeout: 60000 }
      );
      setResults(response.data);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        (err.code === 'ECONNABORTED'
          ? 'Request timed out. The AI is taking too long — please try again.'
          : 'Unable to connect to the server. Make sure the backend is running.');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
    setResumeText('');
    setJobDescription('');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📄</span>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">AI Resume Screener</h1>
              <p className="text-xs text-slate-400">Powered by GPT-4o</p>
            </div>
          </div>
          {results && (
            <button
              onClick={handleReset}
              className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-slate-700"
            >
              ← Start Over
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-900/40 border border-red-700 text-red-300 flex items-start gap-3">
            <span className="text-red-400 mt-0.5 shrink-0">⚠</span>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            <ResumeInput value={resumeText} onChange={setResumeText} disabled={loading} />
            <JobDescInput value={jobDescription} onChange={setJobDescription} disabled={loading} />

            <button
              onClick={handleAnalyze}
              disabled={loading || !resumeText.trim() || !jobDescription.trim()}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span>Analyze Resume</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Results */}
          <div className="space-y-6">
            {loading && (
              <div className="flex flex-col items-center justify-center h-64 bg-slate-800 rounded-xl border border-slate-700">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-slate-400 text-sm">Running AI analysis...</p>
                <p className="mt-1 text-slate-500 text-xs">This may take 10–20 seconds</p>
              </div>
            )}

            {!loading && !results && !error && (
              <div className="flex flex-col items-center justify-center h-64 bg-slate-800/50 rounded-xl border border-slate-700 border-dashed">
                <span className="text-4xl mb-3 opacity-30">📊</span>
                <p className="text-slate-500 text-sm text-center">
                  Paste your resume and job description,<br />then click Analyze Resume
                </p>
              </div>
            )}

            {results && !loading && (
              <>
                <ScoreCard score={results.score} summary={results.summary} />
                <KeywordPanel
                  matched={results.matchedKeywords}
                  missing={results.missingKeywords}
                />
                <SuggestionList improvements={results.improvements} />
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t border-slate-800 py-6 text-center text-slate-600 text-xs">
        AI Resume Screener — built with React, Node.js &amp; OpenAI GPT-4o
      </footer>
    </div>
  );
}
