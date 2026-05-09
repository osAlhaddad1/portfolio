# Data flow

**Purpose:** End-to-end flow of a request / interaction.

## Cold load (visitor lands on `/`)

1. Browser fetches `index.html`.
2. `index.html` declares an importmap mapping `lit` and `three` to CDN URLs and loads `/src/main.js`.
3. `main.js` imports `app/app-shell.js`, which:
   - Imports `SCENE_CONFIG` and calls `applySceneCssVariables(SCENE_CONFIG)` — writes theme palette CSS variables onto `:root`.
   - Calls `restoreTheme()` — reads `localStorage['ilithya-theme']` and sets `body[data-theme]`.
   - Imports every page component so `customElements.define` runs once for each.
4. The HTML contains `<ilithya-app>`, which now upgrades. Its `connectedCallback` reads `window.location.hash` and renders the matching page.

## Route change (`hashchange`)

1. User clicks a nav link (`<a href="#/about">`).
2. Browser updates the URL fragment and fires `hashchange`.
3. `app-shell` listener calls `hashToRouteKey()` and writes the result to its `_route` reactive property.
4. Lit re-renders. The previous page component disconnects (running its `disconnectedCallback` cleanup), and the new one connects.
5. `updated()` toggles `body.is-home` / `body.is-inner` based on the new route.

## Home-page render loop

1. `<ilithya-home>` mounts. `firstUpdated()` calls `initScene()`.
2. Renderer, scene, and camera are created from `SCENE_CONFIG`.
3. `applyEnvironment()` builds an off-screen cloud sphere, runs it through `PMREMGenerator`, and assigns the result as `scene.environment`.
4. Lighting is added; `buildFloaters` creates ~405 random meshes; `addGreetingText` async-loads a font and adds extruded text.
5. A `requestAnimationFrame` tick runs every frame:
   - `updateCameraFromPointer` lerps camera position toward the mouse target and adjusts FOV.
   - `updateFloaters` rotates and bobs each mesh; wraps positions across the screen edges.
   - `updateTextWiggle` oscillates the text group's transform.
   - `renderer.render(scene, camera)`.
6. On disconnect: `cancelAnimationFrame`, `renderer.dispose()`, and the `mousemove` / `resize` listeners are removed.

## Theme change

1. User clicks a `c-picker__btn` swatch in the nav.
2. `pickTheme(themeKey)` calls `applyThemeByKey(themeKey)`.
3. The service writes `body[data-theme]=<value>` and `localStorage['ilithya-theme']=<value>`.
4. CSS attribute selectors (`body[data-theme=purple] { ... }`) repaint the gradient and accent colors. No JS re-render needed.

## Guestbook submit (mocked)

1. User fills the form and submits.
2. `handleSubmit` calls `event.preventDefault()` and sets `window.location.hash = '#/guestbook/success'`.
3. The shell routes to `<ilithya-guestbook-success>`. The form data is **not** sent anywhere — there is no backend.

See [../api/endpoints.md](../api/endpoints.md) (notes the absence of a real API) and [../backend/services.md](../backend/services.md) (notes there is no backend).
