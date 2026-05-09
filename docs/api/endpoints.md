# Endpoints

**Purpose:** All HTTP endpoints, methods, paths, and summaries.

**Not applicable to this project.** The site has no HTTP API. The deployed surface is a set of static files served from disk.

## "Routes" the site exposes

These are not endpoints — they are client-side hash routes interpreted by the browser. Documented here so external observers don't expect a server-side router.

| Hash route                | Description                                  |
|---------------------------|----------------------------------------------|
| `#/` (or no hash)         | Home (Three.js landing scene)                |
| `#/about`                 | About                                        |
| `#/work`                  | Project gallery                              |
| `#/work/<slug>`           | Single project (slugs: `webgi-jewelry`, `threejs-graces`, `apple-liquid-glass`, `ledger-system`) |
| `#/writing`               | Journal entries                              |
| `#/guestbook`             | Guestbook (form submits do **not** POST anywhere) |
| `#/guestbook/success`     | Confirmation                                 |

See [../frontend/routing.md](../frontend/routing.md) for the implementation, and [../architecture/data-flow.md](../architecture/data-flow.md#guestbook-submit-mocked) for why the guestbook form is a no-op.
