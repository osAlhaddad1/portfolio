# Testing

**Purpose:** Test strategy and how tests run in CI.

**No test suite configured.** No Jest/Vitest/Playwright/Cypress. No `__tests__` or `*.test.js` files.

## Manual smoke checklist

When making non-trivial changes, walk through:

- Home page: scene initializes, floaters animate, greeting text appears, mouse moves the camera, resize adjusts the canvas.
- Navigation between every primary route works in both directions.
- Project detail: click each work tile and confirm the project page loads; visit a bad slug (`#/work/xyz`) and confirm the "not found" view.
- Theme picker: each of blue / purple / hotpink / black applies; refresh persists the selection.
- Guestbook: submitting the form routes to the success page; the back link returns; the bg/text color pickers update the live console preview.

## What's not tested

- Three.js scene visual regressions.
- Cross-browser behavior (esp. Safari particulars around importmap and WebGL).
- Mobile viewport rendering.

If automated tests are added, Playwright is the natural fit (no build step to integrate; can drive a `serve` instance directly).
