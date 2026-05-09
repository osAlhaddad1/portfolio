# Secrets and config

**Purpose:** Env vars and secret management. (Names and locations only — never actual secret values.)

The runtime SPA has no secrets and no environment variables — it's a public static site with no backend or third-party credentials in source. The only secret is for the deploy pipeline.

## GitHub Actions secrets

| Name                                 | Used by                                            | Purpose                                              | Rotation                                                                                              |
|--------------------------------------|----------------------------------------------------|------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| `AZURE_STATIC_WEB_APPS_API_TOKEN`    | `.github/workflows/azure-static-web-apps.yml`      | Authenticates the deploy step against Azure.         | `az staticwebapp secrets reset-api-key --name osami-portfolio --resource-group portfolio-rg`, then update the GitHub secret. |

## Configuration sources

| Source                              | Owns                                                                |
|-------------------------------------|---------------------------------------------------------------------|
| `src/utils/config/scene-config.js`  | `SCENE_CONFIG` — Three.js scene parameters and theme palette colors. |
| `src/services/content/projects-service.js` | The `PROJECTS` catalog.                                       |
| Browser `localStorage`              | Active theme key (`osami-theme`).                                 |
| `package.json` `scripts`            | The two local-dev `serve` invocations.                              |

If secrets are ever introduced (e.g., an API key for a guestbook backend), they must not be committed. Use the deploy host's secret manager and inject them at build time only — never check them into `src/`.
