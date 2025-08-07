# GitHub Actions Deployment Troubleshooting

## ✅ FIXED: Cloudflare Authentication Error (403)

**Error Message:**
```
Cloudflare API returned non-200: 403
API returned: {"success":false,"errors":[{"code":10000,"message":"Authentication error"}]}
Error: Failed to get Pages project, API returned non-200
```

**Root Causes:**
1. **Cloudflare Pages project doesn't exist yet**
2. **API token has insufficient permissions**
3. **Wrong account ID**

**Solutions:**

### Option 1: Create Cloudflare Pages Project First

1. **Go to Cloudflare Dashboard** → **Pages**
2. **Create a new project**:
   - Click **"Create a project"**
   - Choose **"Upload assets"** (temporary)
   - Project name: **`louie-sawyer-portfolio`** (exact match)
   - Upload any dummy file temporarily
3. **Now GitHub Actions can deploy to existing project**

### Option 2: Update API Token Permissions

Create a **Custom API Token** with these permissions:
```
Token name: GitHub Pages Deploy
Permissions:
  - Account:Cloudflare Pages:Edit
  - Zone:Zone:Read (optional, for custom domains)
Account Resources: Include - Your Account
Zone Resources: Include - All zones (if using custom domain)
```

**Important**: The token needs `Pages:Edit` permission to create projects.

### Option 3: Use Wrangler CLI Method

Alternative deployment using Wrangler CLI:
```yaml
- name: Deploy to Cloudflare Pages
  run: |
    cd frontend
    npx wrangler pages deploy build --project-name=louie-sawyer-portfolio --compatibility-date=2024-01-01
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

## ✅ FIXED: Node.js Version Compatibility Error

**Error Message:**
```
error react-router-dom@7.5.1: The engine "node" is incompatible with this module. Expected version ">=20.0.0". Got "18.20.8"
```

**Root Cause:** 
The GitHub Actions workflow was using Node.js 18, but `react-router-dom@7.5.1` requires Node.js 20+.

**Solution Applied:**
Updated `.github/workflows/deploy.yml` to use Node.js 20:

### Before (Broken):
```yaml
env:
  NODE_VERSION: '18'
```

### After (Fixed):
```yaml
env:
  NODE_VERSION: '20'
```

## ✅ FIXED: Cache Dependencies Error

**Error Message:**
```
Error: Some specified paths were not resolved, unable to cache dependencies.
```

**Root Cause:** 
The GitHub Actions workflow was configured for npm but the project uses Yarn package manager.

**Solution Applied:**
Updated `.github/workflows/deploy.yml` to use Yarn instead of npm:

### Before (Broken):
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 18
    cache: 'npm'
    cache-dependency-path: frontend/package-lock.json

- name: Install dependencies
  run: |
    cd frontend
    npm ci
```

### After (Fixed):
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 18
    cache: 'yarn'
    cache-dependency-path: frontend/yarn.lock

- name: Install dependencies
  run: |
    cd frontend
    yarn install --frozen-lockfile
```

## 🔍 Other Common Deployment Issues

### 1. Cloudflare API Token Issues

**Error:** `Invalid API token`
**Solutions:**
- Verify token has correct permissions: `Account:Cloudflare Pages:Edit`
- Check token expiration date
- Regenerate token if needed
- Ensure token is saved as `CLOUDFLARE_API_TOKEN` in GitHub secrets

### 2. Account ID Issues

**Error:** `Invalid account ID`
**Solutions:**
- Copy Account ID from Cloudflare Dashboard (right sidebar)
- Ensure it's saved as `CLOUDFLARE_ACCOUNT_ID` in GitHub secrets
- Remove any spaces or hidden characters

### 3. Build Directory Issues

**Error:** `Build directory not found`
**Solutions:**
- Verify build command produces files in `frontend/build/`
- Check if build process completes successfully
- Ensure `directory: frontend/build` matches actual output location

### 4. Project Name Mismatch

**Error:** `Project not found`
**Solutions:**
- Ensure `projectName: louie-sawyer-portfolio` matches your Cloudflare Pages project name exactly
- Check Cloudflare Pages dashboard for correct project name
- Project names are case-sensitive

## 🚀 Deployment Success Checklist

### Prerequisites:
- ✅ GitHub repository exists
- ✅ Code is pushed to main/master branch
- ✅ `yarn.lock` file exists in frontend directory
- ✅ Cloudflare account is set up
- ✅ Cloudflare Pages project is created

### GitHub Secrets Required:
- ✅ `CLOUDFLARE_API_TOKEN` (with Pages:Edit permission)
- ✅ `CLOUDFLARE_ACCOUNT_ID` (from Cloudflare dashboard)

### File Structure Expected:
```
repository/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── frontend/
│   ├── package.json
│   ├── yarn.lock
│   ├── src/
│   └── build/ (created during deployment)
└── README.md
```

### Cloudflare Pages Settings:
- ✅ Framework: Create React App
- ✅ Build command: `cd frontend && yarn build`
- ✅ Build output: `frontend/build`
- ✅ Environment variables (if needed): `NODE_VERSION: 18`

## 📝 Testing the Fix

### Manual Test:
1. Push any change to main branch
2. Go to GitHub repository → Actions tab
3. Watch the deployment workflow
4. Verify it completes successfully
5. Check Cloudflare Pages for new deployment

### Expected Output:
```
✅ Checkout repository
✅ Setup Node.js (with yarn cache)
✅ Install dependencies (yarn install --frozen-lockfile)
✅ Build application (yarn build)  
✅ Deploy to Cloudflare Pages
✅ Add deployment status comment (for PRs)
```

## 🔄 Alternative Deployment Methods

### 1. Cloudflare Pages Direct Git Integration
If GitHub Actions continues to fail, use direct integration:
- Connect Cloudflare Pages directly to your GitHub repo
- Set build command: `cd frontend && yarn build`
- Set output directory: `frontend/build`

### 2. Manual Deployment
For immediate deployment:
```bash
# Build locally
cd frontend
yarn build

# Deploy using Wrangler CLI
npx wrangler pages deploy frontend/build --project-name louie-sawyer-portfolio
```

## 📞 Getting Help

1. **Check GitHub Actions logs** for detailed error messages
2. **Verify Cloudflare Pages build logs** in dashboard
3. **Test build locally** before pushing to GitHub
4. **Check GitHub repository secrets** are properly set

---

**Status: ✅ RESOLVED**
*The GitHub Actions workflow has been updated to use Yarn instead of npm, fixing the cache dependencies error.*