import { getBlogPosts } from '@/lib/blog';

// This function generates all possible paths for the dynamic route at build time
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}