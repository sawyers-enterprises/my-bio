# Domain & Permissions Configuration Guide

## 🌐 **Domain Configuration Status:**

### **Current Routes in wrangler.toml:**
```toml
routes = [
  # Primary subdomain access (FQDN format you requested)
  { pattern = "louie.sawyer-enterprises.co.uk/*", zone_name = "sawyer-enterprises.co.uk" },
  { pattern = "louie.sawyer-enterprises.uk/*", zone_name = "sawyer-enterprises.uk" },
  
  # Root domain access (optional - handles sawyer-enterprises.co.uk directly)
  { pattern = "sawyer-enterprises.co.uk/*", zone_name = "sawyer-enterprises.co.uk" },
  { pattern = "sawyer-enterprises.uk/*", zone_name = "sawyer-enterprises.uk" }
]
```

## 🔐 **Required Cloudflare API Token Permissions:**

### **For Deployment to Work, Your API Token MUST Have:**

1. **Zone Permissions:**
   ```
   Zone:Zone:Read - sawyer-enterprises.co.uk
   Zone:Zone:Read - sawyer-enterprises.uk
   ```

2. **Workers Permissions:**
   ```
   Account:Cloudflare Workers:Edit
   Account:Workers Scripts:Edit  
   Account:Workers Routes:Edit
   ```

3. **Zone Resources:**
   ```
   Include: sawyer-enterprises.co.uk
   Include: sawyer-enterprises.uk
   ```

## ✅ **Prerequisites for Successful Deployment:**

### **1. Domains Added to Cloudflare:**
- ✅ `sawyer-enterprises.co.uk` must be added as a zone in your Cloudflare account
- ✅ `sawyer-enterprises.uk` must be added as a zone in your Cloudflare account

### **2. DNS Configuration:**
Once deployed, add these DNS records in Cloudflare:
```
Type: CNAME
Name: louie
Target: louie-sawyer-portfolio.workers.dev
TTL: Auto
```

### **3. Nameservers:**
Your domain registrar must point to Cloudflare nameservers for both domains.

## 🚨 **Common Deployment Errors & Fixes:**

### **❌ "Zone not found" Error:**
**Cause:** Domain not added to Cloudflare account
**Fix:** Go to Cloudflare Dashboard → Add Site → Enter domain

### **❌ "Insufficient permissions" Error:**
**Cause:** API token lacks zone permissions
**Fix:** Update API token with Zone:Read permissions for both domains

### **❌ "Route already exists" Error:**
**Cause:** Another worker is using the same route
**Fix:** Check Workers dashboard for conflicting routes

## 🎯 **Expected Deployment Flow:**

### **If Everything is Configured:**
1. ✅ Wrangler validates zone permissions
2. ✅ Worker deploys successfully
3. ✅ Routes are created for all 4 patterns
4. ✅ Portfolio accessible at `https://louie.sawyer-enterprises.co.uk`

### **If Zones Missing:**
1. ❌ Error: "Zone sawyer-enterprises.co.uk not found"
2. 📝 Action needed: Add domains to Cloudflare

## 🔧 **Quick Setup Checklist:**

- [ ] **sawyer-enterprises.co.uk** added to Cloudflare account
- [ ] **sawyer-enterprises.uk** added to Cloudflare account  
- [ ] **Nameservers** updated at domain registrar
- [ ] **API token** has Zone:Read + Workers:Edit permissions
- [ ] **CLOUDFLARE_ACCOUNT_ID** matches account with domains
- [ ] **DNS propagation** complete (if recently changed)

## 🚀 **Post-Deployment:**

Once deployed successfully, the portfolio will be accessible at:
- **Primary**: `https://louie.sawyer-enterprises.co.uk`
- **Alternative**: `https://louie.sawyer-enterprises.uk`
- **Root redirects**: Both root domains will also work

**Run deployment now - it will either succeed or give specific error about missing zones/permissions!** 🎯