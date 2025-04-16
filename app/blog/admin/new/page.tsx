'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function NewPost() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          author: session.user?.name || 'Admin',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      router.push('/blog/admin');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            <Link href="/blog/admin" className="text-[var(--text-color)] hover:text-[var(--primary)]">
              Back to Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Create New Post</h2>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-md bg-[var(--background)]"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-64 px-3 py-2 border border-[var(--border-color)] rounded-md bg-[var(--background)]"
                placeholder="Start writing your blog post..."
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--secondary)] transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}