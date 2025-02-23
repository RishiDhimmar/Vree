import CircleContainer from "./CircleContainer";
import { selectionStore } from "../store/UISelectionStore";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";

const ColorSelector = observer(() => {
  const colors = [
    "#ffffff",
    "#d5bc93",
    "#8c1c21",
    "#185848",
    "#025D98",
    "#D2A693",
  ];

  useEffect(() => {
    setSelectedColor(
      selectionStore.selectedStuff[selectionStore.selectedPart].color
    );
  }, [selectionStore.selectedStuff]);

  const [, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    selectionStore.selectedStuff[selectionStore.selectedPart].color = color;
    setSelectedColor(color);
    selectionStore.setColor(color);
  };

  const handleCustomColorChange = (e) => {
    const customColor = e.target.value;
    selectionStore.selectedStuff[selectionStore.selectedPart].color = customColor;
    setSelectedColor(customColor);
    selectionStore.setColor(customColor);
  };

  return (
    <div>
      <div className={`label mt-[20px] ${selectionStore.isDarkTheme ? "" : "text-black"}`}>
        Color
      </div>
      <div className="wrap flex flex-wrap gap-x-15 gap-y-7 mt-3 pl-5">
        {colors.map((color, index) => (
          <CircleContainer
            key={index}
            color={color}
            active={
              color === selectionStore.selectedStuff[selectionStore.selectedPart].color
            }
            onClick={() => handleColorClick(color)}
          />
        ))}
        {/* Custom color container with positioned input */}
        <div className="relative">
          <CircleContainer path="/assets/texture/custom.png" />
          <input
            id="customColorInput"
            type="color"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleCustomColorChange}
          />
        </div>
      </div>
    </div>
  );
});

export default ColorSelector;