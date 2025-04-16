import { createDirectus, rest, readItems, createItem, updateItem, deleteItem } from '@directus/sdk';

const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055').with(rest());

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  publish_date: string;
  status: 'published' | 'draft';
  tags: string[];
  featured_image?: string;
}

export async function getBlogPosts() {
  try {
    const posts = await directus.request(
      readItems('blog_posts', {
        filter: {
          status: {
            _eq: 'published'
          }
        },
        sort: ['-publish_date']
      })
    );
    return posts as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(id: string) {
  try {
    const post = await directus.request(
      readItems('blog_posts', {
        filter: {
          id: {
            _eq: id
          }
        }
      })
    );
    return post[0] as BlogPost | null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function createBlogPost(post: Omit<BlogPost, 'id'>) {
  try {
    const newPost = await directus.request(
      createItem('blog_posts', post)
    );
    return newPost as BlogPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

export async function updateBlogPost(id: string, post: Partial<BlogPost>) {
  try {
    const updatedPost = await directus.request(
      updateItem('blog_posts', id, post)
    );
    return updatedPost as BlogPost;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await directus.request(
      deleteItem('blog_posts', id)
    );
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
} 