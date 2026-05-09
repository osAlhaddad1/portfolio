# Pipelines

**Purpose:** CI/CD workflows and triggers.

## `Deploy to Azure Static Web Apps`

Source: `.github/workflows/azure-static-web-apps.yml`.

| Trigger                                | Job                  | Effect                                                 |
|----------------------------------------|----------------------|--------------------------------------------------------|
| `push` to `main`                       | `build_and_deploy`   | Deploys repo root to the production Static Web App.    |
| `pull_request` opened/synchronize to `main` | `build_and_deploy` | Creates a per-PR preview environment.                  |
| `pull_request` closed                  | `close_pull_request` | Tears down the preview environment for that PR.        |

The workflow uses [`Azure/static-web-apps-deploy@v1`](https://github.com/Azure/static-web-apps-deploy) with:

- `app_location: "/"` — uploads from the repo root (where `index.html` lives).
- `api_location: ""` — no Azure Functions API.
- `output_location: ""` and `skip_app_build: true` — no build step; files are shipped as-is.

Authentication uses the `AZURE_STATIC_WEB_APPS_API_TOKEN` GitHub secret (see [secrets-and-config.md](secrets-and-config.md)).

## Local commands

| Command             | Effect                                                                                     |
|---------------------|--------------------------------------------------------------------------------------------|
| `npm start`         | Runs `serve . --listen 8000` — static file server.                                         |
| `npm run start:spa` | Runs `serve . --listen 8000 --single` — same, with SPA history fallback (not strictly needed since routing is hash-based). |
