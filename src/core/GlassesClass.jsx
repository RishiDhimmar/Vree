import { textureStore } from "../store/TextureStore";
import * as THREE from "three";

export class GlassesClass {
  constructor() {}

  setTexture(texture) {
    this.material.map = textureStore.assetMap.get(texture);
  }
  setColor(color) {
    this.material.color = new THREE.Color(color);
  }
  setMetallic(metallic) {
    this.material.metalness = metallic;
    console.log(this.material.metalness);
  }
  setRoughness(roughness) {
    this.material.roughness = roughness;
  }
  setTransparency(opacity) {
    this.material.opacity = opacity;
  }
}
