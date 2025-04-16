import { NextRequest, NextResponse } from 'next/server';
import { createBlogPost } from '@/app/lib/directus';

// POST /api/blog/resume-to-blog - Generate a blog post from resume
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, title } = body;
    
    if (!section) {
      return NextResponse.json(
        { error: 'Missing required section parameter' },
        { status: 400 }
      );
    }
    
    // Generate content based on the resume and section
    const content = await generateContentFromResume(section, title);
    
    // Create the blog post in Directus
    const post = await createBlogPost({
      title: title || `My ${section.charAt(0).toUpperCase() + section.slice(1)}`,
      content,
      author: 'Resume Author', // This would ideally be extracted from the resume
      publish_date: new Date().toISOString(),
      status: 'published',
      tags: [section],
    });
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error generating blog post from resume:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog post from resume' },
      { status: 500 }
    );
  }
}

async function generateContentFromResume(section: string, customTitle?: string): Promise<string> {
  // In a real implementation, you would parse the PDF and extract relevant sections
  // For this example, we'll create template content based on the section
  
  const title = customTitle || `My ${section.charAt(0).toUpperCase() + section.slice(1)}`;
  
  // Template content based on section
  const templates: Record<string, string> = {
    experience: `# ${title}

## Professional Journey

In this post, I'll share my professional journey and the experiences that have shaped my career in ${section}.

## Key Achievements

- Achievement 1
- Achievement 2
- Achievement 3

## Lessons Learned

Throughout my journey, I've learned valuable lessons about ${section} that I'd like to share with you.

## Looking Forward

I'm excited about the future of ${section} and how it will continue to evolve in our industry.`,
    
    education: `# ${title}

## Academic Background

In this post, I'll discuss my educational journey and how it has prepared me for my career in ${section}.

## Key Learnings

- Learning 1
- Learning 2
- Learning 3

## Practical Applications

How my education has translated into real-world applications in ${section}.

## Continuous Learning

The importance of ongoing education in the field of ${section}.`,
    
    skills: `# ${title}

## Technical Skills

In this post, I'll outline the key skills I've developed in ${section} and how they contribute to my work.

## Core Competencies

- Skill 1
- Skill 2
- Skill 3

## Skill Development

How I've honed these skills over time and continue to improve them.

## Future Skills

The skills I'm currently developing to stay ahead in ${section}.`,
    
    projects: `# ${title}

## Project Portfolio

In this post, I'll showcase some of my key projects in ${section} and what I've learned from them.

## Featured Projects

- Project 1
- Project 2
- Project 3

## Project Highlights

Key achievements and challenges overcome in these projects.

## Lessons Learned

What these projects have taught me about ${section} and project management.`
  };
  
  return templates[section] || `# ${title}

## About This Post

This is a blog post about my experience and expertise in ${section}.

## Key Points

- Point 1
- Point 2
- Point 3

## Conclusion

My thoughts on the future of ${section} and how it impacts our industry.`;
}