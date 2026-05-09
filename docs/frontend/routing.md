# Routing

**Purpose:** Pages, routes, and navigation structure.

## Mechanism

Hash-based. The shell listens to `window.addEventListener('hashchange', ...)`. URLs look like `/#/about`, `/#/work/webgi-jewelry`, `/#/guestbook/success`. The `#` keeps everything client-side, so any static host works without a SPA fallback rule.

The router lives in `src/services/router/hash-router.js`:

- `hashToRouteKey(hash)` — strips the leading `#/` and returns the route key (`''` for home).
- `isInnerRoute(key)` — `true` for any non-home route; the shell uses this to toggle `body.is-inner`/`body.is-home`.
- `getActiveNavPage(key)` — collapses sub-routes (`work/<slug>`, `guestbook/success`) to their parent nav key so the nav highlights the right tab.
- `ROUTES` — map of route key → custom-element tag name (informational; the shell uses an explicit `switch` rather than this table).

## Routes

| Hash                       | Route key            | Component                       |
|----------------------------|----------------------|---------------------------------|
| `/` or `#`                 | `''`                 | `<osami-home>`                |
| `#/about`                  | `about`              | `<osami-about>`               |
| `#/work`                   | `work`               | `<osami-work>`                |
| `#/work/<slug>`            | `work/<slug>`        | `<osami-project slug=...>`    |
| `#/writing`                | `writing`            | `<osami-writing>`             |
| `#/guestbook`              | `guestbook`          | `<osami-guestbook>`           |
| `#/guestbook/success`      | `guestbook/success`  | `<osami-guestbook-success>`   |

Unknown route keys fall through to the home page.

## Primary nav

Defined in `app-nav.js` as `NAV_PAGES`:

| Label      | Href           | Key         |
|------------|----------------|-------------|
| About      | `#/about`      | `about`     |
| Work       | `#/work`       | `work`      |
| My Story   | `#/writing`    | `writing`   |
| Guestbook  | `#/guestbook`  | `guestbook` |

The `osami` logo also links to `#` (home).

## Project slugs

Defined in `src/services/content/projects-service.js`:

- `webgi-jewelry`
- `threejs-graces`
- `apple-liquid-glass`
- `ledger-system`

Linked from `<osami-work>` tiles. Unknown slugs render a "Project not found." fallback.
