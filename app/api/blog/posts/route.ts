import { NextResponse } from 'next/server';
import { createBlogPost } from '@/app/lib/directus';
import slugify from 'slugify';

export async function POST(request: Request) {
  try {
    const { title, content, author, featured_image } = await request.json();

    if (!title || !content || !author) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    const slug = slugify(title, { lower: true, strict: true });
    const publish_date = new Date().toISOString();

    const post = await createBlogPost({
      title,
      content,
      author,
      slug,
      publish_date,
      status: 'published',
      tags: [],
      featured_image: featured_image || null,
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
} 