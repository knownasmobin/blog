import Image from "next/image";
import Link from "next/link";
import React from "react";
import Skills from "./components/Skills";
import Experience from '@/app/components/Experience';
import Education from "./components/Education";
import Publications from "./components/Publications";
import SkillsList from './components/SkillsList';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--light-bg)] text-[var(--text-color)] font-sans relative">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/90 border-b border-[var(--border-color)] py-4 shadow-sm">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="gradient-text">DevOps</span>
            <span className="text-[var(--text-color)]">Portfolio</span>
          </h1>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <Link href="#about" className="text-[var(--text-color)] hover:text-[var(--primary)] transition-colors font-medium relative group">
                  <span>About</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-[var(--text-color)] hover:text-[var(--primary)] transition-colors font-medium relative group">
                  <span>Experience</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-[var(--text-color)] hover:text-[var(--primary)] transition-colors font-medium relative group">
                  <span>Skills</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="#publications" className="text-[var(--text-color)] hover:text-[var(--primary)] transition-colors font-medium relative group">
                  <span>Publications</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-[var(--text-color)] hover:text-[var(--primary)] transition-colors font-medium relative group">
                  <span>Blog</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="#contact" className="btn btn-primary">
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </nav>
          <button className="md:hidden text-[var(--text-color)] hover:text-[var(--primary)] transition-colors" aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <main>
        <section id="about" className="section py-24 bg-gradient-to-b from-[var(--background)] to-[var(--light-bg)] overflow-hidden">
          <div className="container">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                <span className="gradient-text">DevOps Engineer & SRE Specialist</span>
              </h2>
              <p className="text-[var(--muted)] text-center max-w-2xl">
                I'm a passionate DevOps engineer specializing in Kubernetes, cloud infrastructure, and building efficient CI/CD pipelines.
              </p>
            </div>
          </div>
        </section>
        
        {/* Experience Section */}
        <Experience />
        
        {/* Skills Section */}
        <section id="skills" className="section py-24 bg-[var(--light-bg)]">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Skills & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillsList
                title="DevOps Tools"
                skills={[
                  'Docker',
                  'Kubernetes',
                  'CI/CD Pipelines',
                  'GitOps'
                ]}
              />
              <SkillsList
                title="Cloud Platforms"
                skills={[
                  'AWS',
                  'Google Cloud',
                  'Terraform'
                ]}
              />
              <SkillsList
                title="Programming Languages"
                skills={[
                  'Golang',
                  'Python',
                  'C++',
                  'Bash'
                ]}
              />
              <SkillsList
                title="Web Technologies"
                skills={[
                  'JavaScript',
                  'TypeScript',
                  'React',
                  'Node.js'
                ]}
              />
              <SkillsList
                title="Systems & Tools"
                skills={[
                  'Linux',
                  'Git',
                  'Apache Hadoop'
                ]}
              />
              <SkillsList
                title="Databases"
                skills={[
                  'PostgreSQL',
                  'MongoDB'
                ]}
              />
            </div>
          </div>
        </section>
        
        {/* Education Section */}
        <Education />
        
        {/* Publications Section */}
        <Publications />
        
        {/* Blog Section */}
        <section id="blog" className="section py-24 bg-[var(--light-bg)]">
          <div className="container">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                <span className="gradient-text">Latest Articles</span>
              </h2>
              <p className="text-[var(--muted)] text-center max-w-2xl">
                Insights and tutorials on DevOps, SRE, and cloud technologies
              </p>
            </div>
            <div className="text-center">
              <Link href="/blog" className="btn btn-primary">
                View All Posts
              </Link>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="section py-24 bg-[var(--background)]">
          <div className="container">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                <span className="gradient-text">Get In Touch</span>
              </h2>
              <p className="text-[var(--muted)] text-center max-w-2xl">
                Feel free to reach out via email or LinkedIn
              </p>
            </div>
            <div className="max-w-md mx-auto text-center space-y-4">
  <div>
    <a href="mailto:your.email@example.com" className="text-[var(--primary)] hover:underline">
      your.email@example.com
    </a>
  </div>
  <div>
    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
      LinkedIn Profile
    </a>
  </div>
</div>
          </div>
        </section>
      </main>
    </div>
  );
}
