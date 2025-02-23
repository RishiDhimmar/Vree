import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { lenseObject } from "./LenseClass";
import { templeObject } from "./TempleClass";
import { textureStore } from "../store/TextureStore";
import { frameObject } from "./FrameClass";
import { selectionStore } from "../store/UISelectionStore";

export class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    // this.gui = new GUI();
  }

  handleModelAddingToScene(model) {
     this.scene.add(model);
        model.children[0].material.envMap = textureStore.getTexture("environment");
        frameObject.setupFrame(model.children[0]);
        textureStore.assetMap.set('original_frame', model.children[0].material.map)
        let temp = [...model.children[0].children];
        console.log(temp)
    
        temp.map((child) => {
          
          child.material.clearcoat = 1;
          child.material.clearcoatRoughness = 0
          switch (child.name) {
            case "left_lens":
              lenseObject.setupLeftLense(child);
              break;
            case "right_lens":
              lenseObject.setupRightLense(child);
              break;
            case "left_temple":
              templeObject.setupLeftTemple(child);
              child.material.envMap = textureStore.getTexture("environment");
              textureStore.assetMap.set('original_left_temple', child.material.map)
              break;
            case "right_temple":
              templeObject.setupRightTemple(child);
              child.material.envMap = textureStore.getTexture("environment");
              textureStore.assetMap.set('original_right_temple', child.material.map)

              break;
      
            default:
              break;
          }
          this.scene.add(child);
        });
    
        selectionStore.setReadyToLoad(true);
  }
  addLabelsToScene(labels) {
    labels.forEach((label) => this.scene.add(label));
  }

  dispose() {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
    this.gui.destroy();
  }
}
