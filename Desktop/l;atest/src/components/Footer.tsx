import React from 'react';
import { Heart } from 'lucide-react';

const Footer = React.memo(() => {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-gray-600 text-sm sm:text-base">
            <span>Designed & Built with</span>
            <Heart size={14} className="sm:hidden text-pink-500 animate-pulse" />
            <Heart size={16} className="hidden sm:block text-pink-500 animate-pulse" />
            <span>by Vedashree Rajwade</span>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">
            © 2025 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;