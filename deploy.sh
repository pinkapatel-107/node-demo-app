#!/bin/bash

echo "Starting deployment..."

# Navigate to the project directory
cd /var/www/html

# Pull the latest changes
git pull origin main

# Install dependencies
npm install --production

# Build the project (if required)
npm run build

# Restart the application using PM2
pm2 restart all

echo "Deployment completed successfully!"
