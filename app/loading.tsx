export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a]">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-indigo-100 dark:border-indigo-900 rounded-full" />
        <div className="absolute inset-0 border-4 border-t-indigo-600 rounded-full animate-spin" />
      </div>
      <p className="mt-8 text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest animate-pulse">
        Processing Signals...
      </p>
    </div>
  );
}
