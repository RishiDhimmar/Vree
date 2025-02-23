import { makeAutoObservable } from "mobx";
import { frameObject } from "../core/EntityClasses/FrameClass";
import { lenseObject } from "../core/EntityClasses/LenseClass";
import { templeObject } from "../core/EntityClasses/TempleClass";
class UISelectionStore {
  selectedPart = "Frame";
  isDarkTheme = true;
  selectedStuff = {
    Frame: {
      texture: "original.jpg",
      color: null,
      metallic: null,
      roughness: null,
      transparency: null,
    },
    Temple: {
      texture: "original.jpg",
      color: null,
      metallic: null,
      roughness: null,
      transparency: null,
    },
    Lenses: {
      color: null,
      transparency: null,
    },
  };
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

  setTheme(theme) {
    this.theme = theme;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  get Theme() {
    return this.theme;
  }

  get ReadyToLoad() {
    return this.readyToLoad;
  }

  get SelectedPart() {
    return this.selectedPart;
  }

  setTexture(texture, part = this.selectedPart) {
    let leftTexture = null;
    let rightTexture = null;
    console.log(texture, part);
    switch (part) {
      case "Frame":
        if (texture == "original.jpg") texture = "original_frame";
        if (texture == "null_image.svg") texture = null;
        frameObject.setTexture(texture);
        break;

      case "Temple":
        if (texture == "original.jpg") {
          (leftTexture = "original_left_temple"),
            (rightTexture = "original_right_temple");
        } else {
          (leftTexture = texture), (rightTexture = texture);
        }
        if (texture == "null_image.svg") {
          (leftTexture = null), (rightTexture = null);
        }

        templeObject.setTexture(leftTexture, rightTexture);
        break;

      default:
        break;
    }
  }
  setMetalNess(metallic, part = this.selectedPart) {
    switch (part) {
      case "Frame":
        frameObject.setMetalNess(metallic);
        selectionStore.selectedStuff.Frame.metallic = metallic;
        break;

      case "Temple":
        templeObject.setMetalNess(metallic);
        selectionStore.selectedStuff.Temple.metallic = metallic;
        break;

      default:
        break;
    }
  }

  setRoughness(roughness, part = this.selectedPart) {
    switch (part) {
      case "Frame":
        frameObject.setRoughness(roughness);
        selectionStore.selectedStuff.Frame.roughness = roughness;
        break;

      case "Temple":
        templeObject.setRoughness(roughness);
        selectionStore.selectedStuff.Temple.roughness = roughness;
        break;

      default:
        break;
    }
  }

  setOpacity(opacity, part = this.selectedPart) {
    switch (part) {
      case "Frame":
        frameObject.setTransparency(opacity);
        selectionStore.selectedStuff.Frame.transparency = opacity;
        break;

      case "Temple":
        templeObject.setTransparency(opacity);
        selectionStore.selectedStuff.Temple.transparency = opacity;
        break;

      case "Lenses":
        lenseObject.setOpacity(opacity);
        selectionStore.selectedStuff.Lenses.transparency = opacity;
        break;
      default:
        break;
    }
  }
  setColor(color, part = this.selectedPart) {
    console.log("color", part);
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
  reset() {
    frameObject.reset();
    templeObject.reset();
    lenseObject.reset();
    this.selectedStuff = {
      Frame: {
        texture: "original.jpg",
        color: null,
        metallic: null,
        roughness: null,
      },
      Temple: {
        texture: "original.jpg",
        color: null,
        metallic: null,
        roughness: null,
      },
      Lenses: {
        color: null,
      },
    };
   
  }
}

export const selectionStore = new UISelectionStore();
