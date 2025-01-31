import { useRef } from 'react';
import { Mesh } from 'three';

interface FlowerProps {
  position: [number, number, number];
}

export function Flower({ position }: FlowerProps) {
  const flowerRef = useRef<Mesh>(null);

  return (
    <group position={position}>
      {/* Caule */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#2d5a27" />
      </mesh>
      
      {/* Pétalas */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          position={[0, 0.6, 0]}
          rotation={[0.3, (i * Math.PI) / 3, 0]}
        >
          <planeGeometry args={[0.1, 0.1]} />
          <meshStandardMaterial
            color={Math.random() > 0.5 ? "#ff69b4" : "#ff1493"}
            side={2}
          />
        </mesh>
      ))}
      
      {/* Centro */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#ffff00" />
      </mesh>
    </group>
  );
}

export function FlowerField() {
  return (
    <>
      {Array.from({ length: 500 }, (_, i) => {
        const x = Math.random() * 200 - 100;
        const z = Math.random() * 200 - 100;
        return <Flower key={i} position={[x, 0, z]} />;
      })}
    </>
  );
}