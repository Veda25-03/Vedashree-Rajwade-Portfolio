import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Heart, Target, Lightbulb, Wrench, TestTube, Rocket } from 'lucide-react';

const Process = React.memo(() => {
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

  const processSteps = useMemo(() => [
    { 
      title: 'Empathize', 
      icon: Heart, 
      color: 'from-pink-400 to-rose-400',
      description: 'Understanding user needs and pain points'
    },
    { 
      title: 'Define', 
      icon: Target, 
      color: 'from-blue-400 to-cyan-400',
      description: 'Clarifying the problem and goals'
    },
    { 
      title: 'Ideate', 
      icon: Lightbulb, 
      color: 'from-yellow-400 to-orange-400',
      description: 'Generating creative solutions'
    },
    { 
      title: 'Prototype', 
      icon: Wrench, 
      color: 'from-green-400 to-emerald-400',
      description: 'Building testable solutions'
    },
    { 
      title: 'Test', 
      icon: TestTube, 
      color: 'from-purple-400 to-indigo-400',
      description: 'Validating with real users'
    },
    { 
      title: 'Deliver', 
      icon: Rocket, 
      color: 'from-red-400 to-pink-400',
      description: 'Launching refined experiences'
    },
  ], []);

  const sectionClassName = useMemo(() => 
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`,
    [isVisible]
  );

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={sectionClassName}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 text-center mb-12 sm:mb-16 md:mb-20 bg-gradient-to-r from-gray-800 via-purple-700 to-gray-800 bg-clip-text text-transparent px-4">
            UX Design Process
          </h2>
          
          <div className="relative px-4">
            {/* Process Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 relative">
              {/* Connection Line - Hidden on mobile, visible on large screens */}
              <div className="hidden lg:block absolute top-16 sm:top-20 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 via-blue-300 via-green-300 via-yellow-300 via-purple-300 to-red-300 rounded-full shadow-lg"></div>
              
              {processSteps.map((step, index) => (
                <div 
                  key={step.title}
                  className="relative group transition-all duration-700"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-center">
                    {/* Icon Circle */}
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-2xl shadow-gray-400/50 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10 ring-2 sm:ring-4 ring-white/80`}>
                      <step.icon size={24} className="sm:hidden text-white" />
                      <step.icon size={28} className="hidden sm:block md:hidden text-white" />
                      <step.icon size={32} className="hidden md:block text-white" />
                    </div>
                    
                    {/* Step Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">{step.title}</h3>
                    
                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium px-2">{step.description}</p>
                  </div>
                  
                  {/* Arrow for mobile and tablet */}
                  <div className="lg:hidden flex justify-center mt-4 sm:mt-6">
                    {index < processSteps.length - 1 && (
                      <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 sm:-top-12 sm:-right-12 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-40 animate-pulse shadow-xl"></div>
            <div className="absolute -bottom-8 -left-8 sm:-bottom-12 sm:-left-12 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full opacity-50 animate-bounce shadow-xl"></div>
            <div className="absolute top-8 left-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-30 animate-ping"></div>
          </div>
        </div>
      </div>
    </section>
  );
});

Process.displayName = 'Process';

export default Process;