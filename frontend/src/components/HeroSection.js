import React from 'react';
import { mockData } from '../data/mock';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const { personalInfo } = mockData;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Grid Background */}
      <div className="grid-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Main Title */}
          <div className="mb-8">
            <div className="label mb-4 animate-fade-in-up">
              INFRASTRUCTURE ENGINEER
            </div>
            <h1 className="hero-title mb-6 animate-fade-in-up animation-delay-200">
              LOUIE SAWYER
            </h1>
            <div className="text-big max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
              {personalInfo.experience} of experience building and maintaining 
              enterprise-level infrastructure solutions
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 animate-fade-in-up animation-delay-600">
            <div className="card">
              <div className="text-regular font-mono text-green-500 mb-2">12+</div>
              <div className="label">YEARS EXPERIENCE</div>
            </div>
            <div className="card">
              <div className="text-regular font-mono text-green-500 mb-2">4</div>
              <div className="label">ACTIVE CERTIFICATIONS</div>
            </div>
            <div className="card">
              <div className="text-regular font-mono text-green-500 mb-2">50+</div>
              <div className="label">PROJECTS COMPLETED</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animation-delay-800">
            <button 
              onClick={() => scrollToSection('projects')}
              className="btn-accent"
            >
              VIEW PROJECTS
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
            >
              GET IN TOUCH
            </button>
          </div>

          {/* Scroll Indicator */}
          <button 
            onClick={() => scrollToSection('about')}
            className="animate-bounce opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-6 h-6 mx-auto" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;