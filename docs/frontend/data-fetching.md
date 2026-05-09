# Data fetching

**Purpose:** How the frontend talks to APIs.

## Summary

**The frontend does not fetch any application data at runtime.** All content is bundled into ES modules and inlined in component files. There are no `fetch`, `XMLHttpRequest`, or websocket calls in `src/`.

## Content sources

| Content                          | Where                                                | Mechanism             |
|----------------------------------|------------------------------------------------------|-----------------------|
| Project catalog                  | `src/services/content/projects-service.js`           | ES module export      |
| Project lookup by slug           | `getProject(slug)` in same file                      | Array `.find()`       |
| Journal entries (My Story)       | `ENTRIES` constant in `src/pages/writing-page.js`    | Inline constant       |
| Guestbook entries (sample)       | `ENTRIES` constant in `src/pages/guestbook/guestbook-page.js` | Inline constant |
| About / press / links            | Inline JSX in `src/pages/about-page.js`              | Hard-coded markup     |

## Runtime network requests

Loaded by the browser via `<script>`/`@font-face`, not by the application code:

| Resource                                                     | Origin                          | When           |
|--------------------------------------------------------------|---------------------------------|----------------|
| `lit` core bundle                                            | `cdn.jsdelivr.net/gh/lit/dist@3` | Cold load      |
| `three` + addons                                             | `cdn.jsdelivr.net/npm/three@0.160.0` | Cold load |
| `helvetiker_bold.typeface.json`                              | `cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/` | Home page mount (via `FontLoader`) |
| `gallaudetregular-webfont.woff2`                             | Local `/fonts/`                 | First glyph use |

## Form submissions

The guestbook form's `submit` handler calls `event.preventDefault()` and navigates to `#/guestbook/success`. Nothing is POSTed. See [../architecture/data-flow.md](../architecture/data-flow.md#guestbook-submit-mocked).

## If a real API is added later

The natural place for an HTTP client wrapper is `src/services/` (e.g., `src/services/api/client.js`), keeping it parallel to `services/content/`, `services/router/`, and `services/theme/`.
