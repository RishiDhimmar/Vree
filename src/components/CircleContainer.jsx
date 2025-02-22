// eslint-disable-next-line react/prop-types
function CircleContainer({ path = "#", active, color = "transparent", onClick }) {
  return (
    <div className="flex justify-center items-center cursor-pointer" onClick={() => onClick(color)}>
      <div
        className={`cover overflow-hidden rounded-full w-11 h-11 bg-cover bg-center ${
          active ? "shadow-[0px_0px_40px_2px_rgba(166,115,255,1)]" : ""
        } 
        ${
          color != "transparent" ? "border-1 border-white" : ""
        } duration-50 hover:shadow-[0px_0px_20px_2px_rgba(255,255,255,0.8)]`}
        style={{ backgroundImage: `url(${path})`, backgroundColor: color }}
      ></div>
    </div>
  );
}

export default CircleContainer;
