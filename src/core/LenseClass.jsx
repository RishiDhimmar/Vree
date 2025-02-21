import {textureStore} from "../store/TextureStore";
import { GlassesClass } from "./GlassesClass";
import * as THREE from "three";

class LenseClass extends GlassesClass {
    mesh = null;

    setupLeftLense(lense) {
        this.setLeftLenseMaterial(lense.material);
        this.leftLenseMaterial.transparent = true
    }

    setupRightLense(lense) {
        this.setRightLenseMaterial(lense.material);
        this.rightLenseMaterial.transparent = true

    }
    setMesh(mesh) {
        this.mesh = mesh;
    }

    setLeftLenseMaterial(material) {

        this.leftLenseMaterial = material
    }

    setRightLenseMaterial(material) {        
        this.rightLenseMaterial = material
    }

    setColor(color) {
        this.leftLenseMaterial.color = new THREE.Color(color);
        this.rightLenseMaterial.color = new THREE.Color(color);
    }

    setOpacity(opacity) {
        this.leftLenseMaterial.opacity = opacity;
        this.rightLenseMaterial.opacity = opacity;
    }

    getLeftLenseMaterial() {
        return this.leftLenseMaterial
    }

    getRightLenseMaterial() {
        return this.rightLenseMaterial
    }

    getTransparency() {
        return this.leftLenseMaterial.opacity
    }
    
    getMesh() {
        return this.mesh;
    }

}

export const lenseObject = new LenseClass();