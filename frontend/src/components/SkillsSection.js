import React, { useState } from 'react';
import { mockData } from '../data/mock';
import { Server, Network, Shield, Cloud, Monitor, Database } from 'lucide-react';

const SkillsSection = () => {
  const { technicalSkills } = mockData;
  const [activeCategory, setActiveCategory] = useState(0);

  const categoryIcons = {
    'Infrastructure': Server,
    'Networking': Network,
    'ITIL & Support': Shield,
    'Technologies': Cloud
  };

  const skillLevels = {
    'Server Deployment': 95,
    'CCNA Certified': 90,
    'Service Desk Operations': 88,
    'VMware vSphere': 92,
    'Configuration Management': 85,
    'Network Design': 88,
    'Incident Management': 90,
    'Microsoft Azure': 82,
    'Cloud Architecture': 80,
    'Routing & Switching': 88,
    'Problem Resolution': 92,
    'AWS': 75,
    'Virtualization': 90,
    'Network Security': 85,
    'Change Management': 88,
    'Linux/Windows Server': 88,
    'Storage Solutions': 82,
    'Load Balancing': 80,
    'Asset Management': 85,
    'Docker': 78,
    'Kubernetes': 72
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="label mb-4">TECHNICAL EXPERTISE</div>
            <h2 className="title-big mb-8">SKILLS</h2>
            <div className="text-big max-w-3xl mx-auto">
              Comprehensive technical skillset spanning infrastructure, 
              networking, and modern cloud technologies
            </div>
          </div>

          {/* Skills Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="label mb-6">CATEGORIES</div>
                <div className="space-y-2">
                  {technicalSkills.map((category, index) => {
                    const IconComponent = categoryIcons[category.category];
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveCategory(index)}
                        className={`w-full text-left p-4 border transition-all flex items-center space-x-3 ${
                          activeCategory === index
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="label-small">{category.category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Skills Display */}
            <div className="lg:col-span-3">
              <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                  {React.createElement(categoryIcons[technicalSkills[activeCategory].category], {
                    className: "w-6 h-6 text-green-500"
                  })}
                  <h3 className="text-regular">{technicalSkills[activeCategory].category}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {technicalSkills[activeCategory].skills.map((skill, skillIndex) => {
                    const level = skillLevels[skill] || 75;
                    return (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-body">{skill}</span>
                          <span className="label-small text-green-500">{level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2">
                          <div 
                            className="h-2 bg-green-500 transition-all duration-1000 ease-out"
                            style={{ width: `${level}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Showcase */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <div className="label mb-4">PROFESSIONAL CERTIFICATIONS</div>
              <h3 className="text-big mb-6">Industry Recognition</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockData.certifications.map((cert, index) => (
                <div key={index} className="card text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8 text-black" />
                  </div>
                  <div className="text-body font-medium mb-2">{cert.name}</div>
                  <div className="label-small text-gray-600 dark:text-gray-400 mb-2">{cert.issuer}</div>
                  <div className="label-small text-green-500">{cert.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;