import { createDirectus, rest, readItems, readItem } from '@directus/sdk';

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

const directus = createDirectus(directusUrl).with(rest());

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  tags: string[];
  author: string;
  publish_date: string;
}

export async function getBlogPosts() {
  try {
    const posts = await directus.request(
      readItems('blog_posts', {
        sort: ['-publish_date'],
        fields: ['*'],
      })
    );
    return posts as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return empty array if Directus is not available during static generation
    return [];
  }
}

export async function getBlogPost(slug: string) {
  try {
    const post = await directus.request(
      readItem('blog_posts', slug, {
        fields: ['*'],
      })
    );
    return post as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    // Return null if Directus is not available during static generation
    return null;
  }
} 