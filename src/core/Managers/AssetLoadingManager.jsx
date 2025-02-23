import * as THREE from "three";
import { GLTFLoader, RGBELoader } from "three/examples/jsm/Addons.js";
import { textureStore } from "../../store/TextureStore";

class AssetLoadingManager {
  constructor() {
    this.loaders = {
      texture: THREE.TextureLoader,
      model: GLTFLoader,
      environment: RGBELoader
    };
    
    this.loadingManager = new THREE.LoadingManager(
      () => this.isLoading = false,
      (_, loaded, total) => console.log(`Progress: ${loaded}/${total}`),
      url => console.error(`Failed to load ${url}`)
    );
    
    this.state = { isLoading: false, error: null };
  }

  loadAsset = (name, url, type) => new Promise((resolve, reject) => {
    const Loader = this.loaders[type];
    if (!Loader) return reject(`Invalid type: ${type}`);
    
    new Loader(this.loadingManager).load(url, asset => {
      const processed = this.processAsset(type, asset, name);
      textureStore.assetMap.set(name, processed);
      resolve(processed);
    }, null, () => reject(`Error loading ${type}: ${url}`));
  });

  processAsset = (type, asset, name) => {
    if (type === 'model') return asset.scene;
    if (type === 'environment') asset.mapping = THREE.EquirectangularReflectionMapping;
    return asset;
  };

  loadAllAssets = async () => {
    this.state.isLoading = true;
    try {
      await Promise.all(textureStore.assetBlueprint.map(({ name, url, type }) => 
        this.loadAsset(name, url, type)));
    } catch (error) {
      this.state.error = error;
      console.error("Load failed:", error);
    } finally {
      this.state.isLoading = false;
    }
  };
}

export const assetLoadingManager = new AssetLoadingManager();