# External integrations

**Purpose:** Third-party services (Stripe, S3, email, etc.).

**No application-level integrations.** No API keys, no webhooks, no third-party SDKs in source.

The only external dependencies are CDN-hosted static assets loaded by the browser at runtime:

| Resource                          | Host                       | Used by                                           |
|-----------------------------------|----------------------------|---------------------------------------------------|
| `lit` ESM bundle                  | `cdn.jsdelivr.net`         | `index.html` importmap                            |
| `three` + addons ESM bundle       | `cdn.jsdelivr.net`         | `index.html` importmap                            |
| `helvetiker_bold.typeface.json`   | `cdn.jsdelivr.net`         | `services/three/text-service.js` (`FontLoader`)   |

These are unauthenticated public CDN fetches.

If an outage on jsDelivr occurs, the home Three.js scene fails to load (lit and three would not be available). Mitigation, if needed, is to vendor the assets locally or pin a fallback CDN.
