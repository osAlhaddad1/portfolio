# Deployment

**Purpose:** Deploy process and rollback procedure.

**No deploy automation configured.** Procedure below is the manual baseline.

## Files to ship

```
index.html
src/                   (excluding any test or scratch files)
fonts/
```

`node_modules/`, `package-lock.json`, and `package.json` are **not** required at runtime — `serve` is dev-only. The browser pulls Lit and three.js from jsDelivr at runtime via the importmap.

## Manual deploy

1. Verify the site renders locally: `npm start` and visit `http://localhost:8000`.
2. Click through every primary route — home, about, work (open at least one project), writing, guestbook (submit form to confirm success page).
3. Toggle each theme in the picker; refresh to confirm `localStorage` persistence.
4. Upload the files above to the static host of choice. Ensure the host serves `index.html` for the root path.

## Rollback

Re-deploy the previous set of files. Because the site has no build artifacts and no database, rollback is a pure file-replacement operation. Once a new git history is established, `git checkout <previous-sha>` followed by re-deploying is the canonical path.

## Caching

If deploying behind a CDN, set short cache TTLs on `index.html` so importmap or script-tag changes propagate quickly. Source modules under `src/` may be cached aggressively if their filenames are stable (no hashing is applied today, so prefer short TTLs there too).
