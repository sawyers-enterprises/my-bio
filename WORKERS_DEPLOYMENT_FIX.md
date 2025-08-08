# Cloudflare Workers Deployment Troubleshooting

## 🔧 **Fixed Issues in deploy-worker.yml:**

### **Problem 1: Conflicting Configuration**
- **Issue**: `wrangler.toml` had both static site config (`[site]`) and worker script (`main`) causing conflicts
- **Fix**: Properly configured for Workers Sites with static asset handling

### **Problem 2: Missing Dependencies** 
- **Issue**: Wrangler CLI not installed in workflow
- **Fix**: Added proper root dependency installation with latest Wrangler version

### **Problem 3: Wrong Asset Handling**
- **Issue**: Worker script couldn't properly serve React static files
- **Fix**: Updated worker to use `serveSinglePageApp` from `@cloudflare/kv-asset-handler`

### **Problem 4: Removed Python Backend**
- **Issue**: Workflow was trying to install Python dependencies that aren't needed for Workers
- **Fix**: Removed Python setup since we're using JavaScript Worker for both frontend and backend

## ✅ **Current Configuration:**

### **wrangler.toml:**
```toml
name = "louie-sawyer-portfolio"
compatibility_date = "2024-01-01"
main = "./worker/index.js"

[site]
bucket = "./frontend/build"
entry-point = "./worker"

routes = [
  { pattern = "louie.sawyer-enterprises.co.uk/*", zone_name = "sawyer-enterprises.co.uk" },
  { pattern = "louie.sawyer-enterprises.uk/*", zone_name = "sawyer-enterprises.uk" }
]
```

### **Workflow Steps:**
1. ✅ **Checkout code**
2. ✅ **Setup Node.js 20 with Yarn cache**
3. ✅ **Install root dependencies** (including Wrangler 3.78.0)
4. ✅ **Build React frontend**
5. ✅ **Deploy to Cloudflare Workers** with proper config

### **Worker Features:**
- ✅ **Static asset serving** for React app
- ✅ **API endpoints** for contact form
- ✅ **CORS handling** for frontend/backend communication
- ✅ **Email integration** ready for Resend/SendGrid
- ✅ **React Router support** with SPA fallback
- ✅ **Error handling** with graceful fallbacks

## 🚀 **Next Deployment Should:**

1. **Install Wrangler properly** from root package.json
2. **Build React assets** in frontend/build
3. **Deploy Worker** with static site configuration
4. **Handle routing** for both domains (.co.uk and .uk)
5. **Serve full-stack app** from single Worker

## 📋 **Required Secrets:**
- ✅ `CLOUDFLARE_API_TOKEN` (with Workers:Edit permission)
- ✅ `CLOUDFLARE_ACCOUNT_ID`
- 🔜 `RESEND_API_KEY` (optional, for contact form emails)

## 🔍 **If Still Failing, Check:**
1. **Account ID correct** in GitHub secrets
2. **API token permissions** include Workers:Edit
3. **Domain zones exist** in Cloudflare dashboard
4. **Worker name unique** across your account

The deployment should now work correctly! 🎉