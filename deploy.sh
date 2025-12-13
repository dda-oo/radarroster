#!/bin/bash

echo "========================================="
echo "RadarRoster Deployment"
echo "========================================="

echo ""
echo "Checking git status..."
git status

echo ""
read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Adding all changes..."
    git add .
    
    echo ""
    read -p "Enter commit message: " commit_msg
    
    echo "Committing changes..."
    git commit -m "$commit_msg"
    
    echo "Pushing to GitHub..."
    git push origin main
    
    echo ""
    echo "========================================="
    echo "Deployment Complete!"
    echo "Site will be live in 1-2 minutes"
    echo "https://radarroster.com"
    echo "========================================="
else
    echo "Deployment cancelled"
fi
