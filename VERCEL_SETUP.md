# Deploying to Vercel

This document explains how to deploy this website to Vercel with the Claude API integration.

## Prerequisites

1. A Vercel account (can be created at https://vercel.com/signup)
2. A Claude API key from Anthropic

## Deployment Steps

### 1. Install Vercel CLI (optional, for local testing)

```bash
npm install -g vercel
```

### 2. Push your code to GitHub

Make sure your code is in a GitHub repository.

### 3. Connect to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure your project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: Leave empty
   - Output Directory: ./

### 4. Add Environment Variables

1. In the Vercel project settings, go to "Environment Variables"
2. Add a new variable:
   - Name: `CLAUDE_API_KEY`
   - Value: Your Claude API key
   - Environment: Production (and optionally Preview)

### 5. Deploy

1. Click "Deploy"
2. Vercel will build and deploy your site
3. Once complete, you'll receive a URL for your deployed site

## Testing Locally (Optional)

To test your site locally before deployment:

1. Install the Vercel CLI: `npm install -g vercel`
2. Login to Vercel: `vercel login`
3. Link your project: `vercel link`
4. Create a local `.env` file with your API key:
   ```
   CLAUDE_API_KEY=your_api_key_here
   ```
5. Run locally: `vercel dev`

## Troubleshooting

- If you encounter CORS issues, make sure your API endpoint is correctly configured
- Check the Function Logs in Vercel dashboard for any errors
- Ensure your Claude API key is valid and has sufficient quota

## Security Considerations

- Never commit your API keys to your repository
- Use environment variables for all sensitive information
- Consider adding rate limiting to your API endpoint for production use