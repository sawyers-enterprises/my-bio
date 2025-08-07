import React from 'react';
import { mockData } from '../data/mock';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

const ExperienceSection = () => {
  const { experience } = mockData;

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="label mb-4">CAREER JOURNEY</div>
            <h2 className="title-big mb-8">EXPERIENCE</h2>
            <div className="text-big max-w-3xl mx-auto">
              12+ years of progressive growth in infrastructure engineering,
              from support specialist to senior technical leader
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-green-500"></div>

            {experience.map((job, index) => (
              <div key={job.id} className="relative mb-16 last:mb-0">
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-green-500 border-4 border-white dark:border-gray-900 rounded-full z-10"></div>

                {/* Content */}
                <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-1/2 md:pr-8' : 'md:ml-1/2 md:pl-8'}`}>
                  <div className="card group">
                    {/* Job Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-regular mb-2">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-body text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{job.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-body mb-6 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Achievements */}
                    <div>
                      <div className="label mb-4">KEY ACHIEVEMENTS</div>
                      <ul className="space-y-3">
                        {job.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start space-x-3">
                            <ChevronRight className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-body">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hover Effect Accent */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="text-body mb-6">
              Ready to bring this experience to your next infrastructure project?
            </div>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="btn-accent"
            >
              LET'S DISCUSS OPPORTUNITIES
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;