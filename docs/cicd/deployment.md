# Deployment

**Purpose:** Deploy process and rollback procedure.

Production hosting: **Azure Static Web Apps** (Free tier).

| Resource              | Value                                                  |
|-----------------------|--------------------------------------------------------|
| Resource group        | `portfolio-rg`                                         |
| Static Web App name   | `osami-portfolio`                                      |
| Region                | West Europe                                            |
| Default hostname      | `salmon-bush-0d5dc0b03.7.azurestaticapps.net`          |

## Automated deploy

Every push to `main` triggers `.github/workflows/azure-static-web-apps.yml`, which uploads the repo root to Azure. Pull requests get isolated preview URLs that are torn down on close. See [pipelines.md](pipelines.md).

What gets shipped: the entire repo root. `node_modules/`, `package.json`, and `package-lock.json` are uploaded but unused at runtime — `serve` is dev-only and the browser pulls Lit and three.js from jsDelivr at runtime via the importmap. To exclude dev files from the deploy, add a `staticwebapp.config.json` or `.swaignore`.

## Pre-merge checklist

Before merging to `main`:

1. Verify locally: `npm start` and visit `http://localhost:8000`.
2. Click through every primary route — home, about, work (open at least one project), writing, guestbook (submit form to confirm success page).
3. Toggle each theme in the picker; refresh to confirm `localStorage` persistence.
4. If the PR has a preview URL (visible in the PR Checks/Comments), repeat the smoke test there.

## Rollback

Two options, in order of preference:

1. **Revert the commit on `main`** — `git revert <sha> && git push`. The workflow re-runs on the revert and Azure replaces the live content.
2. **Re-run a previous successful workflow run** — in the GitHub Actions tab, open the green run that produced the desired state and click **Re-run all jobs**.

There is no build artifact and no database, so rollback is a pure file-replacement operation.

## Initial Azure setup (one-time, already done)

Recorded for reference / disaster recovery:

```bash
az group create --name portfolio-rg --location westeurope
az staticwebapp create --name osami-portfolio --resource-group portfolio-rg --location westeurope --sku Free
az staticwebapp secrets list --name osami-portfolio --resource-group portfolio-rg --query "properties.apiKey" -o tsv
# Add the printed token to GitHub as the AZURE_STATIC_WEB_APPS_API_TOKEN secret.
```

To rotate the deploy token: `az staticwebapp secrets reset-api-key --name osami-portfolio --resource-group portfolio-rg`, then re-fetch and update the GitHub secret.

## Caching

Azure Static Web Apps applies sensible defaults. If custom caching is needed (e.g., shorter TTL on `index.html` so importmap or script-tag changes propagate quickly), add a `staticwebapp.config.json` at the repo root with route-level `headers`. Source modules under `src/` have stable filenames (no hashing), so prefer short TTLs there as well.
