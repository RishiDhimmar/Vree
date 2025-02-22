import CameraControls from 'camera-controls';
import * as THREE from 'three'

export class ControlsManager {
  controls = null;

  constructor(camera, canvas) {
    this.camera = camera;
    this.canvas = canvas;
    CameraControls.install({ THREE: THREE });
  }

    setupControls() {
      // CameraControls setup
      this.controls = new CameraControls(this.camera, this.canvas);
  
      // Essential configuration
      this.controls.mouseButtons.left = CameraControls.ACTION.ROTATE;
      this.controls.mouseButtons.right = CameraControls.ACTION.TRUCK;
      this.controls.mouseButtons.wheel = CameraControls.ACTION.DOLLY;
      this.controls.touches.one = CameraControls.ACTION.TOUCH_ROTATE;
      this.controls.touches.two = CameraControls.ACTION.TOUCH_DOLLY_TRUCK;
  
      // Boundary configuration
      this.controls.infinityDolly = false;
  
      // Smoothing configuration
      this.controls.dollySpeed = 0.9;
      this.controls.truckSpeed = 2.5;
      this.controls.smoothTime = 1.5;
    }
  update(delta) {
    if (this.controls) {
      this.controls.update(delta) 
    }
  }

  dispose() {
    if (this.controls) {
      this.controls.dispose();
      this.controls = null;
    }
  }
}
