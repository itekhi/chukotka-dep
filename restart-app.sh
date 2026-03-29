#!/bin/bash
# Exit on error
set -e

# 1. Ensure production dependencies are installed (including 'next')
# This is fast because it only installs production deps
npm install --omit=dev

# 2. Run the Generate phase
# This connects to your local MongoDB and builds static pages
echo "Building Next.js..."
./node_modules/.bin/next build

# 4. Restart via PM2
# We run the server.js inside the standalone folder
echo "Restarting PM2..."
pm2 restart chukotkadep || pm2 start pm2.config.js
