import React from "react";
import TextureSelector from "./TextureSelector";
import { Color, Material } from "three/webgpu";
import ColorSelector from "./ColorSelector";
import PropertirsSelctor from "./PropertiesSelector";
import MaterialProperties from "./PropertiesSelector";
import { selectionStore } from "../store/UISelectionStore";

function TempleLensLayout() {
  return (
    <div className="w-full gap-3">
      {console.log(selectionStore.selectedPart)}
      {selectionStore.selectedPart !== "Lenses" && (
        <>
          <div className="wrap my-0 text-lg text-white font-bold">
            <TextureSelector />
          </div>
          
        </>
      )}{" "}
      <div className="wrap my-3 text-lg text-white font-bold">
            <ColorSelector />
          </div>
      <div className="wrap my-3 text-lg text-white font-bold">
        <MaterialProperties />
      </div>
    </div>
  );
}

export default TempleLensLayout;
