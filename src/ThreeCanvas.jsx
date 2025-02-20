import { useRef, useEffect } from 'react';
// import { THREE_Environment } from './core/THREE_Environment';
import {ThreeEnvironment} from './core/ThreeEnvironment';
import { THREE_Environment } from './core/THREE_Environment';

const ThreeCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const threeEnv = new ThreeEnvironment(canvasRef.current);

            return () => {
                window.removeEventListener('resize', threeEnv.onWindowResize);
            };
        }
    }, []);

    return <canvas ref={canvasRef} style={{ width: '970px', height: '87vh', display: 'block' }} />;
};

export default ThreeCanvas;