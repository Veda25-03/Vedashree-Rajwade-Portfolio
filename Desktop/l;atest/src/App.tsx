import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Process from './components/Process';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = React.memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  const cursorGlowStyle = useMemo(() => ({
    left: mousePosition.x - 192,
    top: mousePosition.y - 192,
    background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)'
  }), [mousePosition.x, mousePosition.y]);

  const appClassName = useMemo(() => 
    `min-h-screen transition-all duration-800 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`,
    [isLoaded]
  );

  return (
    <div className={appClassName}>
      {/* Soft mesh gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-25 to-blue-25 -z-20"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-transparent via-green-25 to-purple-25 opacity-70 -z-20"></div>
      <div className="fixed inset-0 bg-gradient-to-bl from-yellow-25 via-transparent to-rose-25 opacity-50 -z-20"></div>
      
      {/* Interactive cursor glow */}
      <div 
        className="fixed w-96 h-96 pointer-events-none -z-10 opacity-20 transition-all duration-300 ease-out"
        style={cursorGlowStyle}
      ></div>
      
      <Hero />
      <About />
      <Skills />
      <Process />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
});

App.displayName = 'App';

export default App;