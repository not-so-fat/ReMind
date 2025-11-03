# Vercel Deployment Plan for ReMind

## Overview

This document outlines the steps and considerations for deploying ReMind to Vercel. The main challenge is migrating from SQLite (file-based database) to a serverless-compatible database since Vercel's serverless functions don't support file-based databases.

## Key Challenges

1. **Database Migration**: SQLite → PostgreSQL (or compatible hosted database)
2. **Prisma Schema Update**: Change provider from `sqlite` to `postgresql`
3. **Environment Variables**: Set up database connection string
4. **Migrations**: Run Prisma migrations on Vercel
5. **Build Configuration**: Ensure Next.js builds correctly with Prisma

## Step-by-Step Deployment Plan

### Phase 1: Database Migration Setup

#### Option A: Vercel Postgres (Recommended)
- **Pros**: Native integration, easy setup, included in Vercel plans
- **Cons**: Limited to Vercel ecosystem
- **Cost**: Included in Pro plan, or available as addon

#### Option B: External PostgreSQL (Supabase, Neon, Railway, etc.)
- **Pros**: More flexible, can use with other platforms
- **Cons**: Requires external account setup
- **Cost**: Usually has free tier, then pay-as-you-go

**Recommendation**: Start with Vercel Postgres for simplicity, can migrate later if needed.

### Phase 2: Code Changes Required

#### 2.1 Update Prisma Schema

Change `webapp/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
  relationMode = "prisma"  // Optional: if using connection pooling
}
```

**Note**: Some SQLite-specific features may need adjustment:
- Ensure all field types are PostgreSQL-compatible
- Review JSON fields (should work the same)
- Check indexes (syntax is compatible)

#### 2.2 Update Database Connection Logic

Review `webapp/src/lib/db.ts`:
- Remove SQLite-specific path handling
- Ensure Prisma Client is properly instantiated
- Connection pooling may be beneficial for serverless

#### 2.3 Update Package.json Scripts

Add migration script for production:

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "db:migrate:deploy": "prisma migrate deploy"
  }
}
```

### Phase 3: Vercel Configuration

#### 3.1 Create `vercel.json` (if needed)

Basic configuration (Vercel usually auto-detects Next.js, but we can be explicit):

```json
{
  "buildCommand": "cd webapp && pnpm install && pnpm db:generate && pnpm build",
  "outputDirectory": "webapp/.next",
  "framework": "nextjs",
  "installCommand": "cd webapp && pnpm install"
}
```

**Note**: Actually, Vercel auto-detects Next.js projects. We may need to:
- Set root directory to `webapp` in Vercel dashboard
- Or adjust build settings

#### 3.2 Environment Variables

Set in Vercel dashboard:
- `DATABASE_URL`: PostgreSQL connection string
- `DIRECT_URL`: Direct database connection (if using connection pooling)

### Phase 4: Migration Strategy

#### 4.1 Data Migration (if you have existing data)

If you have existing SQLite data:
1. Export data from SQLite
2. Transform to PostgreSQL format
3. Import to new PostgreSQL database

Script approach:
```bash
# Export from SQLite
sqlite3 prisma/dev.db .dump > export.sql

# Transform and import to PostgreSQL
# (May need custom script depending on data)
```

#### 4.2 Schema Migration

1. Create new migration for PostgreSQL:
   ```bash
   cd webapp
   # Update schema.prisma first
   pnpm prisma migrate dev --name migrate_to_postgresql
   ```

2. Test locally with PostgreSQL connection string
3. Deploy migration on Vercel

### Phase 5: Deployment Steps

#### Step 1: Set Up Database

**If using Vercel Postgres:**
1. Go to Vercel dashboard
2. Select your project (or create new)
3. Go to Storage → Create Database → Postgres
4. Note the connection strings provided

**If using External Database:**
1. Sign up for provider (Supabase, Neon, etc.)
2. Create new PostgreSQL database
3. Get connection string (format: `postgresql://user:pass@host:port/db`)

#### Step 2: Update Local Development

1. Update `prisma/schema.prisma` to use PostgreSQL
2. Create `.env.local` with new `DATABASE_URL`
3. Run migrations: `pnpm db:migrate`
4. Test locally

#### Step 3: Configure Vercel Project

1. Install Vercel CLI (optional but helpful):
   ```bash
   npm i -g vercel
   ```

2. Link project:
   ```bash
   cd webapp
   vercel link
   ```

3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`: Production PostgreSQL connection string
   - Set for Production, Preview, and Development environments

#### Step 4: Adjust Build Settings

In Vercel dashboard → Settings → General:
- **Root Directory**: Set to `webapp` (if not deploying from root)
- **Build Command**: `pnpm install && pnpm db:generate && pnpm build`
- **Output Directory**: `.next` (auto-detected for Next.js)
- **Install Command**: `pnpm install`

#### Step 5: Run Migrations on Deploy

Add to `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "vercel-build": "prisma migrate deploy && prisma generate && next build"
  }
}
```

Or use Vercel's build hooks.

#### Step 6: Deploy

1. Push to connected Git repository
2. Vercel will automatically deploy
3. Check build logs for errors
4. Run migrations manually if needed: `vercel env pull` then `pnpm db:migrate:deploy`

### Phase 6: Testing & Verification

#### Checklist:
- [ ] Build succeeds on Vercel
- [ ] Migrations run successfully
- [ ] Database connection works
- [ ] Create target functionality works
- [ ] CSV import works
- [ ] Practice flow works
- [ ] Review/stats display correctly
- [ ] Settings can be updated

#### Common Issues to Watch For:

1. **Connection Pooling**: Serverless functions may exhaust connections
   - Solution: Use connection pooling (Prisma Data Proxy or PgBouncer)
   - Or set `connection_limit` in Prisma

2. **Migration Timing**: Migrations may fail if run at wrong time
   - Solution: Run migrations as separate step before deployment

3. **Build Timeouts**: Prisma generation can be slow
   - Solution: Cache `node_modules` and generated Prisma client

4. **File Upload Limits**: CSV uploads may hit size limits
   - Solution: Vercel has 4.5MB limit for serverless functions
   - Consider client-side parsing and batch API calls for large files

## Recommended Approach (Summary)

1. **Choose Vercel Postgres** (easiest integration)
2. **Update Prisma schema** to PostgreSQL
3. **Test locally** with PostgreSQL connection string
4. **Set up Vercel project** and configure environment variables
5. **Deploy** and verify migrations run
6. **Test all functionality** on deployed site

## Files to Create/Modify

### New Files:
- `vercel.json` (optional, for explicit config)
- Migration script (if migrating existing data)

### Files to Modify:
- `webapp/prisma/schema.prisma` (change provider)
- `webapp/package.json` (add postinstall/vercel-build scripts)
- `webapp/src/lib/db.ts` (remove SQLite-specific code if any)
- `.env.local` (update DATABASE_URL)

## Rollback Plan

If issues arise:
1. Keep local SQLite setup working
2. Can revert Prisma schema change
3. Vercel deployments are immutable - can revert to previous deployment
4. Database can be exported/backed up

## Next Steps

1. **Decision**: Choose database provider (Vercel Postgres recommended)
2. **Development**: Update schema and test locally
3. **Staging**: Deploy to Vercel preview environment first
4. **Production**: Deploy to production after verification

## Additional Considerations

### Cost Estimation
- **Vercel Postgres**: 
  - Hobby: Free tier available
  - Pro: Included in Pro plan ($20/month)
- **External PostgreSQL**:
  - Supabase: Free tier (500MB), then $25/month
  - Neon: Free tier (3GB), then pay-as-you-go
  - Railway: Free tier, then usage-based

### Performance
- Connection pooling recommended for serverless
- Consider Prisma Data Proxy for connection management
- Monitor cold start times (first request may be slower)

### Security
- Never commit `.env` files
- Use Vercel's environment variable encryption
- Rotate database credentials regularly
- Consider IP allowlisting for database (if external)

### Monitoring
- Set up Vercel Analytics
- Monitor database connection pool usage
- Track API response times
- Set up error alerts

## References

- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma with PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Prisma Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)

