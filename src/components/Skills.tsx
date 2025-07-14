import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, Pen, Layers, Zap, Eye, Brush, Figma, Palette, Monitor, Image, Globe, Grid, FileText } from 'lucide-react';

const Skills = React.memo(() => {
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

  const skills = useMemo(() => [
    { name: 'User Research', icon: Search, color: 'from-purple-400 to-pink-400' },
    { name: 'Wireframing', icon: Pen, color: 'from-blue-400 to-cyan-400' },
    { name: 'Prototyping', icon: Layers, color: 'from-green-400 to-emerald-400' },
    { name: 'Info Architecture', icon: Zap, color: 'from-yellow-400 to-orange-400' },
    { name: 'Interaction Design', icon: Eye, color: 'from-pink-400 to-red-400' },
    { name: 'Visual Design', icon: Brush, color: 'from-indigo-400 to-purple-400' },
  ], []);

  const tools = useMemo(() => [
    { name: 'Figma', icon: Figma, color: 'from-purple-500 to-indigo-500' },
    { name: 'Adobe XD', icon: Monitor, color: 'from-pink-500 to-purple-500' },
    { name: 'Canva', icon: Palette, color: 'from-orange-500 to-red-500' },
    { name: 'Photoshop', icon: Image, color: 'from-blue-500 to-cyan-500' },
    { name: 'Webflow', icon: Globe, color: 'from-green-500 to-emerald-500' },
    { name: 'Miro', icon: Grid, color: 'from-yellow-500 to-orange-500' },
    { name: 'Notion', icon: FileText, color: 'from-gray-500 to-slate-500' }
  ], []);

  const sectionClassName = useMemo(() => 
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`,
    [isVisible]
  );

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className={sectionClassName}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 text-center mb-12 sm:mb-16 md:mb-20 bg-gradient-to-r from-gray-800 via-purple-700 to-gray-800 bg-clip-text text-transparent px-4">
            Skills & Tools
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Skills */}
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-800 mb-6 sm:mb-8 md:mb-10 px-4 lg:px-0">Core Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-4 lg:px-0">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="group p-4 sm:p-5 md:p-6 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-2xl hover:shadow-purple-300/30 transition-all duration-300 hover:scale-110 cursor-pointer hover:bg-white/90"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${skill.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                      <skill.icon size={20} className="sm:hidden text-white" />
                      <skill.icon size={24} className="hidden sm:block md:hidden text-white" />
                      <skill.icon size={28} className="hidden md:block text-white" />
                    </div>
                    <h4 className="text-gray-800 font-semibold text-base sm:text-lg">{skill.name}</h4>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tools */}
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-800 mb-6 sm:mb-8 md:mb-10 px-4 lg:px-0">Favorite Tools</h3>
              <div className="space-y-3 sm:space-y-4 px-4 lg:px-0">
                {tools.map((tool, index) => (
                  <div 
                    key={tool.name}
                    className="group flex items-center p-4 sm:p-5 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-2xl hover:shadow-purple-300/30 transition-all duration-300 hover:scale-105 cursor-pointer hover:bg-white/90"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${tool.color} rounded-xl sm:rounded-2xl flex items-center justify-center mr-4 sm:mr-5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-lg flex-shrink-0`}>
                      <tool.icon size={18} className="sm:hidden text-white" />
                      <tool.icon size={20} className="hidden sm:block md:hidden text-white" />
                      <tool.icon size={24} className="hidden md:block text-white" />
                    </div>
                    <span className="text-gray-800 font-semibold text-base sm:text-lg">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;