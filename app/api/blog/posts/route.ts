import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import slugify from 'slugify';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, date } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Create a slug from the title
    const slug = slugify(title, { lower: true, strict: true });

    // Create the blog post content in markdown format
    const postContent = `---
title: ${title}
date: ${date}
---

${content}`;

    // Ensure the blog directory exists
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    await fs.mkdir(blogDir, { recursive: true });

    // Write the file
    const filePath = path.join(blogDir, `${slug}.md`);
    await fs.writeFile(filePath, postContent, 'utf-8');

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error saving blog post:', error);
    return NextResponse.json(
      { error: 'Failed to save blog post' },
      { status: 500 }
    );
  }
} 