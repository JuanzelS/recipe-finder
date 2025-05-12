#!/bin/bash

# Create React app
npx create-react-app recipe-finder
cd recipe-finder

# Install dependencies
npm install @reduxjs/toolkit react-redux react-router-dom

# Remove default files
rm src/App.css src/logo.svg src/App.test.js src/reportWebVitals.js src/setupTests.js

# Create directory structure
mkdir -p src/assets
mkdir -p src/components/common
mkdir -p src/components/layout
mkdir -p src/components/recipe
mkdir -p src/features/recipes
mkdir -p src/features/favorites
mkdir -p src/pages
mkdir -p src/services
mkdir -p src/store
mkdir -p src/styles
mkdir -p src/utils

echo "Project structure created! Now create all the files from the artifacts."
echo "When ready, run 'npm start' to start the development server."