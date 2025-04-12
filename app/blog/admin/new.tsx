'use client';

import React, { useState } from 'react';
import RichTextEditor from '../../components/RichTextEditor';

export default function NewBlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!title || !content) {
      setError('Please fill in both title and content');
      return;
    }

    setSaving(true);
    setError('');

    try {
      // Create a pull request using GitHub's API
      const response = await fetch('/api/github/create-pr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create pull request');
      }

      const data = await response.json();
      
      // Clear the form
      setTitle('');
      setContent('');
      
      // Show success message with PR link
      alert(`Pull request created successfully! You can view it here: ${data.prUrl}`);
    } catch (error) {
      console.error('Error creating pull request:', error);
      setError('Failed to create pull request. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
      
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Content
          </label>
          <RichTextEditor
            content={content}
            onChange={setContent}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Creating Pull Request...' : 'Create Pull Request'}
          </button>
        </div>
      </div>
    </div>
  );
} 