import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { lenseObject } from "./LenseClass";
import { templeObject } from "./TempleClass";
import { textureStore } from "../store/TextureStore";

export class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.gui = new GUI();
    // this.gui.close()
    this.helpers = [];
   
  }

  setupPlane() {
    // const planeGeometry = new THREE.PlaneGeometry(30, 30);
    // const planeMaterial = new THREE.MeshStandardMaterial({
    //   color: "purple",
    //   opacity: 0,
    //   transparent: true,
    // });
    // const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // plane.position.y = -0.5;
    // plane.rotation.x = -Math.PI * 0.5;
    // plane.receiveShadow = true;
    // this.scene.add(plane);

  }

  handleModelAddingToScene(model) {
    // model.castShadow = true;
    switch (model.name) {
      case "left_lens":
        lenseObject.setupLeftLense(model);
        break;
      case "right_lens":
        lenseObject.setupRightLense(model);
        break;
      case "left_temple":
        templeObject.setupLeftTemple(model);
        model.material.envMap = textureStore.getTexture("environment");
        break;
      case "right_temple":
        templeObject.setupRightTemple(model);
        model.material.envMap = textureStore.getTexture("environment");
        break;

      default:
        break;
    }
    this.scene.add(model);

  }
  addLabelsToScene(labels) {
    labels.forEach((label) => this.scene.add(label));
  }

  // setupAxisHelper() {
  //   const axesHelper = new THREE.AxesHelper(5);
  //   this.scene.add(axesHelper);
  //   this.helpers.push(axesHelper);
  // }

  dispose() {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
    this.gui.destroy();
  }
}
