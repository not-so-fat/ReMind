# Vercel Deployment Guide

## Overview

ReMind was migrated from SQLite to PostgreSQL to enable deployment on Vercel's serverless platform. SQLite (file-based) doesn't work with serverless functions, so we use Vercel Postgres (Neon/Supabase) instead.

## Approach Taken

### Changes Made

1. **Database Provider**: SQLite → PostgreSQL
   - Updated `prisma/schema.prisma`: Changed provider from `sqlite` to `postgresql`

2. **Database Connection**: Simplified `src/lib/db.ts`
   - Removed SQLite-specific path handling
   - Added support for `DATABASE_URL` and `POSTGRES_PRISMA_URL` (Vercel auto-provides)

3. **Build Configuration**:
   - Added `postinstall` script to generate Prisma client
   - Updated `build` script to include Prisma generation
   - Added `db:migrate:deploy` for production migrations
   - Created `vercel.json` with build commands

### Why PostgreSQL?

- Vercel serverless functions don't support file-based databases
- PostgreSQL works seamlessly with Prisma
- Vercel provides managed Postgres options (Neon, Supabase)
- Scales well for serverless architecture

## Deployment Steps

### Prerequisites

- Vercel account (sign up at vercel.com)
- GitHub repository connected to Vercel
- Database created in Vercel (see Database Setup below)

### Step 1: Database Setup

1. In Vercel project dashboard → **Storage** tab
2. Click **Create Database** → Select **Postgres**
3. **Recommended: Choose Neon** (best for serverless, free tier available)
   - Alternative: Supabase (if you need additional features later)
4. Select region closest to your users
5. Click **Create**

Vercel automatically sets these environment variables:
- `POSTGRES_URL` - Connection pooling URL
- `POSTGRES_PRISMA_URL` - Prisma-compatible connection string
- `POSTGRES_URL_NON_POOLING` - Direct connection URL

### Step 2: Configure Vercel Project

1. **Set Root Directory**:
   - Go to **Settings** → **General**
   - Find **Root Directory** → Click **Edit**
   - Set to: `webapp`
   - Click **Save**

2. **Set DATABASE_URL Environment Variable**:
   - Go to **Settings** → **Environment Variables**
   - Click **Add New**
   - **Key**: `DATABASE_URL`
   - **Value**: Copy from `POSTGRES_PRISMA_URL` (already set by Vercel)
   - **Environments**: Select all (Production, Preview, Development)
   - Click **Save**

3. **Verify Build Settings** (auto-detected):
   - Framework Preset: Next.js ✅
   - Build Command: `pnpm build` (includes Prisma generation via `postinstall`)
   - Output Directory: `.next` ✅
   - Install Command: `pnpm install` ✅

### Step 3: Deploy

**Option A: Push to GitHub** (Recommended)
```bash
git push origin main
```

**Option B: Manual Deploy**
- Go to **Deployments** tab
- Click **Redeploy** on latest deployment

Wait for build to complete (first build may take a few minutes).

### Step 4: Run Database Migrations

After first successful deployment, create database tables:

**Using Vercel CLI** (Recommended):

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to webapp directory
cd webapp

# Login and link project
vercel login
vercel link  # Select your project when prompted

# Pull environment variables
vercel env pull .env.local

# Run migrations
pnpm db:migrate:deploy
```

**Alternative: Create Migration Locally**

```bash
cd webapp

# Set DATABASE_URL to your Vercel Postgres connection
# Get it from: Vercel Dashboard → Storage → Your database → Connection strings
export DATABASE_URL="postgresql://..." # Your POSTGRES_PRISMA_URL

# Create and apply migration
pnpm prisma migrate dev --name init_postgresql

# Commit and push
git add prisma/migrations
git commit -m "Add PostgreSQL migration"
git push origin main
```

### Step 5: Verify Deployment

1. **Check Build Logs**:
   - Go to **Deployments** tab → Click latest deployment
   - Verify build succeeded without errors

2. **Test Application**:
   - Visit deployed URL (shown in Vercel dashboard)
   - Create a new target
   - Import CSV file
   - Practice a quiz
   - Verify data persists

3. **Verify Database**:
   - Check Vercel → **Storage** → Your database → Browse data (if available)
   - Or use Prisma Studio locally:
     ```bash
     cd webapp
     vercel env pull .env.local
     pnpm db:studio
     ```

## Database Options

When creating the database in Vercel, you'll see options: **Neon**, **Supabase**, **Prisma**, or **Nile**.

**Recommended: Neon** ⭐
- Best for serverless-first architecture
- Auto-scales to zero when not in use
- Built-in connection pooling
- Free tier: 0.5GB storage (sufficient for quiz data)
- Simple setup, Prisma-friendly

**Alternative: Supabase**
- Good if you might need authentication/storage features later
- Free tier: 500MB database
- More features, well-established platform

**Not Recommended for ReMind**: Prisma (paid), Nile (multi-tenant, overkill)

See `VERCEL_POSTGRES_OPTIONS.md` for detailed comparison.

## Troubleshooting

### Build Fails: "DATABASE_URL not set"
- Verify `DATABASE_URL` environment variable is set in Vercel dashboard
- Copy value from `POSTGRES_PRISMA_URL`

### Build Fails: "Prisma Client not generated"
- Check build logs - `postinstall` should run `prisma generate`
- Verify `package.json` has: `"postinstall": "prisma generate"`

### Migration Fails: "No migrations found"
- Create migration locally first (see Step 4 Alternative)
- Then push and deploy

### App Works but Shows Database Errors
- Verify migrations were run successfully
- Check database connection strings in Vercel dashboard
- Review Vercel function logs for connection errors

## Post-Deployment

### Custom Domain (Optional)
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatic

### Monitoring
- Vercel Analytics (included)
- Check function logs for errors
- Monitor database usage in Storage tab

## Files Modified for Vercel

- `webapp/prisma/schema.prisma` - Changed provider to `postgresql`
- `webapp/src/lib/db.ts` - Simplified for PostgreSQL
- `webapp/package.json` - Added build/migration scripts
- `webapp/vercel.json` - Vercel configuration

## Quick Checklist

- [ ] Database created (Neon/Supabase)
- [ ] Root directory set to `webapp`
- [ ] `DATABASE_URL` environment variable set
- [ ] Build settings verified
- [ ] First deployment completed
- [ ] Migrations run successfully
- [ ] App tested and working

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
