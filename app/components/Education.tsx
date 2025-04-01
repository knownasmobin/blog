import React from 'react';

const educationData = [
  {
    degree: 'Bachelor of Science in Computer Engineering',
    institution: 'Ferdowsi University of Mashhad',
    location: 'Mashhad, Iran',
    period: '2014 - 2018',
    description: 'Focused on distributed systems, algorithms, and software engineering fundamentals.',
  },
  {
    degree: 'Professional Certifications',
    institution: 'Industry Recognized',
    location: '',
    period: '2018 - Present',
    description: 'Kubernetes Certified Administrator (CKA), AWS Certified Solutions Architect, Google Cloud Professional Engineer',
  },
];

export default function Education() {
  return (
    <section id="education" className="section py-24 bg-[var(--background)]">
      <div className="container">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <span className="gradient-text">Academic Background</span>
          </h2>
          <p className="text-[var(--muted)] text-center max-w-2xl">
            My educational journey and professional certifications
          </p>
        </div>
        
        <div className="space-y-8">
          {educationData.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
              <div className="md:w-1/4">
                <div className="text-sm text-[var(--muted)]">{item.period}</div>
                <h3 className="text-xl font-semibold text-[var(--text-color)]">{item.degree}</h3>
              </div>
              <div className="md:w-3/4">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h4 className="text-lg font-medium text-[var(--primary)]">{item.institution}</h4>
                  <div className="text-sm text-[var(--muted)]">
                    {item.location || 'Remote'}
                  </div>
                </div>
                <p className="text-[var(--text-color)]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}