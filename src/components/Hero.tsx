import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Download, MessageCircle, ArrowDown } from 'lucide-react';

const Hero = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('connect');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const heroClassName = useMemo(() => 
    `max-w-4xl mx-auto text-center transition-all duration-800 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`,
    [isVisible]
  );

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className={heroClassName}>
        {/* Profile Image */}
        <div className="relative mb-6 sm:mb-8">
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 mx-auto rounded-full overflow-hidden shadow-2xl shadow-purple-300/60 ring-4 sm:ring-6 md:ring-8 ring-white/90 backdrop-blur-sm hover:shadow-3xl hover:shadow-purple-400/70 transition-all duration-500 hover:scale-105">
            <img 
              src="https://avatars.githubusercontent.com/u/190639841?v=4" 
              alt="Vedashree Rajwade"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              loading="eager"
            />
          </div>
          {/* Floating animation elements */}
          <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-80 animate-pulse shadow-lg"></div>
          <div className="absolute -bottom-2 -left-4 sm:-bottom-4 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-full opacity-70 animate-bounce shadow-lg"></div>
          <div className="absolute top-2 -left-2 sm:top-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-60 animate-ping"></div>
        </div>

        {/* Name and Tagline */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-gray-800 mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-gray-800 via-purple-800 to-gray-800 bg-clip-text text-transparent">
            Vedashree Rajwade
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 font-light mb-4 sm:mb-6 md:mb-8 leading-relaxed px-4">
            UI/UX Designer with a Passion for Intuitive and Impactful Design
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            I craft purposeful, user-first digital experiences that blend empathy, function, and beauty.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
          <a
            href="https://drive.google.com/file/d/1sIwG9dF6Qp-vnot9hEaN2_lWaay7eFQR/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full font-medium transition-all duration-300 hover:shadow-2xl hover:shadow-purple-400/60 hover:scale-110 hover:from-purple-700 hover:to-pink-700 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <Download size={18} className="sm:hidden" />
            <Download size={22} className="hidden sm:block transition-transform group-hover:scale-125 group-hover:rotate-12" />
            Download Resume
          </a>
          <button
            onClick={scrollToContact}
            className="group flex items-center gap-3 bg-white/90 backdrop-blur-sm text-gray-700 px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full font-medium border-2 border-gray-200 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-400/60 hover:scale-110 hover:bg-white hover:border-purple-300 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <MessageCircle size={18} className="sm:hidden" />
            <MessageCircle size={22} className="hidden sm:block transition-transform group-hover:scale-125 group-hover:rotate-12" />
            Contact Me
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce hover:animate-pulse cursor-pointer">
          <ArrowDown size={24} className="sm:hidden text-gray-500 mx-auto hover:text-purple-500 transition-colors duration-300" />
          <ArrowDown size={28} className="hidden sm:block text-gray-500 mx-auto hover:text-purple-500 transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;