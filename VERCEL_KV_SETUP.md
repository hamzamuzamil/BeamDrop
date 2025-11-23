# Redis Setup Instructions for Vercel

This project uses Redis for persistent channel storage on Vercel deployments. Follow these steps to set it up using **Upstash Redis** (recommended) from the Vercel Marketplace.

## Step 1: Create Upstash Redis Database

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `fileshare`
3. Go to the **Storage** tab
4. Click **Create Database**
5. You'll see the Marketplace Database Providers modal
6. **Select "Upstash"** - "Serverless DB (Redis, Vector, Queue, Search)"
7. Click **Continue**

## Step 2: Configure Upstash Redis

1. Follow the Upstash setup wizard:
   - Choose a name for your database (e.g., `fileshare-redis`)
   - Select a region (choose closest to your users)
   - Click **Create**
2. **Upstash will automatically:**
   - Create the Redis database
   - Add environment variables to your Vercel project:
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`
   - Link it to your project

**That's it!** The code automatically detects these environment variables and uses Upstash Redis.

## Step 3: Redeploy

1. After Upstash is linked, Vercel will automatically trigger a new deployment
2. Or manually trigger a redeploy from the **Deployments** tab

## How It Works

The application automatically detects and uses Redis:
- **Priority 1**: Upstash Redis (if `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set) ✅ **Recommended**
- **Priority 2**: Standard Redis (if `REDIS_URL` is set)
- **Priority 3**: In-memory (fallback) - **Only works within same function invocation** (not suitable for production)

## Testing

After deployment, test file sharing:
1. Upload a file on the main page
2. Copy the share link
3. Open the link in a new tab/browser (or wait a few seconds)
4. The download should work because channels are now persisted in Redis!

## Pricing

**Upstash Redis (Free Tier):**
- 10,000 commands per day
- 256 MB storage
- Perfect for testing and moderate use

**Upstash Redis (Pay-as-you-go):**
- $0.20 per 100K commands
- $0.20 per GB storage
- Very affordable for production use

## Troubleshooting

If downloads still don't work:
1. Check Vercel deployment logs to see which storage is being used
   - Look for: `[ChannelRepo] Using Redis storage`
2. Verify environment variables are set:
   - Go to **Settings** → **Environment Variables**
   - Check that `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` exist
3. Check that the Upstash database is active in the Vercel Storage tab
4. Check Vercel build logs for any Redis connection errors
