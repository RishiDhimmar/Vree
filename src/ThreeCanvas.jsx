import { useRef, useEffect, useState } from "react";
import { ThreeEnvironment } from "./core/ThreeEnvironment";
import Labels from "./components/Labels";
import { textureStore } from "./store/TextureStore";
import { selectionStore } from "./store/UISelectionStore";
import { observer } from "mobx-react";

const ThreeCanvas = observer(() => {
  const canvasRef = useRef(null);
  const [threeEnv, setThreeEnv] = useState(null); // State to track threeEnv initialization
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (canvasRef.current) {
      const env = new ThreeEnvironment(canvasRef.current);
      setThreeEnv(env);  // Set the threeEnv state once it's initialized

      // Clean up on unmount
      return () => {
        window.removeEventListener("resize", env.onWindowResize);
      };
    }
  }, []);

  useEffect(() => {
   setLoading(!selectionStore.readyToLoad);
  }, [selectionStore.readyToLoad]);

  return (
    <>
    {loading && <div className="w-full h-[90vh] flex justify-center items-center"><img src="/assets/icons/loader.svg" alt="loader" srcset="" /></div>}
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "90vh", display: "block" }}
      />
      {/* Only render Labels when threeEnv is available */}
      {threeEnv && (
        <Labels
          addToScene={threeEnv.sceneManager.addLabelsToScene.bind(threeEnv.sceneManager)}
        />
      )}
    </>
  );
}
)

export default ThreeCanvas;
