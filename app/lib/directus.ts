import { createDirectus, rest, readItems, readItem } from '@directus/sdk';

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

const directus = createDirectus(directusUrl).with(rest());

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: {
    id: string;
  };
  tags: string[];
  author: string;
  publish_date: string;
}

export async function getBlogPosts() {
  try {
    const posts = await directus.request(
      readItems('blog_posts', {
        sort: ['-publish_date'],
        fields: ['id', 'title', 'content', 'excerpt', 'featured_image.id', 'tags', 'author', 'publish_date'],
      })
    );
    return posts as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return empty array if Directus is not available during static generation
    return [];
  }
}

export async function getBlogPost(id: string) {
  try {
    const post = await directus.request(
      readItem('blog_posts', id, {
        fields: ['id', 'title', 'content', 'excerpt', 'featured_image.id', 'tags', 'author', 'publish_date'],
      })
    );
    return post as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    // Return null if Directus is not available during static generation
    return null;
  }
} 