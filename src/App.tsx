import { Canvas } from '@react-three/fiber';
import { Sky, PointerLockControls, Environment, Cloud, Stars, Sparkles, Float, Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Suspense } from 'react';
import { Ground } from './components/Ground';
import { Player } from './components/Player';
import { Forest } from './components/Forest';
import { RockFormation } from './components/Rocks';
import { FlowerField } from './components/Flowers';
import { Fireflies } from './components/Fireflies';
import { Birds } from './components/Birds';

function App() {
  return (
    <div className="h-screen w-screen">
      <Canvas shadows camera={{ fov: 75 }}>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={null}>
          <Sky
            distance={450000}
            sunPosition={[100, 20, 100]}
            inclination={0.5}
            azimuth={0.25}
            rayleigh={0.5}
            turbidity={10}
            mieCoefficient={0.005}
            mieDirectionalG={0.7}
          />
          <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
          
          {/* Iluminação aprimorada */}
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            position={[100, 100, 100]}
            intensity={1.5}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={200}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
          />
          
          {/* Ambiente e atmosfera */}
          <Environment preset="sunset" />
          <Float speed={1} rotationIntensity={1} floatIntensity={1}>
            <Cloud position={[20, 30, -10]} speed={0.2} opacity={0.5} />
          </Float>
          <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
            <Cloud position={[-20, 25, 10]} speed={0.2} opacity={0.5} />
          </Float>
          <Float speed={0.8} rotationIntensity={1.2} floatIntensity={1.2}>
            <Cloud position={[0, 35, -30]} speed={0.1} opacity={0.3} />
          </Float>
          
          {/* Efeitos de partículas */}
          <Sparkles
            count={100}
            scale={50}
            size={4}
            speed={0.4}
            opacity={0.1}
            color="#ffffff"
          />
          
          <Physics
            gravity={[0, -9.81, 0]}
            defaultContactMaterial={{
              friction: 0.1,
              restitution: 0.1,
            }}
          >
            <Ground />
            <Forest />
            <RockFormation />
            <FlowerField />
            <Player />
          </Physics>
          
          <Fireflies />
          <Birds />
        </Suspense>
        <Preload all />
        <PointerLockControls />
      </Canvas>
      
      <div className="fixed top-4 left-4 pointer-events-none">
        <div className="bg-black bg-opacity-50 text-white p-4 rounded-lg shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-bold mb-2">Controles</h2>
          <ul className="space-y-1 text-sm">
            <li>WASD - Movimentar</li>
            <li>SHIFT - Correr</li>
            <li>CTRL - Agachar</li>
            <li>ESPAÇO - Pular</li>
            <li>MOUSE - Olhar ao redor</li>
            <li>ESC - Liberar mouse</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;