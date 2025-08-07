# Package.json Build Script Configuration

This file contains the necessary package.json configurations for proper Cloudflare Pages deployment.

## Frontend Package.json Updates Needed

Add these scripts to `frontend/package.json` if not already present:

```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## Environment Variables for Production Build

The following environment variables are automatically set during GitHub Actions build:

```bash
CI=false                    # Treats warnings as warnings, not errors
GENERATE_SOURCEMAP=false    # Reduces build size by not generating source maps
NODE_ENV=production         # Optimizes build for production
```

## Build Process

1. **GitHub Actions triggers** on push to main branch
2. **Node.js 18 is installed**
3. **Dependencies are installed** with `yarn install --frozen-lockfile` in frontend directory  
4. **Production build runs** with `yarn build`
5. **Built files** in `frontend/build/` are deployed to Cloudflare Pages
6. **Cloudflare automatically**:
   - Sets up CDN distribution
   - Generates SSL certificates
   - Handles HTTPS redirects
   - Optimizes assets for performance

## Manual Build Commands

If you need to build locally for testing:

```bash
cd frontend
yarn install
yarn build
```

The build will create optimized production files in `frontend/build/` directory.

## Troubleshooting Build Issues

### Build Fails with Memory Issues
Add this to package.json:
```json
{
  "scripts": {
    "build": "craco build --max_old_space_size=4096"
  }
}
```

### TypeScript Errors (if using TypeScript)
Set in .env file:
```
SKIP_PREFLIGHT_CHECK=true
TSC_COMPILE_ON_ERROR=true
```

### CSS/PostCSS Issues
Ensure postcss config is correct in `craco.config.js`.

---

**The current configuration is optimized for React + Tailwind CSS + Cloudflare Pages deployment.**