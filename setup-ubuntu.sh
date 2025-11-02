#!/bin/bash

# ReMind Ubuntu Setup Script
# This script automates the setup process for ReMind on Ubuntu

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on Ubuntu/Debian
if [ ! -f /etc/os-release ]; then
    print_error "Cannot detect OS. This script is designed for Ubuntu/Debian."
    exit 1
fi

. /etc/os-release
if [ "$ID" != "ubuntu" ] && [ "$ID" != "debian" ]; then
    print_warn "This script is designed for Ubuntu/Debian. You're running $ID. Continue anyway? (y/n)"
    read -r response
    if [ "$response" != "y" ]; then
        exit 1
    fi
fi

print_info "Starting ReMind setup for Ubuntu..."

# Update package index
print_info "Updating package index..."
sudo apt update

# Check for Node.js
NODE_VERSION=$(node --version 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1 || echo "")
if [ -z "$NODE_VERSION" ] || [ "$NODE_VERSION" -lt 20 ]; then
    print_warn "Node.js 20+ not found or version is too old (found: ${NODE_VERSION:-none})"
    print_info "Installing Node.js 20..."
    
    # Install curl if not present
    if ! command -v curl &> /dev/null; then
        print_info "Installing curl..."
        sudo apt install -y curl
    fi
    
    # Add NodeSource repository
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    
    # Install Node.js
    sudo apt install -y nodejs
    
    # Verify installation
    NODE_VERSION=$(node --version)
    print_info "Node.js installed: $NODE_VERSION"
else
    NODE_VERSION=$(node --version)
    print_info "Node.js already installed: $NODE_VERSION"
fi

# Check for npm (refresh command cache in case npm was just installed)
hash -r 2>/dev/null || true

if ! command -v npm &> /dev/null; then
    # Try checking common locations
    if [ -f "/usr/bin/npm" ] || [ -f "/usr/local/bin/npm" ]; then
        print_info "npm found in standard location, refreshing PATH..."
        export PATH="/usr/bin:/usr/local/bin:$PATH"
        hash -r 2>/dev/null || true
    fi
    
    # Check again
    if ! command -v npm &> /dev/null; then
        print_error "npm not found even though Node.js is installed. This is unusual."
        print_error "Please check if npm is installed: which npm"
        exit 1
    fi
fi

# Check for pnpm
if ! command -v pnpm &> /dev/null; then
    print_info "Installing pnpm..."
    sudo npm install -g pnpm
    print_info "pnpm installed: $(pnpm --version)"
else
    print_info "pnpm already installed: $(pnpm --version)"
fi

# Install build tools
print_info "Installing build tools..."
sudo apt install -y build-essential python3

# Determine the correct directory and track where we started
STARTED_IN_WEBAPP=false
if [ -f "package.json" ]; then
    # We're already in webapp directory
    STARTED_IN_WEBAPP=true
elif [ -d "webapp" ] && [ -f "webapp/package.json" ]; then
    # We're in project root, need to go to webapp
    print_info "Found webapp directory, navigating to it..."
    cd webapp
else
    print_error "Could not find webapp directory or package.json. Please run this script from the project root."
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Are you in the correct directory?"
    exit 1
fi

# Install dependencies
print_info "Installing dependencies (this may take a while)..."
pnpm install

# Set up environment variables
if [ ! -f ".env.local" ]; then
    print_info "Creating .env.local file..."
    echo 'DATABASE_URL="file:./prisma/dev.db"' > .env.local
    print_info ".env.local created"
else
    print_warn ".env.local already exists. Skipping creation."
fi

# Ensure prisma directory exists
if [ ! -d "prisma" ]; then
    print_info "Creating prisma directory..."
    mkdir -p prisma
fi

# Generate Prisma Client
print_info "Generating Prisma Client..."
pnpm db:generate

# Run database migrations
print_info "Running database migrations..."
pnpm db:migrate

# Final summary
print_info "=========================================="
print_info "Setup completed successfully!"
print_info "=========================================="
echo ""
print_info "Next steps:"
if [ "$STARTED_IN_WEBAPP" = false ]; then
    echo "  1. Navigate to the webapp directory (if not already there):"
    echo "     cd webapp"
    echo ""
    echo "  2. Start the development server:"
    echo "     pnpm dev"
    echo ""
    echo "  3. Open your browser and go to:"
    echo "     http://localhost:3000"
else
    echo "  1. Start the development server:"
    echo "     pnpm dev"
    echo ""
    echo "  2. Open your browser and go to:"
    echo "     http://localhost:3000"
fi
echo ""
print_info "For more information, see UBUNTU_SETUP.md"

