# Vercel Deployment — Capital Operator

## Configuration
The project includes a root `vercel.json` file configured for single-page client-side applications.

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Deployment Commands
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework Preset: `Vite`
