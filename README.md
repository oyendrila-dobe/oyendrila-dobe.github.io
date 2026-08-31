# oyendrila-dobe.github.io

Personal site, built with React + Vite + Tailwind. Single page with
tab-based navigation (Home / Updates / Research / Resume-CV / Blog).

## Local development

```bash
npm install
npm run dev
```

Opens a local dev server with hot reload.

## Build

```bash
npm run build
```

Outputs static files to `dist/`. `npm run preview` serves that build
locally if you want to sanity-check it before pushing.

## Adding your assets

- **Headshot / photos** → `public/assets/img/`. The code expects
  `oyendrila.jpeg` for the homepage photo; add more as needed for the
  Blog page later.
- **Resume / CV** → `public/assets/pdf/`, named exactly `Resume.pdf`
  and `CV.pdf`. The Resume/CV page already links to these paths.

Anything in `public/` is copied as-is into the build output and served
from the site root (e.g. `public/assets/img/x.jpg` → `/assets/img/x.jpg`).

## Deploying to GitHub Pages

This repo includes `.github/workflows/deploy.yml`, which builds and
deploys automatically on every push to `main`.

One-time setup in this repo's settings:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**
   (not "Deploy from a branch").
3. Push to `main` — the workflow builds the site and publishes it.

Since this is a `<username>.github.io` repo, the built site is served
from the domain root, which is why `vite.config.js` has `base: "/"`.

## Editing content

- **Updates, Movies, Music, Books** → each lives in its own file under
  `src/data/` (`updates.js`, `movies.js`, `music.js`, `books.js`).
  Edit the arrays there — no need to touch `App.jsx` for content changes.
  The Home page automatically shows only the top 4 entries from
  `updates.js`; the full list appears on the Updates page.
- **Research interests, socials, everything else** — still in
  `src/App.jsx`, since those are more tightly coupled to layout/icons.
