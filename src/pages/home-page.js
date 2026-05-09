import { LitElement, html } from 'lit';
import { SCENE_CONFIG } from '../utils/config/scene-config.js';
import {
  addLighting,
  applyEnvironment,
  createRenderer,
  createSceneAndCamera,
  createTextMaterial,
} from '../services/three/scene-service.js';
import { buildFloaters } from '../services/three/floaters-service.js';
import { addGreetingText } from '../services/three/text-service.js';
import {
  createInteractionState,
  resizeRenderer,
  updateCameraFromPointer,
  updateFloaters,
  updatePointerState,
  updateTextWiggle,
} from '../services/three/interaction-service.js';

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

class HomePage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div class="u-fixed-cnt" id="canvas-wrap"></div>`;
  }

  firstUpdated() {
    this.initScene();
  }

  initScene() {
    const wrap = this.querySelector('#canvas-wrap');
    const canvas = document.createElement('canvas');
    wrap.appendChild(canvas);

    const renderer = createRenderer(
      canvas,
      SCENE_CONFIG.renderer.maxPixelRatio,
      SCENE_CONFIG.renderer.toneMappingExposure,
    );

    const { scene, camera } = createSceneAndCamera(SCENE_CONFIG);
    applyEnvironment(scene, renderer);
    addLighting(scene);

    const textMaterial = createTextMaterial();
    const floaters = buildFloaters(scene, textMaterial, SCENE_CONFIG);
    const greeting = `happy ${DAYS[new Date().getDay()]}`;
    const textGroup = addGreetingText(scene, textMaterial, greeting, SCENE_CONFIG);

    const interactionState = createInteractionState();
    this._onMouseMove = (event) => updatePointerState(interactionState, event, SCENE_CONFIG);
    this._onResize = () => resizeRenderer(camera, renderer);

    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('resize', this._onResize);

    this._renderer = renderer;
    let time = 0;

    const tick = () => {
      this._rafId = requestAnimationFrame(tick);
      time += 1 / 60;

      updateCameraFromPointer(interactionState, camera, SCENE_CONFIG);
      updateFloaters(floaters, time, SCENE_CONFIG);
      updateTextWiggle(textGroup, time, SCENE_CONFIG);

      renderer.render(scene, camera);
    };

    tick();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    cancelAnimationFrame(this._rafId);
    this._renderer?.dispose();
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('resize', this._onResize);
  }
}

customElements.define('ilithya-home', HomePage);

