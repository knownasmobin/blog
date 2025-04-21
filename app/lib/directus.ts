import { createDirectus, rest, readItems, readItem } from '@directus/sdk';

const directusUrl = process.env.DIRECTUS_URL || 'http://localhost:8055';
const directus = createDirectus(directusUrl).with(rest());

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  featured_image: {
    id: string;
    filename_download: string;
  } | null;
  author: string;
  publish_date: string;
  tags: string[];
  status: 'published' | 'draft';
}

export const getBlogPosts = async () => {
  try {
    return await directus.request(
      readItems('blog_posts', {
        filter: {
          status: {
            _eq: 'published'
          }
        },
        sort: ['-publish_date'],
        fields: ['*', 'featured_image.id', 'featured_image.filename_download']
      })
    );
  } catch (error) {
    // During static generation, return empty array if Directus is not available
    if (process.env.NODE_ENV === 'production') {
      console.warn('Directus server not available during static generation, returning empty array');
      return [];
    }
    throw error;
  }
};

export const getBlogPost = async (id: string) => {
  try {
    return await directus.request(
      readItem('blog_posts', id, {
        fields: ['*', 'featured_image.id', 'featured_image.filename_download']
      })
    );
  } catch (error) {
    // During static generation, return null if Directus is not available
    if (process.env.NODE_ENV === 'production') {
      console.warn('Directus server not available during static generation, returning null');
      return null;
    }
    throw error;
  }
}; 