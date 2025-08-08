// Mock data for Louie Sawyer's portfolio
export const mockData = {
  // Personal Information
  personalInfo: {
    name: "Louie Sawyer",
    title: "Infrastructure Engineer",
    experience: "12+ Years",
    location: "United Kingdom",
    email: "louie@sawyer-enterprises.co.uk",
    phone: "+44 7XXX XXX XXX",
    linkedIn: "https://linkedin.com/in/louie-sawyer", // To be updated later
    bio: "As a new father and a home-owner my career is critical to our lifestyle. I'm looking to cleanly demonstrate my skills, experience and aptitude towards the profession. I've covered everything from service-desk support (ITIL) functions, right through to server deployment/configuration. Got several years experience in networking including obtaining my CCNA. I studied the Just-IT programme too.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  },

  // Technical Skills
  technicalSkills: [
    {
      category: "Infrastructure",
      skills: ["Server Deployment", "Configuration Management", "Cloud Architecture", "Virtualization", "Storage Solutions"]
    },
    {
      category: "Networking", 
      skills: ["CCNA Certified", "Network Design", "Routing & Switching", "Network Security", "Load Balancing"]
    },
    {
      category: "ITIL & Support",
      skills: ["Service Desk Operations", "Incident Management", "Problem Resolution", "Change Management", "Asset Management"]
    },
    {
      category: "Technologies",
      skills: ["VMware vSphere", "Microsoft Azure", "AWS", "Linux/Windows Server", "Docker", "Kubernetes"]
    }
  ],

  // Professional Experience
  experience: [
    {
      id: 1,
      title: "Senior Infrastructure Engineer",
      company: "TechCorp Solutions Ltd",
      period: "2020 - Present",
      description: "Leading infrastructure modernization initiatives and managing enterprise-level server environments serving 500+ users.",
      achievements: [
        "Reduced system downtime by 40% through proactive monitoring implementation",
        "Led cloud migration project saving £200K annually in infrastructure costs",
        "Designed and implemented disaster recovery solutions with 99.9% uptime"
      ]
    },
    {
      id: 2,
      title: "Network Infrastructure Specialist",
      company: "DataFlow Networks",
      period: "2017 - 2020", 
      description: "Specialized in network design and implementation for medium to large enterprise clients.",
      achievements: [
        "Deployed secure network infrastructure for 50+ client sites",
        "Achieved CCNA certification and trained junior team members",
        "Improved network performance by 60% through optimisation projects"
      ]
    },
    {
      id: 3,
      title: "IT Support Engineer",
      company: "BusinessTech Services",
      period: "2012 - 2017",
      description: "Provided comprehensive ITIL-based support services and system administration.",
      achievements: [
        "Maintained 95%+ customer satisfaction rating",
        "Implemented automated ticketing system reducing response time by 50%",
        "Managed server infrastructure supporting 200+ users"
      ]
    }
  ],

  // Certifications
  certifications: [
    {
      name: "Cisco Certified Network Associate (CCNA)",
      issuer: "Cisco Systems",
      year: "2018",
      status: "Active"
    },
    {
      name: "ITIL Foundation Certificate",
      issuer: "AXELOS",
      year: "2015",
      status: "Active"
    },
    {
      name: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      year: "2021",
      status: "Active"
    },
    {
      name: "CompTIA Server+",
      issuer: "CompTIA",
      year: "2019",
      status: "Active"
    }
  ],

  // Featured Projects
  projects: [
    {
      id: 1,
      title: "Enterprise Cloud Migration",
      category: "Cloud Infrastructure",
      description: "Led complete migration of legacy on-premises infrastructure to Microsoft Azure, serving 500+ users with zero downtime during transition.",
      technologies: ["Microsoft Azure", "PowerShell", "ARM Templates", "Azure AD"],
      outcomes: "40% cost reduction, 99.9% uptime, improved scalability",
      status: "Completed",
      duration: "6 months"
    },
    {
      id: 2,
      title: "Network Security Overhaul",
      category: "Network Security",
      description: "Designed and implemented comprehensive network security solution including firewall configuration, VPN setup, and intrusion detection systems.",
      technologies: ["Cisco ASA", "Palo Alto", "pfSense", "SIEM Tools"],
      outcomes: "Zero security incidents, 60% faster network performance",
      status: "Completed",
      duration: "4 months"
    },
    {
      id: 3,
      title: "Automated Monitoring System",
      category: "Infrastructure Monitoring",
      description: "Developed automated monitoring and alerting system for critical infrastructure components using open-source and commercial tools.",
      technologies: ["Nagios", "Grafana", "PowerShell", "Python"],
      outcomes: "50% reduction in incident response time, proactive issue detection",
      status: "Ongoing",
      duration: "3 months"
    }
  ],

  // Contact form submissions (mock storage)
  contactSubmissions: []
};

export default mockData;