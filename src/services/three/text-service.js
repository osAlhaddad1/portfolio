import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export function addGreetingText(scene, textMaterial, greeting, config) {
  const textGroup = new THREE.Group();
  scene.add(textGroup);

  new FontLoader().load(
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json',
    (font) => {
      const words = greeting.split(' ');
      const lines = words.length === 2 ? [words[0], words[1]] : [greeting];
      const halfGap = config.text.lineGapY / 2;

      lines.forEach((line, index) => {
        const twoLines = lines.length === 2;
        const size = twoLines ? config.text.sizeTwo : config.text.sizeOne;
        const yOffset = twoLines ? (index === 0 ? halfGap : -halfGap) : 0;

        const geometry = new TextGeometry(line, {
          font,
          size,
          height: config.text.height,
          curveSegments: Math.max(config.text.curveSegs, 20),
          bevelEnabled: true,
          bevelThickness: config.text.bevelThick,
          bevelSize: config.text.bevelSize,
          bevelSegments: Math.max(config.text.bevelSegs, 12),
        });
        geometry.computeVertexNormals();
        geometry.center();

        const mesh = new THREE.Mesh(geometry, textMaterial);
        mesh.scale.z = Math.max(0.01, config.text.zScale ?? 1);
        mesh.position.set(0, yOffset, 0);
        textGroup.add(mesh);
      });
    },
  );

  return textGroup;
}

