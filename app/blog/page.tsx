import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | DevOps Engineer & SRE Specialist',
  description: 'Read my latest thoughts, tutorials, and insights on DevOps, SRE, cloud infrastructure, and more.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-[var(--light-bg)] text-[var(--text-color)] font-sans">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/90 border-b border-[var(--border-color)] py-4 shadow-sm">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link href="/">
              <span className="gradient-text">DevOps</span>
              <span className="text-[var(--text-color)]">Portfolio</span>
            </Link>
          </h1>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <Link href="/#about" className="text-[var(--text-color)] hover:text-[var(--primary)] transition-colors font-medium relative group">
                  <span>About</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="text-[var(--text-color)] hover:text-[var(--primary)] transition-colors font-medium relative group">
                  <span>Experience</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="text-[var(--text-color)] hover:text-[var(--primary)] transition-colors font-medium relative group">
                  <span>Skills</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[var(--primary)] font-medium relative group">
                  <span>Blog</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)]"></span>
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="btn btn-primary">
                  <span>Contact</span>
                </Link>
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
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <span className="gradient-text">Latest Articles & Insights</span>
          </h2>
          <p className="text-[var(--muted)] text-center max-w-2xl">
            Thoughts, tutorials, and insights on DevOps, SRE, cloud infrastructure, and more.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No posts yet</h3>
            <p className="text-[var(--muted)]">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.slug} className="blog-card p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all hover:border-[var(--primary)]/30 flex flex-col h-full">
                <div className="mb-2 text-xs font-medium text-[var(--primary)] uppercase tracking-wider">
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--text-color)] hover:text-[var(--primary)] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-[var(--text-color)] mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors inline-flex items-center mt-auto group">
                  Read article
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}