import { makeAutoObservable } from "mobx";
class TextureStore {
    assetMap = new Map();
    isLoading = false;
    error = null;
    glasses = null
    assetBlueprint = [{
        name : "sampleModel",
        url : "./assets/glbs/sampleModel.glb",
        type : "model"
    },{
        name : "texture1",
        url : "./assets/texture/texture1.png",
        type : "texture"
    },{
        name : "texture2",
        url : "./assets/texture/texture2.jpg",
        type : "texture"
    },{
        name : "texture3",
        url : "./assets/texture/texture3.jpg",
        type : "texture"
    },{
        name: "environment",
        url: "./assets/environment/brown_photostudio_02_1k.hdr",
        type: "environment"
    },{
        name: "shadow",
        url: "/assets/shadow/shadow.jpg",
        type: "texture"
    }]

    constructor() {
        makeAutoObservable(this);
    }

    

    getTexture(name) {
        return this.assetMap.get(name)
    }

    get TextureMap() {
        return this.assetMap
    }
}

export const textureStore = new TextureStore()