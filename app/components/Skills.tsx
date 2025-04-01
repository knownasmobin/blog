import React from 'react';

const skillsData = {
  devops: [
    { name: 'Docker', level: 90 },
    { name: 'Kubernetes', level: 85 },
    { name: 'CI/CD Pipelines', level: 85 },
    { name: 'GitOps', level: 80 },
  ],
  cloud: [
    { name: 'AWS', level: 85 },
    { name: 'Google Cloud', level: 75 },
    { name: 'Terraform', level: 80 },
  ],
  programming: [
    { name: 'Golang', level: 85 },
    { name: 'Python', level: 90 },
    { name: 'C++', level: 75 },
    { name: 'Bash', level: 80 },
  ],
  web: [
    { name: 'JavaScript', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'React', level: 70 },
    { name: 'Node.js', level: 75 },
  ],
  systems: [
    { name: 'Linux', level: 90 },
    { name: 'Git', level: 85 },
    { name: 'Apache Hadoop', level: 75 },
  ],
  databases: [
    { name: 'PostgreSQL', level: 85 },
    { name: 'MongoDB', level: 75 },
  ],
};

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-[var(--text-color)] font-medium">{name}</span>
        <span className="text-[var(--muted)]">{level}%</span>
      </div>
      <div className="w-full bg-[var(--border-color)] rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-2.5 rounded-full" 
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
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
            My professional skills and proficiency levels
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--primary)]">DevOps Tools</h3>
            {skillsData.devops.map((skill) => (
              <li key={skill.name} className="text-[var(--text-color)]">{skill.name}</li>
            ))}
          </div>
          
          <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--primary)]">Cloud Platforms</h3>
            {skillsData.cloud.map((skill) => (
              <li key={skill.name} className="text-[var(--text-color)]">{skill.name}</li>
            ))}
          </div>
          
          <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--primary)]">Programming Languages</h3>
            {skillsData.programming.map((skill) => (
              <li key={skill.name} className="text-[var(--text-color)]">{skill.name}</li>
            ))}
          </div>
          
          <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--primary)]">Web Technologies</h3>
            {skillsData.web.map((skill) => (
              <li key={skill.name} className="text-[var(--text-color)]">{skill.name}</li>
            ))}
          </div>

          <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--primary)]">Systems & Tools</h3>
            {skillsData.systems.map((skill) => (
              <li key={skill.name} className="text-[var(--text-color)]">{skill.name}</li>
            ))}
          </div>
          
          <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--primary)]">Databases</h3>
            {skillsData.databases.map((skill) => (
              <li key={skill.name} className="text-[var(--text-color)]">{skill.name}</li>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}