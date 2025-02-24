import { useRef, useEffect, useState } from "react";
import { ThreeEnvironment } from "./core/ThreeEnvironment";
import Labels from "./components/Labels";

const ThreeCanvas = () => {
  const canvasRef = useRef(null);
  const [threeEnv, setThreeEnv] = useState(null); // State to track threeEnv initialization

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

  return (
    <>
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
};

export default ThreeCanvas;
