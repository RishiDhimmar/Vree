import * as THREE from 'three';

export class LightingManager {
  constructor(scene, gui) {
    this.scene = scene;
    this.gui = gui;
    this.lights = {};
  }

  setupLights() {
    // Ambient Light
    this.lights.ambient = new THREE.AmbientLight(0xffffff, 15);
    this.scene.add(this.lights.ambient);

    // Directional Light
    this.lights.directional = new THREE.DirectionalLight(0xffffff, 15);
    this.lights.directional.position.set(0, 4, 0);
    this.lights.directional.position.y = 1
    this.lights.directional.castShadow = true;
    
    // Shadow configuration
    this.lights.directional.shadow.mapSize.width = 2048;
    this.lights.directional.shadow.mapSize.height = 2048;
   
    // debugger
    this.scene.add(this.lights.directional);
    console.log(this.scene)

    // this.castShadowHelper = new THREE.CameraHelper(this.lights.directional.shadow.camera);
    // this.scene.add(this.castShadowHelper);


    // const lightFolder = this.gui.addFolder("Lighting");
    // lightFolder.add(this.lights.ambient, "intensity", 0, 20).name("Ambient Light");
    // // lightFolder.add(this.lights.directional, "intensity", 0, 20).name("Main Light");
    // lightFolder.open();
  }
}