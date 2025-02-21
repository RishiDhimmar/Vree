import * as THREE from "three";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
import { CopyShader } from "three/addons/shaders/CopyShader.js";
// Change from three/addons/... to explicit examples path
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";

import { frameObject } from "./FrameClass";

export class OutlineManager {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.params = {
      edgeStrength: 2.0, // Reduced from 3.0
      edgeGlow: 0.5,     // Reduced from 1.0
      edgeThickness: 1.0,
    };
  }

  setupOutline() {
    const selectedMesh = frameObject.getMesh();
    if (!selectedMesh) {
      console.error("Invalid mesh");
      return;
    }

    // 1. Create composer FIRST
    this.composer = new EffectComposer(this.renderer);

    // 2. Add passes in CORRECT ORDER
    // Render pass first
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // Outline pass
    this.outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.scene,
      this.camera
    );
    if (this.outlinePass.useMaterialOriginalColor !== undefined) {
      this.outlinePass.useMaterialOriginalColor = true;
    } else {
      console.warn("Update Three.js to use useMaterialOriginalColor");
      // Fallback: Force material override
      this.outlinePass.visibleEdgeColor.set(0xffffff);
      this.outlinePass.hiddenEdgeColor.set(0x4e3636);
    }
    this.outlinePass.selectedObjects = [selectedMesh];
    this.outlinePass.edgeStrength = this.params.edgeStrength;
    this.outlinePass.edgeGlow = this.params.edgeGlow;
    this.outlinePass.edgeThickness = this.params.edgeThickness;
    this.outlinePass.visibleEdgeColor.set(0xffffff);
    this.outlinePass.hiddenEdgeColor.set(0x4e3636);
    console.log(this.outlinePass.useMaterialOriginalColor);
    this.outlinePass.useMaterialOriginalColor = true; // Crucial fix
    this.composer.addPass(this.outlinePass);

    // FXAA antialiasing
    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms.resolution.value.set(
      1 / window.innerWidth,
      1 / window.innerHeight
    );
    this.composer.addPass(effectFXAA);

    // 3. CopyShader MUST be last pass
    const copyPass = new ShaderPass(CopyShader);
    this.composer.addPass(copyPass);
  }
}

