import ThreeCanvasWrap from "./ThreeCanvas";
import "./App.css";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div className="flex bgc-white">
        <ThreeCanvasWrap />
        <SideBar />
      </div>
    </>
  );
}

export default App;
