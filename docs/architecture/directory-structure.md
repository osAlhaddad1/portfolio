# Directory structure

**Purpose:** Codebase layout — what lives where.

```
portfolio/
├── index.html                     Entry HTML, importmap, root <ilithya-app>
├── package.json                   serve devDep + start scripts
├── fonts/                         Static fonts referenced by global.css
│   └── gallaudetregular-webfont.woff2
├── src/
│   ├── main.js                    Imports app-shell to bootstrap
│   ├── app/
│   │   └── app-shell.js           <ilithya-app> root: routing + theme bootstrap
│   ├── components/
│   │   ├── layout/page-footer.js  pageFooter() template fragment
│   │   └── navigation/app-nav.js  <ilithya-nav> primary nav + theme picker
│   ├── pages/                     One Lit element per route
│   │   ├── home-page.js           <ilithya-home> Three.js landing scene
│   │   ├── about-page.js
│   │   ├── work-page.js           Tile grid of PROJECTS
│   │   ├── project-page.js        Single project from getProject(slug)
│   │   ├── writing-page.js        Static journal entries
│   │   └── guestbook/
│   │       ├── guestbook-page.js
│   │       └── guestbook-success-page.js
│   ├── services/                  Pure modules, no DOM ownership
│   │   ├── content/projects-service.js   PROJECTS array + getProject()
│   │   ├── router/hash-router.js         hashToRouteKey, getActiveNavPage
│   │   ├── theme/
│   │   │   ├── theme-service.js          localStorage + body[data-theme]
│   │   │   └── css-vars-service.js       Writes palette to :root
│   │   └── three/
│   │       ├── scene-service.js          Renderer, camera, env, lighting
│   │       ├── floaters-service.js       Random floating mesh swarm
│   │       ├── interaction-service.js    Mouse → camera/FOV; floater + text update
│   │       └── text-service.js           Async-loads font, adds 3D greeting
│   ├── utils/
│   │   └── config/scene-config.js        SCENE_CONFIG single source of truth
│   └── assets/
│       ├── fonts/                        (currently unused; fonts live in /fonts)
│       └── styles/
│           ├── global.css                ~913 lines — main stylesheet
│           └── main.css                  ~137 lines — supplementary styles
└── node_modules/                  serve and its deps
```

## Conventions

- Each web component file calls `customElements.define()` at the bottom — importing the file is sufficient to register it.
- Components opt out of Shadow DOM (`createRenderRoot() { return this; }`) so they share `global.css`.
- Service modules export pure functions and named constants. They never import Lit and never touch the DOM directly (the Three.js services touch the canvas and `window`, but no app DOM).
- File naming: kebab-case for files, PascalCase for component classes, `kebab-case` custom-element tag names prefixed `ilithya-`.
