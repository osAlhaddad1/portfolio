import * as THREE from 'three';

export function createRenderer(canvas, maxPixelRatio, toneMappingExposure) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, maxPixelRatio));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = toneMappingExposure;
  return renderer;
}

export const MOBILE_MEDIA_QUERY = '(max-width: 767px)';
export const MOBILE_FOV = 120;

export function isMobileViewport() {
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

export function createSceneAndCamera(config) {
  const scene = new THREE.Scene();
  const initialFov = isMobileViewport() ? MOBILE_FOV : config.camera.fovMin;
  const camera = new THREE.PerspectiveCamera(
    initialFov,
    innerWidth / innerHeight,
    config.camera.near,
    config.camera.far,
  );
  camera.position.z = config.camera.startZ;
  return { scene, camera };
}

function createCloudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const blobs = [
    [82, 150, 48, 0.26],
    [116, 132, 62, 0.32],
    [146, 146, 52, 0.24],
    [172, 138, 40, 0.2],
    [104, 166, 38, 0.18],
  ];

  blobs.forEach(([x, y, r, a]) => {
    const gradient = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
    gradient.addColorStop(0, `rgba(255,255,255,${a})`);
    gradient.addColorStop(0.55, `rgba(255,255,255,${a * 0.45})`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function buildCloudEnvironmentScene() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xeff5ff, 0.018);

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(60, 32, 16),
    new THREE.MeshBasicMaterial({ color: 0xa8c7ff, side: THREE.BackSide }),
  );
  scene.add(sky);

  const cloudTexture = createCloudTexture();
  const cloudMaterial = new THREE.SpriteMaterial({
    map: cloudTexture,
    color: 0xffffff,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
  });

  const clouds = [
    { radius: 22, scale: [12, 6] },
    { radius: 24, scale: [14, 7] },
    { radius: 26, scale: [10, 5] },
    { radius: 23, scale: [16, 8] },
    { radius: 20, scale: [11, 6] },
    { radius: 27, scale: [13, 7] },
    { radius: 25, scale: [15, 8] },
    { radius: 21, scale: [9, 5] },
    { radius: 28, scale: [12, 6] },
    { radius: 19, scale: [14, 7] },
  ];

  clouds.forEach(({ radius, scale }, idx) => {
    const phi = (idx / clouds.length) * Math.PI * 2 + 0.35;
    const theta = 0.55 + ((idx % 4) - 1.5) * 0.22;

    const sprite = new THREE.Sprite(cloudMaterial.clone());
    sprite.position.setFromSphericalCoords(radius, theta, phi);
    sprite.scale.set(scale[0], scale[1], 1);
    sprite.material.rotation = (idx % 5) * 0.22;
    scene.add(sprite);

    const puff = new THREE.Sprite(cloudMaterial.clone());
    puff.position.setFromSphericalCoords(radius + 2, theta + 0.08, phi + 0.14);
    puff.scale.set(scale[0] * 0.72, scale[1] * 0.72, 1);
    puff.material.opacity = 0.68;
    puff.material.rotation = 0.5 + (idx % 3) * 0.18;
    scene.add(puff);
  });

  return scene;
}

export function applyEnvironment(scene, renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const cloudScene = buildCloudEnvironmentScene();
  scene.environment = pmrem.fromScene(cloudScene, 0.04).texture;
  pmrem.dispose();
}

export function addLighting(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const sun = new THREE.DirectionalLight(0xffffff, 10);
  sun.position.set(5, 8, 7);
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0xaaddff, 6);
  fill.position.set(-5, -4, 4);
  scene.add(fill);

  const front = new THREE.DirectionalLight(0xffffff, 8);
  front.position.set(0, 2, 10);
  scene.add(front);

  const lights = [
    { color: 0xfff3e8, intensity: 2.2, distance: 30, position: [-10, 10, 8] },
    { color: 0xe3f0ff, intensity: 2, distance: 30, position: [10, 10, 8] },
    { color: 0xd7ccff, intensity: 1.8, distance: 34, position: [-12, -6, 6] },
    { color: 0xffd8f0, intensity: 1.8, distance: 34, position: [12, -6, 6] },
    { color: 0xffffff, intensity: 1.6, distance: 28, position: [0, 0, -12] },
  ];

  lights.forEach(({ color, intensity, distance, position }) => {
    const light = new THREE.PointLight(color, intensity, distance);
    light.position.set(position[0], position[1], position[2]);
    scene.add(light);
  });
}

export function createTextMaterial() {
  return new THREE.MeshNormalMaterial({
    wireframe: false,
    flatShading: false,
    transparent: false,
    opacity: 1,
    depthWrite: true,
    depthTest: true,
  });
}

