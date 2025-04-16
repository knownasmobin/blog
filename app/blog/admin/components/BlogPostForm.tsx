'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type { BlogPost } from '@/app/lib/directus';

type BlogPostFormProps = {
  post?: Partial<BlogPost>;
  isEditing?: boolean;
};

export default function BlogPostForm({ post, isEditing = false }: BlogPostFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    author: post?.author || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isEditing ? `/api/blog/${post?.slug}` : '/api/blog';
      const method = isEditing ? 'PUT' : 'POST';
      
      // Get stored credentials from localStorage
      const username = localStorage.getItem('blog_admin_username');
      const password = localStorage.getItem('blog_admin_password');
      
      if (!username || !password) {
        setError('Authentication required. Please log in again.');
        setLoading(false);
        return;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
        body: JSON.stringify({
          ...formData,
          date: post?.date || new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} post`);
      }

      const data = await response.json();
      router.push('/blog/admin');
      router.refresh();
    } catch (err) {
      setError(`Error ${isEditing ? 'updating' : 'creating'} post. Please try again.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="block font-medium">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-[var(--border-color)] rounded-md bg-[var(--background)] text-[var(--text-color)]"
          placeholder="Enter post title"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="author" className="block font-medium">
          Author <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full p-3 border border-[var(--border-color)] rounded-md bg-[var(--background)] text-[var(--text-color)]"
          placeholder="Enter author name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="excerpt" className="block font-medium">
          Excerpt <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          className="w-full p-3 border border-[var(--border-color)] rounded-md bg-[var(--background)] text-[var(--text-color)]"
          placeholder="Brief summary of the post"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block font-medium">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={12}
          className="w-full p-3 border border-[var(--border-color)] rounded-md bg-[var(--background)] text-[var(--text-color)]"
          placeholder="Write your blog post content here..."
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-[var(--border-color)] rounded-md hover:bg-[var(--light-bg)] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--secondary)] transition-colors disabled:opacity-70"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}