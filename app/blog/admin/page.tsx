'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { BlogPost } from '@/lib/blog';

export default function AdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!username.trim() || !password.trim()) {
      setAuthError('Please enter both username and password');
      return;
    }

    try {
      const response = await fetch('/api/blog', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Authentication failed');
      }

      // Store credentials in localStorage for API requests
      localStorage.setItem('blog_admin_username', username);
      localStorage.setItem('blog_admin_password', password);
      
      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
      
      // Clear password from memory after successful login
      setTimeout(() => {
        setPassword('');
      }, 0);
    } catch (err) {
      console.error('Login error:', err);
      setAuthError('Invalid username or password');
      setPassword('');
    }
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter(post => post.slug !== slug));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          {authError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 mb-6">
              {authError}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--secondary)] transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
        <div className="flex space-x-4">
          <Link href="/blog" className="px-4 py-2 border border-[var(--border-color)] rounded-md hover:bg-[var(--light-bg)] transition-colors">
            Back to Blog
          </Link>
          <Link href="/blog/admin/new" className="px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--secondary)] transition-colors">
            Create New Post
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p>Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-[var(--border-color)] rounded-lg">
          <h3 className="text-xl font-medium mb-2">No posts yet</h3>
          <p className="text-[var(--muted)] mb-4">Create your first blog post to get started!</p>
          <Link href="/blog/admin/new" className="px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--secondary)] transition-colors">
            Create New Post
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--light-bg)] border-b border-[var(--border-color)]">
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug} className="border-b border-[var(--border-color)] hover:bg-[var(--light-bg)]">
                  <td className="px-4 py-3">
                    <Link href={`/blog/${post.slug}`} className="text-[var(--primary)] hover:underline">
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{post.author}</td>
                  <td className="px-4 py-3">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/blog/admin/edit/${post.slug}`} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}