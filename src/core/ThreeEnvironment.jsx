import { CameraManager } from "./Managers/CameraManager";
import { ControlsManager } from "./Managers/ControlsManager";
import { LightingManager } from "./Managers/LightingManager";
import { RendererManager } from "./Managers/RendererManager";
import { SceneManager } from "./Managers/SceneManager";
import { assetLoadingManager } from "./Managers/AssetLoadingManager";
import * as THREE from "three";
import { textureStore } from "../store/TextureStore";
import { OutlineManager } from "./Managers/OutlineManager";

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
    );
    this.lightingManager.setupLights();


    this.controlsManager = new ControlsManager(
      this.cameraManager.camera,
      this.rendererManager.renderer.domElement,
    );
    this.controlsManager.setupControls();


    this.assetManager = assetLoadingManager;

    this.outLineManager = new OutlineManager(
      this.sceneManager.scene,
      this.cameraManager.camera,
      this.rendererManager.renderer
    );

    this.initialize();
  }

  async initialize() {
    this.setupEventListeners();

    try {
      await this.assetManager.loadAllAssets().then(() => {
        console.log(textureStore.getTexture("sampleModel"));
        this.sceneManager.handleModelAddingToScene(textureStore.getTexture("sampleModel"));
      });

      this.startAnimationLoop();
    } catch (error) {
      console.error("Initialization error:", error);
    }
    this.outLineManager.setupOutline();
    this.sceneManager.addBakedShadow()

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
      this.rendererManager.labelRenderer.render(
        this.sceneManager.scene,
        this.cameraManager.camera
      );
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
