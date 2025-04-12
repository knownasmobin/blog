import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import slugify from 'slugify';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

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

    // Create a new branch
    const branchName = `blog-post-${slug}-${Date.now()}`;
    const mainBranch = await octokit.repos.getBranch({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      branch: 'main',
    });

    await octokit.git.createRef({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      ref: `refs/heads/${branchName}`,
      sha: mainBranch.data.commit.sha,
    });

    // Create or update the file
    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      path: `content/blog/${slug}.md`,
      message: `Add blog post: ${title}`,
      content: Buffer.from(postContent).toString('base64'),
      branch: branchName,
    });

    // Create a pull request
    const pr = await octokit.pulls.create({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      title: `Add blog post: ${title}`,
      head: branchName,
      base: 'main',
      body: `This PR adds a new blog post: ${title}`,
    });

    return NextResponse.json({
      success: true,
      prUrl: pr.data.html_url,
    });
  } catch (error) {
    console.error('Error creating pull request:', error);
    return NextResponse.json(
      { error: 'Failed to create pull request' },
      { status: 500 }
    );
  }
} 