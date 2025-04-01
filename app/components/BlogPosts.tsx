import React from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import type { BlogPost } from '@/lib/blog';

export default async function BlogPosts() {
  const posts = await getBlogPosts();
  const latestPosts = posts.slice(0, 3); // Get the 3 most recent posts

  return (
    <section id="blog" className="section py-24 bg-[var(--light-bg)]">
      <div className="container">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <span className="gradient-text">Latest Articles</span>
          </h2>
          <p className="text-[var(--muted)] text-center max-w-2xl">
            Thoughts and insights on DevOps, cloud infrastructure, and more
          </p>
        </div>
        
        {latestPosts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No posts yet</h3>
            <p className="text-[var(--muted)]">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post: BlogPost) => (
              <div key={post.slug} className="blog-card p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2 text-[var(--text-color)]">{post.title}</h3>
                <p className="text-sm text-[var(--muted)] mb-3">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-[var(--text-color)] mb-4 flex-grow">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors inline-flex items-center mt-auto">
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/blog" className="btn btn-primary">
            View all articles
          </Link>
        </div>
      </div>
    </section>
  );
}