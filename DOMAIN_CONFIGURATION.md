# Domain Configuration Guide

## 🌐 **Louie's Domains**

Louie has purchased the following domains:
- **sawyer-enterprises.co.uk** (primary)
- **sawyer-enterprises.uk** (secondary)

## 📍 **FQDN Structure**

The portfolio will be accessible at:
- **Primary**: `louie.sawyer-enterprises.co.uk`
- **Secondary**: `louie.sawyer-enterprises.uk`

## ⚙️ **DNS Configuration Required**

### For both domains, set up these DNS records:

#### sawyer-enterprises.co.uk:
```
Type: CNAME
Name: louie
Target: louie-sawyer-portfolio.pages.dev
TTL: Auto
```

#### sawyer-enterprises.uk:
```
Type: CNAME  
Name: louie
Target: louie-sawyer-portfolio.pages.dev
TTL: Auto
```

## 🚀 **Cloudflare Worker Routes**

The `wrangler.toml` is configured to handle:
```toml
routes = [
  { pattern = "louie.sawyer-enterprises.co.uk/*", zone_name = "sawyer-enterprises.co.uk" },
  { pattern = "louie.sawyer-enterprises.uk/*", zone_name = "sawyer-enterprises.uk" },
  { pattern = "sawyer-enterprises.co.uk/*", zone_name = "sawyer-enterprises.co.uk" },
  { pattern = "sawyer-enterprises.uk/*", zone_name = "sawyer-enterprises.uk" }
]
```

**This means:**
- ✅ `louie.sawyer-enterprises.co.uk` → Main portfolio
- ✅ `louie.sawyer-enterprises.uk` → Alternative access
- ✅ `sawyer-enterprises.co.uk` → Redirects to louie subdomain
- ✅ `sawyer-enterprises.uk` → Redirects to louie subdomain

## 📧 **Email Configuration**

**Business email**: `louie@sawyer-enterprises.co.uk`
- Contact form notifications will be sent here
- Professional communication address

## 🔧 **Setup Steps**

### 1. Add Domains to Cloudflare
1. **sawyer-enterprises.co.uk**:
   - Add to Cloudflare as a new site
   - Update nameservers at registrar
   
2. **sawyer-enterprises.uk**:
   - Add to Cloudflare as a new site  
   - Update nameservers at registrar

### 2. Configure DNS Records
For **both domains**, add the CNAME record:
```
Name: louie
Target: louie-sawyer-portfolio.pages.dev
```

### 3. SSL Certificates
Cloudflare will automatically:
- Generate SSL certificates for both domains
- Handle HTTPS redirects
- Manage certificate renewal

### 4. Deploy Worker
The GitHub Actions workflow will:
- Build the React frontend
- Deploy to Cloudflare Workers
- Configure routes for both domains
- Enable HTTPS on both endpoints

## 🌍 **Final Result**

After setup, users can access the portfolio at:
- **https://louie.sawyer-enterprises.co.uk** (primary)
- **https://louie.sawyer-enterprises.uk** (alternative)

Both domains will serve the same portfolio with:
- ✅ Full-stack functionality
- ✅ Working contact form  
- ✅ Email notifications to louie@sawyer-enterprises.co.uk
- ✅ Enterprise-grade HTTPS security
- ✅ Global CDN performance