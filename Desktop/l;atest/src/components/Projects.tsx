import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ExternalLink, User, Wrench } from 'lucide-react';

const Projects = React.memo(() => {
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
      rootMargin: '80px 0px -50px 0px'
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  const projects = useMemo(() => [
    {
      title: 'Sow & Grow – Plant App',
      year: '2025',
      role: 'UI/UX Designer',
      tools: 'Figma, Illustrator',
      problem: 'Forgetting to care for plants',
      approach: 'Calming app, gamified care system',
      screens: 'Onboarding → Plant Guide → Reminder',
      caseStudy: 'https://www.behance.net/gallery/230091143/Sow-Grow-Plant-your-heart',
      color: 'from-green-400 to-emerald-500',
      mockup: 'https://images.pexels.com/photos/6913444/pexels-photo-6913444.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'ADULATE – To-Do App',
      year: '2025',
      role: 'UX & Visual Designer',
      tools: 'Figma, Adobe XD',
      problem: 'To-do apps overwhelm users',
      approach: 'Clean design with priority system',
      screens: 'Dashboard → Add Task → Productivity Tracker',
      caseStudy: 'https://www.behance.net/gallery/229711639/ADULATE-To-Do-App',
      color: 'from-blue-400 to-cyan-500',
      mockup: 'https://images.pexels.com/photos/5952647/pexels-photo-5952647.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Me Fit – Gym Website',
      year: '2024',
      role: 'UI/UX Designer',
      tools: 'Figma, Webflow',
      problem: 'Local gyms lack modern branding',
      approach: 'Energetic layout with strong CTAs',
      screens: 'Hero → Trainers → Join Form',
      caseStudy: 'https://www.behance.net/gallery/228566429/Me-Fit-Gym',
      color: 'from-orange-400 to-red-500',
      mockup: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'MODERNO – Furniture Shop',
      year: '2024',
      role: 'UI/UX & Brand Designer',
      tools: 'Figma, Photoshop',
      problem: 'Low trust in online furniture shopping',
      approach: 'AR previews, moodboard shopping flow',
      screens: 'Product → AR Preview → Cart',
      caseStudy: 'https://www.behance.net/gallery/219086573/MODERNO-Furniture-Shop',
      color: 'from-purple-400 to-pink-500',
      mockup: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ], []);

  const sectionClassName = useMemo(() => 
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`,
    [isVisible]
  );

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className={sectionClassName}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 text-center mb-12 sm:mb-16 md:mb-20 bg-gradient-to-r from-gray-800 via-purple-700 to-gray-800 bg-clip-text text-transparent px-4">
            Featured Projects
          </h2>
          
          <div className="space-y-12 sm:space-y-16">
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className={`group grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center transition-all duration-700 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Project Info */}
                <div className={`space-y-4 sm:space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''} px-4 lg:px-0`}>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r ${project.color} rounded-full shadow-lg animate-pulse`}></div>
                    <span className="text-gray-600 font-semibold text-base sm:text-lg">{project.year}</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User size={12} className="sm:hidden text-white" />
                        <User size={16} className="hidden sm:block text-white" />
                      </div>
                      <span className="text-sm sm:text-base font-medium"><strong>Role:</strong> {project.role}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Wrench size={12} className="sm:hidden text-white" />
                        <Wrench size={16} className="hidden sm:block text-white" />
                      </div>
                      <span className="text-sm sm:text-base font-medium"><strong>Tools:</strong> {project.tools}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="p-4 sm:p-5 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">Problem</h4>
                      <p className="text-gray-700 text-sm sm:text-base">{project.problem}</p>
                    </div>
                    
                    <div className="p-4 sm:p-5 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">Approach</h4>
                      <p className="text-gray-700 text-sm sm:text-base">{project.approach}</p>
                    </div>
                    
                    <div className="p-4 sm:p-5 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-base sm:text-lg">Key Screens</h4>
                      <p className="text-gray-700 text-sm sm:text-base">{project.screens}</p>
                    </div>
                  </div>
                  
                  <a
                    href={project.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r ${project.color} text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-110 text-sm sm:text-base md:text-lg`}
                  >
                    View Full Case Study
                    <ExternalLink size={16} className="sm:hidden group-hover:rotate-12 transition-transform duration-300" />
                    <ExternalLink size={20} className="hidden sm:block group-hover:rotate-12 transition-transform duration-300" />
                  </a>
                </div>
                
                {/* Project Mockup */}
                <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-1' : ''} px-4 lg:px-0`}>
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl shadow-gray-400/40 group-hover:shadow-2xl group-hover:shadow-purple-400/50 transition-all duration-500 hover:scale-105">
                    <img 
                      src={project.mockup}
                      alt={project.title}
                      className="w-full h-64 sm:h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-30 group-hover:opacity-15 transition-opacity duration-500`}></div>
                  </div>
                  
                  {/* Floating badge */}
                  <div className={`absolute -top-3 -right-3 sm:-top-6 sm:-right-6 bg-gradient-to-r ${project.color} text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-2xl hover:scale-110 transition-transform duration-300`}>
                    {project.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;