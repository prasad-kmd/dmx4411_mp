import React from 'react';
import { Globe as GithubIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-24 mt-48 bg-gray-50/50 dark:bg-gray-900/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl mx-auto mb-8 flex items-center justify-center">
           <GithubIcon className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-gray-900 dark:text-white font-bold mb-2">DSP Audio Analysis Research</p>
        <p className="text-gray-600 text-sm mb-8">Developed as part of the Digital Signal Processing Undergraduate Module.</p>
        <div className="flex justify-center gap-6 text-gray-400">
          <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Source Code</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">License</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
