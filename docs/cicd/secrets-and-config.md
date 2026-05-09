# Secrets and config

**Purpose:** Env vars and secret management. (Names and locations only — never actual secret values.)

**No secrets and no environment variables.** The site is a public static SPA with no backend, no API keys, and no third-party credentials in source.

## Configuration sources

| Source                              | Owns                                                                |
|-------------------------------------|---------------------------------------------------------------------|
| `src/utils/config/scene-config.js`  | `SCENE_CONFIG` — Three.js scene parameters and theme palette colors. |
| `src/services/content/projects-service.js` | The `PROJECTS` catalog.                                       |
| Browser `localStorage`              | Active theme key (`ilithya-theme`).                                 |
| `package.json` `scripts`            | The two local-dev `serve` invocations.                              |

If secrets are ever introduced (e.g., an API key for a guestbook backend), they must not be committed. Use the deploy host's secret manager and inject them at build time only — never check them into `src/`.
