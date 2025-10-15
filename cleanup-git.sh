#!/bin/bash

# Cleanup script to remove files that should be ignored by git
# Run this script if you've already committed files that should be ignored

echo "🧹 Cleaning up git repository..."

# Remove node_modules if it exists
if [ -d "node_modules" ]; then
    echo "Removing node_modules..."
    rm -rf node_modules
fi

# Remove .next build directory if it exists
if [ -d ".next" ]; then
    echo "Removing .next build directory..."
    rm -rf .next
fi

# Remove out directory if it exists
if [ -d "out" ]; then
    echo "Removing out directory..."
    rm -rf out
fi

# Remove generated API files
if [ -f "src/api/git_push.sh" ]; then
    echo "Removing generated git_push.sh..."
    rm -f src/api/git_push.sh
fi

if [ -d "src/api/docs" ]; then
    echo "Removing generated API docs..."
    rm -rf src/api/docs
fi

if [ -d "api-docs" ]; then
    echo "Removing api-docs directory..."
    rm -rf api-docs
fi

if [ -f "openapitools.json" ]; then
    echo "Removing openapitools.json..."
    rm -f openapitools.json
fi

# Remove environment files
if [ -f ".env" ]; then
    echo "Removing .env file..."
    rm -f .env
fi

if [ -f ".env.local" ]; then
    echo "Removing .env.local file..."
    rm -f .env.local
fi

echo "✅ Cleanup complete!"
echo "📝 Now you can run: git add . && git commit -m 'Initial commit with proper .gitignore'"
