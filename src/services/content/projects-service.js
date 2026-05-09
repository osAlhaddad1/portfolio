export const PROJECTS = [
  {
    slug: 'webgi-jewelry',
    title: 'WebGi Jewelry',
    type: 'Personal Project',
    category: 'WebGL',
    thumb: 'url("/src/assets/pics/jewelry/ring.png") center/cover no-repeat',
    images: [
      { bg: 'url("/src/assets/pics/jewelry/ring.png") center/cover no-repeat', h: 480 },
    ],
    meta: [
      { label: 'Type', value: '3D product configurator' },
      { label: 'Technology', value: 'WebGi, TypeScript, GSAP, Lenis' },
      { label: 'Live', value: 'webgi-jewelry.vercel.app' },
      { label: 'Year', value: '2025' },
    ],
    description: [
      'Problem Statement: Static product images fail to communicate the three-dimensional form, reflectance, and material variation of jewelry. The objective was to build a browser-based 3D product configurator that lets users view a ring from any angle, swap materials and gemstone colors in real time, and navigate the product through a scroll-driven story — without requiring a native app or plugin.',
      'Constraints: WebGi 0.4.6 has no built-in scroll animation system; camera keyframing had to be wired manually via GSAP ScrollTrigger. GLB model size (two files, ~3 MB each) imposes a load latency budget that ruled out streaming high-resolution geometry on mobile. Bloom, SSR pass count, and device pixel ratio all had to be tuned per device class to maintain frame rates.',
      'Options and Trade-offs: Three approaches were considered for the scroll-driven camera system. First, CSS scroll-timeline — not supported in Safari at build time and limited to transform-based animations that cannot drive 3D camera coordinates. Rejected. Second, video scrubbing — a pre-rendered camera path encoded as video and scrubbed with scroll — lower rendering cost, but removes real-time interactivity and material customization. Rejected. Third, GSAP ScrollTrigger bound to camera position and target values, interpolated each frame — fully interactive, cross-browser, and integrates cleanly with the existing animation timeline. Chosen.',
      'Execution: Built with WebGi 0.4.6, TypeScript 4.4, GSAP 3.10, and Lenis for smooth scroll physics. The rendering pipeline includes GBuffer deferred rendering, 32-sample progressive rendering, SSR, SSAO, TemporalAA, and a specialized diamond plugin. Two GLB models load on demand — the second fetches only when the user switches rings. Gemstone colors use lerpColors() across 11 presets; metal combinations are resolved via material name lookups across 7 configurations. Mobile detection disables bloom, halves SSR passes, and caps DPR at 1.0. A night mode toggle adjusts the background and applies CSS filters to UI elements.',
      'Results: 77 possible visual configurations (11 gem colors × 7 material combinations) across two ring models. Progressive rendering delivers a usable first frame immediately, with quality accumulating over 32 samples at idle. Mobile performance maintains >45 FPS on mid-tier hardware by halving SSR passes and capping pixel ratio at 1.0. The ~3 MB initial GLB payload reaches a Time to Interactive of <2 seconds on a standard 4G connection. Deployed to Vercel at webgi-jewelry.vercel.app.',
      'Post-Mortem: Model-specific logic — object name arrays, rotation offsets, material mappings — is hardcoded per ring, making catalog expansion error-prone. A data-driven configuration schema would decouple model metadata from application logic. Audio autoplay is blocked by most browsers without a prior user gesture; the current implementation does not handle this case. The next step is externalizing ring configurations into JSON and adding a background preload strategy that fetches the second model after the first renders.',
    ],
  },
  {
    slug: 'threejs-graces',
    title: 'Three Graces',
    type: 'Personal Project',
    category: 'WebGL',
    thumb: 'url("/src/assets/pics/three-graces/three%20graces.png") center/cover no-repeat',
    images: [
      { bg: 'url("/src/assets/pics/three-graces/three%20graces.png") center/cover no-repeat', h: 480, caption: '[ current — interactive 3D ]' },
      { bg: 'url("/src/assets/pics/three-graces/old.png") center/cover no-repeat', h: 480, caption: '[ original museum site — static photography ]' },
    ],
    meta: [
      { label: 'Type', value: 'Interactive 3D web experience' },
      { label: 'Technology', value: 'Three.js, DRACO, Webpack, Tween.js' },
      { label: 'Live', value: 'threejs-graces.tiiny.site' },
      { label: 'Year', value: '2022' },
    ],
    description: [
      'Problem Statement: Museums rely on photography for digital artifact presentation, which fails to capture the full three-dimensional form of sculptural works. The objective was to build a browser-based interactive 3D viewer for Antonio Canova\'s "The Three Graces," allowing users to examine the sculpture from multiple angles and access per-figure contextual information without specialized software or plugins.',
      'Constraints: The source GLB model exceeds 10 MB at full resolution, which is prohibitive for standard web delivery. Three.js 0.134 has no native level-of-detail system for managing render complexity per viewport. Running two independent 3D renderers simultaneously on a single page creates GPU contention that affects frame rate. Device pixel ratio on retina screens doubles render workload, compounding the performance cost.',
      'Options and Trade-offs: Three approaches were considered for model size. First, mesh decimation to reduce polygon count — degrades surface detail on smooth marble geometry at the simplification level required. Rejected. Second, KTX2 texture compression — reduces texture memory but does not address vertex data size. Rejected. Third, DRACO geometry compression via GLTFLoader and DRACOLoader — client-side decompression of vertex data, reducing the model from an estimated 10–15 MB to 1.1 MB. Chosen.',
      'Execution: Built with Three.js 0.134, Webpack 5, and Tween.js. Two independent WebGL renderers cover separate viewport regions — overview and close-up detail. An IntersectionObserver enables and disables each renderer as its section enters or leaves the viewport, avoiding GPU overhead on off-screen content. Pixel ratio is capped at 1.0 across all devices. Mouse position drives directional light and camera group parallax. Three interactive text elements trigger Tween camera animations (3.5-second duration, quadratic ease-in-out) to individual close-up viewpoints. Explicit material and render list disposal prevents memory leaks.',
      'Results: DRACO compression reduces the model payload from an estimated 10–15 MB to 1.1 MB — approximately 90% reduction. IntersectionObserver-based renderer switching eliminates GPU overhead for off-screen content. Three interactive close-up viewpoints across the sculpture. Deployed at threejs-graces.tiiny.site.',
      'Post-Mortem: Pixel ratio capped at 1.0 eliminates retina rendering — acceptable as a demo constraint but visibly soft on high-DPI screens. A cap of 1.5 would preserve sharpness without the full retina cost. The DRACO decoder loads from a local /draco/ path with no CDN fallback, adding a second fetch dependency at cold load. Interactive sections respond only to click — tab and Enter key handling is absent, which would be required for accessible production use.',
    ],
  },
  {
    slug: 'apple-liquid-glass',
    title: 'Apple Liquid Glass',
    type: 'Personal Project',
    category: 'WebGL',
    thumb: 'url("/src/assets/pics/apple%20glass/apple%20glass%20t.jpg") center/cover no-repeat',
    images: [
      { bg: 'url("/src/assets/pics/apple%20glass/apple%20glass%20t.jpg") center/cover no-repeat', h: 480 },
    ],
    meta: [
      { label: 'Type', value: 'Interactive WebGL demo' },
      { label: 'Technology', value: 'React, Three.js, React Three Fiber, GLSL' },
      { label: 'Live', value: 'appleliquidglass.vercel.app' },
      { label: 'Year', value: '2025' },
    ],
    description: [
      'Problem Statement: Apple\'s 2025 liquid glass design system introduced a refractive, iridescent material across its operating systems. No open-source browser-based implementation existed at the time. The goal was to reproduce the effect in WebGL — closely enough to use as a reference — without access to Apple\'s rendering pipeline.',
      'Constraints: MeshTransmissionMaterial in Three.js reads the framebuffer per frame to simulate backbuffer refraction, which is expensive. Capping samples at 4 keeps performance viable on mid-tier hardware but degrades visual precision. The project was built in a single sprint, limiting architectural iteration. Three background videos total approximately 18 MB, increasing cold load time on slow connections.',
      'Options and Trade-offs: Three approaches were evaluated. First, a screen-space post-processing distortion shader — fast, but produces flat 2D distortion with no volumetric depth. Rejected. Second, environment map reflection only using MeshPhysicalMaterial — efficient, but the output reads as metallic, not glass-like. Rejected. Third, mesh-based transmission using MeshTransmissionMaterial, which reads the backbuffer to refract light through a physical volume. Chosen, with the acknowledged trade-off of higher render cost per frame.',
      'Execution: Built with React 18, React Three Fiber, and Three.js 0.169. A capsule geometry carries a transmission material configured with IOR 1.8, chromatic aberration at 0.1, and iridescence at 0.9. A directional light follows cursor position to simulate dynamic reflection. Backgrounds are rendered through a custom GLSL shader that preserves source aspect ratio across both image and video sources. State is managed with Valtio. Camera movement applies pointer damping via maath. A settings panel exposes reflectivity, background selection, and a display toggle.',
      'Results: Deployed to Vercel at a stable production URL. Dynamic pixel ratio [1, 1.5] adjusts render resolution per device, targeting 60fps across hardware tiers. Mobile layout adapts at 768px.',
      'Post-Mortem: At sample count 4, refraction sharpness falls below the Apple reference. A deferred refraction pass or per-object render target would improve fidelity at the cost of added complexity. The 18 MB of video assets inflate initial load; encoding to AV1 with adaptive streaming would reduce this. The cursor component is tightly coupled to the scene — extracting it as a standalone package would make it reusable across other projects without carrying the full scene dependency.',
    ],
  },
  {
    slug: 'ledger-system',
    title: 'Ledger System',
    type: 'Personal Project',
    category: 'Backend',
    thumb: 'linear-gradient(135deg, #0a0f0a 0%, #0d1f0d 50%, #080d08 100%)',
    images: [
      { bg: 'linear-gradient(160deg,#0a0f0a,#0d1f0d,#080d08)', h: 480 },
      { bg: 'linear-gradient(160deg,#0b130b,#0e1a0e)', h: 320 },
    ],
    meta: [
      { label: 'Type', value: 'Double-entry accounting API' },
      { label: 'Technology', value: 'Java 21, Spring Boot 3.2, PostgreSQL 16' },
      { label: 'Testing', value: 'JUnit 5, jqwik property-based tests' },
      { label: 'Year', value: '2025' },
    ],
    description: [
      'Problem Statement: Financial systems that store account balances as mutable fields are vulnerable to two failure modes: race conditions where concurrent writes overwrite each other silently, and data corruption with no recovery path. The objective was to build a ledger that derives balances from an append-only transaction log rather than storing them directly, eliminating silent corruption and providing a complete audit trail.',
      'Constraints: Java\'s double type cannot represent 0.1 exactly in binary floating-point; compounded across millions of transactions, rounding errors produce material discrepancies. PostgreSQL\'s ACID guarantees require all related rows to commit or roll back together. Concurrent writes to the same account must be coordinated without row-level locking becoming a throughput bottleneck. Network failures between client and server require idempotent request handling to prevent duplicate transactions on retry.',
      'Options and Trade-offs: Two decisions shaped the core architecture. For concurrency, pessimistic locking (SELECT FOR UPDATE) holds a row lock for the full transaction duration — under load, this serializes all writes to a shared account. Rejected in favour of optimistic locking via a @Version column: no lock is held; a write conflict throws an exception and the caller retries. For balance storage, a mutable balance column was considered — simpler to query, but it can desync from entries under failure with no reconstruction path. Rejected; balance is derived by summing the entry log at query time.',
      'Execution: Built with Java 21, Spring Boot 3.2, and PostgreSQL 16. The schema has no balance column; balance is computed as Σ(debits) − Σ(credits) per account type. All monetary values use BigDecimal with NUMERIC(19,4) storage and HALF_EVEN rounding. Every transaction is atomic via @Transactional. Optimistic locking uses OPTIMISTIC_FORCE_INCREMENT across account IDs sorted before acquisition to prevent deadlocks. Each request carries a reference field with a UNIQUE database constraint — duplicate submissions return the existing result. Hibernate Envers maintains revision tables for every entity change. Corrections post as reversal entries; no existing rows are modified or deleted.',
      'Results: Property-based testing with jqwik verifies four invariants across 50 randomly generated inputs each: value conservation, additive commutativity, void reversibility, and non-negativity of asset accounts. BigDecimal eliminates the floating-point error that would produce a $1,000 discrepancy across 10 million transactions at 0.0001 per transaction. The schema supports monetary values up to $999,999,999,999,999.9999.',
      {
        type: 'pre',
        content: `Load Test  —  localhost · Docker
─────────────────────────────────────────────────────────────────────────
Scenario                                Threads   OK   Fail   Req/s   Conflict
─────────────────────────────────────────────────────────────────────────
Sequential   shared account pair              1   20      0    5/s       0%
Concurrent   shared account pair             50   22     28   19/s      56%
Concurrent   distinct account pairs          20   20      0   21/s       0%
─────────────────────────────────────────────────────────────────────────
Conflicts return HTTP 409 (optimistic-lock-conflict).`,
      },
      'Load testing demonstrates stable throughput of ~20 transactions per second across independent account pairs (0% conflict); concentrating 50 concurrent threads on a single shared account raises optimistic lock contention exceptions to ~52%.',
      'Post-Mortem: Balance computation is O(n) in entries — acceptable at low scale but expensive for high-volume accounts. A materialized balance updated atomically with each post would reduce query cost, at the cost of re-introducing a field that must be kept in sync. Optimistic locking degrades under write-heavy load on a single account; account sharding would be required at that scale. Multi-currency transactions within a single journal entry are unsupported; forex requires a separate exchange gain/loss account entry.',
    ],
  },
];

export function getProject(slug) {
  return PROJECTS.find((project) => project.slug === slug) ?? null;
}

