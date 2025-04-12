import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Ensure the blog content directory exists
export function ensureBlogDirectoryExists() {
  if (!fs.existsSync(path.join(process.cwd(), 'content'))) {
    fs.mkdirSync(path.join(process.cwd(), 'content'));
  }
  
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory);
  }
}

// Get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  const files = await fs.readdir(blogDir);
  
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.md'))
      .map(async (file) => {
        const filePath = path.join(blogDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data, content: markdownContent } = matter(content);
        
        // Create an excerpt from the first paragraph
        const excerpt = markdownContent
          .split('\n\n')[0]
          .replace(/[#*`_]/g, '')
          .trim()
          .slice(0, 200) + '...';

        return {
          slug: file.replace(/\.md$/, ''),
          title: data.title,
          date: data.date,
          content: markdownContent,
          excerpt,
        };
      })
  );

  // Sort posts by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);
    const content = await fs.readFile(filePath, 'utf-8');
    const { data, content: markdownContent } = matter(content);

    return {
      slug,
      title: data.title,
      date: data.date,
      content: markdownContent,
    };
  } catch (error) {
    return null;
  }
}

// Create or update a blog post
export async function saveBlogPost(post: Omit<BlogPost, 'slug'>): Promise<{ slug: string }> {
  ensureBlogDirectoryExists();
  
  // Generate slug from title
  const slug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  // Create frontmatter
  const frontmatter = {
    title: post.title,
    date: post.date,
    author: post.author,
    excerpt: post.excerpt,
  };
  
  // Create markdown content
  const fileContent = matter.stringify(post.content, frontmatter);
  
  // Write to file
  await fs.writeFile(fullPath, fileContent);
  
  return { slug };
}

// Update an existing blog post
export async function updateBlogPost(slug: string, post: Partial<BlogPost>): Promise<{ slug: string }> {
  ensureBlogDirectoryExists();
  
  const existingPost = await getBlogPost(slug);
  
  if (!existingPost) {
    throw new Error(`Blog post with slug ${slug} not found`);
  }
  
  const updatedPost = {
    ...existingPost,
    ...post,
  };
  
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  // Create frontmatter
  const frontmatter = {
    title: updatedPost.title,
    date: updatedPost.date,
    author: updatedPost.author,
    excerpt: updatedPost.excerpt,
  };
  
  // Create markdown content
  const fileContent = matter.stringify(updatedPost.content, frontmatter);
  
  // Write to file
  await fs.writeFile(fullPath, fileContent);
  
  return { slug };
}

// Delete a blog post
export async function deleteBlogPost(slug: string): Promise<void> {
  ensureBlogDirectoryExists();
  
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (await fs.access(fullPath).then(() => true).catch(() => false)) {
    await fs.unlink(fullPath);
  } else {
    throw new Error(`Blog post with slug ${slug} not found`);
  }
}

// Generate a blog post from resume data
export function generateResumeBasedPost(resumeSection: string, title: string): Partial<BlogPost> {
  // This is a placeholder function that would be customized based on the resume structure
  // For now, we'll create a simple template
  
  const currentDate = new Date().toISOString();
  
  return {
    title,
    date: currentDate,
    author: 'Resume Author', // This would be replaced with the actual name from the resume
    excerpt: `A blog post about my ${resumeSection} experience.`,
    content: `# ${title}

This is an automatically generated blog post based on my resume's ${resumeSection} section.

## My Experience

Here I would detail my experience in ${resumeSection}.

## Skills

List of relevant skills would go here.

## Projects

Relevant projects would be listed here.

---

This post was automatically generated from my resume.`
  };
}