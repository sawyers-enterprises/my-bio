# GitHub Setup and Cloudflare Deployment Guide

This guide will help Louie set up GitHub repository and configure automatic deployment to Cloudflare Pages with custom domain and HTTPS.

## 🔧 Initial GitHub Setup

### 1. Create GitHub Repository

1. **Go to GitHub** and sign in: [github.com](https://github.com)
2. **Click "New repository"** (green button or + icon)
3. **Repository settings**:
   - **Repository name**: `louie-sawyer-portfolio`
   - **Description**: `Professional infrastructure engineer portfolio`
   - **Visibility**: Public (recommended) or Private
   - **Initialize**: ✅ Add a README file
   - **Add .gitignore**: Node
   - **Choose a licence**: MIT Licence (recommended)

### 2. Clone and Push Your Code

```bash
# Clone the new repository
git clone https://github.com/YOUR-USERNAME/louie-sawyer-portfolio.git
cd louie-sawyer-portfolio

# Copy your project files here
# (Copy all files from your development folder)

# Add all files to git
git add .

# Commit the files
git commit -m "Initial portfolio setup with React frontend"

# Push to GitHub
git push origin main
```

## ☁️ Cloudflare Pages Setup

### 1. Create Cloudflare Account

1. **Go to Cloudflare**: [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Sign up** for a free account
3. **Verify your email** address

### 2. Create Pages Project

**IMPORTANT: Create the project FIRST before GitHub Actions can deploy to it.**

1. **In Cloudflare Dashboard**:
   - Go to **Pages** (left sidebar)
   - Click **"Create a project"**
   - Choose **"Upload assets"** (we'll switch to Git later)

2. **Project Setup**:
   ```
   Project name: louie-sawyer-portfolio
   ```
   - Upload any dummy file (like a simple index.html)
   - Click **"Create project"**

3. **Switch to Git Integration** (after creation):
   - Go to project settings
   - Click **"Connect to Git"**
   - Choose your GitHub repository
   - Configure build settings:
     ```
     Build command: cd frontend && yarn build
     Build output directory: frontend/build
     ```

4. **Environment Variables** (if needed):
   ```
   NODE_VERSION: 20
   CI: false
   GENERATE_SOURCEMAP: false
   ```

5. **Click "Save and Deploy"**

### 3. Get Required Secrets

**For GitHub Actions to work, you need these secrets:**

1. **Cloudflare Account ID**:
   - In Cloudflare Dashboard → Right sidebar → Copy Account ID

2. **Cloudflare API Token**:
   - Go to **My Profile** (top right) → **API Tokens**
   - Click **"Create Token"**
   - Use **"Custom Token"**:
     ```
     Token name: GitHub Pages Deploy
     Permissions:
       - Account:Cloudflare Pages:Edit (REQUIRED)
       - Zone:Zone:Read (if using custom domain)
       - Zone:Page Rules:Edit (if using custom domain)  
     Account Resources: Include - Your Account
     Zone Resources: Include - All zones (if using custom domain)
     ```
   - **Copy the token** (you'll only see it once!)
   
   **⚠️ IMPORTANT**: The token MUST have `Cloudflare Pages:Edit` permission to create/deploy projects.

### 4. Add Secrets to GitHub

1. **In your GitHub repository**:
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Click **"New repository secret"**

2. **Add these secrets**:
   ```
   CLOUDFLARE_ACCOUNT_ID: (paste your Account ID)
   CLOUDFLARE_API_TOKEN: (paste your API token)
   ```

## 🌐 Custom Domain Setup

### Option 1: Domain Already on Cloudflare

If your domain (e.g., `louie.sawyer-enterprises.co.uk`) is already managed by Cloudflare:

1. **In Cloudflare Pages**:
   - Go to your Pages project
   - Click **"Custom domains"**
   - Click **"Set up a custom domain"**
   - Enter your domain: `louie.sawyer-enterprises.co.uk`
   - Add alternative domain: `louie.sawyer-enterprises.uk`
   - Click **"Continue"**
   - Cloudflare will automatically create DNS records

### Option 2: External Domain Provider

If your domain is with another provider (GoDaddy, Namecheap, etc.):

1. **Get Cloudflare DNS settings**:
   - In Pages → Custom domains → Add domain
   - Cloudflare will show you CNAME records to add

2. **In your domain provider's dashboard**:
   ```
   Type: CNAME
   Name: louie
   Value: louie-sawyer-portfolio.pages.dev

   Type: CNAME  
   Name: louie
   Value: louie-sawyer-portfolio.pages.dev
   ```

3. **Wait for DNS propagation** (can take up to 48 hours)

### Option 3: Transfer Domain to Cloudflare (Recommended)

This gives you full control and better performance:

1. **In Cloudflare Dashboard**:
   - Click **"Add site"**
   - Enter your domain name
   - Choose **Free plan**
   - Cloudflare will scan your DNS records

2. **Update Nameservers**:
   - Cloudflare will show you 2 nameservers
   - Go to your domain registrar
   - Replace existing nameservers with Cloudflare's
   - Wait for DNS propagation (up to 24 hours)

3. **Add Pages DNS Record**:
   - In Cloudflare DNS → Add record:
   ```
   Type: CNAME
   Name: louie 
   Target: louie-sawyer-portfolio.pages.dev
   ```

## 🔐 HTTPS Configuration

**HTTPS is automatic with Cloudflare!** No additional configuration needed.

**What Cloudflare does automatically**:
- ✅ Generates SSL certificate for your domain
- ✅ Forces HTTPS redirects  
- ✅ Automatically renews certificates
- ✅ Provides HTTP/2 and HTTP/3 support
- ✅ DDoS protection and CDN caching

**Additional Security Settings** (optional):

1. **SSL/TLS Settings**:
   - Go to **SSL/TLS** → **Overview**
   - Set encryption mode to **"Full (strict)"**

2. **Security Settings**:
   - Go to **SSL/TLS** → **Edge Certificates**
   - Enable **"Always Use HTTPS"**
   - Enable **"HTTP Strict Transport Security (HSTS)"**

## 🚀 Deployment Workflow

Once everything is set up, your deployment workflow will be:

### Automatic Deployment

1. **Make changes** to your code
2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Updated bio and added new certification"
   git push origin main
   ```
3. **GitHub Actions automatically**:
   - Builds your React app
   - Deploys to Cloudflare Pages
   - Your website updates in 2-3 minutes

### Manual Deployment (if needed)

1. **In Cloudflare Pages**:
   - Go to your project
   - Click **"Create deployment"**
   - Select branch and deploy

## 🔍 Monitoring and Maintenance

### Check Deployment Status

1. **GitHub Actions**:
   - Go to your repo → **Actions** tab
   - See build status and logs

2. **Cloudflare Pages**:
   - Dashboard shows deployment history
   - Click deployments to see build logs

### Performance Monitoring

**Cloudflare provides built-in analytics**:
- Page views and unique visitors
- Bandwidth usage
- Performance metrics
- Geographic distribution

### Custom Analytics (Optional)

Add Google Analytics to your portfolio:

1. **Get Google Analytics tracking ID**
2. **Add to your React app**:
   ```javascript
   // In frontend/public/index.html
   <!-- Global site tag (gtag.js) - Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

## ⚡ Performance Optimisations

Cloudflare automatically provides:

- **Global CDN**: Content served from 200+ locations worldwide
- **Image optimisation**: Automatic image compression and WebP conversion
- **Minification**: Automatic CSS, JS, and HTML minification  
- **Caching**: Smart caching for faster load times
- **Mobile optimisation**: Optimised delivery for mobile devices

## 🆘 Troubleshooting

### Deployment Fails

1. **Check GitHub Actions logs**:
   - Go to Actions tab in your repository
   - Click on failed workflow
   - Check error messages

2. **Common issues**:
   - **Build fails**: Check Node.js version and dependencies
   - **Secrets missing**: Verify CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID
   - **Build directory wrong**: Should be `frontend/build`

### Domain Not Working

1. **Check DNS propagation**: [whatsmydns.net](https://www.whatsmydns.net)
2. **Verify CNAME records** point to your Pages domain
3. **Check SSL certificate status** in Cloudflare Dashboard

### SSL Certificate Issues

1. **Wait 24 hours** for automatic certificate generation
2. **Check domain ownership** verification
3. **Try purging Cloudflare cache**

## 📞 Support Resources

- **Cloudflare Docs**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages/)
- **GitHub Actions Docs**: [docs.github.com/actions](https://docs.github.com/actions)
- **Cloudflare Community**: [community.cloudflare.com](https://community.cloudflare.com)

---

**🎉 Congratulations!** Your portfolio will now automatically deploy to louie.sawyer-enterprises.co.uk with enterprise-grade HTTPS security every time you push changes to GitHub.