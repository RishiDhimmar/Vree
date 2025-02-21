// import * as THREE from "three";
// import { CSS2DRenderer } from "three/examples/jsm/Addons.js";

// export class RendererManager {
//   constructor(canvas) {
//     this.canvas = canvas;
//     this.renderer = null;
//     // this.setupRenderer()
//   }

//   setupRenderer() {
//     this.renderer = new THREE.WebGLRenderer({
//       canvas: this.canvas,
//       alpha: true,
//       antialias: true, // Enable antialiasing
//     });
//     this.renderer.shadowMap.enabled = true; // Enable shadows
//     this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
//     this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
//     this.renderer.toneMappingExposure = 1.0;

//     // this.renderer.outputColorSpace = THREE.SRGBColorSpace; // Proper color management
//     this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
//     this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     this.labelRenderer = new CSS2DRenderer();
//     this.labelRenderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
//     this.labelRenderer.domElement.style.position = "absolute";
//     this.labelRenderer.domElement.style.top = "0px";
//     this.labelRenderer.domElement.style.pointerEvents = "none";
//     this.canvas.parentElement.appendChild(this.labelRenderer.domElement);
//   }

//   handleResize() {
//     this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
//   }

//   render(scene, camera) {
//     this.renderer.render(scene, camera);
//   }
// }
import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export class RendererManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = null;
    this.labelRenderer = null;
    this.labelsVisible = true; // Flag to track visibility of labels
    this.labels = []; // Store references to all labels if needed
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
    // Render scene with WebGLRenderer
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

  // Method to add labels (optional)
  addLabel(label) {
    this.labels.push(label); // Store labels if you need to control them later
  }

  // Example method to only render labels of visible objects
  updateLabelsVisibility(camera) {
    for (let label of this.labels) {
      const distance = camera.position.distanceTo(label.object.position);
      const labelElement = label.element;
      if (distance < 500) {
        labelElement.style.display = "block"; // Show label if object is close
      } else {
        labelElement.style.display = "none"; // Hide label if object is far away
      }
    }
  }
}
