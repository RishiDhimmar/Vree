import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";
import { assetLoadingManager } from "./AssetLoadingManager";
import { frameObject } from "./FrameClass";
import { lenseObject } from "./LenseClass";
import { templeObject } from "./TempleClass";
import CameraControls from "camera-controls";

export class THREE_Environment {
  constructor(canvas) {
    this.canvas = canvas;
    this.sizes = {
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    };
    this.clock = new THREE.Clock();

    CameraControls.install({ THREE: THREE });

    // Load assets and set background (if necessary)
    assetLoadingManager.loadAllAssets();

    assetLoadingManager
      .loadModel("sampleModel", "./assets/glbs/sampleModel.glb")
      .then((model) => {
        this.addModelToScene(model);
      })
      .catch((error) => {
        console.error("Error loading model:", error);
      });

    this.setUpScene();
    this.setUpGUI();
    this.setUpCamera();
    this.setUpRenderer(); // Transparent background is enabled here
    this.setUpControls();
    this.setUpAxisHelper();
    this.setUpLights();
    this.setUpPlane();

    window.addEventListener("resize", this.onWindowResize.bind(this));

    this.update();
  }


  setUpPlane() {
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: "gray",
      // opacity: 0,
      transparent: true,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -0.5;
    plane.rotation.x = -Math.PI * 0.5;
    plane.receiveShadow = true; // Ensure it receives shadows
    this.scene.add(plane);
  }

  addModelToScene(model) {
    this.model = model;

    console.log("Model added to scene:", this.model.children[0].children[0]);
    frameObject.setFrameMaterial(this.model.children[0].material);

    this.model.children[0].children.map((child) => {
      console.log(child);
      switch (child.name) {
        case "left_lens":
          lenseObject.setLeftLenseMaterial(child.material);
          break;
        case "right_lens":
          lenseObject.setRightLenseMaterial(child.material);
          break;
        case "left_temple":
          templeObject.setLeftTempleMaterial(child.material);
          break;
        case "right_temple":
          templeObject.setRightTempleMaterial(child.material);
          break;

        default:
          break;
      }
    });

    // Ensure that the object can cast shadows
    model.children[0].castShadow = true;
    model.children[0].receiveShadow = true;

    this.scene.add(model.children[0]);

    templeObject.setTexture();
    frameObject.setTexture();
    frameObject.setMetallic(0)
    frameObject.setTransparency(0)
    frameObject.setRoughness(0)

    console.log(this.scene);
  }

  setUpGUI() {
    this.gui = new GUI();
  }

  setUpScene() {
    this.scene = new THREE.Scene();
    this.scene.background = null; // Make the scene background fully transparent
  }

  
  setUpLights() {
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 10);
    this.scene.add(ambientLight);

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 5, 0);
    directionalLight.castShadow = true;

    const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    this.scene.add(helper);

    // Configure light shadow properties for better quality
    directionalLight.shadow.mapSize.width = 2048; // Higher resolution shadows
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5; // Near plane for shadow camera
    directionalLight.shadow.camera.far = 50; // Far plane for shadow camera

    this.scene.add(directionalLight);

    // GUI Controls for Lights
    // const lightFolder = this.gui.addFolder("Lighting");
    // lightFolder.add(ambientLight, "intensity", 0, 15).name("Ambient Light");
    // lightFolder.add(directionalLight, "intensity", 0, 15).name("Main Light");
    // lightFolder.open();
  }

  setUpCamera() {
    this.camera = new THREE.PerspectiveCamera(
      30,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );

    this.camera.position.set(0, 0, 5.5);
    this.scene.add(this.camera);
  }

  setUpControls() {
    // CameraControls setup
    this.controls = new CameraControls(this.camera, this.renderer.domElement);

    // Essential configuration
    this.controls.mouseButtons.left = CameraControls.ACTION.ROTATE;
    this.controls.mouseButtons.right = CameraControls.ACTION.TRUCK;
    this.controls.mouseButtons.wheel = CameraControls.ACTION.DOLLY;
    this.controls.touches.one = CameraControls.ACTION.TOUCH_ROTATE;
    this.controls.touches.two = CameraControls.ACTION.TOUCH_DOLLY_TRUCK;

    // Boundary configuration
    this.controls.minDistance = 1;
    this.controls.maxDistance = 15;
    this.controls.infinityDolly = false;

    // Smoothing configuration
    this.controls.dollySpeed = 0.5;
    this.controls.truckSpeed = 1.0;
    this.controls.dampingFactor = 0.1;

    // GUI Controls
    // const controlsFolder = this.gui.addFolder("Camera Controls");
    // controlsFolder.add(this.controls, "dollySpeed", 0.1, 2).name("Zoom Speed");
    // controlsFolder.add(this.controls, "minDistance", 0.5, 5).name("Min Zoom");
    // controlsFolder.add(this.controls, "maxDistance", 5, 20).name("Max Zoom");
    // controlsFolder.open();
  }

  setUpAxisHelper() {
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
  }


  setUpRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true, // Enable antialiasing
    });
    this.renderer.shadowMap.enabled = true; // Enable shadows
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
    this.renderer.outputColorSpace = THREE.SRGBColorSpace; // Proper color management
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
  }

  onWindowResize() {
    this.sizes.width = this.canvas.clientWidth;
    this.sizes.height = this.canvas.clientHeight;

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
  }

  update() {
    const delta = this.clock.getDelta();
    // debugger
    const hasControlsUpdated = this.controls.update(delta);

    // Only render if controls updated or needed
    // if (hasControlsUpdated) {
    this.renderer.render(this.scene, this.camera);
    // }
    requestAnimationFrame(this.update.bind(this));
  }
}
