# kriszhou7.github.io

Personal portfolio site, deployed via GitHub Pages.

Live at: https://kriszhou7.github.io/

## Structure

- `index.html` — page markup
- `style.css` — all styling (dark/light theme via `data-theme` attribute)
- `script.js` — theme toggle + renders the Projects section from `projects.json`
- `projects.json` — **edit this file to add/update projects**, no HTML/JS changes needed
- `assets/resume.pdf` — resume linked from the "Resume" button

## Adding a new project

Add an object to `projects.json`:

```json
{
  "title": "Project Name",
  "subtitle": "One-line description of what it is",
  "period": "2026",
  "description": "1-2 sentence summary.",
  "highlights": ["Bullet point about implementation", "Another bullet point"],
  "tech": ["Python", "PostgreSQL"],
  "links": { "github": "https://github.com/kriszhou7/repo", "demo": "" },
  "featured": true
}
```

## Local preview

```
python3 -m http.server 8080
```

then open http://localhost:8080/ (projects.json is loaded via fetch, so opening
index.html directly as a file:// URL won't load projects — use a local server).

## Deploy

Push to the `main` branch of this repo — GitHub Pages serves it automatically
at https://kriszhou7.github.io/ (Settings → Pages should be set to deploy from
the `main` branch, `/ (root)`).
