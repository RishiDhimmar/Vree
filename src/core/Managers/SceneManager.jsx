import * as THREE from "three";
import { lenseObject } from "../EntityClasses/LenseClass";
import { templeObject } from "../EntityClasses/TempleClass";
import { textureStore } from "../../store/TextureStore";
import { frameObject } from "../EntityClasses/FrameClass";
import { selectionStore } from "../../store/UISelectionStore";

export class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
  }

  handleModelAddingToScene(model) {
    this.scene.add(model);
    frameObject.setupFrame(model.children[0]);
    let temp = [...model.children[0].children];

    temp.map((child) => {
      child.material.clearcoat = 1;
      child.material.clearcoatRoughness = 0;
      switch (child.name) {
        case "left_lens":
          lenseObject.setupLeftLense(child);
          break;
        case "right_lens":
          lenseObject.setupRightLense(child);
          break;
        case "left_temple":
          templeObject.setupLeftTemple(child);
          break;
        case "right_temple":
          templeObject.setupRightTemple(child);
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
  addBakedShadow() {
    const sphereShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: textureStore.assetMap.get("shadow"),
      })
    );
    sphereShadow.rotation.x = -Math.PI * 0.5;
    sphereShadow.position.set(0, -0.5, -0.9);
    sphereShadow.scale.set(5, 3.5, 5);
    this.scene.add(sphereShadow);
  }

  dispose() {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  }
}
