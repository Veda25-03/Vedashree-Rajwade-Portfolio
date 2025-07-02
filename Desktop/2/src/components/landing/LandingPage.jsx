import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat,  FaBell, FaHospital, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';
import { MdPeople, MdAnalytics, MdSecurity } from 'react-icons/md';
import RequestBloodModal from './RequestBloodModal';
import DonateBloodModal from './DonateBloodModal';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);

  const features = [
    {
      icon: <MdAnalytics className="w-8 h-8 text-primary-600" />,
      title: "Real-time Inventory",
      description: "Track blood units in real-time with automated alerts for low stock and expiry dates."
    },
    {
      icon: <MdPeople className="w-8 h-8 text-primary-600" />,
      title: "Donor Management", 
      description: "Comprehensive donor database with eligibility tracking and automated reminders."
    },
    {
      icon: <FaBell className="w-8 h-8 text-primary-600" />,
      title: "Emergency Alerts",
      description: "Instant notifications for critical blood requests and emergency situations."
    },
    {
      icon: <MdSecurity className="w-8 h-8 text-primary-600" />,
      title: "Secure Hospital Access",
      description: "Role-based access control ensuring data security and compliance with medical standards."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Anjali Deshmukh",
      role: "Chief Medical Officer",
      hospital: "Ruby Hall Clinic, Pune",
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
      quote: "JIVAN BBMS has revolutionized our blood bank operations. The real-time tracking and automated alerts have saved countless lives."
    },
    {
      name: "Dr. Vikram Singh",
      role: "Head of Hematology", 
      hospital: "AIIMS, Delhi",
      image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
      quote: "The donor management system is exceptional. We can now efficiently coordinate with donors and ensure steady blood supply."
    },
    {
      name: "Dr. Reena Jadhav",
      role: "Blood Bank Director",
      hospital: "Tata Memorial Hospital, Mumbai", 
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
      quote: "The analytics and reporting features provide insights that help us optimize our blood bank operations effectively."
    }
  ];

  const screenshots = [
    {
      title: "Dashboard Overview",
      image: "https://downloadscdn6.freepik.com/482257/52/51247.jpg?filename=clinical-reception-with-waiting-room-facility-lobby-registration-counter-used-patients-with-medical-appointments-empty-reception-desk-health-center-checkup-visits.jpg&token=exp=1751461780~hmac=66c745ac8c88940997329fdc50854347&filename=51247.jpg"
    },
    {
      title: "Blood Inventory",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
    },
    {
      title: "Donor Management",
      image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <FaHeartbeat className="w-8 h-8 text-primary-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">JIVAN BBMS</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">Home</a>
                <a href="#about" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
                <a href="#features" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#contact" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
                <Link to="/login" className="btn-primary">Login</Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-primary-600 focus:outline-none p-2"
              >
                {isMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#home" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">Home</a>
              <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">About</a>
              <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">Features</a>
              <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">Contact</a>
              <Link to="/login" className="block px-3 py-2 text-base font-medium text-primary-600 hover:bg-primary-50 rounded-md transition-colors">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
<section id="home" className="relative h-screen">
  {/* Video Background */}
  <video 
    autoPlay 
    muted 
    loop 
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/src/components/landing/samplevid.mp4" type="video/webm" />
    <source src="your-fallback-video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Foreground Content */}
  <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
        Saving Lives, One Drop at a Time
      </h1>
      <p className="text-2xl md:text-3xl mb-8 opacity-90 animate-slide-up">
        India's Smartest Blood Bank Management Platform
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
        <button 
          onClick={() => setShowRequestModal(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Request Blood
        </button>
        <button 
          onClick={() => setShowDonateModal(true)}
          className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Donate Now
        </button>
        <Link 
          to="/login"
          className="bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Login to Admin
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About JIVAN BBMS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading the revolution in blood bank management across India with cutting-edge technology and compassionate healthcare solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Empowering Healthcare with Technology
              </h3>
              <p className="text-gray-600 mb-6">
                JIVAN BBMS is designed specifically for Indian healthcare institutions, addressing the unique challenges of blood bank management in our diverse medical landscape. Our platform ensures efficient blood inventory management, donor coordination, and emergency response capabilities.
              </p>
              <p className="text-gray-600 mb-6">
                With real-time tracking, automated notifications, and comprehensive analytics, hospitals can make informed decisions that save lives every day.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">500+</div>
                  <div className="text-sm text-gray-600">Hospitals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">50K+</div>
                  <div className="text-sm text-gray-600">Donors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">1M+</div>
                  <div className="text-sm text-gray-600">Lives Saved</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                alt="Blood donation in India"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage blood bank operations efficiently and save lives effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dashboard Preview
            </h2>
            <p className="text-xl text-gray-600">
              Get a glimpse of our powerful admin dashboard interface
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="card overflow-hidden hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                <img 
                  src={screenshot.image}
                  alt={screenshot.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {screenshot.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Medical Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what healthcare leaders across India are saying about JIVAN BBMS
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-primary-600">{testimonial.hospital}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Ready to transform your blood bank operations? Contact us today
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-gray-700">+91 90281 12345</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-gray-700">support@jivanbbms.in</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-gray-700">Mumbai, Maharashtra, India</span>
                </div>
                <div className="flex items-center">
                  <FaHospital className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-gray-700">Serving 500+ hospitals across India</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Business Hours
                </h4>
                <div className="text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Emergency Support: 24/7</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Request Demo
              </h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Hospital Name"
                    className="input-field"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Contact Person"
                    className="input-field"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    className="input-field"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Phone Number"
                    className="input-field"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Message"
                    rows="4"
                    className="input-field"
                  ></textarea>
                </div>
                <button type="submit" className="w-full btn-primary">
                  Request Demo
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FaHeartbeat className="w-6 h-6 text-primary-500 mr-2" />
                <span className="text-xl font-bold">JIVAN BBMS</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing blood bank management across India with technology and compassion.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Blood Inventory Management</li>
                <li>Donor Management System</li>
                <li>Hospital Integration</li>
                <li>Emergency Response</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Training</li>
                <li>24/7 Support</li>
                <li>System Status</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JIVAN BBMS. All rights reserved. Made with ❤️ for Indian Healthcare.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RequestBloodModal 
        isOpen={showRequestModal} 
        onClose={() => setShowRequestModal(false)} 
      />
      <DonateBloodModal 
        isOpen={showDonateModal} 
        onClose={() => setShowDonateModal(false)} 
      />
    </div>
  );
};

export default LandingPage;