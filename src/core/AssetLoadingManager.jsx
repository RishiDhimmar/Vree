import * as THREE from "three";
import { textureStore } from "../store/TextureStore";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";


class AssetLoadingManager {
  constructor() {
    this.loadingManager = new THREE.LoadingManager();
    this.isLoading = false;
    this.error = null;
    this.loadedCount = 0;
    this.totalCount = 0;

    this.setUpLoadingManager();
  }

  setUpLoadingManager() {
    this.loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
      this.isLoading = true;
      this.totalCount = itemsTotal;
      console.log(`Started loading: ${url} (${itemsLoaded}/${itemsTotal})`);
    };

    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      this.loadedCount = itemsLoaded;
      console.log(`Progress: ${itemsLoaded}/${itemsTotal}`);
    };

    this.loadingManager.onError = (url) => {
      this.error = `Failed to load ${url}`;
      console.error(this.error);
    };

    // Called when all assets are loaded
    this.loadingManager.onLoad = () => {
      console.log("All assets loaded!");
      this.isLoading = false;

    };
  }

  async loadAsset(name, url, type = "texture") {
    let loader;
    return new Promise((resolve, reject) => {
      try {
        switch (type) {
          case "texture":
            new THREE.TextureLoader().load(
              url,
              (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                textureStore.assetMap.set(name, texture);
                console.log(`Texture loaded: ${name}`);
                resolve(texture);
              },
              undefined,
              () => {
                this.error = `Error loading texture: ${url}`;
                reject(this.error); // Reject if there's an error loading the texture
              }
            );
            break;

          case "model":
            loader = new GLTFLoader();
            loader.load(
              url,
              (gltf) => {
                console.log("first")
                textureStore.assetMap.set(name, gltf.scene);
                console.log( gltf.scene);
                resolve(gltf.scene);
                console.log("done")
              },
              undefined,
              () => {
                this.error = `Error loading model: ${url}`;
                reject(this.error); // Reject if there's an error loading the model
              }
            );
            break;
          case "environment":
            console.log("bgc")
            loader = new RGBELoader();
            loader.load(
              url,
              (environment) => {
                // console.log(texture);
                environment.mapping = THREE.EquirectangularReflectionMapping;
                console.log('environment loaded');
                textureStore.assetMap.set("environment", environment);
                resolve(environment);
              },
              undefined,
              () => {
                this.error = `Error loading environment: ${url}`;
                reject(this.error); // Reject if there's an error loading the model
              }
            );
            break;

          default:
            throw new Error(`Unknown asset type: ${type}`);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async loadAllAssets() {
    this.isLoading = true;
    this.error = null;

    try {
      await Promise.all(
        textureStore.assetBlueprint.map(({ name, url, type }) =>
          this.loadAsset(name, url, type)
        )
      );
    } catch (error) {
      this.error = error.message;
      console.error("Error loading all assets:", this.error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async loadModel(name, url) {
    console.log("starting loadinf")
    return this.loadAsset(name, url, "model");
  }

  async loadTexture(name, url) {
    return this.loadAsset(name, url, "texture");
  }
}

export const assetLoadingManager = new AssetLoadingManager();
