# ReMind Webapp

## Setup

### macOS

1. Install dependencies:
```bash
pnpm install
```

2. Set up PostgreSQL database:

**Option A: Using Homebrew (Recommended)**
```bash
# Install PostgreSQL (if not already installed)
brew install postgresql@16
brew services start postgresql@16

# Create database (use full path if createdb not in PATH)
/opt/homebrew/opt/postgresql@16/bin/createdb remind_dev

# Or add PostgreSQL to PATH for easier use:
# echo 'export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"' >> ~/.zshrc
# source ~/.zshrc
# createdb remind_dev
```

**Option B: Using Docker**
```bash
docker run --name remind-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=remind_dev -p 5432:5432 -d postgres:16
```

3. Set up environment variables:
```bash
# Get your PostgreSQL username
USERNAME=$(whoami)

# For local PostgreSQL (with your username)
echo "DATABASE_URL=\"postgresql://${USERNAME}@localhost:5432/remind_dev\"" > .env.local

# Or if using Docker with password:
# echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/remind_dev"' > .env.local
```

4. Generate Prisma client and run migrations:
```bash
pnpm db:generate
pnpm db:migrate:deploy
```

5. Start development server:
```bash
pnpm dev
```

### Windows

See `WINDOWS_SETUP.md` in the project root for detailed Windows setup instructions.

Quick setup:
1. Install Node.js (20+) and pnpm: `npm install -g pnpm`
2. Install PostgreSQL (see WINDOWS_SETUP.md for details)
3. Create database: `createdb remind_dev` (or use pgAdmin)
4. Create `.env.local` with: `DATABASE_URL="postgresql://localhost:5432/remind_dev"`
5. Run: `pnpm install && pnpm db:generate && pnpm db:migrate:deploy`
6. Start: `pnpm dev`

### Ubuntu/Linux

See `UBUNTU_SETUP.md` in the project root for detailed Ubuntu/Linux setup instructions.

Quick setup:
1. Install Node.js (20+) using NodeSource repository or nvm
2. Install pnpm: `npm install -g pnpm`
3. Install PostgreSQL: `sudo apt install postgresql postgresql-contrib`
4. Create database: `sudo -u postgres createdb remind_dev`
5. Create `.env.local` with: `DATABASE_URL="postgresql://localhost:5432/remind_dev"`
6. Run: `pnpm install && pnpm db:generate && pnpm db:migrate:deploy`
7. Start: `pnpm dev`

The app will be available at:
- **Local access**: http://localhost:3000
- **Network access**: http://YOUR_IP_ADDRESS:3000 (accessible from other computers on your network)

To find your IP address:
- **macOS/Linux**: `ip addr show` or `ifconfig` (look for inet address)
- **Windows**: `ipconfig` (look for IPv4 Address)

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
