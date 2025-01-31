import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function Bird({ position }: { position: [number, number, number] }) {
  const birdRef = useRef<any>();
  const speed = Math.random() * 0.2 + 0.1;
  const radius = Math.random() * 10 + 20;
  const height = position[1];
  let angle = Math.random() * Math.PI * 2;

  useFrame((state, delta) => {
    if (birdRef.current) {
      angle += speed * delta;
      birdRef.current.position.x = Math.cos(angle) * radius;
      birdRef.current.position.z = Math.sin(angle) * radius;
      birdRef.current.rotation.y = -angle - Math.PI / 2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={birdRef} position={position}>
        <coneGeometry args={[0.2, 0.8, 4]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </Float>
  );
}

export function Birds() {
  return (
    <group>
      {Array.from({ length: 20 }, (_, i) => (
        <Bird
          key={i}
          position={[
            Math.random() * 100 - 50,
            Math.random() * 10 + 20,
            Math.random() * 100 - 50,
          ]}
        />
      ))}
    </group>
  );
}