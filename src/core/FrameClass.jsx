import { textureStore } from "../store/TextureStore";
import { GlassesClass } from "./GlassesClass";
import * as THREE from "three";

class FrameClass extends GlassesClass {
  frameMaterial = null;

  setupFrame(model) {
    this.setFrameMaterial(model.material);
    this.setColor(model.material.color);
    this.setMetalNess(model.material.metalness);
    this.setRoughness(model.material.roughness);
    this.setTransparency(model.material.opacity);

  }

  setFrameMaterial(material) {
    this.frameMaterial = material;
    console.log(material);

  }
  setTexture(texture) {
    this.frameMaterial.map = textureStore.assetMap.get(texture.split(".")[0]);
  }
  setColor(color) {
    console.log("here")
    this.frameMaterial.color = new THREE.Color(color);
  }
  setMetalNess(metallic) {
    this.frameMaterial.metalness = metallic;
    console.log(this.frameMaterial.metalness);
  }
  setRoughness(roughness) {
    this.frameMaterial.roughness = roughness;
  }
  setTransparency(opacity) {
    this.frameMaterial.opacity = opacity;
    this.frameMaterial.transparent = true;
  }

  getFrameMaterial() {
    return this.frameMaterial;
  }
  getTexture() {
    return this.frameMaterial.map;
  }
  getColor() {
    return this.frameMaterial.color;
  }

  getMetalNess() {
    if (!this.frameMaterial) return false;
    return this.frameMaterial.metalness;
  }
  getRoughness() {
    return this.frameMaterial.roughness;
  }
  getTransparency() {
    return this.frameMaterial.opacity;
  }
}

export const frameObject = new FrameClass();
