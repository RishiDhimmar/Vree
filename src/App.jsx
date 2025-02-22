import ThreeCanvasWrap from "./ThreeCanvas";
import "./App.css";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import { selectionStore } from "./store/UISelectionStore";
import { observer } from "mobx-react";

const App = observer(() => {
  return (
    <>
      <div className={`cover w-screen h-screen ${selectionStore.isDarkTheme ? "bg-[url('/assets/background/background.png')]" : "bgc-white"}`}>
        <NavBar />
        <div className="flex bgc-white">
          <ThreeCanvasWrap />
          <SideBar />
        </div>
      </div>
    </>
  );
})

export default App;
