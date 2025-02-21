import { textureStore } from "../store/TextureStore";
import { GlassesClass } from "./GlassesClass";
import * as THREE from "three";

export class TempleClass extends GlassesClass {
  leftTempleMaterial = null;
  rightTempleMaterial = null;
  mesh = null;

  
  setLeftMesh(mesh) {
    this.leftMesh = mesh;
  }
  setRightMesh(mesh) {
    this.rightMesh = mesh;
  }
  setupLeftTemple(model){
    this.setLeftTempleMaterial(model.material);
    this.setLeftTempleMaterialColor(model.material.color);
    this.setLeftTempleMaterialMetalNess(model.material.metalness);
    this.setLeftTempleMaterialRoughness(model.material.roughness);
    this.setLeftTempleMaterialOpacity(model.material.opacity);
    console.log("Left Temple Set")
    this.setLeftMesh(model);
  }
  setupRightTemple(model){
    this.setRightTempleMaterial(model.material);
    this.setRightTempleMaterialColor(model.material.color);
    this.setRightTempleMaterialMetalNess(model.material.metalness);
    this.setRightTempleMaterialRoughness(model.material.roughness);
    this.setRightTempleMaterialOpacity(model.material.opacity);
    this.setRightMesh(model);
  }

  setLeftTempleMaterial(material) {
    this.leftTempleMaterial = material;
    this.leftTempleMaterial.transparent = true;
  }

  setRightTempleMaterial(material) {
    this.rightTempleMaterial = material;
    this.rightTempleMaterial.transparent = true;

    // this.setMetalness(1)
    // this.setRoughness(0)
    // this.leftTempleMaterial.clearCoat = 0
    // console.log(material.metalness)
  }
  setTexture(texture) {
    const temp = textureStore.assetMap.get(texture.split(".")[0]);
    console.log(temp);
    this.leftTempleMaterial.map = temp;
    this.rightTempleMaterial.map = temp;
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
    console.log(color);
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
    return this.leftTempleMaterial.metalness;
  }
  getRoughness() {
    return this.leftTempleMaterial.roughness;
  }
  getTransparency() {
    return this.leftTempleMaterial.opacity;
  }
  getMesh() {
    return this.leftMesh;
  }
}

export const templeObject = new TempleClass();
