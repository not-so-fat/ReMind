# ReMind Webapp

## Setup

### macOS

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
echo 'DATABASE_URL="file:./prisma/dev.db"' > .env.local
```

3. Generate Prisma client and run migrations:
```bash
export DATABASE_URL="file:./prisma/dev.db"
pnpm db:generate
pnpm db:migrate
```

4. Start development server:
```bash
pnpm dev
```

### Windows

See `WINDOWS_SETUP.md` in the project root for detailed Windows setup instructions.

Quick setup:
1. Install Node.js (20+) and pnpm: `npm install -g pnpm`
2. Create `.env.local` with: `DATABASE_URL="file:./prisma/dev.db"`
3. Run: `pnpm install && pnpm db:generate && pnpm db:migrate`
4. Start: `pnpm dev`

### Ubuntu/Linux

See `UBUNTU_SETUP.md` in the project root for detailed Ubuntu/Linux setup instructions.

Quick setup:
1. Install Node.js (20+) using NodeSource repository or nvm
2. Install pnpm: `npm install -g pnpm`
3. Create `.env.local` with: `DATABASE_URL="file:./prisma/dev.db"`
4. Run: `pnpm install && pnpm db:generate && pnpm db:migrate`
5. Start: `pnpm dev`

The app will be available at http://localhost:3000

## Testing

1. Create a target with CSV import:
   - Go to http://localhost:3000
   - Click "Create New Target"
   - Enter a name (e.g., "English Practice")
   - Upload a CSV file with format:
     ```
     question,answer
     hello,こんにちは
     goodbye,さようなら
     ...
     ```
   - First import requires at least M+C rows (default: 15 rows minimum)

2. Practice:
   - Click on a target to start practicing
   - Answer questions by clicking on choices
   - Watch your progress!

3. Review:
   - Click "Review" to see statistics
   - View category counts and daily completion chart

4. Settings:
   - Click "Settings" to customize N, M, C, and category weights

## Test CSV

A sample CSV file is provided at `test-quiz.csv` for testing.
