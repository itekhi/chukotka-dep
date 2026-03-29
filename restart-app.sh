#!/bin/bash
# Exit on error
set -e

echo "Starting Post-Transfer Steps..."

# 1. Ensure production dependencies are installed (including 'next')
# This is fast because it only installs production deps
npm install --omit=dev

# 2. Run the Generate phase
# This connects to your local MongoDB and builds static pages
echo "Running Next.js Generate..."
npx next build --experimental-build-mode generate

# 3. Setup Standalone Directory
# Standalone mode needs static and public folders moved into it to serve them
echo "Organizing standalone files..."
mkdir -p .next/standalone/.next/static
cp -r .next/static/. .next/standalone/.next/static/
cp -r public/. .next/standalone/public/

# 4. Restart via PM2
# We run the server.js inside the standalone folder
echo "Restarting PM2..."
pm2 restart chukotkadep || pm2 start .next/standalone/server.js --name "chukotkadep"
