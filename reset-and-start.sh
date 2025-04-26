#!/bin/bash

# Stop any running Next.js processes
echo "Stopping any running Next.js processes..."
pkill -f "next dev" || true

# Clear Next.js cache
echo "Clearing Next.js cache..."
rm -rf .next

# Install dependencies (in case any were missed)
echo "Making sure all dependencies are installed..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Start the development server
echo "Starting the development server..."
npm run dev
