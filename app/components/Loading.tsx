'use client';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--primary)]/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-[var(--muted)]">Loading...</p>
      </div>
    </div>
  );
} 