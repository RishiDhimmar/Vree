
import CircleContainer from "./CircleContainer";
import { selectionStore } from "../store/UISelectionStore";
import { useState } from "react";

function ColorSelector() {
  const colors = [
    "#ffffff",
    "#d5bc93",
    "#8c1c21",
    "#185848",
    "#025D98",
    "#D2A693",
  ];

  const [, setSelectedColor] = useState(null);

  // Fix the color click handler
  const handleColorClick = (color) => {
    selectionStore.selectedStuff[selectionStore.selectedPart].color = color;
    console.log(color, selectionStore.selectedPart, selectionStore.selectedStuff[selectionStore.selectedPart].color),
      setSelectedColor(color);
    selectionStore.setColor(color);
  };

  return (
    <div>
      <div className="label mt-[30px]">Color</div>
      <div className="wrap flex flex-wrap gap-x-15 gap-y-7 mt-5 pl-5">
        {colors.map((color, index) => (
          <CircleContainer
            key={index}
            color={color}
            active={color == selectionStore.selectedStuff[selectionStore.selectedPart].color}
            onClick={() => handleColorClick(color)} 
          />
        ))}
        <CircleContainer
          path="/assets/texture/custom.png"
          onClick={() => handleColorClick("/assets/texture/custom.png")}
        />
      </div>
    </div>
  );
}

export default ColorSelector;
