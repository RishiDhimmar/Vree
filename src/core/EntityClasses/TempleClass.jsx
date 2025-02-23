import { textureStore } from "../../store/TextureStore";
import * as THREE from "three";

export class TempleClass {
  leftTempleMaterial = null;
  rightTempleMaterial = null;
  initMetalNess = null;
  initRoughNess = null;
  initOpacity = null;
  mesh = null;

  setLeftMesh(mesh) {
    this.leftMesh = mesh;
  }
  setRightMesh(mesh) {
    this.rightMesh = mesh;
  }
  setupLeftTemple(model) {
    model.material.envMap = textureStore.getTexture("environment");
    textureStore.assetMap.set("original_left_temple", model.material.map);

    this.setLeftTempleMaterial(model.material);
    this.setLeftTempleMaterialColor(model.material.color);
    this.setLeftTempleMaterialMetalNess(model.material.metalness);
    this.initMetalNess = model.material.metalness;
    this.setLeftTempleMaterialRoughness(model.material.roughness);
    this.initRoughNess = model.material.roughness;
    this.setLeftTempleMaterialOpacity(model.material.opacity);
    this.initOpacity = model.material.opacity;
    console.log("Left Temple Set");
    this.setLeftMesh(model);
  }
  reset() {
    this.leftTempleMaterial.metalness = this.initMetalNess;
    this.leftTempleMaterial.roughness = this.initRoughNess;
    this.leftTempleMaterial.color = new THREE.Color(null);
    this.leftTempleMaterial.opacity = this.initOpacity;
    this.rightTempleMaterial.metalness = this.initMetalNess;
    this.rightTempleMaterial.roughness = this.initRoughNess;
    this.rightTempleMaterial.color = new THREE.Color(null);
    this.rightTempleMaterial.opacity = this.initOpacity;
    this.setTexture("original_left_temple", "original_right_temple");
    this.leftTempleMaterial.needsUpdate = true;
    this.rightTempleMaterial.needsUpdate = true;
  }
  setupRightTemple(model) {
    this.setRightTempleMaterial(model.material);
    this.setRightTempleMaterialColor(model.material.color);
    this.setRightTempleMaterialMetalNess(model.material.metalness);
    this.setRightTempleMaterialRoughness(model.material.roughness);
    this.setRightTempleMaterialOpacity(model.material.opacity);
    this.setRightMesh(model);
    model.material.envMap = textureStore.getTexture("environment");
    textureStore.assetMap.set("original_right_temple", model.material.map);
  }

  setLeftTempleMaterial(material) {
    this.leftTempleMaterial = material;
    this.leftTempleMaterial.transparent = true;
  }

  setRightTempleMaterial(material) {
    this.rightTempleMaterial = material;
    this.rightTempleMaterial.transparent = true;
  }
  setTexture(leftTexture, rightTexture) {
    let tempLeft = null;
    let tempRight = null;
    if (leftTexture != null) {
      tempLeft = textureStore.assetMap.get(leftTexture.split(".")[0]);
      tempRight = textureStore.assetMap.get(rightTexture.split(".")[0]);
    }
    this.leftTempleMaterial.map = tempLeft;
    this.rightTempleMaterial.map = tempRight;
    this.leftTempleMaterial.needsUpdate = true;
    this.rightTempleMaterial.needsUpdate = true;
  }
  setMetalNess(metallic) {
    this.leftTempleMaterial.metalness = metallic;
    this.rightTempleMaterial.metalness = metallic;
  }
  setLeftTempleMaterialMetalNess(metallic) {
    this.leftTempleMaterial.metalness = metallic;
  }
  setRightTempleMaterialMetalNess(metallic) {
    this.rightTempleMaterial.metalness = metallic;
  }
  setRoughness(roughness) {
    this.leftTempleMaterial.roughness = roughness;
    this.rightTempleMaterial.roughness = roughness;
  }
  setLeftTempleMaterialRoughness(roughness) {
    this.leftTempleMaterial.roughness = roughness;
  }
  setRightTempleMaterialRoughness(roughness) {
    this.rightTempleMaterial.roughness = roughness;
  }
  setColor(color) {
    this.leftTempleMaterial.color = new THREE.Color(color);
    this.rightTempleMaterial.color = new THREE.Color(color);
  }
  setLeftTempleMaterialColor(color) {
    this.leftTempleMaterial.color = new THREE.Color(color);
  }
  setRightTempleMaterialColor(color) {
    this.rightTempleMaterial.color = new THREE.Color(color);
  }
  setLeftTempleMaterialOpacity(opacity) {
    this.leftTempleMaterial.opacity = opacity;
  }
  setRightTempleMaterialOpacity(opacity) {
    this.rightTempleMaterial.opacity = opacity;
  }
  setTransparency(opacity) {
    this.leftTempleMaterial.opacity = opacity;
    this.rightTempleMaterial.opacity = opacity;
  }

  getFrameMaterial() {
    return this.leftTempleMaterial;
  }
  getTexture() {
    return this.leftTempleMaterial.map;
  }
  getColor() {
    return this.leftTempleMaterial.color;
  }
  getMetalNess() {
    if (!this.leftTempleMaterial) return false;
    return this.leftTempleMaterial.metalness;
  }
  getRoughness() {
    return this.leftTempleMaterial.roughness;
  }
  getTransparency() {
    return this.leftTempleMaterial.opacity;
  }
  getMesh() {
    return [this.leftMesh, this.rightMesh];
  }
}

export const templeObject = new TempleClass();
