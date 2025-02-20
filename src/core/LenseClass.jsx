import {textureStore} from "../store/TextureStore";
import { GlassesClass } from "./GlassesClass";

class LenseClass extends GlassesClass {

    setupLeftLense(lense) {
        this.setLeftLenseMaterial(lense.material);
    }

    setupRightLense(lense) {
        this.setRightLenseMaterial(lense.material);
    }

    setLeftLenseMaterial(material) {

        this.leftLenseMaterial = material
    }

    setRightLenseMaterial(material) {        
        this.rightLenseMaterial = material
    }

    getLeftLenseMaterial() {
        return this.leftLenseMaterial
    }

    getRightLenseMaterial() {
        return this.rightLenseMaterial
    }
    
    

}

export const lenseObject = new LenseClass();