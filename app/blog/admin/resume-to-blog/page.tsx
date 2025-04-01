'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

type ResumeSection = {
  name: string;
  title: string;
  description: string;
};

const resumeSections: ResumeSection[] = [
  {
    name: 'experience',
    title: 'My Professional Experience',
    description: 'Create a blog post about your work experience and career journey.'
  },
  {
    name: 'education',
    title: 'My Educational Background',
    description: 'Share your academic journey and educational achievements.'
  },
  {
    name: 'skills',
    title: 'My Technical Skills',
    description: 'Showcase your technical skills and expertise.'
  },
  {
    name: 'projects',
    title: 'My Notable Projects',
    description: 'Highlight your significant projects and achievements.'
  }
];

export default function ResumeToBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('');

  const handleGeneratePost = async () => {
    if (!selectedSection) {
      setError('Please select a resume section');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get the title from custom input or use the default from the selected section
      const section = resumeSections.find(s => s.name === selectedSection);
      const title = customTitle || (section ? section.title : '');

      const response = await fetch('/api/blog/resume-to-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: selectedSection,
          title
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate blog post');
      }

      const data = await response.json();
      
      // Redirect to edit the newly created post
      router.push(`/blog/admin/edit/${data.slug}`);
    } catch (err) {
      setError('Error generating blog post. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Create Blog Post from Resume</h1>
        <Link href="/blog/admin" className="px-4 py-2 border border-[var(--border-color)] rounded-md hover:bg-[var(--light-bg)] transition-colors">
          Back to Admin
        </Link>
      </div>

      <div className="bg-[var(--light-bg)] p-6 rounded-lg border border-[var(--border-color)] mb-8">
        <p className="mb-4">
          This tool helps you create blog posts based on your resume. Select a section from your resume to generate a blog post template.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 mb-6">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="section" className="block font-medium">
            Resume Section <span className="text-red-500">*</span>
          </label>
          <select
            id="section"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full p-3 border border-[var(--border-color)] rounded-md bg-[var(--background)] text-[var(--text-color)]"
            required
          >
            <option value="">Select a section</option>
            {resumeSections.map((section) => (
              <option key={section.name} value={section.name}>
                {section.title}
              </option>
            ))}
          </select>
          <p className="text-sm text-[var(--muted)]">
            {selectedSection 
              ? resumeSections.find(s => s.name === selectedSection)?.description 
              : 'Choose a section from your resume to create a blog post about.'}
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="block font-medium">
            Custom Title (Optional)
          </label>
          <input
            type="text"
            id="title"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            className="w-full p-3 border border-[var(--border-color)] rounded-md bg-[var(--background)] text-[var(--text-color)]"
            placeholder="Enter a custom title for your blog post"
          />
          <p className="text-sm text-[var(--muted)]">
            Leave blank to use the default title for the selected section.
          </p>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Link
            href="/blog/admin"
            className="px-6 py-3 border border-[var(--border-color)] rounded-md hover:bg-[var(--light-bg)] transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleGeneratePost}
            disabled={loading}
            className="px-6 py-3 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--secondary)] transition-colors disabled:opacity-70"
          >
            {loading ? 'Generating...' : 'Generate Blog Post'}
          </button>
        </div>
      </div>
    </div>
  );
}