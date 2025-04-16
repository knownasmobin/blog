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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:border-[var(--primary)]/30 transition-all"
        >
          {post.featured_image && (
            <OptimizedImage
              src={`http://localhost:8055/assets/${post.featured_image.id}`}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <div className="text-xs font-medium text-[var(--primary)] uppercase tracking-wider mb-2">
              {new Date(post.publish_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <h2 className="text-xl font-semibold mb-2 text-[var(--text-color)] hover:text-[var(--primary)] transition-colors">
              <Link href={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string) => (
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
              className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors inline-flex items-center group"
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
                className="ml-1 group-hover:translate-x-1 transition-transform"
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-color)]">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <p className="text-[var(--muted)] mb-12">
            Thoughts, insights, and updates from my journey.
          </p>

          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <BlogPosts />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}