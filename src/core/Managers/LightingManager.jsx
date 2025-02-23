import * as THREE from "three";

export class LightingManager {
  constructor(scene, gui) {
    this.scene = scene;
    this.gui = gui;
    this.lights = {};
  }

  setupLights() {
    this.lights.ambient = new THREE.AmbientLight(0xffffff, 12);
    this.scene.add(this.lights.ambient);

    this.lights.directional1 = new THREE.DirectionalLight(0xffffff, 1.8);
    this.lights.directional1.position.set(0 , 10, 5); // Positioned along X axis
    this.scene.add(this.lights.directional1);
}
}
