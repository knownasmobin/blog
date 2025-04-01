'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogPostForm from '../../components/BlogPostForm';
import type { BlogPost } from '@/lib/blog';

export default function EditBlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  if (!slug) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-8">Edit Blog Post</h1>
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          Invalid blog post slug
        </div>
      </div>
    );
  }
  
  const [post, setPost] = useState<Partial<BlogPost> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load blog post. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-8">Edit Blog Post</h1>
        <div className="text-center py-12">
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-8">Edit Blog Post</h1>
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error || 'Post not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Edit Blog Post</h1>
      <BlogPostForm post={post} isEditing={true} />
    </div>
  );
}