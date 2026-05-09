# Styling

**Purpose:** Design system, theming, and CSS approach.

## Approach

Single global stylesheet at `src/assets/styles/global.css` (~913 lines), loaded once from `index.html`. A supplementary `main.css` (~137 lines) sits alongside it.

All components opt **out** of Shadow DOM (`createRenderRoot() { return this; }`), so the global stylesheet's selectors apply throughout. There is no CSS-in-JS, no PostCSS, and no preprocessor.

## Class naming

Loosely BEM-style with `c-` (component), `m-` (module/wrapper), and `u-` (utility) prefixes. Examples:

- `c-header`, `c-nav`, `c-nav__item`, `c-picker`, `c-picker__btn--01`
- `c-page`, `c-page__heading`, `c-page__cnt__wrapper`
- `c-fig-tiles`, `c-tile-bg`, `c-fig-caption`
- `m-wrapper`
- `u-flex-row`, `u-flex-col`, `u-fixed-cnt`

## Theme system

Theme palettes live in CSS custom properties defined on `:root`. JS overrides them at boot via `applySceneCssVariables(SCENE_CONFIG)` so the values match the source-of-truth in `src/utils/config/scene-config.js`.

Per-theme variable triples (start / mid / end / picker) for `blue`, `purple`, `hotpink`, `black`. The active theme is selected by setting `document.body[data-theme]` and is persisted in `localStorage`.

```css
:root { --c_blue_start: ...; --c_purple_start: ...; ... }
body[data-theme='purple'] { --c_theme_bg_start: var(--c_purple_start); ... }
```

The default (no `data-theme` attribute, or `data-theme=''`) uses the blue palette.

See [../architecture/decisions.md](../architecture/decisions.md#adr-003-theme-as-a-data-theme-body-attribute).

## Local fonts

- `gallaudetregular-webfont.woff2` (in `/fonts/`) — declared as `@font-face` in `global.css`.

## Layout signals from the app shell

Inner pages (anything other than the home Three.js scene) use a `m-wrapper` container and the `pageFooter()` fragment. The shell toggles `body.is-home` and `body.is-inner` so CSS can swap layout modes.

## Console aesthetic

The guestbook uses a "terminal/console" visual: traffic-light dots, monospace prompts (`>_`), a dark background, and per-entry `--entry-bg`/`--entry-fg` custom properties applied inline so the user's "pimp your console" choices style live entries.
