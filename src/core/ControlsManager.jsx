// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import CameraControls from 'camera-controls';

// export class ControlsManager {
//   controls = null
//   constructor(camera, canvas, gui) {
//     this.camera = camera;
//     this.canvas = canvas;
//     this.gui = gui;
//     // this.setupControls()
//   }

//   setupControls() {
//       // CameraControls setup
//       this.controls = new OrbitControls(this.camera, this.canvas);
//       this.controls.enableDamping = true;
      
//     }

//   update() {
//     return this.controls.update();
//   }

//   dispose() {
//     if (this.controls) {
//       this.controls.dispose();
//       this.controls = null;
//     }
//   }
// }
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CameraControls from 'camera-controls';
import * as THREE from 'three'

export class ControlsManager {
  controls = null;

  constructor(camera, canvas, gui) {
    this.camera = camera;
    this.canvas = canvas;
    // this.gui = gui;
    CameraControls.install({ THREE: THREE });

    // this.setupControls();
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
      this.controls.dollySpeed = 0.8;
      this.controls.truckSpeed = 1.5;
      this.controls.dampingFactor = 1.5;

      // this.controls.screenSpacePanning = false;
      // this.controls.maxPolarAngle = Math.PI / 2;
  

    }
  update(delta) {
    // This is all you need for OrbitControls update
    // console.log(this.controls.update)
    if (this.controls) {
      // console.log("updated")
      this.controls.update(delta) // No delta parameter
    }
  }

  dispose() {
    if (this.controls) {
      this.controls.dispose();
      this.controls = null;
    }
  }
}
