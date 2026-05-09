# Jobs

**Purpose:** Background jobs, schedulers, queues.

**Not applicable to this project.** There is no backend; therefore no schedulers, cron jobs, or queues.

The closest analogue on the client side is the home page's `requestAnimationFrame` render loop in `src/pages/home-page.js` (`tick` function). It runs every animation frame while the home page is mounted and is cancelled in `disconnectedCallback`. It is not a "job" in the backend sense and is documented in [../architecture/data-flow.md](../architecture/data-flow.md#home-page-render-loop).
