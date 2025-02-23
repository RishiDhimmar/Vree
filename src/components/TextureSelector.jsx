import React, { useEffect, useState } from "react";
import CircleContainer from "./CircleContainer";
import { selectionStore } from "../store/UISelectionStore";
import { observer } from "mobx-react";

const TextureSelector = observer(() => {

  const [selectedTexture, setSelectedTexture] = useState(null);

  useEffect(() => {
    setSelectedTexture(selectionStore.selectedStuff[selectionStore.selectedPart].texture);
  }, [selectionStore.selectedStuff]);



  const textures = ["null_image.svg", "original.jpg", "texture1.png"];
  if(selectionStore.SelectedPart == "Frame") {
    textures.push("texture3.jpg");
  } else if(selectionStore.SelectedPart == "Temple") {
    textures.push("texture2.jpg");
  }
  

  const handleSelectionChange = (texture) => {
    selectionStore.setTexture(texture);
    setSelectedTexture(texture);
    selectionStore.selectedStuff[selectionStore.selectedPart].texture = texture;

  }
  


  return (
    <div>
      <div className={`label mt-[20px] ${selectionStore.isDarkTheme ? "" : "text-black"}`}>Texture</div>
      <div className="wrap flex gap-15 mt-3 pl-5">
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
})

export default TextureSelector;
