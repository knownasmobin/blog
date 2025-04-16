"use client";
import React, { useEffect, useRef, useState } from 'react';

const experienceData = [
  {
    title: 'SRE',
    company: 'Arzdigital',
    companyUrl: 'https://arzdigital.com',
    location: 'Remote',
    period: '2024 - Present',
    description: 'Lead DevOps engineer responsible for designing and implementing cloud-native infrastructure and establishing SRE practices across multiple product teams.',
    achievements: [
      'Managed Development and Production Environments Based On Kubernetes.',
      'Managed and Setup Apache APISIX gateway.',
      'Technologies used: Kubernetes, Jenkins, Lua, ArgoCD'
    ]
  },
  {
    title: 'DevOps Engineer',
    company: 'Eco Waste Management',
    companyUrl: 'https://web.ecobin.ir',
    location: 'Mashhad',
    period: '2023 - 2024',
    description: 'Specialized in cloud infrastructure and containerization, focusing on CI/CD pipeline optimization and infrastructure automation .',
    achievements: [
      'Managed Development and Production Environments Based On Kubernetes.',
      'Delivered high-quality solutions and systems for complex web applications.',
      'Technologies used: Kubernetes, Containerd, Golang, ORACLE Database'
    ]
  },
  {
    title: 'Platform Engineer',
    company: 'OMPFinex',
    companyUrl: 'https://ompfinex.com',
    location: 'Mashhad',
    period: '2022 - 2023',
    description: 'Managed on-premises and cloud infrastructure, focusing on automation, monitoring, and system reliability for financial services.',
    achievements: [
      'Created and Managed Kubernetes clusters.',
      'Contributed to infrastructure architecture planning and troubleshooting.',
      'Created and Managed Cassandra and HA PostgreSQL.',
      'Technologies used: Kubernetes, Docker, Golang, Cassandra, PostgreSQL'
    ]
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [hasViewedAll, setHasViewedAll] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Refs to store state values for event handlers to prevent stale closures
  const focusedRef = useRef(false);
  const activeIndexRef = useRef(0);
  const hasViewedAllRef = useRef(false);
  
  // Keep refs in sync with state
  useEffect(() => {
    focusedRef.current = isFocused;
    activeIndexRef.current = activeIndex;
    hasViewedAllRef.current = hasViewedAll;
  }, [isFocused, activeIndex, hasViewedAll]);
  
  // Main scroll handler - optimized performance with better thresholds
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Reset hasViewedAll when section is completely out of view
    const resetObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // When section is completely out of view, reset state
        if (!entry.isIntersecting) {
          setHasViewedAll(false);
        }
      },
      { threshold: 0 }
    );
    
    if (sectionRef.current) {
      resetObserver.observe(sectionRef.current);
    }
    
    // Initial focus detection - force focus when section is in center of viewport
    const initialFocusCheck = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      // More precise viewport detection with better thresholds
      const elementMiddle = rect.top + elementHeight / 2;
      const isCentered = elementMiddle > viewportHeight * 0.4 && 
                        elementMiddle < viewportHeight * 0.6;
      
      if (isCentered && !focusedRef.current) {
        setIsFocused(true);
        // Make sure first entry is active
        if (activeIndexRef.current !== 0) {
          setActiveIndex(0);
        }
      }
    };
    
    // Run initial check after a short delay to allow for any initial scrolling
    setTimeout(initialFocusCheck, 100);
    
    // Optimized focus detection observer with better thresholds
    const focusObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        // When section is in view with better thresholds
        if (entry.isIntersecting && entry.intersectionRatio > 0.7 && !focusedRef.current) {
          setIsFocused(true);
          if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ 
              behavior: 'smooth',
              block: 'center'
            });
          }
          
          if (activeIndexRef.current !== 0) {
            setActiveIndex(0);
          }
        }
        
        // When section is out of view with better detection
        if (!entry.isIntersecting || entry.intersectionRatio < 0.3) {
          setIsFocused(false);
        }
      },
      { 
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '20px'
      }
    );
    
    if (sectionRef.current) {
      focusObserver.observe(sectionRef.current);
    }
    
    // Add scroll event listener to help with focus detection
    const handleScroll = () => {
      if (!sectionRef.current) return;
      initialFocusCheck();
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      resetObserver.disconnect();
      focusObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Optimized wheel event handler with simplified logic
  useEffect(() => {
    if (!sectionRef.current) return;
    
    let wheelTimeout: NodeJS.Timeout | null = null;
    let lastScrollTime = 0;
    
    const handleWheel = (e: WheelEvent) => {
      // Simple focus detection
      if (!focusedRef.current) {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3) {
          setIsFocused(true);
          setActiveIndex(0);
          return;
        }
        return;
      }
      
      // Throttle wheel events
      const now = Date.now();
      if (now - lastScrollTime < 100) return;
      lastScrollTime = now;
      
      // Skip horizontal scrolling
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      
      e.preventDefault();
      
      const currentIndex = activeIndexRef.current;
      const scrollingDown = e.deltaY > 0;
      
      if (scrollingDown) {
        const targetIndex = Math.min(currentIndex + 1, experienceData.length - 1);
        if (targetIndex !== currentIndex) {
          setActiveIndex(targetIndex);
          const entries = document.querySelectorAll('.experience-entry');
          if (entries[targetIndex]) {
            entries[targetIndex].scrollIntoView({ behavior: 'auto', block: 'nearest' });
          }
        }
      } else {
        const targetIndex = Math.max(currentIndex - 1, 0);
        if (targetIndex !== currentIndex) {
          setActiveIndex(targetIndex);
          const entries = document.querySelectorAll('.experience-entry');
          if (entries[targetIndex]) {
            entries[targetIndex].scrollIntoView({ behavior: 'auto', block: 'nearest' });
          }
        }
      }
      
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
      wheelTimeout = setTimeout(() => {}, 100);
    };
    
    // Use passive: false to allow preventDefault
    const section = sectionRef.current;
    if (section) {
      section.addEventListener('wheel', handleWheel, { passive: false });
      
      // Cleanup
      return () => {
        section.removeEventListener('wheel', handleWheel);
        if (wheelTimeout) {
          clearTimeout(wheelTimeout);
        }
      };
    }
    return () => {
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
    };
  }, []);
  
  // Enhanced entry scrolling with improved handling for backward navigation
  const scrollToEntry = (index: number) => {
    // Set transitioning state to prevent interference from observers
    setIsTransitioning(true);
    
    // Update the active index immediately
    setActiveIndex(index);
    
    // Use native scrollIntoView for better performance
    const entries = document.querySelectorAll('.experience-entry');
    if (entries[index]) {
      // Ensure the entry is fully visible
      entries[index].scrollIntoView({
        behavior: 'auto',
        block: 'nearest'
      });
      
      // Apply a brief highlight effect to the target entry
      entries[index].classList.add('scrolled-to');
      setTimeout(() => {
        entries[index].classList.remove('scrolled-to');
      }, 500);
      
      // Check if we're at the last entry
      if (index === experienceData.length - 1) {
        setHasViewedAll(true);
      }
    }
    
    // Release transitioning state after a short delay
    setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
  };
  
  // Add CSS for the highlight effect
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .experience-entry.scrolled-to > div > div {
        transition: all 0.5s ease;
        border-color: var(--primary);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!focusedRef.current) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        
        const nextIndex = Math.min(activeIndexRef.current + 1, experienceData.length - 1);
        
        // If at the last entry and pressing down, exit focus mode
        if (activeIndexRef.current === experienceData.length - 1) {
          setHasViewedAll(true);
          setIsFocused(false);
          
          // Scroll to next section
          if (sectionRef.current && sectionRef.current.nextElementSibling instanceof HTMLElement) {
            sectionRef.current.nextElementSibling.scrollIntoView({ 
              behavior: 'auto',
              block: 'start'
            });
          }
          return;
        }
        
        // Otherwise go to next entry
        scrollToEntry(nextIndex);
      }
      
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        
        const prevIndex = Math.max(activeIndexRef.current - 1, 0);
        
        // If at the first entry and pressing up, exit focus mode
        if (activeIndexRef.current === 0) {
          setIsFocused(false);
          
          // Scroll to previous section
          if (sectionRef.current && sectionRef.current.previousElementSibling instanceof HTMLElement) {
            sectionRef.current.previousElementSibling.scrollIntoView({ 
              behavior: 'auto',
              block: 'end'
            });
          }
          return;
        }
        
        // Otherwise go to previous entry
        scrollToEntry(prevIndex);
      }
      
      // Escape to exit focus mode
      if (e.key === 'Escape') {
        setIsFocused(false);
      }
    };
    
    // Add event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Optimized entry observation with better performance
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const options = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0.3, 0.6],
      trackVisibility: true,
      delay: 100
    };
    
    const observer = new IntersectionObserver((entries) => {
      // Skip if we're transitioning or not focused
      if (isTransitioning || !focusedRef.current) return;
      
      // Process entries with optimized performance
      if (entries.length > 0) {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Find the most visible entry with better performance
          const mostVisible = visibleEntries.reduce((prev, current) => 
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          );
          
          if (mostVisible.intersectionRatio > 0.3) {
            const dataIndex = mostVisible.target.getAttribute('data-index');
            const index = dataIndex ? parseInt(dataIndex, 10) : 0;
            
            if (!isNaN(index) && index !== activeIndexRef.current) {
              setActiveIndex(index);
              
              // Only scroll if needed (when entry is not mostly visible)
              if (mostVisible.intersectionRatio < 0.7) {
                mostVisible.target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest'
                });
              }
            }
            
            if (index === experienceData.length - 1) {
              setHasViewedAll(true);
            }
          }
        }
      }
    }, options);
    
    // Observe all experience entries
    const experienceElements = Array.from(document.querySelectorAll('.experience-entry'));
    experienceElements.forEach(el => observer.observe(el));
    
    // Cleanup
    return () => {
      experienceElements.forEach(el => observer.unobserve(el));
    };
  }, [isTransitioning]);
  
  // Section observation for general viewport visibility
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      className={`section py-24 bg-[var(--light-bg)] relative overflow-hidden transition-all duration-300 ${
        isFocused ? 'min-h-screen' : ''
      }`}
    >
      {/* Subtle background for focused state */}
      {isFocused && (
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--light-bg)] to-[var(--card-bg)] opacity-50 transition-opacity duration-500"></div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <span className="gradient-text">Professional Journey</span>
          </h2>
          <p className="text-[var(--muted)] text-center max-w-2xl">
            My career path and key achievements in DevOps and SRE roles
          </p>
          
          {/* Scroll indicator - only shown when section is focused */}
          {isFocused && (
            <div className="mt-4 text-[var(--muted)] text-sm flex items-center gap-2 animate-pulse">
              <span>Scroll to navigate</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </div>
          )}
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border-color)] transform -translate-x-1/2"></div>
          
          <div className="space-y-64 md:space-y-[32rem]">
            {experienceData.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  data-index={index}
                  className={`relative experience-entry flex flex-col md:flex-row md:items-stretch z-10 gap-16 ${isEven ? 'md:flex-row-reverse md:pr-8' : 'md:pl-8'}`}
                >
                  {/* Timeline dot */}
                  <div className={`
                    absolute left-6 md:left-1/2 w-3 h-3 rounded-full 
                    transition-all duration-500
                    ${index === activeIndex ? 'bg-[var(--primary)] scale-125' : 'bg-[var(--border-color)]'}
                    transform -translate-x-1.5 md:-translate-x-2
                  `}></div>
                  
                  {/* Date for mobile */}
                  <div className="md:hidden pl-12 pb-4 text-sm font-medium text-[var(--primary)]">
                    {item.period}
                  </div>
                  
                  {/* Content */}
                  <div className={`
                    md:w-[45%] 
                    ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8'}
                    pl-8 md:pl-0
                  `}>
                    <div className="hidden md:block mb-2 text-sm font-medium text-[var(--primary)] text-left">
                      {item.period}
                    </div>
                    <div className={`
                      p-8 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] 
                      shadow-sm transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] text-left
                      ${index === activeIndex 
                        ? 'opacity-100 scale-100 border-[var(--primary)] shadow-lg transform translate-y-0' 
                        : 'opacity-40 scale-95 transform translate-y-0 '
                      }
                    `}>
                      <h3 className="text-xl font-semibold text-[var(--text-color)]">{item.title}</h3>
                      <div className={`flex flex-col ${isEven ? 'md:items-end' : ''} md:flex-row md:justify-between mb-2`}>
                        <h4 className="text-lg font-medium text-[var(--primary)] text-left">
                          {item.companyUrl ? (
                            <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {item.company}
                            </a>
                          ) : (
                            item.company
                          )}
                        </h4>
                        <div className="text-sm text-[var(--muted)]">{item.location}</div>
                      </div>
                      <p className="text-[var(--text-color)] mb-4">{item.description}</p>
                      <ul className={`${isEven ? 'md:list-inside' : 'md:ml-5'} list-disc space-y-1 text-[var(--text-color)] text-left`}>
                        {item.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Continue scrolling indicator */}
        {hasViewedAll && isFocused && (
          <div className="continue-indicator">
            <div className="flex flex-col items-center p-4 text-[var(--primary)]">
              <span className="text-sm font-medium mb-1">Continue scrolling</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
                <path d="M7 13l5 5 5-5"></path>
                <path d="M7 6l5 5 5-5"></path>
              </svg>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}