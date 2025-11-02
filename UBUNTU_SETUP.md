# ReMind Setup Guide for Ubuntu

## Quick Setup (Automated)

For a fully automated setup, use the provided script:

```bash
# Make the script executable (if not already)
chmod +x setup-ubuntu.sh

# Run the setup script
./setup-ubuntu.sh
```

The script will:
- Check and install Node.js 20+ if needed
- Install pnpm and build tools
- Install all dependencies
- Set up environment variables
- Generate Prisma client
- Run database migrations

**Note**: The script requires sudo privileges for installing system packages.

---

## Manual Setup

If you prefer to set up manually or need more control, follow the steps below.

## Prerequisites

1. **Install Node.js** (version 20 or higher)

   ### Option A: Using NodeSource repository (Recommended)
   ```bash
   # Update package index
   sudo apt update

   # Install curl if not already installed
   sudo apt install -y curl

   # Add NodeSource repository for Node.js 20.x
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

   # Install Node.js
   sudo apt install -y nodejs

   # Verify installation
   node --version
   npm --version
   ```

   ### Option B: Using snap
   ```bash
   sudo snap install node --classic --channel=20
   node --version
   npm --version
   ```

   ### Option C: Using nvm (Node Version Manager)
   ```bash
   # Install nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

   # Reload shell configuration
   source ~/.bashrc

   # Install and use Node.js 20
   nvm install 20
   nvm use 20

   # Verify installation
   node --version
   npm --version
   ```

2. **Install pnpm** (package manager)
   ```bash
   # Install pnpm globally using npm
   sudo npm install -g pnpm

   # Verify installation
   pnpm --version
   ```

3. **Install build tools** (required for some npm packages)
   ```bash
   sudo apt install -y build-essential python3
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
   ```bash
   echo 'DATABASE_URL="file:./prisma/dev.db"' > .env.local
   ```
   - Or manually create it with your preferred editor:
     ```bash
     nano .env.local
     ```
     Add the following line:
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
   - If running on a remote server, you may need to access it via the server's IP address or configure port forwarding

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

Or find and kill the process using port 3000:
```bash
# Find the process
sudo lsof -i :3000

# Kill the process (replace PID with the actual process ID)
sudo kill -9 PID
```

### Database connection errors
- Make sure the `prisma` directory exists in the `webapp` folder
- Check that the `.env.local` file has the correct `DATABASE_URL`
- Ensure the `webapp` directory has write permissions:
  ```bash
  chmod -R u+w webapp/prisma
  ```
- Try deleting `prisma/dev.db` and running `pnpm db:migrate` again:
  ```bash
  rm webapp/prisma/dev.db
  cd webapp
  pnpm db:migrate
  ```

### Permission errors
- Make sure you have write permissions in the `webapp` directory
- If needed, adjust permissions:
  ```bash
  sudo chown -R $USER:$USER webapp
  chmod -R u+w webapp
  ```

### Node.js version too old
- If you get errors about Node.js version, make sure you have Node.js 20 or higher
- Check your version: `node --version`
- If using nvm, make sure you're using the correct version: `nvm use 20`

### EACCES errors when installing global packages
If you get permission errors when installing pnpm globally, you can:
- Use sudo (not recommended): `sudo npm install -g pnpm`
- Or configure npm to use a different directory (recommended):
  ```bash
  mkdir ~/.npm-global
  npm config set prefix '~/.npm-global'
  echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
  source ~/.bashrc
  npm install -g pnpm
  ```

### Firewall configuration (for remote access)
If you want to access the app from another machine, you may need to allow the port:
```bash
# For UFW (Uncomplicated Firewall)
sudo ufw allow 3000/tcp

# For firewalld (if using Fedora/RHEL-based systems)
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

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

## Running in Production

For production deployment on Ubuntu, consider:

1. **Build the application**
   ```bash
   cd webapp
   pnpm build
   ```

2. **Use a process manager** like PM2:
   ```bash
   # Install PM2 globally
   sudo npm install -g pm2

   # Start the application
   cd webapp
   pm2 start npm --name "remind" -- start

   # Save PM2 configuration
   pm2 save

   # Setup PM2 to start on boot
   pm2 startup
   ```

3. **Use a reverse proxy** like Nginx:
   ```bash
   sudo apt install nginx
   # Configure Nginx to proxy requests to localhost:3000
   ```

4. **Set up SSL** using Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

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

