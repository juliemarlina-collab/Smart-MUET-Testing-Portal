# Smart MUET Guide V2 — User Testing Portal (Complete Fixed Version)

This package is ready for GitHub Pages.

## Correct folder structure

- index.html
- about.html
- journey.html
- tasks.html
- feedback.html
- css/
  - styles.css
- js/
  - app.js
- .nojekyll
- README.md

## Important fixes applied

1. All HTML pages now load CSS from:
   `css/styles.css`

2. All HTML pages now load JavaScript from:
   `js/app.js`

3. `.nojekyll` is included so GitHub Pages serves this as a plain static HTML/CSS/JS site.

4. Existing Smart MUET Guide V2 link remains configured in `js/app.js`.

## GitHub upload

Upload ALL files and folders exactly as shown above to the repository root.

Do not move `styles.css` or `app.js` back to the root unless you also change the paths in every HTML page.

## Google Form

Open:
`js/app.js`

Update:

```js
googleFormEmbedUrl: "PASTE_YOUR_GOOGLE_FORM_EMBED_URL",
googleFormPublicUrl: "PASTE_YOUR_GOOGLE_FORM_SHARE_URL"
```

Then commit the change.

## GitHub Pages

Repository > Settings > Pages

Use:
- Branch: `main`
- Folder: `/ (root)`

After deployment, hard refresh the site or clear browser cache if the old unstyled page is still showing.
