import React from "react";

function CircleContainer({ path = "#", active, color = "transparent", onClick }) {
  return (
    <div className="flex justify-center items-center cursor-pointer" onClick={() => onClick(color)}>
      <div
        className={`cover overflow-hidden rounded-full w-12 h-12 bg-cover bg-center ${
          active ? "shadow-[0px_0px_30px_2px_rgba(166,115,255,0.8)]" : ""
        } 
        ${
          color != "transparent" ? "border-1 border-white" : ""
        } duration-300   hover:shadow-[0px_0px_20px_2px_rgba(255,255,255,0.8)]`}
        style={{ backgroundImage: `url(${path})`, backgroundColor: color }}
      ></div>
    </div>
  );
}

export default CircleContainer;
