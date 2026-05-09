# Components

**Purpose:** Reusable UI components — what they do and key props.

## Web components

### `<osami-app>` — `src/app/app-shell.js`
Root shell. Listens to `hashchange`, picks which page component to render, toggles `body.is-home` / `body.is-inner`, and bootstraps theme + scene CSS variables on first import.
- **State:** `_route` (current route key string).

### `<osami-nav>` — `src/components/navigation/app-nav.js`
Primary header nav (About, Work, My Story, Guestbook) plus the theme color picker (Blue, Purple, Hotpink, Black). Reads/writes the active theme via `theme-service`.
- **Props:** `activePage` (string) — the nav key to mark `aria-current="page"`.
- **State:** `_activeTheme`.

### `<osami-home>` — `src/pages/home-page.js`
Landing page. Boots a Three.js scene of ~405 floating shapes plus an extruded "happy &lt;day&gt;" greeting. Lerps the camera toward the mouse and adjusts FOV.
- **Lifecycle:** Initializes the scene in `firstUpdated`; tears down RAF, renderer, and listeners in `disconnectedCallback`.

### `<osami-about>` — `src/pages/about-page.js`
Static about page (bio, press list, social links).

### `<osami-work>` — `src/pages/work-page.js`
Project gallery. Reads `PROJECTS` from `projects-service` and renders one big tile + two small + one full-width.

### `<osami-project slug>` — `src/pages/project-page.js`
Single project detail page. Resolves the project via `getProject(slug)`; renders a "not found" view if the slug is unknown.
- **Props:** `slug` (string) — passed by the shell when the route matches `work/<slug>`.

### `<osami-writing>` — `src/pages/writing-page.js`
Static journal-style "my story" page. Entries are an inline constant in the file.

### `<osami-guestbook>` — `src/pages/guestbook/guestbook-page.js`
Guestbook form (textarea, mood emoji slider, nickname, optional URL) with a "pimp your console" panel for live bg/text color customization. Submitting routes to `#/guestbook/success` — **the form data is not sent anywhere** (no backend).
- **State:** `_moodIdx`, `_bgColor`, `_textColor`.

### `<osami-guestbook-success>` — `src/pages/guestbook/guestbook-success-page.js`
Static thank-you confirmation with a back link.

## Template fragments

### `pageFooter()` — `src/components/layout/page-footer.js`
Returns a `<footer>` Lit template with a "top ▲" scroll-to-top button and Imprint/RSS links. Used by every inner page.

## Conventions

- All components opt out of Shadow DOM (`createRenderRoot() { return this; }`) so `global.css` selectors apply.
- All custom-element tag names are prefixed `osami-`.
- Components import their dependencies (no global registration list).
