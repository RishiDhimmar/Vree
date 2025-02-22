// import * as THREE from "three";
// import { textureStore } from "../store/TextureStore";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { RGBELoader } from "three/examples/jsm/Addons.js";

// class AssetLoadingManager {
//   constructor() {
//     this.loadingManager = new THREE.LoadingManager();
//     this.isLoading = false;
//     this.error = null;
//     this.loadedCount = 0;
//     this.totalCount = 0;

//     this.setUpLoadingManager();
//   }

//   setUpLoadingManager() {
//     this.loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
//       this.isLoading = true;
//       this.totalCount = itemsTotal;
//       console.log(`Started loading: ${url} (${itemsLoaded}/${itemsTotal})`);
//     };

//     this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
//       this.loadedCount = itemsLoaded;
//       console.log(`Progress: ${itemsLoaded}/${itemsTotal}`);
//     };

//     this.loadingManager.onError = (url) => {
//       this.error = `Failed to load ${url}`;
//       console.error(this.error);
//     };

//     // Called when all assets are loaded
//     this.loadingManager.onLoad = () => {
//       console.log("All assets loaded!");
//       this.isLoading = false;
//     };
//   }

//   async loadAsset(name, url, type = "texture") {
//     let loader;
//     return new Promise((resolve, reject) => {
//       try {
//         switch (type) {
//           case "texture":
//             new THREE.TextureLoader().load(
//               url,
//               (texture) => {
//                 // texture.colorSpace = THREE.SRGBColorSpace;
//                 texture.generateMipmaps = true; 
//                 texture.minFilter = THREE.LinearFilter; 
//                 texture.magFilter = THREE.LinearFilter; 
//                 texture.repeat.set(1, 1); 
//                 texture.wrapS = THREE.RepeatWrapping; 
//                 texture.wrapT = THREE.RepeatWrapping;
//                 // texture.center.set(0.5, 0.5); 
//                 textureStore.assetMap.set(name, texture);
//                 console.log(`Texture loaded: ${name}`);

//                 resolve(texture);
//               },
//               undefined,
//               () => {
//                 this.error = `Error loading texture: ${url}`;
//                 reject(this.error); // Reject if there's an error loading the texture
//               }
//             );
//             break;

//           case "model":
//             loader = new GLTFLoader();
//             loader.load(
//               url,
//               (gltf) => {
//                 console.log("first");
//                 textureStore.assetMap.set(name, gltf.scene);

//                 console.log(gltf);
//                 resolve(gltf.scene);
//                 // console.log(gltf.scene);
//               },
//               undefined,
//               () => {
//                 this.error = `Error loading model: ${url}`;
//                 reject(this.error); // Reject if there's an error loading the model
//               }
//             );
//             break;
//           case "environment":
//             console.log("bgc");
//             loader = new RGBELoader();
//             loader.load(
//               url,
//               (environment) => {
//                 // console.log(texture);
//                 environment.mapping = THREE.EquirectangularReflectionMapping;
//                 console.log("environment loaded");
//                 textureStore.assetMap.set("environment", environment);
//                 resolve(environment);
//               },
//               undefined,
//               () => {
//                 this.error = `Error loading environment: ${url}`;
//                 reject(this.error); // Reject if there's an error loading the model
//               }
//             );
//             break;

//           default:
//             throw new Error(`Unknown asset type: ${type}`);
//         }
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }

//   async loadAllAssets() {
//     this.isLoading = true;
//     this.error = null;

//     try {
//       await Promise.all(
//         textureStore.assetBlueprint.map(({ name, url, type }) =>
//           this.loadAsset(name, url, type)
//         )
//       );
//     } catch (error) {
//       this.error = error.message;
//       console.error("Error loading all assets:", this.error);
//       throw error;
//     } finally {
//       this.isLoading = false;
//     }
//   }

//   async loadModel(name, url) {
//     console.log("starting loadinf");
//     return this.loadAsset(name, url, "model");
//   }

//   async loadTexture(name, url) {
//     return this.loadAsset(name, url, "texture");
//   }
// }

// export const assetLoadingManager = new AssetLoadingManager();
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

    this.loadingManager.onLoad = () => {
      console.log("All assets loaded!");
      this.isLoading = false;
    };
  }

  // Common loader for different asset types
  loadAsset(name, url, type) {
    return new Promise((resolve, reject) => {
      try {
        // Map types to loaders dynamically
        const loaders = {
          texture: this.loadTexture.bind(this),
          model: this.loadModel.bind(this),
          environment: this.loadEnvironment.bind(this),
        };

        if (!loaders[type]) {
          throw new Error(`Unknown asset type: ${type}`);
        }

        loaders[type](name, url, resolve, reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Texture loader
  loadTexture(name, url, resolve, reject) {
    new THREE.TextureLoader().load(
      url,
      (texture) => {
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.repeat.set(1, 1);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        textureStore.assetMap.set(name, texture);
        console.log(`Texture loaded: ${name}`);
        resolve(texture);
      },
      undefined,
      () => {
        this.error = `Error loading texture: ${url}`;
        reject(this.error);
      }
    );
  }

  // Model loader
  loadModel(name, url, resolve, reject) {
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        textureStore.assetMap.set(name, gltf.scene);
        console.log(`Model loaded: ${name}`);
        resolve(gltf.scene);
      },
      undefined,
      () => {
        this.error = `Error loading model: ${url}`;
        reject(this.error);
      }
    );
  }

  // Environment loader
  loadEnvironment(name, url, resolve, reject) {
    const loader = new RGBELoader();
    loader.load(
      url,
      (environment) => {
        environment.mapping = THREE.EquirectangularReflectionMapping;
        console.log(`Environment loaded: ${name}`);
        textureStore.assetMap.set(name, environment);
        resolve(environment);
      },
      undefined,
      () => {
        this.error = `Error loading environment: ${url}`;
        reject(this.error);
      }
    );
  }

  // Load all assets concurrently
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

  // Convenience methods for loading specific asset types
  loadTextureAsset(name, url) {
    return this.loadAsset(name, url, "texture");
  }

  loadModelAsset(name, url) {
    return this.loadAsset(name, url, "model");
  }

  loadEnvironmentAsset(name, url) {
    return this.loadAsset(name, url, "environment");
  }
}

export const assetLoadingManager = new AssetLoadingManager();
 