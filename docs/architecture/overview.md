# Overview

**Purpose:** High-level system shape — components and how they fit together.

## Shape

A single-page static site. No build step, no bundler, no server-side rendering. The browser loads `index.html`, which mounts a single root web component (`<ilithya-app>`); routing happens via `hashchange` on the same page.

```
index.html
  └─ <ilithya-app>          (src/app/app-shell.js)
       ├─ <ilithya-nav>     (src/components/navigation/app-nav.js)
       └─ one of:
            <ilithya-home>          (Three.js canvas scene)
            <ilithya-about>
            <ilithya-work>          (project tile grid)
            <ilithya-project slug>  (single project detail)
            <ilithya-writing>
            <ilithya-guestbook>
            <ilithya-guestbook-success>
```

## Layers

- **App shell** — listens to `hashchange`, picks the page component to render, toggles `is-home`/`is-inner` body classes.
- **Pages** — Lit components, one per route. Each owns its own DOM and side effects.
- **Services** — pure modules with no DOM ownership: routing, theme persistence, content (projects), Three.js scene helpers.
- **Components** — small reusable UI pieces (`app-nav`, `pageFooter`).
- **Config** — `SCENE_CONFIG` is the single source of truth for the home-page Three.js scene and the theme palette.

## Dependencies

Loaded at runtime via `<script type="importmap">` in `index.html`:
- `lit` — web component framework
- `three` + `three/addons/` — 3D engine and helpers (RoundedBoxGeometry, FontLoader, TextGeometry)

`serve` (npm devDependency) is a static file server for local dev only.

See [tech-stack.md](tech-stack.md), [data-flow.md](data-flow.md), [directory-structure.md](directory-structure.md).
