import React, { useEffect, useState } from "react";
import CircleContainer from "./CircleContainer";
import { selectionStore } from "../store/UISelectionStore";

function TextureSelector() {

  const [selectedTexture, setSelectedTexture] = useState(null);

  const textures = ["null_image.svg", "original.jpg", "texture1.png"];
  if(selectionStore.SelectedPart == "Frame") {
    textures.push("texture3.jpg");
  } else if(selectionStore.SelectedPart == "Temple") {
    textures.push("texture2.jpg");
  }

  const handleSelectionChange = (texture) => {
    console.log(texture)
    selectionStore.setTexture(texture);
    setSelectedTexture(texture);
    selectionStore.selectedStuff[selectionStore.selectedPart].texture = texture;

  }
  


  return (
    <div>
      <div className="label mt-[30px]">Texture</div>
      <div className="wrap flex gap-20 mt-5 pl-5">
        {textures.map((texture, index) => (
          <CircleContainer
            key={index}
            path={`/assets/texture/${texture}`}
            active={texture === selectionStore.selectedStuff[selectionStore.selectedPart].texture}
            onClick={() => handleSelectionChange(texture)}
          />
        ))}
       
      </div>
    </div>
  );
}

export default TextureSelector;
