import React from 'react';

const skillsData = {
  devops: [
    'Docker',
    'Kubernetes',
    'CI/CD Pipelines',
    'GitOps',
  ],
  cloud: [
    'AWS',
    'Google Cloud',
    'Terraform',
  ],
  programming: [
    'Golang',
    'Python',
    'C++',
    'Bash',
  ],
  web: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
  ],
  systems: [
    'Linux',
    'Git',
    'Apache Hadoop',
  ],
  databases: [
    'PostgreSQL',
    'MongoDB',
  ],
};

export default function Skills() {
  return (
    <section id="skills" className="section py-24 bg-[var(--background)]">
      <div className="container">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <span className="gradient-text">Technical Expertise</span>
          </h2>
          <p className="text-[var(--muted)] text-center max-w-2xl">
            My professional skills and expertise
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)]/30">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors">DevOps Tools</h3>
              <ul className="space-y-3">
                {skillsData.devops.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[var(--primary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4"
                      />
                    </svg>
                    <span className="text-[var(--text-color)]">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="group relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)]/30">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors">Cloud Platforms</h3>
              <ul className="space-y-3">
                {skillsData.cloud.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[var(--primary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4"
                      />
                    </svg>
                    <span className="text-[var(--text-color)]">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="group relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)]/30">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors">Programming Languages</h3>
              <ul className="space-y-3">
                {skillsData.programming.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[var(--primary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4"
                      />
                    </svg>
                    <span className="text-[var(--text-color)]">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="group relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)]/30">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors">Web Technologies</h3>
              <ul className="space-y-3">
                {skillsData.web.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[var(--primary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4"
                      />
                    </svg>
                    <span className="text-[var(--text-color)]">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="group relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)]/30">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors">Systems & Tools</h3>
              <ul className="space-y-3">
                {skillsData.systems.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[var(--primary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4"
                      />
                    </svg>
                    <span className="text-[var(--text-color)]">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="group relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)]/30">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors">Databases</h3>
              <ul className="space-y-3">
                {skillsData.databases.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[var(--primary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4"
                      />
                    </svg>
                    <span className="text-[var(--text-color)]">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}