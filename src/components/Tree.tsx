import { useBox } from '@react-three/cannon';
import { useRef } from 'react';
import { Mesh } from 'three';

interface TreeProps {
  position: [number, number, number];
  scale?: number;
}

export function Tree({ position, scale = 1 }: TreeProps) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args: [1 * scale, 4 * scale, 1 * scale],
  }));

  const trunkRef = useRef<Mesh>(null);
  const leavesRef = useRef<Mesh>(null);

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Tronco mais detalhado */}
      <mesh
        ref={trunkRef}
        position={[0, 2, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.2, 0.3, 4, 8]} />
        <meshStandardMaterial
          color="#3d2817"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* Folhas em camadas para mais realismo */}
      <group position={[0, 4, 0]}>
        {/* Camada inferior */}
        <mesh castShadow receiveShadow position={[0, -0.8, 0]}>
          <coneGeometry args={[1.8, 2, 8]} />
          <meshStandardMaterial
            color="#1a4d1a"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        
        {/* Camada média */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <coneGeometry args={[1.4, 2, 8]} />
          <meshStandardMaterial
            color="#266626"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        
        {/* Camada superior */}
        <mesh castShadow receiveShadow position={[0, 0.8, 0]}>
          <coneGeometry args={[1, 2, 8]} />
          <meshStandardMaterial
            color="#1a4d1a"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}