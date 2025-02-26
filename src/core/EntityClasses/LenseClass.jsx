import * as THREE from "three";

class LenseClass  {
  leftMesh;
  rightMesh;
  initColor = null;
  initOpacity = null;

  setLeftMesh(mesh) {
    this.leftMesh = mesh;
  }
  reset() {
    this.setColor(null);
    this.setOpacity(this.initOpacity);
  }
  setRightMesh(mesh) {
    this.rightMesh = mesh;
  }
  setupLeftLense(lense) {
    this.setLeftMesh(lense);
    this.setLeftLenseMaterial(lense.material);
    this.initOpacity = lense.material.opacity;
    console.log(this.leftLenseMaterial);
    this.leftLenseMaterial.transparent = true;
  }

  setupRightLense(lense) {
    this.setRightMesh(lense);
    this.setRightLenseMaterial(lense.material);
    this.rightLenseMaterial.transparent = true;
  }
  setMesh(mesh) {
    this.mesh = mesh;
  }

  setLeftLenseMaterial(material) {
    this.leftLenseMaterial = material;
  }

  setRightLenseMaterial(material) {
    this.rightLenseMaterial = material;
  }

  setColor(color) {
    const tempColor = new THREE.Color(color);
    tempColor.convertLinearToSRGB();
    this.leftLenseMaterial.color = new THREE.Color(color);
    this.rightLenseMaterial.color = new THREE.Color(color);
  }

  setOpacity(opacity) {
    this.leftLenseMaterial.opacity = opacity;
    this.rightLenseMaterial.opacity = opacity;
    this.setRoughness(0);
    this.setMetallic(0.6);
  }

  getLeftLenseMaterial() {
    return this.leftLenseMaterial;
  }

  getRightLenseMaterial() {
    return this.rightLenseMaterial;
  }

  getTransparency() {
    return this.leftLenseMaterial.opacity;
  }

  getLeftMesh() {
    return this.leftMesh;
  }

  getRightMesh() {
    return this.rightMesh;
  }

  setMetallic(metallic) {
    this.leftLenseMaterial.metalness = metallic;
    this.rightLenseMaterial.metalness = metallic;
  }
  setRoughness(roughness) {
    this.leftLenseMaterial.roughness = roughness;
    this.rightLenseMaterial.roughness = roughness;
  }

  getMesh() {
    return [this.leftMesh, this.rightMesh];
  }
  getMetalNess() {
    if (!this.leftLenseMaterial) return false;
    return this.leftLenseMaterial.metalness;
  }
  getRoughness() {
    if (!this.leftLenseMaterial) return false;
    return this.leftLenseMaterial.roughness;
  }
}

export const lenseObject = new LenseClass();
