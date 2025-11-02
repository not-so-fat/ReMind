# ReMind Setup Guide for Windows

## Prerequisites

1. **Install Node.js** (version 20 or higher)
   - Download from: https://nodejs.org/
   - Choose the LTS version
   - During installation, make sure "Add to PATH" is checked
   - Verify installation by opening PowerShell/Command Prompt and running:
     ```bash
     node --version
     npm --version
     ```

2. **Install pnpm** (package manager)
   - Open PowerShell/Command Prompt
   - Run: `npm install -g pnpm`
   - Verify installation:
     ```bash
     pnpm --version
     ```

## Setup Steps

1. **Navigate to the webapp directory**
   ```bash
   cd webapp
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   - Create a file named `.env.local` in the `webapp` directory
   - Add the following line (adjust the path if needed):
     ```
     DATABASE_URL="file:./prisma/dev.db"
     ```
   - **Note for Windows**: If you prefer an absolute path, use forward slashes or escaped backslashes:
     ```
     DATABASE_URL="file:///C:/path/to/ReMind/webapp/prisma/dev.db"
     ```
     Or relative path (recommended):
     ```
     DATABASE_URL="file:./prisma/dev.db"
     ```

4. **Generate Prisma Client**
   ```bash
   pnpm db:generate
   ```

5. **Run database migrations**
   ```bash
   pnpm db:migrate
   ```
   - If it asks for a migration name, just press Enter or type "init"

6. **Start the development server**
   ```bash
   pnpm dev
   ```

7. **Open the application**
   - Open your browser and go to: `http://localhost:3000`

## First Time Usage

1. **Create a target**
   - Click "+ Create New Target"
   - Enter a name (e.g., "English Practice")
   - Upload a CSV file with your quizzes
   - Format: First column = question, Second column = answer
   - Check "First row is header" if your CSV has a header row
   - Click "Create"

2. **Start practicing**
   - Click on your target to start practicing
   - Answer questions and track your progress!

## Troubleshooting

### Port 3000 already in use
If port 3000 is busy, you can change it by modifying `package.json`:
- Find the "dev" script and change it to: `"dev": "next dev -p 3001"`
- Then access the app at `http://localhost:3001`

### Database connection errors
- Make sure the `prisma` directory exists in the `webapp` folder
- Check that the `.env.local` file has the correct `DATABASE_URL`
- Try deleting `prisma/dev.db` and running `pnpm db:migrate` again

### Permission errors
- Make sure you're running PowerShell/Command Prompt as Administrator if needed
- Check that the `webapp` folder has write permissions

## File Structure

```
webapp/
├── prisma/
│   ├── dev.db          # SQLite database (auto-created)
│   └── schema.prisma   # Database schema
├── src/
│   ├── app/            # Next.js pages and API routes
│   └── lib/            # Core logic (engine, CSV parsing, etc.)
├── .env.local          # Environment variables (you create this)
└── package.json        # Dependencies and scripts
```

## Available Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Prisma Studio (database GUI)
- `pnpm lint` - Run linter

## CSV Format Example

Create a CSV file like this:

```csv
question,answer
hello,こんにちは
goodbye,さようなら
thank you,ありがとう
```

Or without header:

```csv
hello,こんにちは
goodbye,さようなら
thank you,ありがとう
```

Save it as a `.csv` file and import it when creating a target.

