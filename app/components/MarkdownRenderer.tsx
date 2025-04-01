'use client';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import 'highlight.js/styles/github-dark.css';
import type { Components } from 'react-markdown';
import type { Element } from 'hast';
import Link from 'next/link';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Define props for various component types
interface CodeProps {
  node?: Element;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
  [key: string]: any; // Allow for additional props passed by react-markdown
}

interface HeadingProps {
  level: number;
  children: React.ReactNode;
}

interface ImageProps {
  src?: string;
  alt?: string;
  title?: string;
}

interface LinkProps {
  href?: string;
  title?: string;
  children: React.ReactNode;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  // Return empty div with minimal height if no content to prevent layout shifts
  if (!content || content.trim() === '') {
    return <div className="min-h-[1rem]"></div>;
  }
  
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={ref}
      className={`markdown-body prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } transition-all duration-500 ease-out`}>
      {/* @ts-ignore - ReactMarkdown has typing issues with React 18 */}
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw, // Allow HTML in markdown
          rehypeSanitize, // Sanitize HTML
          rehypeHighlight // Syntax highlighting
        ]}
        components={{
          // Custom rendering for headings
          h1: ({ children }: HeadingProps) => (
            <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              {children}
            </h1>
          ),
          h2: ({ children }: HeadingProps) => (
            <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 pb-1 border-b border-gray-200 dark:border-gray-700">
              {children}
            </h2>
          ),
          h3: ({ children }: HeadingProps) => (
            <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }: HeadingProps) => (
            <h4 className="text-lg md:text-xl font-semibold mt-5 mb-2">
              {children}
            </h4>
          ),
          h5: ({ children }: HeadingProps) => (
            <h5 className="text-base md:text-lg font-semibold mt-4 mb-2">
              {children}
            </h5>
          ),
          h6: ({ children }: HeadingProps) => (
            <h6 className="text-base font-semibold mt-4 mb-2 text-gray-700 dark:text-gray-300">
              {children}
            </h6>
          ),
          
          // Custom rendering for paragraphs
          p: ({ children }) => (
            <p className="my-4 leading-relaxed text-gray-800 dark:text-gray-200">{children}</p>
          ),
          
          // Custom rendering for lists
          ul: ({ children }) => (
            <ul className="my-4 pl-6 list-disc space-y-2 marker:text-primary">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 pl-6 list-decimal space-y-2 marker:text-primary">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="pl-1 leading-relaxed">{children}</li>
          ),
          
          // Custom rendering for blockquotes
          blockquote: ({ children }) => (
            <blockquote className="pl-4 border-l-4 border-gray-300 dark:border-gray-600 my-6 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/30 py-2 px-4 rounded-r">
              {children}
            </blockquote>
          ),
          
          // Custom rendering for tables
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm">{children}</td>
          ),
          
          // Custom rendering for links
          a: ({ href, children, title }: LinkProps) => {
            const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
            
            if (isInternal) {
              return (
                <Link href={href || '#'} title={title} className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">
                  {children}
                </Link>
              );
            }
            
            return (
              <a 
                href={href} 
                title={title} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
              >
                {children}
              </a>
            );
          },
          
          // Custom rendering for images
          img: ({ src, alt, title }: ImageProps) => {
            if (!src) return null;
            
            return (
              <div className="my-6">
                <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src={src} 
                    alt={alt || ''} 
                    title={title} 
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
                {alt && (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                    {alt}
                  </div>
                )}
              </div>
            );
          },
          
          // Custom rendering for code blocks
          code: ({ node, inline, className, children, ...props }: CodeProps) => {
            const match = /language-(\w+)/.exec(className || '');
            const [copied, setCopied] = useState(false);
            
            const handleCopy = (code: React.ReactNode) => {
              // Safely convert ReactNode to string for clipboard
              let codeString = '';
              if (typeof code === 'string') {
                codeString = code;
              } else if (Array.isArray(code)) {
                codeString = code.join('');
              } else if (code !== null && code !== undefined) {
                codeString = String(code);
              }
              
              navigator.clipboard.writeText(codeString).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              });
            };
            
            if (!inline && match) {
              // Code block with syntax highlighting
              return (
                <div className="code-block-wrapper relative my-6 rounded-lg overflow-hidden shadow-lg">
                  <div className="code-header flex justify-between items-center px-4 py-2 bg-gray-800 text-gray-200">
                    <div className="code-language text-xs font-mono">
                      {match[1]}
                    </div>
                    <button 
                      onClick={() => handleCopy(children)}
                      className="copy-button text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                      aria-label="Copy code to clipboard"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className={`${className} p-4 bg-gray-900 text-gray-100 overflow-x-auto`}>
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            }
            
            // Inline code
            return (
              <code className={`${className || ''} px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm`} {...props}>
                {children}
              </code>
            );
          },
          
          // Custom rendering for horizontal rules
          hr: () => (
            <hr className="my-8 border-t border-gray-200 dark:border-gray-700" />
          ),
        } as Components}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

export default MarkdownRenderer;