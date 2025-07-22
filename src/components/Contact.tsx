import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Mail, Send,  Linkedin } from 'lucide-react';
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
      icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
<linearGradient id="HKkxIoXB1CD4R_igkMuH9a_kOFv7syFcaqY_gr1" x1="32" x2="32" y1="47.188" y2="1.595" gradientTransform="matrix(1 0 0 -1 0 56.27)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#HKkxIoXB1CD4R_igkMuH9a_kOFv7syFcaqY_gr1)" d="M50,55H14c-2.757,0-5-2.243-5-5V14c0-2.757,2.243-5,5-5h36c2.757,0,5,2.243,5,5v36	C55,52.757,52.757,55,50,55z M14,11c-1.654,0-3,1.346-3,3v36c0,1.654,1.346,3,3,3h36c1.654,0,3-1.346,3-3V14c0-1.654-1.346-3-3-3H14	z"></path><linearGradient id="HKkxIoXB1CD4R_igkMuH9b_kOFv7syFcaqY_gr2" x1="32.5" x2="32.5" y1="41.016" y2="23.015" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6abff"></stop><stop offset="1" stop-color="#6dc7ff"></stop></linearGradient><path fill="url(#HKkxIoXB1CD4R_igkMuH9b_kOFv7syFcaqY_gr2)" d="M36,23.037h10V26H36V23.037z M29.204,31.278c0.751-0.366,2.442-1.201,2.442-3.673	c0-4.651-5.07-4.59-6.008-4.59H17v18.001h9.013c0.751-0.001,6.383-0.213,6.383-5.146C32.396,32.688,30.33,31.646,29.204,31.278z M21,26.152h3.67c0.366,0,2.751,0.133,2.751,2.017c0,1.882-1.834,2.199-2.384,2.199H21V26.152z M25.207,37.882H21V33h4.207	c0.913,0,2.925,0.3,2.925,2.532C28.132,37.762,25.572,37.882,25.207,37.882z M43.47,37.675c-0.591,0.368-1.181,0.554-1.97,0.554	c-2.958,0-3.547-2.494-3.547-3.599H48c0-1.105,0-1.921-0.197-2.843C47.605,30.866,46.258,27,41.304,27	c-6.924,0-7.329,5.484-7.291,6.994c0.069,2.765,1.303,4.299,1.899,4.897c0.634,0.637,1.428,1.161,2.239,1.542	c0.984,0.37,1.97,0.554,2.955,0.554c1.574,0,2.955-0.366,4.137-1.104c1.184-0.736,1.971-1.841,2.561-3.314h-3.348	C44.258,36.939,44.061,37.305,43.47,37.675z M41.035,29.486c1.948,0,2.888,2.049,2.979,2.998h-6.358	C37.656,32.299,38.132,29.486,41.035,29.486z"></path>
</svg>,
      url: 'https://www.behance.net/vedashrrajwade', // ← Replace with your actual Behance URL
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
