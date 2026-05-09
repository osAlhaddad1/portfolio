# Environments

**Purpose:** Dev / staging / prod purposes and configs.

## Development

Local only. Run `npm start` to serve the repo root on `http://localhost:8000` with `serve`. The site has no build step, so editing a file under `src/` and refreshing the browser is the full inner-loop.

## Staging

None configured.

## Production

Not configured in this repo. The site is deployable to any static host (GitHub Pages, S3 + CloudFront, Vercel/Netlify static, Cloudflare Pages) by uploading `index.html`, `src/`, and `fonts/`. No server-side runtime is required.

If deployed under a non-root path, the asset reference `<link rel="stylesheet" href="/src/assets/styles/global.css">` in `index.html` and the `@font-face` URL in `global.css` (`/fonts/...`) are absolute and will need to be made relative or the deploy needs to be rooted at `/`.

## Configuration

There are no environment variables. `SCENE_CONFIG` in `src/utils/config/scene-config.js` is the single source of configuration; changes require a code edit.
