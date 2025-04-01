'use client';

import React from 'react';
import BlogPostForm from '../components/BlogPostForm';

export default function NewBlogPostPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Create New Blog Post</h1>
      <BlogPostForm />
    </div>
  );
}