import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Globe, MessageSquare, Palette } from 'lucide-react';

const About = React.memo(() => {
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

  const sectionClassName = useMemo(() => 
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`,
    [isVisible]
  );

  const infoItems = useMemo(() => [
    {
      icon: Globe,
      gradient: 'from-purple-500 to-pink-500',
      label: 'Based in:',
      value: 'India'
    },
    {
      icon: MessageSquare,
      gradient: 'from-blue-500 to-cyan-500',
      label: 'Languages:',
      value: 'English, Marathi, Hindi'
    },
    {
      icon: Palette,
      gradient: 'from-green-500 to-emerald-500',
      label: 'Interests:',
      value: 'Human-centered design, Typography, Microinteractions'
    }
  ], []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className={sectionClassName}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 text-center mb-12 sm:mb-16 md:mb-20 bg-gradient-to-r from-gray-800 via-purple-700 to-gray-800 bg-clip-text text-transparent px-4">
            About Me
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                Hey! I'm Vedashree — a UI/UX designer deeply passionate about solving real-world problems through thoughtful digital experiences. I believe good design is invisible yet intuitive — blending functionality with visual harmony.
              </p>
              
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {infoItems.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:bg-white/90"
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${item.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon className="text-white" size={16} />
                    </div>
                    <span className="text-gray-800 font-medium text-sm sm:text-base">
                      <strong>{item.label}</strong> {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-300/40 hover:shadow-3xl hover:shadow-purple-400/50 transition-all duration-500 hover:scale-105">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-800 mb-4 sm:mb-6">Design Philosophy</h3>
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    "Great design happens when user needs meet business goals in a beautiful, accessible way. Every pixel should have a purpose, every interaction should feel natural."
                  </p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-80 animate-pulse shadow-xl"></div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-70 animate-bounce shadow-xl"></div>
              <div className="absolute top-4 -left-2 sm:top-8 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-60 animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;