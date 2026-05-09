# State

**Purpose:** State management approach and where each piece of state lives.

## Approach

No store. Each component owns its own state via Lit's reactive properties (`static properties`). Cross-component state is held in two places:

1. **The URL hash** — the source of truth for "what page is active." The shell reads it; the nav writes it indirectly (via anchor `href`s); pages read their slug from props passed by the shell.
2. **`localStorage`** — the only persistent state. Currently used for the active theme.

## Per-component state

| Component                         | State property      | Purpose                                  |
|-----------------------------------|---------------------|------------------------------------------|
| `<ilithya-app>`                   | `_route`            | Current route key; updated on `hashchange`. |
| `<ilithya-nav>`                   | `_activeTheme`      | Currently selected theme key.            |
| `<ilithya-guestbook>`             | `_moodIdx`          | Index into the `MOODS` emoji array.      |
| `<ilithya-guestbook>`             | `_bgColor`          | Console background color (hex).          |
| `<ilithya-guestbook>`             | `_textColor`        | Console text color (hex).                |
| `<ilithya-project>`               | `slug`              | Reactive **prop** set by the shell.      |
| `<ilithya-home>` (instance vars)  | `_renderer`, `_rafId`, `_onMouseMove`, `_onResize` | Three.js handles + listeners for cleanup. Not reactive. |

## Persistent state

| Key             | Where                | Values                                       |
|-----------------|----------------------|----------------------------------------------|
| `ilithya-theme` | `localStorage`       | `''` (blue, default) / `purple` / `hotpink` / `black` |

`theme-service.js` is the only writer. `''` is stored for the default "blue" theme so the body attribute matches the bare `body[data-theme='']` default styling.

## Body class state (DOM-as-state)

Set by `<ilithya-app>.updated()`:
- `body.is-home` — when the home page is active.
- `body.is-inner` — when any non-home page is active.

CSS uses these to switch the layout (the home page renders only the canvas; inner pages have a content wrapper, header, and footer).

## What is *not* in state

- Project content — static module export in `projects-service.js`.
- Journal entries — inline constant in `writing-page.js`.
- Existing guestbook entries — inline constant in `guestbook-page.js`.
- Submitted guestbook entries — discarded (no backend).
