import { getBlogPosts } from '@/app/lib/directus';

// This function generates all possible paths for the dynamic route at build time
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  
  return posts.map((post) => ({
    id: post.id,
  }));
} 