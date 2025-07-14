import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Download, Award, BookOpen, Code } from 'lucide-react';

const Resume = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { 
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px'
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  const highlights = useMemo(() => [
    {
      icon: Award,
      title: 'Key Skills',
      items: ['User Research & Testing', 'Wireframing & Prototyping', 'Visual Design', 'Interaction Design'],
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: Code,
      title: 'Tools & Software',
      items: ['Figma', 'Adobe Creative Suite', 'Webflow', 'Miro'],
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: BookOpen,
      title: 'Education',
      items: ['UI/UX Design Certification', 'Design Thinking Workshop', 'Human-Computer Interaction'],
      color: 'from-green-400 to-emerald-400'
    }
  ], []);

  const sectionClassName = useMemo(() => 
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`,
    [isVisible]
  );

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className={sectionClassName}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 text-center mb-12 sm:mb-16 md:mb-20 bg-gradient-to-r from-gray-800 via-purple-700 to-gray-800 bg-clip-text text-transparent px-4">
            Resume
          </h2>
          
          <div className="text-center mb-8 sm:mb-12 px-4">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto font-light">
              Explore my professional journey, skills, and qualifications. Ready to discuss how I can contribute to your team.
            </p>
            
            <a
              href="https://drive.google.com/file/d/1sIwG9dF6Qp-vnot9hEaN2_lWaay7eFQR/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-purple-400/60 hover:scale-110 text-sm sm:text-base md:text-lg"
            >
              <Download size={18} className="sm:hidden transition-transform group-hover:scale-125 group-hover:rotate-12" />
              <Download size={22} className="hidden sm:block transition-transform group-hover:scale-125 group-hover:rotate-12" />
              Download Full Resume
            </a>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
            {highlights.map((section, index) => (
              <div 
                key={section.title}
                className="group p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-2xl hover:shadow-purple-300/30 transition-all duration-300 hover:scale-110 hover:bg-white/90"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br ${section.color} rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-xl`}>
                  <section.icon size={24} className="sm:hidden text-white" />
                  <section.icon size={28} className="hidden sm:block md:hidden text-white" />
                  <section.icon size={32} className="hidden md:block text-white" />
                </div>
                
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">{section.title}</h3>
                
                <ul className="space-y-2 sm:space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0 shadow-sm"></div>
                      <span className="text-gray-700 text-sm sm:text-base font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Resume.displayName = 'Resume';

export default Resume;