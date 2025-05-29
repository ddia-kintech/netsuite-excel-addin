# Deploying to GitHub Pages

This document provides instructions for deploying this Excel add-in to GitHub Pages, which will make it accessible via HTTPS for Excel add-in sideloading.

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., "netsuite-excel-addin")
4. Make sure it's set to "Public" (GitHub Pages requires this for free accounts)
5. Click "Create repository"

## Step 2: Upload the Files

Option 1: Using Git command line:
```
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/netsuite-excel-addin.git
git push -u origin main
```

Option 2: Using the GitHub web interface:
1. In your new repository, click "uploading an existing file"
2. Drag and drop or select all the files from this folder
3. Click "Commit changes"

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click the "Settings" tab
3. In the left sidebar, click "Pages"
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait a few minutes for your site to be published

## Step 4: Update the Manifest URLs

1. Wait for GitHub Pages to be enabled (you'll see a message with your site URL)
2. Your site URL will be: `https://YOUR-USERNAME.github.io/netsuite-excel-addin/`
3. Edit the `manifest.xml` file to update all URLs from `https://username.github.io/netsuite-excel-addin/` to your actual GitHub Pages URL
4. Commit and push these changes

## Step 5: Test the Add-in

1. Download the updated manifest.xml file from your GitHub Pages site
2. Open Excel
3. Go to Insert > My Add-ins > Upload My Add-in
4. Select the downloaded manifest.xml file
5. The add-in should now load in Excel

## Troubleshooting

If the add-in doesn't load properly:
- Check browser developer tools for any errors
- Verify all URLs in the manifest point to your GitHub Pages domain
- Make sure GitHub Pages has finished deploying (check repository Settings > Pages)
- Confirm that all required files (taskpane.html, commands.html, etc.) are in the repository