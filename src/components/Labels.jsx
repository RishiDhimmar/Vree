import { useRef, useEffect, useState } from "react";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import SpecMaterialStore from "../stores/SpecMaterialStore";

const Labels = ({ addToScene }) => {
  const [selected, setSelected] = useState(SpecMaterialStore.selectedElement); // Track selected button
  const frameRef = useRef(null);
  const templeRef = useRef(null);
  const lensesRef = useRef(null);

  const btnHandler = (label) => () => {
    setSelected(label);
    SpecMaterialStore.setSelectedElement(label);
  };

  useEffect(() => {
    if (frameRef.current && templeRef.current && lensesRef.current) {
      const frameLabel = new CSS2DObject(frameRef.current);
      frameLabel.name = "frame";
      const templeLabel = new CSS2DObject(templeRef.current);
      templeLabel.name = "temple";
      const lensesLabel = new CSS2DObject(lensesRef.current);
      lensesLabel.name = "lenses";

      // Set positions
      frameLabel.position.set(0, -0.1, 0);
      templeLabel.position.set(1, 0.2, -1);
      lensesLabel.position.set(0.6, -0.05, 0);
      // Add these to the scene
      addToScene([frameLabel, templeLabel, lensesLabel]);
    }
  }, []);

  return (
    <div style={{ display: "none" }}>
      {["frame", "temple", "lens"].map((label) => (
        <button
          key={label}
          ref={
            label === "frame"
              ? frameRef
              : label === "temple"
              ? templeRef
              : lensesRef
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
          {/* Bigger radio button with thinner border */}
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
};

export default Labels;
