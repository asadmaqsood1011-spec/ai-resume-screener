export default function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  };

  return (
    <div
      className={`${sizes[size] || sizes.md} rounded-full border-slate-600 border-t-indigo-400 animate-spin`}
      role="status"
      aria-label="Loading"
    />
  );
}
