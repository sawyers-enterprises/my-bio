import React from 'react';
import { mockData } from '../data/mock';
import { Award, Users, Lightbulb } from 'lucide-react';

const AboutSection = () => {
  const { personalInfo, certifications } = mockData;

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="label mb-4">WHO I AM</div>
            <h2 className="title-big mb-8">ABOUT</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image */}
            <div className="relative">
              <div className="aspect-square overflow-hidden bg-gray-200 dark:bg-gray-800 hover:transform hover:scale-105 transition-transform duration-300">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-green-500 -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500 -z-10"></div>
            </div>

            {/* Content */}
            <div>
              <div className="text-big mb-8">
                Building robust infrastructure solutions for modern enterprises
              </div>
              
              <div className="text-body mb-8 leading-relaxed">
                {personalInfo.bio}
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="label-small">CERTIFIED</div>
                    <div className="text-body">CCNA & ITIL</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 flex items-center justify-center">
                    <Users className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="label-small">LEADERSHIP</div>
                    <div className="text-body">Team Lead</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="label-small">INNOVATION</div>
                    <div className="text-body">Solution-First</div>
                  </div>
                </div>
              </div>

              {/* Current Certifications */}
              <div>
                <div className="label mb-4">CURRENT CERTIFICATIONS</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {certifications.map((cert, index) => (
                    <div 
                      key={index}
                      className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 hover:border-green-500 transition-colors"
                    >
                      <div className="text-body font-medium mb-1">{cert.name}</div>
                      <div className="label-small text-gray-600 dark:text-gray-400">{cert.issuer} • {cert.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;