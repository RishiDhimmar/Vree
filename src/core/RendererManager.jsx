import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/Addons.js";

export class RendererManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = null;
    // this.setupRenderer()
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true, // Enable antialiasing
    });
    this.renderer.shadowMap.enabled = true; // Enable shadows
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    // this.renderer.outputColorSpace = THREE.SRGBColorSpace; // Proper color management
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.labelRenderer.domElement.style.position = "absolute";
    this.labelRenderer.domElement.style.top = "0px";
    this.labelRenderer.domElement.style.pointerEvents = "none";
    this.canvas.parentElement.appendChild(this.labelRenderer.domElement);
  }

  handleResize() {
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }
}
