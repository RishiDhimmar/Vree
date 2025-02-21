import { makeAutoObservable } from "mobx";
import { frameObject } from "../core/FrameClass";
import { lenseObject } from "../core/LenseClass";
import { templeObject } from "../core/TempleClass";
class UISelectionStore {
  selectedPart = "Frame";
  selectedStuff = {
    "Frame" : {
      texture : null,
      color : null,
      metallic : null,
      roughness : null
    },
    "Temple" : {
      texture : null,
      color : null,
      metallic : null,
      roughness : null
    },
    "Lenses" : {
      texture : null,
      color : null,
      metallic : null,
      roughness : null
    }
  }
  readyToLoad = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedPart(part) {
    this.selectedPart = part;
  }

  setReadyToLoad(bool) {
    this.readyToLoad = bool;
  }

  get ReadyToLoad() {
    return this.readyToLoad;
  }

  get SelectedPart() {
    return this.selectedPart;
  }

  setTexture(texture, part = this.selectedPart) {
    console.log(texture, part);
    switch (part) {
      case "Frame":
        
        frameObject.setTexture(texture);
        break;

      case "Temple":
        templeObject.setTexture(texture);
        break;

      default:
        break;
    }
  }
  setMetalNess(metallic, part = this.selectedPart) {
    switch (part) {
      case "Frame":
        frameObject.setMetalNess(metallic);
        selectionStore.selectedStuff.Frame.metallic = metallic
        break;

      case "Temple":
        templeObject.setMetalNess(metallic);
        selectionStore.selectedStuff.Temple.metallic = metallic
        break;
      default:
        break;
    }
  }

  setRoughness(roughness, part = this.selectedPart) {
    switch (part) {
      case "Frame":
        frameObject.setRoughness(roughness);
        selectionStore.selectedStuff.Frame.roughness = roughness
        break;

      case "Temple":
        templeObject.setRoughness(roughness);
        selectionStore.selectedStuff.Temple.roughness = roughness
        break;
      default:
        break;
    }
  }

  setOpacity(opacity, part = this.selectedPart) {
    switch (part) {
      case "Frame":
        frameObject.setTransparency(opacity);
        break;

      case "Temple":
        templeObject.setTransparency(opacity);
        break;

      case "Lenses":
        lenseObject.setOpacity(opacity);
        break;
      default:
        break;
    }
  }
  setColor(color, part = this.selectedPart) {
    console.log("color" , part)
    switch (part) {
      case "Frame":
        frameObject.setColor(color);
        break;

      case "Temple":
        templeObject.setColor(color);
        break;

      case "Lenses":
        lenseObject.setColor(color);
        break;
      default:
        break;
    }
  }
  
}

export const selectionStore = new UISelectionStore();
