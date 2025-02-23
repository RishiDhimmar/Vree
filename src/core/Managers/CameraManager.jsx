import * as THREE from 'three';

export class CameraManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.sizes = { width: canvas.clientWidth, height: canvas.clientHeight };
    this.clock = new THREE.Clock();
    this.camera = null;
  }

  setupCamera() {
    // Create the camera
    this.camera = new THREE.PerspectiveCamera(
      30,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 5.5);
  this.camera.lookAt(0, 0, 0);
  this.camera.updateProjectionMatrix();
    
  }


  handleResize() {
    this.sizes.width = this.canvas.clientWidth;
    this.sizes.height = this.canvas.clientHeight;

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  }

}
