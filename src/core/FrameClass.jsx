import { textureStore } from "../store/TextureStore";
import * as THREE from "three";

class FrameClass   {
  frameMaterial = null;
  initMetalNess = null;
  initRoughNess = null;
  initOpacity = null;

  mesh = null;

  setupFrame(model) {
    this.setFrameMaterial(model.material);
    this.setColor(model.material.color);
    this.setMetalNess(model.material.metalness);
    this.initMetalNess = model.material.metalness;
    this.setRoughness(model.material.roughness);
    this.initRoughNess = model.material.roughness;
    this.setTransparency(model.material.opacity);
    this.initOpacity = model.material.opacity;

    this.setMesh(model);
  }
  reset() {
    this.frameMaterial.metalness = this.initMetalNess;
    this.frameMaterial.roughness = this.initRoughNess;
    this.frameMaterial.color = new THREE.Color(null);
    this.setTexture('original_frame');
    this.frameMaterial.opacity = this.initOpacity;
    this.frameMaterial.needsUpdate = true;
  }

  setFrameMaterial(material) {
    this.frameMaterial = material;
    console.log(material);

  }
  setMesh(mesh) {
    this.mesh = mesh;
  }
  setTexture(texture) {
    if(texture != null) {

      this.frameMaterial.map = textureStore.assetMap.get(texture.split(".")[0]);
    } else {

      this.frameMaterial.map = null;
    }
    this.frameMaterial.needsUpdate = true;
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
  getMesh() {
    return [this.mesh];
  }
  
}

export const frameObject = new FrameClass();
