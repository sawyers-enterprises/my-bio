# GitHub Actions Deployment Troubleshooting

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