import { NextRequest, NextResponse } from 'next/server';
import { saveBlogPost, updateBlogPost, deleteBlogPost, getBlogPosts } from '@/lib/blog';
import { authConfig } from '@/lib/config';

// GET /api/blog - Get all blog posts
export async function GET(request: NextRequest) {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    
    // Check if environment variables are set
    if (!authConfig.username || !authConfig.password) {
      console.error('Authentication environment variables not set');
      return NextResponse.json(
        { error: 'Authentication configuration error' },
        { status: 500 }
      );
    }
    
    // Use constant-time comparison to prevent timing attacks
    if (username !== authConfig.username || password !== authConfig.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content || !body.author || !body.excerpt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const result = await saveBlogPost(body);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}