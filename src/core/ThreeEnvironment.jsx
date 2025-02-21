import { CameraManager } from "./CameraManager";
import { ControlsManager } from "./ControlsManager";
import { LightingManager } from "./LightingManager";
import { RendererManager } from "./RendererManager";
import { SceneManager } from "./SceneManager";
import { assetLoadingManager } from "./AssetLoadingManager";
import * as THREE from "three";
import { frameObject } from "./FrameClass";
import { textureStore } from "../store/TextureStore";
import { selectionStore } from "../store/UISelectionStore";
import { OutlineManager } from "./OutlineManager";

export class ThreeEnvironment {
  constructor(canvas) {
    // debugger
    this.canvas = canvas;
    this.clock = new THREE.Clock();

    // Initialize core systems
    this.sceneManager = new SceneManager();
    this.rendererManager = new RendererManager(canvas);
    this.rendererManager.setupRenderer();
    this.cameraManager = new CameraManager(canvas);
    this.cameraManager.setupCamera();
    this.lightingManager = new LightingManager(
      this.sceneManager.scene,
      this.sceneManager.gui
    );
    console.log(this.rendererManager.renderer.domElement);
    this.controlsManager = new ControlsManager(
      this.cameraManager.camera,
      this.rendererManager.renderer.domElement, // Pass the renderer's DOM element
      this.sceneManager.gui
    );
    this.assetManager = assetLoadingManager;
    this.outLineManager = new OutlineManager(
      this.sceneManager.scene,
      this.cameraManager.camera,
      this.rendererManager.renderer
    );

    this.initialize();
  }

  async initialize() {
    this.setupScene();

    console.log("Initializing ThreeEnvironment");
    console.log("Canvas:", this.canvas);
    console.log(
      "Renderer DOM Element:",
      this.rendererManager.renderer.domElement
    );

    this.setupEventListeners();

    try {
      await this.assetManager.loadAllAssets().then(() => {
        console.log(textureStore.getTexture("sampleModel"));
        this.addModelToScene(textureStore.getTexture("sampleModel"));
      });

      this.startAnimationLoop();
    } catch (error) {
      console.error("Initialization error:", error);
    }
    this.outLineManager.setupOutline();
  }

  // In ThreeEnvironment's setupScene method:
  setupScene() {
    // this.sceneManager.setupAxisHelper();
    this.sceneManager.setupPlane();
    this.lightingManager.setupLights();
    this.controlsManager.setupControls();

    // Ensure camera is positioned correctly
    this.cameraManager.camera.position.set(5, 5, 5);
    this.cameraManager.camera.lookAt(0, 0, 0);

    // Update controls to reflect initial camera position
    this.controlsManager.controls.update();
    const textureLoader = new THREE.TextureLoader();
    const simpleShadow = textureLoader.load("/assets/shadow/shadow.jpg");

    const sphereShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow,
      })
    );
    sphereShadow.rotation.x = -Math.PI * 0.5;
    sphereShadow.position.set(0, -0.5, -0.9);
    sphereShadow.scale.set(5, 3.5, 5);
    this.sceneManager.scene.add(sphereShadow);
  }

  addModelToScene(model) {
    console.log("model", model.children[0].children);
    this.sceneManager.scene.add(model);
    model.children[0].material.envMap = textureStore.getTexture("environment");
    frameObject.setupFrame(model.children[0]);
    let temp = [...model.children[0].children];
    temp.map((child) => {
      // debugger
      console.log(child);
      this.sceneManager.handleModelAddingToScene(child);
    });

    selectionStore.setReadyToLoad(true);
  }

  setupEventListeners() {
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    this.cameraManager.handleResize();
    this.rendererManager.handleResize();
  }

  startAnimationLoop() {
    const animate = () => {
      const delta = this.clock.getDelta();
      this.controlsManager.update(delta);

      // Use composer OR regular renderer, not both
      if (this.outLineManager.composer) {
        this.outLineManager.composer.render();
      } else {
        this.rendererManager.render(
          this.sceneManager.scene,
          this.cameraManager.camera
        );
      }
      requestAnimationFrame(animate);
    };
    animate();
  }

  dispose() {
    window.removeEventListener("resize", this.handleResize);
    this.sceneManager.dispose();
    this.rendererManager.dispose();
    this.controlsManager.dispose();
  }
}
