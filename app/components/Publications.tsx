"use client";
import React from 'react';

export default function Publications() {
  const publications = [
    {
      title: "Optimizing Container Orchestration in Large-Scale Cloud Environments",
      authors: "Your Name, Co-author Name",
      conference: "International Conference on Cloud Computing (CloudConf 2023)",
      year: "2023",
      link: "https://example.com/paper1",
      abstract: "A comprehensive study on improving container orchestration efficiency in cloud-native applications, focusing on resource utilization and scheduling algorithms."
    },
    {
      title: "GitOps: A Modern Approach to Infrastructure Management",
      authors: "Your Name, Co-author Name",
      conference: "DevOps Summit 2022",
      year: "2022",
      link: "https://example.com/paper2",
      abstract: "An analysis of GitOps principles and their implementation in modern infrastructure management, with case studies from real-world applications."
    }
  ];

  return (
    <section id="publications" className="section py-24 bg-[var(--background)]">
      <div className="container">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <span className="gradient-text">Publications</span>
          </h2>
          <p className="text-[var(--muted)] text-center max-w-2xl">
            Research papers and articles published in academic and industry conferences
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publications.map((pub, index) => (
            <div
              key={index}
              className="group relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)]/30"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors mb-2">
                  <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {pub.title}
                  </a>
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)] mb-4">
                  <span>{pub.authors}</span>
                  <span>•</span>
                  <span>{pub.conference}</span>
                  <span>•</span>
                  <span className="text-[var(--primary)]">{pub.year}</span>
                </div>
                <p className="text-[var(--text-color)] mb-4">{pub.abstract}</p>
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors group/link"
                >
                  Read Paper
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 transform group-hover/link:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}