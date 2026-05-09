# Environments

**Purpose:** Dev / staging / prod purposes and configs.

## Development

Local only. Run `npm start` to serve the repo root on `http://localhost:8000` with `serve`. The site has no build step, so editing a file under `src/` and refreshing the browser is the full inner-loop.

## Staging (PR previews)

Each open pull request against `main` gets an ephemeral Azure Static Web Apps preview environment with its own URL, posted as a check on the PR. The environment is automatically destroyed when the PR is closed or merged. Driven by `.github/workflows/azure-static-web-apps.yml`.

## Production

Hosted on **Azure Static Web Apps** (Free tier).

- Resource group: `portfolio-rg`
- App name: `osami-portfolio`
- Region: West Europe
- URL: `https://salmon-bush-0d5dc0b03.7.azurestaticapps.net`
- Deploy: pushes to `main` (see [deployment.md](deployment.md)).

The site is rooted at `/`, so the absolute asset references in `index.html` (`/src/assets/styles/global.css`) and the `@font-face` URL in `global.css` (`/fonts/...`) resolve correctly. Moving to a non-root path would require making those references relative.

## Configuration

There are no environment variables. `SCENE_CONFIG` in `src/utils/config/scene-config.js` is the single source of configuration; changes require a code edit.
