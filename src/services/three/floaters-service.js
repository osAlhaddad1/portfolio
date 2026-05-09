import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const rng = ([min, max]) => min + Math.random() * (max - min);

export function buildFloaters(scene, normalMaterial, config) {
  const floaters = [];
  const { count, cubeRatio, torusRatio, capsuleRatio } = config.particles;
  const { spinSpeed, driftSpeed, spreadX, spreadY, spreadZ } = config.floaters;

  for (let i = 0; i < count; i += 1) {
    const r = Math.random();
    let geometry;

    if (r < cubeRatio) {
      const size = rng(config.particles.cubeSize);
      geometry = new RoundedBoxGeometry(size, size, size, 5, Math.min(size * 0.2, 0.22));
    } else if (r < cubeRatio + torusRatio) {
      geometry = new THREE.TorusGeometry(rng(config.particles.torusRadius), rng(config.particles.torusTube), 24, 56);
    } else if (r < cubeRatio + torusRatio + capsuleRatio) {
      geometry = new THREE.CapsuleGeometry(rng(config.particles.capsuleR), rng(config.particles.capsuleLen), 10, 22);
    } else {
      const width = rng(config.particles.boxW);
      geometry = new RoundedBoxGeometry(width, width * 0.55, width * 0.55, 5, Math.min(width * 0.18, 0.18));
    }

    geometry.computeVertexNormals();

    const mesh = new THREE.Mesh(geometry, normalMaterial);
    mesh.position.set(
      (Math.random() - 0.5) * spreadX,
      (Math.random() - 0.5) * spreadY,
      (Math.random() - 0.5) * spreadZ - 1,
    );
    mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);

    floaters.push({
      mesh,
      av: new THREE.Vector3(
        (Math.random() - 0.5) * spinSpeed,
        (Math.random() - 0.5) * spinSpeed,
        (Math.random() - 0.5) * spinSpeed,
      ),
      lv: new THREE.Vector3((Math.random() - 0.5) * driftSpeed, (Math.random() - 0.5) * driftSpeed, 0),
      phase: Math.random() * Math.PI * 2,
    });

    scene.add(mesh);
  }

  return floaters;
}

