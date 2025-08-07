import React from 'react';
import { mockData } from '../data/mock';
import { ArrowUp, Mail, Phone, ExternalLink } from 'lucide-react';

const Footer = () => {
  const { personalInfo } = mockData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="header-logo text-white mb-6">
                LOUIE SAWYER
              </div>
              <div className="text-body text-gray-300 mb-8 leading-relaxed">
                Infrastructure Engineer with 12+ years of experience building 
                reliable, scalable solutions for modern enterprises.
              </div>
              <div className="flex items-center space-x-4">
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="w-12 h-12 bg-white text-black flex items-center justify-center hover:bg-green-500 hover:text-black transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a 
                  href={personalInfo.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white text-black flex items-center justify-center hover:bg-green-500 hover:text-black transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <div className="label text-white mb-6">QUICK NAVIGATION</div>
              <nav className="space-y-4">
                <button 
                  onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-300 hover:text-green-500 transition-colors text-left"
                >
                  About
                </button>
                <button 
                  onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-300 hover:text-green-500 transition-colors text-left"
                >
                  Experience
                </button>
                <button 
                  onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-300 hover:text-green-500 transition-colors text-left"
                >
                  Skills
                </button>
                <button 
                  onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-300 hover:text-green-500 transition-colors text-left"
                >
                  Projects
                </button>
                <button 
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-300 hover:text-green-500 transition-colors text-left"
                >
                  Contact
                </button>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="label text-white mb-6">CONTACT INFO</div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-500" />
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-gray-300 hover:text-green-500 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-500" />
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="text-gray-300 hover:text-green-500 transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 p-6 border border-green-500">
                <div className="label text-green-500 mb-3">READY TO CONNECT?</div>
                <div className="text-body text-gray-300 mb-4">
                  Let's discuss your infrastructure challenges
                </div>
                <button 
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="text-green-500 hover:text-white hover:underline transition-colors label-small"
                >
                  START CONVERSATION →
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              {/* Copyright */}
              <div className="text-gray-400 label-small mb-4 sm:mb-0">
                © {currentYear} LOUIE SAWYER. ALL RIGHTS RESERVED.
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors group"
              >
                <span className="label-small">BACK TO TOP</span>
                <div className="w-8 h-8 border border-gray-600 group-hover:border-green-500 flex items-center justify-center transition-colors">
                  <ArrowUp className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;