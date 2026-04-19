import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Bubble({ position, size, speed }: { position: [number, number, number], size: number, speed: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    mesh.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.005;
    mesh.current.position.x += Math.cos(state.clock.elapsedTime * speed) * 0.002;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={mesh} position={position} args={[size, 16, 16]}>
        <MeshDistortMaterial
          color="#E65100" // Match primary orange but very transparent
          speed={3}
          distort={0.4}
          radius={1}
          transparent
          opacity={0.05}
        />
      </Sphere>
    </Float>
  );
}

function Scene() {
  const bubbles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      ] as [number, number, number],
      size: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.5 + 0.2
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {bubbles.map((b, i) => (
        <Bubble key={i} {...b} />
      ))}
    </>
  );
}

export default function SeaLifeCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
