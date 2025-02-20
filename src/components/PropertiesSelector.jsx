import React, { use, useEffect, useState } from "react";
import { selectionStore } from "../store/UISelectionStore";
import { frameObject } from "../core/FrameClass";
import { templeObject } from "../core/TempleClass";
import { observer } from "mobx-react";

const MaterialProperties = observer(() => {
  const [metallic, setMetallic] = useState(0);
  const [roughness, setRoughness] = useState(0);
  const [transparency, setTransparency] = useState(1);

  useEffect(() => {
    console.log("fefe")

    if(!selectionStore.selectedPart || !frameObject.getMetalNess()) return

    if(!frameObject.getFrameMaterial() || !templeObject.getMetalNess()) return
    switch(selectionStore.selectedPart) {
      case "Frame":
        setMetallic(frameObject.getMetalNess())
        setRoughness(frameObject.getRoughness())
        setTransparency(frameObject.getTransparency())
        break;

      case "Temple":
        setMetallic(templeObject.getMetalNess())
        setRoughness(templeObject.getRoughness())
        setTransparency(templeObject.getTransparency())
        break;
      default:
        break;
    }
    
  },[selectionStore.selectedPart, selectionStore.selectedStuff])
  const handleMetalNessChange = (e) => {
    setMetallic(parseFloat(e.target.value))
    selectionStore.setMetalNess(parseFloat(e.target.value))
  }
  const handleRoughNessChange = (e) => {
    setRoughness(parseFloat(e.target.value))
    selectionStore.setRoughness(parseFloat(e.target.value))
  }
  const handleOpacityChange = (e) => {
    setTransparency(parseFloat(e.target.value))
    selectionStore.setOpacity(parseFloat(e.target.value))
  }

  return (
    <div className="mt-8 w-full rounded-lg  text-white w-64">
      <h2 className="text-lg font-bold mb-4">Material Properties</h2>

      {/* Metallic Slider */}
      <div className="my-4 flex gap-7 items-center mb-7 mr-4">
        <label className="block text-sm font-medium ">Metallic</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={metallic}
          onChange={handleMetalNessChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"

        />
        <span className="text-xs text-gray-400">{metallic.toFixed(2)}</span>
      </div>

      {/* Roughness Slider */}
      <div className="mb-4 flex gap-7 items-center mb-7 mr-4">

        <label className="block text-sm font-medium ">Roughness</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={roughness}
          onChange={handleRoughNessChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-gray-400">{roughness.toFixed(2)}</span>
      </div>

      {/* Transparency Slider */}
      <div className="mb-4 flex gap-7 items-center mb-5 mr-4">

        <label className="block text-sm font-medium ">Transparency</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={transparency}
          onChange={handleOpacityChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-gray-400">{transparency.toFixed(2)}</span>
      </div>
    </div>
  );
})

export default MaterialProperties;
