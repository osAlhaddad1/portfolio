# Tech stack

**Purpose:** Languages, frameworks, libraries, and why each was chosen.

## Runtime

| Layer | Choice | Why |
|---|---|---|
| Component framework | **Lit 3** (via CDN) | Native web components, no build step required, small runtime, declarative `html` templates. |
| 3D engine | **three.js 0.160** | Industry-standard WebGL library; addons (`RoundedBoxGeometry`, `FontLoader`, `TextGeometry`) cover the home-page scene needs. |
| Module loading | Native ESM + `<script type="importmap">` | Lets us import `lit` and `three` by name with no bundler. |
| Routing | Hash-based (`window.location.hash` + `hashchange`) | Works on any static host without server-side rewrites. |

## Tooling

| Tool | Purpose |
|---|---|
| **serve** (npm devDependency) | Static file server for local dev (`npm start`). |

There is no bundler (no Webpack/Vite/Rollup), no transpiler (no Babel/TypeScript), no test runner, and no linter configured.

## External fonts

- `gallaudetregular-webfont.woff2` — local file in `fonts/`, loaded by `global.css`.
- Three.js text geometry uses `helvetiker_bold.typeface.json` from the jsDelivr CDN at runtime.

## Why no build step

The site is shipped as plain HTML/JS/CSS. Importmaps and ESM remove the typical reason for a bundler. Trade-off: every visitor pays one HTTP request per source file on a cold load.
