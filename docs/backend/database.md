# Database

**Purpose:** Schema, models, migrations, ORM setup.

**Not applicable to this project.** There is no backend and no database. All content is shipped as ES module exports — see [services.md](services.md) and [../frontend/data-fetching.md](../frontend/data-fetching.md).

The only persistence is browser `localStorage`:

| Key             | Value                                | Writer                  |
|-----------------|--------------------------------------|-------------------------|
| `ilithya-theme` | `''` / `purple` / `hotpink` / `black` | `services/theme/theme-service.js` |
