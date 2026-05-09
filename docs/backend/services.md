# Services

**Purpose:** Business logic services / modules.

## Backend status

**There is no backend in this repository.** The site is a static SPA served as plain files; all "services" are client-side ES modules under `src/services/`.

For the documented client-side services that play a service-shaped role:

| Module | Path | Responsibility |
|---|---|---|
| Projects content service | `src/services/content/projects-service.js` | Owns the `PROJECTS` array; exposes `getProject(slug)`. |
| Hash router | `src/services/router/hash-router.js` | Translates `window.location.hash` to route keys; computes the active nav tab. |
| Theme service | `src/services/theme/theme-service.js` | Reads/writes `localStorage['ilithya-theme']`; mutates `body[data-theme]`. |
| CSS vars service | `src/services/theme/css-vars-service.js` | Writes the theme palette from `SCENE_CONFIG` onto `:root`. |
| Three scene service | `src/services/three/scene-service.js` | Builds renderer, scene, camera, env map, lighting, text material. |
| Floaters service | `src/services/three/floaters-service.js` | `buildFloaters()` populates the home scene with random meshes. |
| Interaction service | `src/services/three/interaction-service.js` | Pointer → camera/FOV; floater + text per-frame updates. |
| Text service | `src/services/three/text-service.js` | Async-loads the helvetiker font and adds the 3D greeting. |

## Service conventions

- Pure functions, named exports.
- Do not import Lit; do not own DOM beyond the canvas they're handed.
- Read configuration from `SCENE_CONFIG` (passed in as a parameter) rather than reading globals.

## Future backend

If a real backend is added (e.g., to persist guestbook entries), document its services here. Until then, this file stays minimal by design.
