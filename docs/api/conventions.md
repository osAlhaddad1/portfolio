# Conventions

**Purpose:** Versioning, pagination, rate limiting, naming.

**No API, so no API conventions apply.** This file is intentionally minimal.

## Internal naming conventions worth recording

- **Custom-element tag names** are kebab-case and prefixed `osami-` (e.g., `<osami-app>`, `<osami-nav>`, `<osami-project>`).
- **Route keys** mirror the URL fragment minus the leading `#/`. The empty string `''` is the home key.
- **Project slugs** are kebab-case and stable; they appear in URLs (`#/work/<slug>`).
- **Theme keys** are lower-case single words (`blue`, `purple`, `hotpink`, `black`); the default `blue` is encoded as the empty string when persisted, so `body[data-theme]` is empty on the default theme.
- **CSS classes** use BEM-style with `c-` (component), `m-` (module), `u-` (utility) prefixes.
