# Pipelines

**Purpose:** CI/CD workflows and triggers.

**No CI/CD configured.** There is no `.github/workflows/`, no `.gitlab-ci.yml`, no Vercel/Netlify config in the repo.

Local-only commands available via `npm`:

| Command         | Effect                                                    |
|-----------------|-----------------------------------------------------------|
| `npm start`     | Runs `serve . --listen 8000` — static file server.        |
| `npm run start:spa` | Runs `serve . --listen 8000 --single` — same, with SPA history fallback (not strictly needed since routing is hash-based). |

If a pipeline is added later, document it here. Suggested triggers: push to `main` for production deploy, push to other branches for preview deploys.
