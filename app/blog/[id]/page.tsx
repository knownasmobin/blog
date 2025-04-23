import { getBlogPost } from '@/app/lib/directus';
import type { BlogPost } from '@/app/lib/directus';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import ErrorBoundary from '@/app/components/ErrorBoundary';
import Loading from '@/app/components/Loading';
import OptimizedImage from '@/app/components/Image';

async function BlogPostContent({ id }: { id: string }) {
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose prose-lg max-w-none prose-headings:text-[var(--text-color)] prose-p:text-[var(--text-color)] prose-a:text-[var(--primary)] prose-strong:text-[var(--text-color)] prose-code:text-[var(--text-color)]">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-[var(--muted)]">
          <time dateTime={post.publish_date}>
            {new Date(post.publish_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{post.author}</span>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-[var(--primary)]/10 text-[var(--primary)] text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.featured_image && post.featured_image.id && (
        <OptimizedImage
          src={`http://localhost:8055/assets/${post.featured_image.id}`}
          alt={post.title}
          width={1200}
          height={600}
          className="w-full h-auto rounded-xl mb-12"
          priority
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-color)]">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors mb-8 group"
          >
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
              className="mr-1 group-hover:-translate-x-1 transition-transform"
            >
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Back to blog
          </Link>

          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <BlogPostContent id={params.id} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
} 