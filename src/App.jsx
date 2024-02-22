import './App.css';
import { createRoot } from 'react-dom/client';
import Timer from './components/Timer/Timer';
import Scene from './components/Scene/Scene';
import { Canvas } from '@react-three/fiber';
import Form from "./components/questions/Form";

export default function App() {

  return (
    <>
        <Timer />
        <Form />
        <Canvas className='canvas-container' camera={{ fov: 40, position: [0, 0, 10]}}>
            <Scene />
        </Canvas>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)