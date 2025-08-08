# Louie Sawyer - Infrastructure Engineer Portfolio

A modern, professional portfolio website showcasing 12+ years of infrastructure engineering expertise. Built with React and designed for easy maintenance and updates.

![Portfolio Preview](https://via.placeholder.com/800x400?text=Portfolio+Preview)

## 🚀 Live Website

- **Production URL**: `https://your-domain.com` (to be configured)
- **Cloudflare Pages**: Automatic deployment from GitHub

## 📋 Table of Contents

- [Quick Start for Louie](#quick-start-for-louie)
- [Updating Your Portfolio Content](#updating-your-portfolio-content)
- [Development Setup](#development-setup)
- [Deployment](#deployment)
- [GitHub Workflow](#github-workflow)
- [Customisation Guide](#customisation-guide)
- [Troubleshooting](#troubleshooting)

## 🎯 Quick Start for Louie

### What You'll Need

1. **GitHub Account** - [Sign up here](https://github.com/signup) if you don't have one
2. **VSCode** - [Download here](https://code.visualstudio.com/) (free code editor)
3. **Node.js** - [Download here](https://nodejs.org/) (choose LTS version 20+)
4. **Git** - [Download here](https://git-scm.com/) (version control)

### Initial Setup (One-time only)

1. **Install VSCode Extensions** (for easier editing):
   - Open VSCode
   - Go to Extensions (Ctrl+Shift+X)
   - Install these extensions:
     - "ES7+ React/Redux/React-Native snippets"
     - "Prettier - Code formatter"
     - "GitLens"
     - "Auto Rename Tag"

2. **Clone Your Repository**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/louie-sawyer-portfolio.git
   cd louie-sawyer-portfolio
   ```

3. **Install Dependencies**:
   ```bash
   cd frontend
   yarn install
   ```

4. **Start Development Server**:
   ```bash
   yarn start
   ```
   Your website will open at `http://localhost:3000`

## ✏️ Updating Your Portfolio Content

### Main Content File: `frontend/src/data/mock.js`

This is the **ONLY** file you need to edit to update your portfolio content. All your information is stored here in a simple, readable format.

#### 1. Update Personal Information

```javascript
personalInfo: {
  name: "Louie Sawyer",
  title: "Infrastructure Engineer", 
  experience: "12+ Years",
  location: "United Kingdom",
  email: "your-email@example.com", // ← Update this
  phone: "+44 7XXX XXX XXX", // ← Update this
  linkedIn: "https://linkedin.com/in/your-profile", // ← Update this
  bio: "Your updated bio text here...", // ← Update this
  avatar: "https://your-photo-url.jpg" // ← Update this
}
```

#### 2. Update Technical Skills

```javascript
technicalSkills: [
  {
    category: "Infrastructure",
    skills: ["Server Deployment", "Add New Skills Here", "etc..."]
  },
  // Add new categories or modify existing ones
]
```

#### 3. Add New Work Experience

```javascript
experience: [
  {
    id: 1,
    title: "Your New Job Title", // ← Update
    company: "Company Name", // ← Update
    period: "2023 - Present", // ← Update
    description: "Brief description of your role...", // ← Update
    achievements: [
      "Achievement 1", // ← Update
      "Achievement 2", // ← Update
      "Achievement 3"  // ← Update
    ]
  },
  // Add more jobs by copying this structure
]
```

#### 4. Update Projects

```javascript
projects: [
  {
    id: 1,
    title: "Your Project Name", // ← Update
    category: "Infrastructure", // ← Update
    description: "Project description...", // ← Update
    technologies: ["Tech 1", "Tech 2"], // ← Update
    outcomes: "What you achieved...", // ← Update
    status: "Completed", // ← Update
    duration: "6 months" // ← Update
  },
  // Add more projects by copying this structure
]
```

#### 5. Update Certifications

```javascript
certifications: [
  {
    name: "Your Certification Name", // ← Update
    issuer: "Issuing Organisation", // ← Update
    year: "2024", // ← Update
    status: "Active" // ← Update
  },
  // Add more certifications
]
```

### How to Update Your Photo

1. **Option 1 - Use a URL**:
   - Upload your photo to a service like [Imgur](https://imgur.com/) or use your LinkedIn photo
   - Copy the direct image URL
   - Update the `avatar` field in `personalInfo`

2. **Option 2 - Use a local file**:
   - Add your photo to `frontend/public/images/`
   - Update avatar to: `"/images/your-photo.jpg"`

## 🛠️ Development Setup

### Running Locally

1. **Frontend Only** (for content updates):
   ```bash
   cd frontend
   yarn start
   ```

2. **Full Stack** (if backend features are added later):
   ```bash
   # Terminal 1 - Backend
   cd backend
   pip install -r requirements.txt
   uvicorn server:app --reload

   # Terminal 2 - Frontend  
   cd frontend
   yarn start
   ```

### Making Changes

1. **Edit content** in `frontend/src/data/mock.js`
2. **Save the file** (Ctrl+S)
3. **Your browser will automatically refresh** with changes
4. **Preview your changes** before publishing

## 🌐 Deployment

Your website automatically deploys to Cloudflare Pages when you push changes to GitHub.

### GitHub Workflow

1. **Make your changes** in VSCode
2. **Save all files** (Ctrl+Shift+S)
3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Updated bio and experience"
   git push origin main
   ```
4. **Your website will update automatically** in 2-3 minutes

### Setting Up Custom Domain

1. **In Cloudflare Dashboard**:
   - Go to your Pages project
   - Click "Custom domains"
   - Add your domain (e.g., `louiesawyer.com`)
   - Follow the DNS instructions

2. **HTTPS is automatic** - Cloudflare handles SSL certificates

## 📁 Project Structure

```
louie-sawyer-portfolio/
├── README.md                 # This file
├── frontend/                 # Website code
│   ├── public/              # Static files
│   ├── src/
│   │   ├── data/
│   │   │   └── mock.js      # ← YOUR CONTENT FILE
│   │   ├── components/      # Website sections
│   │   └── contexts/        # Theme system
├── backend/                 # API (if needed later)
└── .github/
    └── workflows/
        └── deploy.yml       # Auto-deployment
```

## 🎨 Customisation Guide

### Changing Colors

Edit `frontend/src/App.css` and modify these CSS variables:

```css
:root {
  --accent-primary: #38FF62;     /* Main green color */
  --text-primary: #232323;       /* Main text color */
  --color-background: #F2F2F2;   /* Background color */
}
```

### Adding New Sections

1. Create a new component in `frontend/src/components/`
2. Add it to `frontend/src/App.js`
3. Update navigation in `frontend/src/components/Header.js`

### Changing Fonts

Update the font imports in `frontend/src/App.css`:

```css
/* Replace 'Inter' with your preferred font */
font-family: 'Your Font', ui-sans-serif, system-ui, sans-serif;
```

## 📝 Common Updates

### Adding a New Job

1. Open `frontend/src/data/mock.js`
2. Find the `experience` array
3. Add a new job at the top:

```javascript
{
  id: 4, // Use next available ID
  title: "Senior Infrastructure Engineer",
  company: "New Company Ltd",
  period: "2024 - Present",
  description: "Leading cloud infrastructure initiatives...",
  achievements: [
    "Migrated 100+ servers to cloud",
    "Reduced costs by 30%",
    "Improved uptime to 99.9%"
  ]
}
```

### Adding a New Certification

```javascript
{
  name: "AWS Solutions Architect",
  issuer: "Amazon Web Services",
  year: "2024",
  status: "Active"
}
```

### Updating Your Bio

Simply replace the text in the `bio` field under `personalInfo`.

## 🔧 Troubleshooting

### Website Not Loading
- Check if Node.js is installed: `node --version`
- Check if Yarn is installed: `yarn --version`
- Make sure you're in the `frontend` folder
- Run `yarn install` then `yarn start`

### Changes Not Showing
- Save all files (Ctrl+Shift+S)
- Check browser developer console for errors (F12)
- Clear browser cache (Ctrl+Shift+R)

### Deployment Issues
- Check GitHub Actions tab for build errors
- Ensure all changes are committed and pushed
- Verify Cloudflare Pages is connected to your repository

### Getting Help
1. **Check the browser console** (F12) for error messages
2. **Search GitHub Issues** for similar problems
3. **Create a new issue** with details about your problem

## 🚀 Advanced Features (Future)

### Contact Form Backend
- Currently stores submissions locally
- Can be upgraded to email notifications
- Database integration for lead management

### Blog Section
- Add a blog for technical articles
- SEO optimization
- Social media integration

### Analytics
- Google Analytics integration
- Visitor tracking
- Performance monitoring

## 📞 Need Help?

1. **Create a GitHub Issue**: Describe your problem with screenshots
2. **Create a GitHub Issue**: Describe your problem with screenshots
3. **Documentation**: Re-read this README for common solutions

---

*Last Updated: January 2025*
