"use client";
import React from 'react';

const publicationsData = [
  {
    title: 'Optimizing Kubernetes Cluster Performance',
    authors: 'John Doe, Jane Smith',
    journal: 'Journal of Cloud Computing',
    date: '2023',
    link: 'https://example.com/paper1',
    description: 'Research on optimizing Kubernetes cluster performance through workload-aware scheduling.'
  }
];

export default function Publications() {
  return (
    <section id="publications" className="section py-24 bg-[var(--light-bg)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <span className="gradient-text">Publications</span>
          </h2>
          <p className="text-[var(--muted)] text-center max-w-2xl">
            My academic papers, articles, and conference presentations
          </p>
        </div>

        <div className="space-y-8">
          {publicationsData.map((item, index) => (
            <div key={index} className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-[var(--text-color)] mb-2">{item.title}</h3>
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <div className="text-[var(--primary)]">{item.authors}</div>
                <div className="text-sm text-[var(--muted)]">{item.journal}, {item.date}</div>
              </div>
              <p className="text-[var(--text-color)] mb-3">{item.description}</p>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline inline-flex items-center gap-1"
              >
                Read publication
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17l5-5-5-5"></path>
                  <path d="M13 17l5-5-5-5"></path>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}