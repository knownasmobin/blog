import { getBlogPosts } from '@/app/lib/directus';
import Link from 'next/link';
import { Suspense } from 'react';
import ErrorBoundary from '@/app/components/ErrorBoundary';
import Loading from '@/app/components/Loading';
import OptimizedImage from '@/app/components/Image';
import type { BlogPost } from '@/app/lib/directus';

export const metadata = {
  title: 'Blog | Your Name',
  description: 'Read my latest articles and insights.',
};

async function BlogPosts() {
  const posts = await getBlogPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-[var(--muted)]">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <article
          key={post.id}
          className="blog-card group relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)]/30"
        >
          {post.featured_image && (
            <div className="relative h-48 overflow-hidden">
              <OptimizedImage
                src={`http://localhost:8055/assets/${post.featured_image.id}`}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <time className="text-sm font-medium text-[var(--primary)] tracking-wider">
                {new Date(post.publish_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <h2 className="text-xl font-semibold mb-3 text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors">
              <Link href={`/blog/${post.id}`} className="block">
                {post.title}
              </Link>
            </h2>
            {post.excerpt && (
              <p className="text-[var(--muted)] mb-4 line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-[var(--primary)]/10 text-[var(--primary)] text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/blog/${post.id}`}
              className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors group/link"
            >
              Read article
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 transform group-hover/link:translate-x-1 transition-transform"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-color)]">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)]">
              Blog
            </h1>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Thoughts, insights, and updates from my journey in web development and technology.
            </p>
          </header>

          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <BlogPosts />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </main>
  );
}