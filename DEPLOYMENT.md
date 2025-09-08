# Deployment Guide - Team Manager React

This guide explains how to deploy the Team Manager React application to Vercel.

## Prerequisites

- Node.js 18+ installed
- Vercel account (free tier available)
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Prepare Your Repository

Ensure your code is pushed to a Git repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project root:
```bash
vercel
```

4. Follow the prompts:
   - Link to existing project? **N**
   - Project name: **team-manager-react**
   - Directory: **./** (current directory)
   - Override settings? **N**

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel will auto-detect the framework (Vite)
5. Click "Deploy"

### 3. Configuration

The project includes a `vercel.json` file with optimized settings:

- **Framework**: Vite (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Routing**: Configured for React Router
- **Asset Caching**: Optimized for static assets

### 4. Environment Variables

If you need to add environment variables:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add any required variables (e.g., API keys)

### 5. Custom Domain (Optional)

1. In your Vercel project dashboard
2. Go to Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Build Information

- **Framework**: React 19 + Vite 7
- **TypeScript**: Enabled
- **Firebase**: Configured for production
- **Build Output**: Static files in `dist/` directory
- **Bundle Size**: ~565KB (gzipped: ~152KB)

## Troubleshooting

### Build Errors
- Ensure all TypeScript errors are resolved
- Check that all dependencies are properly installed
- Verify Firebase configuration is correct

### Runtime Errors
- Check browser console for errors
- Verify Firebase project settings
- Ensure all environment variables are set

### Performance
- The build includes a warning about chunk size (>500KB)
- Consider code splitting for better performance:
  ```javascript
  // Use dynamic imports for large components
  const LazyComponent = lazy(() => import('./LargeComponent'));
  ```

## Post-Deployment

1. Test all functionality on the deployed site
2. Verify Firebase integration works
3. Check responsive design on different devices
4. Monitor performance and errors

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)

---

**Note**: The application is now ready for production deployment with optimized build configuration and proper TypeScript compilation.