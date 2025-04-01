import React from 'react';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Roboto_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'DevOps Engineer & SRE Specialist | Portfolio',
  description: 'Professional portfolio of a DevOps Engineer and SRE Specialist with expertise in Kubernetes, cloud infrastructure, and CI/CD pipelines.',
  keywords: ['DevOps', 'SRE', 'Kubernetes', 'Cloud Infrastructure', 'CI/CD', 'Portfolio'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <footer className="py-12 bg-[var(--background)] border-t border-[var(--border-color)]">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start gap-2">
                <h3 className="text-xl font-bold mb-2">
                  <span className="gradient-text">DevOps</span>
                  <span className="text-[var(--text-color)]">Portfolio</span>
                </h3>
                <p className="text-[var(--muted)]">© {new Date().getFullYear()} DevOps Portfolio. All rights reserved.</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center md:justify-end gap-4">
                  <a href="#about" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">About</a>
                  <a href="#experience" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">Experience</a>
                  <a href="#education" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">Education</a>
                  <a href="#skills" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">Skills</a>
                  <a href="#publications" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">Publications</a>
                  <a href="#blog" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">Blog</a>
                  <a href="#contact" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">Contact</a>
                </div>
                <div className="flex items-center justify-center md:justify-end gap-6">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
