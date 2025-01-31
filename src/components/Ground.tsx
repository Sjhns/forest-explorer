import { usePlane } from '@react-three/cannon';
import { Plane } from '@react-three/drei';

export function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: 'Static',
  }));

  return (
    <group>
      {/* Terreno base */}
      <Plane
        ref={ref}
        receiveShadow
        args={[1000, 1000]}
      >
        <meshStandardMaterial
          color="#2d5a27"
          roughness={1}
          metalness={0}
        />
      </Plane>
      
      {/* Camada de grama decorativa */}
      <Plane
        position={[0, 0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[1000, 1000]}
      >
        <meshStandardMaterial
          color="#3a7a33"
          roughness={1}
          metalness={0}
          transparent
          opacity={0.7}
        />
      </Plane>
    </group>
  );
}