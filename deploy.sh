#!/bin/bash

echo "🚀 RadarRoster Deployment Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Are you in the project root?"
    exit 1
fi

# Add all changes
echo "📦 Adding files..."
git add .

# Commit with timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
echo "💾 Committing changes..."
git commit -m "Update: $TIMESTAMP"

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin main

echo "✅ Deployment complete!"
echo "🔗 Your site will be live at: https://dda-oo.github.io/rr/"
echo "⏱️  Allow 1-2 minutes for changes to appear"
