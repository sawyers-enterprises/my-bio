import React, { useState } from 'react';
import { mockData } from '../data/mock';
import { ExternalLink, Calendar, Users, CheckCircle, Clock } from 'lucide-react';

const ProjectsSection = () => {
  const { projects } = mockData;
  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Ongoing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-500';
      case 'Ongoing':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="label mb-4">SELECTED WORK</div>
            <h2 className="title-big mb-8">PROJECTS</h2>
            <div className="text-big max-w-3xl mx-auto">
              Featured infrastructure projects demonstrating technical expertise 
              and business impact across enterprise environments
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="card group cursor-pointer h-full"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(project.status)}
                    <span className={`label-small ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-green-500" />
                </div>

                {/* Category Badge */}
                <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 mb-4">
                  <span className="label-small">{project.category}</span>
                </div>

                {/* Title & Description */}
                <h3 className="text-regular mb-4 group-hover:text-green-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-body mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="label-small mb-2">TECHNOLOGIES</div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs border"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs border">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mt-auto">
                  <Calendar className="w-4 h-4" />
                  <span className="label-small">{project.duration}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Project Modal/Detail */}
          {selectedProject && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-900 max-w-4xl w-full max-h-[90vh] overflow-y-auto border">
                <div className="p-8">
                  {/* Modal Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        {getStatusIcon(selectedProject.status)}
                        <span className={`label ${getStatusColor(selectedProject.status)}`}>
                          {selectedProject.status}
                        </span>
                        <span className="label">•</span>
                        <span className="label">{selectedProject.category}</span>
                      </div>
                      <h2 className="title-big mb-4">{selectedProject.title}</h2>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="btn-ghost"
                    >
                      CLOSE
                    </button>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                      <div className="label mb-4">PROJECT OVERVIEW</div>
                      <p className="text-body mb-8 leading-relaxed">
                        {selectedProject.description}
                      </p>

                      {/* Technologies Used */}
                      <div className="mb-8">
                        <div className="label mb-4">TECHNOLOGIES USED</div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {selectedProject.technologies.map((tech, index) => (
                            <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 text-center">
                              <span className="text-body">{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div>
                        <div className="label mb-4">KEY OUTCOMES</div>
                        <p className="text-body leading-relaxed">
                          {selectedProject.outcomes}
                        </p>
                      </div>
                    </div>

                    {/* Project Stats */}
                    <div>
                      <div className="card">
                        <div className="label mb-6">PROJECT DETAILS</div>
                        
                        <div className="space-y-6">
                          <div>
                            <div className="label-small mb-2">DURATION</div>
                            <div className="text-body">{selectedProject.duration}</div>
                          </div>

                          <div>
                            <div className="label-small mb-2">STATUS</div>
                            <div className={`text-body ${getStatusColor(selectedProject.status)}`}>
                              {selectedProject.status}
                            </div>
                          </div>

                          <div>
                            <div className="label-small mb-2">CATEGORY</div>
                            <div className="text-body">{selectedProject.category}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center">
            <div className="text-body mb-6">
              Interested in seeing more detailed case studies or discussing similar projects?
            </div>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="btn-accent"
            >
              DISCUSS YOUR PROJECT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;