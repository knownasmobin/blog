import React from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';

interface BlogPostProps {
  title: string;
  date: string;
  content: string;
  author?: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, date, content, author }) => {
  return (
    <article className="blog-post bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm">
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <div className="flex items-center text-sm text-[var(--muted)]">
          <time className="mr-3">{date}</time>
          {author && <span className="flex items-center"><span className="mx-2">•</span> {author}</span>}
        </div>
      </header>
      <section className="mt-4">
        <MarkdownRenderer content={content} />
      </section>
    </article>
  );
};

export default BlogPost;