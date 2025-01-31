import { useBox } from '@react-three/cannon';
import { useRef } from 'react';
import { Mesh } from 'three';

interface RockProps {
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export function Rock({ position, scale = 1, rotation = [0, 0, 0] }: RockProps) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args: [1 * scale, 0.8 * scale, 1 * scale],
    rotation,
  }));

  return (
    <group ref={ref} position={position} scale={scale} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <dodecahedronGeometry args={[0.5]} />
        <meshStandardMaterial
          color="#4a4a4a"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

export function RockFormation() {
  return (
    <>
      {Array.from({ length: 50 }, (_, i) => {
        const x = Math.random() * 200 - 100;
        const z = Math.random() * 200 - 100;
        const scale = 0.5 + Math.random() * 2;
        const rotation: [number, number, number] = [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ];
        return (
          <Rock
            key={i}
            position={[x, 0, z]}
            scale={scale}
            rotation={rotation}
          />
        );
      })}
    </>
  );
}