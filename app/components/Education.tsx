import React from 'react';

export default function Education() {
  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "University Name",
      period: "2015 - 2017",
      description: "Specialized in Distributed Systems and Cloud Computing. Thesis focused on container orchestration optimization in cloud environments.",
      achievements: [
        "Published research paper on container orchestration",
        "Graduated with distinction",
        "Teaching Assistant for Cloud Computing course"
      ]
    },
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "University Name",
      period: "2011 - 2015",
      description: "Core focus on software engineering, algorithms, and systems design.",
      achievements: [
        "First Class Honours",
        "Led university's programming team",
        "Completed internship at leading tech company"
      ]
    }
  ];

  return (
    <section id="education" className="section py-24 bg-[var(--light-bg)]">
      <div className="container">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-[var(--muted)] text-center max-w-2xl">
            Academic background and achievements in computer science and engineering
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="group relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--primary)]/30"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-[var(--muted)]">{edu.institution}</p>
                  </div>
                  <span className="text-sm font-medium text-[var(--primary)] mt-2 md:mt-0">
                    {edu.period}
                  </span>
                </div>
                <p className="text-[var(--text-color)] mb-4">{edu.description}</p>
                <div>
                  <h4 className="font-medium mb-2 text-[var(--text-color)]">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-[var(--primary)] mt-0.5"
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
                        <span className="text-[var(--text-color)]">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}