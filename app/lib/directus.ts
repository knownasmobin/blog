import { createDirectus, rest, readItems, readItem, createItem, updateItem, deleteItem } from '@directus/sdk';

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
};

export const getBlogPost = async (id: string) => {
  return await directus.request(
    readItem('blog_posts', id, {
      fields: ['*', 'featured_image.id', 'featured_image.filename_download']
    })
  );
};

export const createBlogPost = async (post: Omit<BlogPost, 'id'>) => {
  return await directus.request(
    createItem('blog_posts', post)
  );
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
  return await directus.request(
    updateItem('blog_posts', id, post)
  );
};

export const deleteBlogPost = async (id: string) => {
  return await directus.request(
    deleteItem('blog_posts', id)
  );
}; 