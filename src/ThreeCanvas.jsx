// import { useRef, useEffect } from "react";
// // import { THREE_Environment } from './core/THREE_Environment';
// import { ThreeEnvironment } from "./core/ThreeEnvironment";
// import { THREE_Environment } from "./core/THREE_Environment";
// import Labels from "./components/Labels";
// import { SceneManager } from "./core/SceneManager";

// const ThreeCanvas = () => {
//   const canvasRef = useRef(null);
//   let threeEnv = null;
//   useEffect(() => {
//     if (canvasRef.current) {
//       threeEnv = new ThreeEnvironment(canvasRef.current);

//       return () => {
//         window.removeEventListener("resize", threeEnv.onWindowResize);
//       };
//     }
//   }, []);

//   return (
//     <>
//       <canvas
//         ref={canvasRef}
//         style={{ width: "970px", height: "87vh", display: "block" }}
//       />
//       {threeEnv && (
//         <>
//         {console.log("threeEnv")}
//         <Labels
//           addToScene={threeEnv.sceneManager.addLabelsToScene.bind(
//               threeEnv.sceneManager
//             )}
//             />
//             </>
//       )}
//     </>
//   );
// };

// export default ThreeCanvas;
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
        style={{ width: "970px", height: "87vh", display: "block" }}
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
