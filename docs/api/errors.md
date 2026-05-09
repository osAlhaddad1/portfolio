# Errors

**Purpose:** Error response format and status codes.

**No API, no error responses.** Documented here are the equivalent in-app error states the user can observe.

| Situation                               | Behavior                                                           |
|-----------------------------------------|--------------------------------------------------------------------|
| Unknown route key (e.g., `#/nope`)      | Falls through to the home page in `app-shell.js` `renderPage()`.   |
| Unknown project slug (e.g., `#/work/xyz`) | `<osami-project>` renders a "Project not found." block with a back link. |
| Three.js font fails to load             | `addGreetingText` callback never runs; floaters still render. There is no user-visible error message. |
| CDN unreachable (lit / three)           | The page fails to bootstrap; the user sees an empty `<osami-app>`. No fallback. |

There is no logging, no error boundary, and no telemetry.
