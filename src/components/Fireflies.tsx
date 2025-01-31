import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

export function Fireflies() {
  const ref = useRef<any>();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <group ref={ref}>
      <Sparkles
        count={50}
        scale={[20, 8, 20]}
        size={0.6}
        speed={0.2}
        opacity={0.7}
        color="#ffff80"
        noise={1}
      />
      <Sparkles
        count={50}
        scale={[30, 10, 30]}
        size={0.8}
        speed={0.1}
        opacity={0.5}
        color="#ffffa0"
        noise={1}
      />
    </group>
  );
}