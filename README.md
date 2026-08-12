# Smart MUET Guide V2 — User Testing Portal

Files:
- `index.html` — landing page
- `about.html` — testing purpose and participant guidance
- `journey.html` — consent + demographic/baseline questions
- `tasks.html` — guided tasks for Speaking, Reading, Listening and Writing
- `feedback.html` — Google Forms feedback page
- `styles.css` — responsive Smart MUET neo-brutalist styling
- `app.js` — progress tracking, guide launch, Google Form configuration

## Connect Google Forms
Edit `app.js`:

```js
googleFormEmbedUrl: "PASTE_EMBED_URL_HERE",
googleFormPublicUrl: "PASTE_SHARE_URL_HERE"
```

## Smart MUET Guide
Already linked to:
https://juliemarlina-collab.github.io/Smart-MUET-Guide/

## Deployment
Upload all files to a GitHub repository and enable GitHub Pages from the folder/branch containing `index.html`.

## Important
Progress uses browser `localStorage`; this prototype does not create a custom participant database. Google Forms is intended to remain the response collection system.
