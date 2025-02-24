import { useEffect, useState } from "react";
import { selectionStore } from "../store/UISelectionStore";
import { frameObject } from "../core/EntityClasses/FrameClass";
import { templeObject } from "../core/EntityClasses/TempleClass";
import { observer } from "mobx-react";
import { lenseObject } from "../core/EntityClasses/LenseClass";
import ProgressBar from "./ProgressBar";

const MaterialProperties = observer(() => {
  const [metallic, setMetallic] = useState(0);
  const [roughness, setRoughness] = useState(0);
  const [transparency, setTransparency] = useState(1);

  useEffect(() => {
    if (!selectionStore.selectedPart || !frameObject.getMetalNess()) return;

    // console.log("fefe")
    // if(!frameObject.getFrameMaterial() || !templeObject.getMetalNess()) return
    switch (selectionStore.selectedPart) {
      case "Frame":
        setMetallic(frameObject.getMetalNess());
        setRoughness(frameObject.getRoughness());
        setTransparency(1 - frameObject.getTransparency());
        break;

      case "Temple":
        setMetallic(templeObject.getMetalNess());
        setRoughness(templeObject.getRoughness());
        setTransparency(1 - templeObject.getTransparency());
        break;

      case "Lenses":
        setTransparency(lenseObject.getTransparency());
        break;
      default:
        break;
    }
  }, [
    selectionStore.selectedPart,
    selectionStore.selectedStuff,
    selectionStore.readyToLoad,
  ]);
  const handleMetalNessChange = (value) => {
    setMetallic(parseFloat(value));
    selectionStore.setMetalNess(parseFloat(value));
  };

  const handleRoughNessChange = (value) => {
    setRoughness(parseFloat(value));
    selectionStore.setRoughness(parseFloat(value));
  };

  const handleOpacityChange = (value) => {
    setTransparency(parseFloat(value));
    selectionStore.setOpacity(1 - parseFloat(value));
  };

  return (
    <div className="mt-8 w-full rounded-lg  text-white w-64">
      <h2 className="text-lg font-bold mb-1">Material Properties</h2>

      {/* Metallic Slider */}
      {selectionStore.selectedPart != "Lenses" && (
        <div className="my-1 flex gap-7 items-center  pr-4">
          <ProgressBar
            title="Metallic"
            value={metallic}
            onChange={handleMetalNessChange}
          />
          <span className="text-xs text-gray-400">{metallic.toFixed(2)}</span>
        </div>
      )}

      {/* Roughness Slider */}
      {selectionStore.selectedPart != "Lenses" && (
        <div className="mb-1 flex gap-7 items-center  ">
          <ProgressBar
            title="Roughness"
            value={roughness}
            onChange={handleRoughNessChange}
          />
          <span className="text-xs text-gray-400">{roughness.toFixed(2)}</span>
        </div>
      )}

      {/* Transparency Slider */}
      <div className="mb-1 flex gap-7 items-center ">
        <ProgressBar
          title="Transparency"
          value={transparency}
          onChange={handleOpacityChange}
        />
        <span className="text-xs text-gray-400">{transparency.toFixed(2)}</span>
      </div>
    </div>
  );
});

export default MaterialProperties;
