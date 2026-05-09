import { isMobileViewport, MOBILE_FOV } from './scene-service.js';

export function createInteractionState() {
  return {
    mouseX: 0,
    mouseY: 0,
    camTargetX: 0,
    camTargetY: 0,
  };
}

export function updatePointerState(state, event, config) {
  state.mouseX = (event.clientX / innerWidth - 0.5) * config.camera.mouseRangeX;
  state.mouseY = -(event.clientY / innerHeight - 0.5) * config.camera.mouseRangeY;
}

export function updateCameraFromPointer(state, camera, config) {
  state.camTargetX += (state.mouseX - state.camTargetX) * config.camera.lerpSpeed;
  state.camTargetY += (state.mouseY - state.camTargetY) * config.camera.lerpSpeed;

  camera.position.x = state.camTargetX;
  camera.position.y = state.camTargetY;

  if (isMobileViewport()) {
    if (camera.fov !== MOBILE_FOV) {
      camera.fov = MOBILE_FOV;
    }
  } else {
    const fovDistance = Math.min(
      1,
      Math.hypot(
        state.mouseX / (config.camera.mouseRangeX / 2),
        state.mouseY / (config.camera.mouseRangeY / 2),
      ),
    );
    const targetFov = config.camera.fovMin + (config.camera.fovMax - config.camera.fovMin) * fovDistance;
    camera.fov += (targetFov - camera.fov) * config.camera.lerpSpeed;
  }
  camera.updateProjectionMatrix();
  camera.lookAt(0, 0, 0);
}

export function updateFloaters(floaters, time, config) {
  const { bobFreq, bobStrength, wrapX, wrapY } = config.floaters;

  floaters.forEach(({ mesh, av, lv, phase }) => {
    mesh.rotation.x += av.x;
    mesh.rotation.y += av.y;
    mesh.rotation.z += av.z;
    mesh.position.x += lv.x;
    mesh.position.y += lv.y + Math.sin(time * bobFreq + phase) * bobStrength;

    if (mesh.position.x > wrapX) mesh.position.x = -wrapX;
    if (mesh.position.x < -wrapX) mesh.position.x = wrapX;
    if (mesh.position.y > wrapY) mesh.position.y = -wrapY;
    if (mesh.position.y < -wrapY) mesh.position.y = wrapY;
  });
}

export function updateTextWiggle(textGroup, time, config) {
  const wiggleTime = time * (config.text.wiggleFreq ?? 1);
  textGroup.position.x = Math.sin(wiggleTime * 0.9) * (config.text.wiggleAmpX ?? 0);
  textGroup.position.y = Math.cos(wiggleTime * 1.1) * (config.text.wiggleAmpY ?? 0);
  textGroup.rotation.z = Math.sin(wiggleTime * 0.7) * (config.text.wiggleRotZ ?? 0);
}

export function resizeRenderer(camera, renderer) {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}

