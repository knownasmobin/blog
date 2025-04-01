import { NextRequest, NextResponse } from 'next/server';
import { updateBlogPost, deleteBlogPost, getBlogPostBySlug } from '@/lib/blog';

// GET /api/blog/[slug] - Get a specific blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getBlogPostBySlug(params.slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error(`Error getting blog post ${params.slug}:`, error);
    return NextResponse.json(
      { error: 'Failed to get blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[slug] - Update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content || !body.author || !body.excerpt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const result = await updateBlogPost(params.slug, body);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error updating blog post ${params.slug}:`, error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[slug] - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await deleteBlogPost(params.slug);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting blog post ${params.slug}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}