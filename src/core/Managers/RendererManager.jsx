
import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export class RendererManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = null;
    this.labelRenderer = null;
    this.labelsVisible = true;
    this.labels = []; 
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });

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
    this.labelRenderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
    // Render labels only if needed
    if (this.labelsVisible) {
      this.labelRenderer.render(scene, camera);
    }
  }

  toggleLabelsVisibility() {
    // Toggle the visibility of the labels
    this.labelsVisible = !this.labelsVisible;
  }

  addLabel(label) {
    this.labels.push(label); 
  }
}
