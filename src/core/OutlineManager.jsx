// import * as THREE from "three";
// import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
// import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
// import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
// import { CopyShader } from "three/addons/shaders/CopyShader.js";
// // Change from three/addons/... to explicit examples path
// import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";

// import { frameObject } from "./FrameClass";
// import { textureStore } from "../store/TextureStore";
// import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
// import { templeObject } from "./TempleClass";
// import { lenseObject } from "./LenseClass";
// import { selectionStore } from "../store/UISelectionStore";
// import { observer } from "mobx-react";

// export class OutlineManager {
//   constructor(scene, camera, renderer) {
//     this.scene = scene;
//     this.camera = camera;
//     this.renderer = renderer;
//     this.params = {
//       edgeStrength: 3.0, // Reduced from 3.0
//       edgeGlow: 2, // Reduced from 1.0
//       edgeThickness: 1.0,
//     };
//   }

//   setupOutline() {
//     let selectedMesh = null;
//     switch (selectionStore.selectedPart) {
//       case "Frame":
//         selectedMesh = frameObject.getMesh();
//         break;
//       case "Lense":
//         selectedMesh = lenseObject.getMesh();
//         break;
//       case "Temple":
//         selectedMesh = templeObject.getMesh();
//         break;
//       default:
//         selectedMesh = null;
//     }
//     if (!selectedMesh) {
//       // console.error("Invalid mesh");
//       return;
//     }

//     console.log(selectedMesh)

//     // 1. Create composer FIRST
//     this.composer = new EffectComposer(this.renderer);

//     // 2. Add passes in CORRECT ORDER
//     // Render pass first
//     const renderPass = new RenderPass(this.scene, this.camera);
//     this.composer.addPass(renderPass);

//     // Outline pass
//     this.outlinePass = new OutlinePass(
//       new THREE.Vector2(window.innerWidth, window.innerHeight),
//       this.scene,
//       this.camera
//     );
//     this.outlinePass.selectedObjects = selectedMesh;;
//     this.outlinePass.edgeStrength = this.params.edgeStrength;
//     this.outlinePass.edgeGlow = this.params.edgeGlow;
//     this.outlinePass.edgeThickness = this.params.edgeThickness;
//     this.outlinePass.visibleEdgeColor.set("purple");
//     this.outlinePass.hiddenEdgeColor.set(0x4e3636);
//     this.outlinePass.useMaterialOriginalColor = true;
//     this.composer.addPass(this.outlinePass);

//     const outputPass = new OutputPass();
//     this.composer.addPass(outputPass);

//     // FXAA antialiasing
//     const effectFXAA = new ShaderPass(FXAAShader);
//     effectFXAA.uniforms.resolution.value.set(
//       1 / window.innerWidth,
//       1 / window.innerHeight
//     );
//     this.composer.addPass(effectFXAA);

//     // 3. CopyShader MUST be last pass
//     const copyPass = new ShaderPass(CopyShader);
//     this.composer.addPass(copyPass);
//   }
// }
import * as THREE from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { selectionStore } from "../store/UISelectionStore";
import { frameObject } from "./FrameClass";
import { lenseObject } from "./LenseClass";
import { templeObject } from "./TempleClass";
import { reaction } from "mobx";

export class OutlineManager {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    // Outline parameters
    this.params = {
      edgeStrength: 3.0,
      edgeGlow: 2,
      edgeThickness: 1.0,
    };

    // Initialize composer
    this.composer = null;
    this.outlinePass = null;

    reaction(
      () => selectionStore.selectedPart,
      (selectedPart) => {
        if (selectedPart) {
          this.outlinePass.selectedObjects = this.getSelectedMesh();
        }
      }
    );
  }
  setupOutline() {
    // Dispose previous composer
    if (this.composer) {
      this.dispose();
    }

    const selectedMesh = this.getSelectedMesh();
    if (!selectedMesh) return;

    // Create new composer
    this.composer = new EffectComposer(this.renderer);

    // 1. Base render pass
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    // 2. Outline pass
    this.outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.scene,
      this.camera
    );

    this.configureOutlinePass(selectedMesh);
    this.composer.addPass(this.outlinePass);

    // 3. FXAA antialiasing
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms.resolution.value.set(
      1 / window.innerWidth,
      1 / window.innerHeight
    );
    this.composer.addPass(fxaaPass);

    // 4. Final output pass (LAST)
    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);

    // Force initial render
    this.composer.render();
  }

  getSelectedMesh() {
    switch (selectionStore.selectedPart) {
      case "Frame":
        return frameObject.getMesh();
      case "Lenses":
        return lenseObject.getMesh();
      case "Temple":
        return templeObject.getMesh();
      default:
        return null;
    }
  }

  configureOutlinePass(selectedMesh) {
    this.outlinePass.selectedObjects = selectedMesh; // Must be array
    this.outlinePass.edgeStrength = this.params.edgeStrength;
    this.outlinePass.edgeGlow = this.params.edgeGlow;
    this.outlinePass.edgeThickness = this.params.edgeThickness;
    this.outlinePass.visibleEdgeColor.set("purple");
    this.outlinePass.hiddenEdgeColor.set(0x4e3636);
  }

  dispose() {
    if (this.composer) {
      this.composer.passes.forEach((pass) => {
        if (pass.dispose) pass.dispose();
      });
      this.composer = null;
    }
    this.outlinePass = null;
  }

  onResize() {
    if (this.composer) {
      this.composer.setSize(window.innerWidth, window.innerHeight);
    }
    if (this.outlinePass) {
      this.outlinePass.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
