import { useRef, useEffect, useState } from "react";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import {selectionStore} from "../store/UISelectionStore";
import { observer } from "mobx-react";

const Labels = observer(({ addToScene }) => {
  const [selected, setSelected] = useState(selectionStore.selectedPart); // Track selected button
  const FrameRef = useRef(null);
  const TempleRef = useRef(null);
  const LensesRef = useRef(null);

  const btnHandler = (label) => () => {
    setSelected(label);
    selectionStore.setSelectedPart(label);
  };

  useEffect(() => {
    if (FrameRef.current && TempleRef.current && LensesRef.current) {
      const FrameLabel = new CSS2DObject(FrameRef.current);
      FrameLabel.name = "Frame";
      const TempleLabel = new CSS2DObject(TempleRef.current);
      TempleLabel.name = "Temple";
      const LensesLabel = new CSS2DObject(LensesRef.current);
      LensesLabel.name = "Lenses";

      // Set positions
      FrameLabel.position.set(0, -0.1, 0);
      TempleLabel.position.set(1.1, -0.1, -1);
      LensesLabel.position.set(0.6, -0.5, 0);
      // Add these to the scene
      addToScene([FrameLabel, TempleLabel, LensesLabel]);
    }
    setSelected(selectionStore.selectedPart);
  }, [selectionStore.selectedPart]);

  return (
    <div style={{ display: "none" }}>
      {["Frame", "Temple", "Lenses"].map((label) => (
        <button
          key={label}
          ref={
            label === "Frame"
              ? FrameRef
              : label === "Temple"
              ? TempleRef
              : LensesRef
          }
          className={`label-button flex items-center gap-1 px-3 py-2 rounded-full border shadow-lg transition-all 
            ${
              selected === label
                ? "bg-purple-600 border-purple-300 text-white shadow-md" // Highlight when selected
                : "bg-purple-900 border-purple-400 text-white"
            }`}
          style={{ pointerEvents: "auto" }}
          onClick={btnHandler(label)} // Update state on click
        >
          <input
            type="radio"
            name="label"
            id={label}
            className="hidden"
            checked={selected === label}
            readOnly
          />
          <div className="w-4 h-4 border-[1.5px] border-purple-300 rounded-full flex items-center justify-center">
            <div
              className={`w-2 h-2 rounded-full ${
                selected === label ? "bg-white" : "bg-transparent"
              }`}
            ></div>
          </div>
          <span className="text-white font-medium capitalize">{label}</span>
        </button>
      ))}
    </div>
  );
})

export default Labels;
