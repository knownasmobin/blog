import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
};

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
  ensureBlogDirectoryExists();
  
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '');
        
        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);
        
        // Combine the data with the slug
        return {
          slug,
          title: matterResult.data.title || '',
          date: matterResult.data.date || '',
          author: matterResult.data.author || '',
          excerpt: matterResult.data.excerpt || '',
          content: matterResult.content || '',
        } as BlogPost;
      })
      // Sort posts by date
      .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
      
    return allPostsData;
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  ensureBlogDirectoryExists();
  
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    return {
      slug,
      title: matterResult.data.title || '',
      date: matterResult.data.date || '',
      author: matterResult.data.author || '',
      excerpt: matterResult.data.excerpt || '',
      content: matterResult.content || '',
    } as BlogPost;
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
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
  fs.writeFileSync(fullPath, fileContent);
  
  return { slug };
}

// Update an existing blog post
export async function updateBlogPost(slug: string, post: Partial<BlogPost>): Promise<{ slug: string }> {
  ensureBlogDirectoryExists();
  
  const existingPost = await getBlogPostBySlug(slug);
  
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
  fs.writeFileSync(fullPath, fileContent);
  
  return { slug };
}

// Delete a blog post
export async function deleteBlogPost(slug: string): Promise<void> {
  ensureBlogDirectoryExists();
  
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
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