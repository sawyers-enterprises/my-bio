import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="header-logo">
            LOUIE SAWYER
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link"
            >
              ABOUT
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="nav-link"
            >
              EXPERIENCE
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="nav-link"
            >
              SKILLS
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="nav-link"
            >
              PROJECTS
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="nav-link"
            >
              CONTACT
            </button>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-none border border-gray-900 dark:border-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-none border border-gray-900 dark:border-gray-100"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <nav className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection('about')}
                className="nav-link text-left"
              >
                ABOUT
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="nav-link text-left"
              >
                EXPERIENCE
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="nav-link text-left"
              >
                SKILLS
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="nav-link text-left"
              >
                PROJECTS
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="nav-link text-left"
              >
                CONTACT
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;