'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--light-bg)] text-[var(--text-color)]">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/90 border-b border-[var(--border-color)] py-4 shadow-sm">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link href="/">
              <span className="gradient-text">DevOps</span>
              <span className="text-[var(--text-color)]">Portfolio</span>
            </Link>
          </h1>
          <nav className="flex items-center gap-4">
            <Link href="/blog/admin/new" className="btn btn-primary">
              New Post
            </Link>
            <Link href="/" className="text-[var(--text-color)] hover:text-[var(--primary)]">
              View Site
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Blog Admin</h2>
          <div className="text-sm text-[var(--muted)]">
            Welcome, {session.user?.name}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/blog/admin/new" className="p-6 border-2 border-dashed border-[var(--border-color)] rounded-lg hover:border-[var(--primary)] transition-colors flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)] mb-2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span className="text-lg font-medium">Create New Post</span>
          </Link>
        </div>
      </main>
    </div>
  );
}