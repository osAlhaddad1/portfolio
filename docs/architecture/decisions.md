# Decisions

**Purpose:** Architecture Decision Records — non-obvious choices and the reasoning.

## ADR-001: No build step

**Decision:** Ship plain ESM modules and load `lit` / `three` from a CDN via importmap.

**Reasoning:** The site is small and static. A bundler would add tooling, CI complexity, and source maps for marginal payload savings. Dev iteration is "save → refresh."

**Trade-off:** Cold-load makes one HTTP request per source file. Acceptable for a portfolio site at this scale.

## ADR-002: Hash-based routing

**Decision:** Routes are encoded as `#/about`, `#/work/<slug>`, etc. The shell reacts to `hashchange`.

**Reasoning:** Works on any static host (GitHub Pages, S3, Vercel static) with zero server config. Avoids the need for a SPA fallback rewrite.

**Trade-off:** URLs carry the `#`, which is uglier than History API URLs and less SEO-friendly.

## ADR-003: Theme as a `data-theme` body attribute

**Decision:** Theme switching mutates `document.body[data-theme]` and persists the value in `localStorage`. CSS reacts via attribute selectors.

**Reasoning:** Keeps theme logic out of every component — they don't know which theme is active. One service (`theme-service.js`) owns persistence.

**Trade-off:** Requires the theme palette to live in CSS custom properties, which it does.

## ADR-004: Page components own their own scene/effects

**Decision:** The home page initializes its Three.js scene in `firstUpdated()` and tears it down in `disconnectedCallback()`. The shell does not own Three.js state.

**Reasoning:** When the user navigates away from `#/` the home component is removed from the DOM, which triggers cleanup naturally. No stale `requestAnimationFrame` loops survive a route change.

**Trade-off:** If we add a second 3D-using page, the scene boot/teardown pattern has to be repeated.

## ADR-005: Project content as a JS module, not JSON

**Decision:** `services/content/projects-service.js` exports an array of project objects directly, including HTML-bearing strings.

**Reasoning:** No fetch round-trip, no async boundary, type checking by editor. Suitable while the project list is small and rarely changes.

**Trade-off:** Updating projects requires a code edit and redeploy; non-engineers can't edit the catalog.
