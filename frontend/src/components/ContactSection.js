import React, { useState } from 'react';
import { mockData } from '../data/mock';
import { Mail, Phone, MapPin, Send, CheckCircle, ExternalLink } from 'lucide-react';

const ContactSection = () => {
  const { personalInfo } = mockData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission - in real app, this would connect to backend
    setTimeout(() => {
      mockData.contactSubmissions.push({
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
      });
      
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="label mb-4">GET IN TOUCH</div>
            <h2 className="title-big mb-8">CONTACT</h2>
            <div className="text-big max-w-3xl mx-auto">
              Ready to discuss your infrastructure needs? Let's connect and 
              explore how I can contribute to your team's success
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <div className="label mb-8">CONTACT INFORMATION</div>
              
              {/* Contact Cards */}
              <div className="space-y-6 mb-12">
                <div className="card flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="label-small mb-1">EMAIL</div>
                    <div className="text-body">{personalInfo.email}</div>
                  </div>
                </div>

                <div className="card flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="label-small mb-1">PHONE</div>
                    <div className="text-body">{personalInfo.phone}</div>
                  </div>
                </div>

                <div className="card flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="label-small mb-1">LOCATION</div>
                    <div className="text-body">{personalInfo.location}</div>
                  </div>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="label-small mb-2">PROFESSIONAL NETWORK</div>
                    <div className="text-body mb-2">Connect on LinkedIn</div>
                    <div className="text-body text-gray-600 dark:text-gray-400">
                      View my complete professional profile and network
                    </div>
                  </div>
                  <ExternalLink className="w-6 h-6 text-green-500" />
                </div>
              </div>

              {/* Availability */}
              <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="label mb-3 text-green-800 dark:text-green-200">AVAILABILITY</div>
                <div className="text-body text-green-800 dark:text-green-200">
                  Currently open to new opportunities and contract work. 
                  Typically respond within 24 hours.
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="label mb-8">SEND A MESSAGE</div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="label-small block mb-3">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-body focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="label-small block mb-3">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-body focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="label-small block mb-3">
                    COMPANY / ORGANISATION
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-body focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="label-small block mb-3">
                    SUBJECT *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-body focus:border-green-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="job-opportunity">Job Opportunity</option>
                    <option value="contract-work">Contract Work</option>
                    <option value="consultation">Technical Consultation</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="label-small block mb-3">
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-body focus:border-green-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project, opportunity, or how I can help..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-accent flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full"></div>
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>

                  {submitStatus === 'success' && (
                    <div className="flex items-center space-x-2 text-green-500">
                      <CheckCircle className="w-5 h-5" />
                      <span className="label-small">MESSAGE SENT SUCCESSFULLY!</span>
                    </div>
                  )}
                </div>

                <div className="text-body text-gray-600 dark:text-gray-400 text-sm">
                  * Required fields. I typically respond within 24 hours.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;