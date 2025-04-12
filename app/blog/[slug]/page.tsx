import React from 'react';
import Link from 'next/link';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import MarkdownRenderer from '@/app/components/MarkdownRenderer';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | DevOps Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-[var(--light-bg)] text-[var(--text-color)] font-sans">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/90 border-b border-[var(--border-color)] py-4 shadow-sm">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <a href="/" className="flex items-center">
              <span className="gradient-text">DevOps</span>
              <span className="text-[var(--text-color)]">Portfolio</span>
            </a>
          </h1>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <a href="/#about" className="text-[var(--text-color)] hover:text-[var(--primary)] transition-colors font-medium relative group">
                  <span>About</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a href="/#experience" className="text-[var(--text-color)] hover:text-[var(--primary)] transition-colors font-medium relative group">
                  <span>Experience</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a href="/#skills" className="text-[var(--text-color)] hover:text-[var(--primary)] transition-colors font-medium relative group">
                  <span>Skills</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a href="/blog" className="text-[var(--primary)] font-medium relative group">
                  <span>Blog</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)]"></span>
                </a>
              </li>
              <li>
                <a href="/#contact" className="btn btn-primary">
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </nav>
          <button className="md:hidden text-[var(--text-color)] hover:text-[var(--primary)] transition-colors" aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <main className="container py-16">
        <div className="mb-8">
          <Link href="/blog" className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Back to all posts
          </Link>
        </div>
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-sm text-[var(--muted)]">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>
          
          <div className="mt-12 pt-8 border-t border-[var(--border-color)]">
            <Link href="/blog" className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors inline-flex items-center group">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:-translate-x-1 transition-transform">
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
              Back to all articles
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}