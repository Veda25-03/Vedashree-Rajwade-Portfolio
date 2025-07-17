import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Mail, Send, ExternalLink, Linkedin } from 'lucide-react';
import { SiCanva } from 'react-icons/si';

const Contact = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
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

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  }, [formData]);

  const socialLinks = useMemo(() => [
    {
      name: 'Behance',
      icon: ExternalLink,
      url: 'https://www.behance.net/vedashree', // ← Replace with your actual Behance URL
      color: 'from-blue-500 to-purple-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/vedashree-rajwade', // ← Replace with your actual LinkedIn
      color: 'from-blue-600 to-blue-700'
    },
    // {
    //   name: 'Canva',
    //   icon: SiCanva,
    //   url: 'https://www.canva.com/yourprofile', // ← Replace with your actual Canva profile
    //   color: 'from-indigo-500 to-purple-500'
    // }
  ], []);

  const sectionClassName = useMemo(() => 
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`,
    [isVisible]
  );

  return (
    <section ref={sectionRef} id="connect" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <div className={sectionClassName}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 text-center mb-6 sm:mb-8 md:mb-10 bg-gradient-to-r from-gray-800 via-purple-700 to-gray-800 bg-clip-text text-transparent px-4">
            Connect with Me
          </h2>
          
          <p className="text-center text-gray-700 mb-12 sm:mb-16 max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-light px-4">
            Whether it's a project, idea or just a chat — I'd love to connect 🌱
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Contact Form */}
            <div className="space-y-4 sm:space-y-6 px-4 lg:px-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl sm:rounded-3xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all duration-300 text-base sm:text-lg hover:shadow-lg"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl sm:rounded-3xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all duration-300 text-base sm:text-lg hover:shadow-lg"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl sm:rounded-3xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 transition-all duration-300 resize-none text-base sm:text-lg hover:shadow-lg"
                    placeholder="Tell me about your project or just say hi!"
                  />
                </div>
                
                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-purple-400/60 hover:scale-105 text-base sm:text-lg"
                >
                  <Send size={18} className="sm:hidden transition-transform group-hover:scale-125 group-hover:rotate-12" />
                  <Send size={22} className="hidden sm:block transition-transform group-hover:scale-125 group-hover:rotate-12" />
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6 px-4 lg:px-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8">Get in Touch</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={18} />
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold text-base sm:text-lg">Email</p>
                    <a href="mailto:vedashreerajwade@gmail.com" className="text-gray-700 hover:text-purple-600 transition-colors duration-300 text-sm sm:text-base break-all">
                      vedashreerajwade@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Follow Me</h4>
                <div className="flex gap-3 sm:gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r ${link.color} rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-125 hover:rotate-12`}
                    >
                      <link.icon size={22} className="text-white" />
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 sm:mt-10 p-6 sm:p-8 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <p className="text-gray-800 leading-relaxed text-base sm:text-lg font-medium">
                  "I'm always excited to discuss new opportunities, creative projects, or simply connect with fellow designers and developers. Let's create something amazing together!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
