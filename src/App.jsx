import './App.css';
import { createRoot } from 'react-dom/client';
import Scene from './components/Scene/Scene';
import { Canvas } from '@react-three/fiber';
import Quizz from './components/Quizz/Quizz';

export default function App() {

  return (
    <>
        <Quizz />
        <Canvas className='canvas-container' camera={{ fov: 40, position: [0, 0, 10]}}>
            <Scene />
        </Canvas>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)