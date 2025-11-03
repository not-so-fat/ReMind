# Vercel Deployment Steps - Quick Guide

## Prerequisites

- GitHub account (or GitLab/Bitbucket)
- Vercel account (sign up at vercel.com)
- Repository pushed to GitHub

## Step-by-Step Deployment

### Step 1: Set Up Vercel Postgres

1. **Create Vercel Account/Project**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in
   - Click "Add New" → "Project"

2. **Import Repository**
   - Connect your GitHub account
   - Select the `ReMind` repository
   - Click "Import"

3. **Create Postgres Database**
   - In the Vercel project dashboard, go to **Storage** tab
   - Click **Create Database** → Select **Postgres**
   - Give it a name (e.g., "remind-db")
   - Select a region closest to your users
   - Click **Create**

4. **Get Connection Strings**
   - After creating, Vercel will show you connection strings:
     - `POSTGRES_URL` - Connection pooling URL (recommended for serverless)
     - `POSTGRES_PRISMA_URL` - Prisma-compatible connection string
     - `POSTGRES_URL_NON_POOLING` - Direct connection URL
   - Vercel automatically adds these as environment variables for your project

### Step 2: Configure Vercel Project

1. **Set Root Directory**
   - Go to **Settings** → **General**
   - Find **Root Directory**
   - Click **Edit** and set it to: `webapp`
   - Click **Save**

2. **Verify Build Settings** (should auto-detect, but verify):
   - **Framework Preset**: Next.js
   - **Build Command**: `pnpm install && pnpm db:generate && pnpm build`
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `pnpm install`

3. **Environment Variables** (should be auto-set by Postgres, but verify):
   - Go to **Settings** → **Environment Variables**
   - Verify these are set:
     - `POSTGRES_URL`
     - `POSTGRES_PRISMA_URL`
     - `POSTGRES_URL_NON_POOLING`
   - **Important**: Use `POSTGRES_PRISMA_URL` as `DATABASE_URL`:
     - Add new variable: `DATABASE_URL`
     - Value: Same as `POSTGRES_PRISMA_URL`
     - Or in your app, you can reference `process.env.POSTGRES_PRISMA_URL`

### Step 3: Update Environment Variable Reference

The code currently expects `DATABASE_URL`. You have two options:

**Option A**: Add `DATABASE_URL` environment variable (recommended)
- In Vercel dashboard → Settings → Environment Variables
- Add: `DATABASE_URL` = `POSTGRES_PRISMA_URL` value

**Option B**: Update code to use `POSTGRES_PRISMA_URL`
- Modify `src/lib/db.ts` to check for `POSTGRES_PRISMA_URL` first

### Step 4: Deploy

1. **Initial Deploy**
   - Go to **Deployments** tab
   - Click **Redeploy** on the latest deployment (or push a commit)
   - Wait for build to complete

2. **Run Database Migrations**
   - After first successful deploy, you need to run migrations
   - Install Vercel CLI: `npm i -g vercel`
   - Link your project: `vercel link`
   - Run migrations: `vercel env pull` then `cd webapp && pnpm db:migrate:deploy`
   
   **OR** use Vercel's shell:
   - Go to project → Settings → Deploy Hooks
   - Or use Vercel's built-in terminal (if available)

   **OR** create a one-time migration endpoint:
   - Create `app/api/migrate/route.ts` (temporary)
   - Run migration on first deploy
   - Remove after first successful migration

### Step 5: Run Migrations (First Time)

After deployment, you need to run the initial migration. Options:

**Option 1: Using Vercel CLI** (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
cd webapp
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migration
pnpm db:migrate:deploy
```

**Option 2: Using Vercel Dashboard Terminal** (if available)
- Go to project dashboard
- Use built-in terminal (if available in your plan)

**Option 3: Temporary Migration Endpoint**
Create `webapp/src/app/api/migrate/route.ts` (temporary):
```typescript
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET(request: Request) {
  // Add basic auth or secret check for security
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.MIGRATE_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { stdout, stderr } = await execAsync('npx prisma migrate deploy');
    return NextResponse.json({ 
      success: true, 
      output: stdout,
      error: stderr 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
```

Then:
1. Set `MIGRATE_SECRET` environment variable in Vercel
2. Visit: `https://your-app.vercel.app/api/migrate?secret=YOUR_SECRET`
3. Delete the endpoint after migration succeeds

### Step 6: Verify Deployment

1. **Check Build Logs**
   - Go to **Deployments** tab
   - Click on the latest deployment
   - Review build logs for any errors

2. **Test the Application**
   - Visit your deployed URL
   - Create a new target
   - Import a CSV file
   - Practice a quiz
   - Check review/stats

3. **Verify Database**
   - Use Prisma Studio locally with production connection (be careful!)
   - Or check via Vercel dashboard → Storage → Browse data

### Step 7: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

## Troubleshooting

### Build Fails: "DATABASE_URL not set"
- Check environment variables in Vercel dashboard
- Ensure `DATABASE_URL` is set for Production, Preview, and Development environments
- Use `POSTGRES_PRISMA_URL` value

### Migration Fails
- Check connection string format
- Verify database is created and accessible
- Run migrations locally first with production connection string (test only)

### Prisma Client Generation Fails
- Ensure `postinstall` script runs: `pnpm install` should trigger `prisma generate`
- Check build logs for Prisma errors
- Verify Prisma schema is valid: `pnpm prisma validate`

### Connection Pool Exhausted
- This shouldn't happen with Vercel Postgres (it handles pooling)
- If using external database, ensure connection pooling is enabled
- Consider using Prisma Data Proxy

### Function Timeout
- Vercel has 10s timeout on Hobby plan, 60s on Pro
- CSV imports might hit this limit
- Consider streaming/chunking large CSV uploads

## Post-Deployment Checklist

- [ ] Build succeeds without errors
- [ ] Database migrations completed
- [ ] Environment variables set correctly
- [ ] App loads at deployed URL
- [ ] Can create new target
- [ ] CSV import works
- [ ] Practice flow works
- [ ] Review/stats display correctly
- [ ] Settings can be updated
- [ ] Custom domain configured (if applicable)

## Next Steps

After successful deployment:
1. Set up monitoring (Vercel Analytics)
2. Configure backups (if using external database)
3. Set up error tracking (Sentry, etc.)
4. Configure CDN (Vercel handles this automatically)
5. Set up staging/preview environments

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

