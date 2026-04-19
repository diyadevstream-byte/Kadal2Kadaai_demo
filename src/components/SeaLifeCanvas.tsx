import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Fish({ position, speed, color }: { position: [number, number, number], speed: number, color: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Swimming motion: Move forward and wiggle
    mesh.current.position.x = position[0] + Math.sin(time * speed) * 4;
    mesh.current.position.y = position[1] + Math.cos(time * speed * 0.5) * 2;
    mesh.current.rotation.y = Math.sin(time * speed) * 0.5;
    mesh.current.rotation.z = Math.sin(time * speed) * 0.2;
  });

  return (
    <mesh ref={mesh} position={position} scale={[0.4, 0.2, 0.6]}>
      {/* Simple Procedural Fish Body */}
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        speed={2}
        distort={0.4}
        radius={1}
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

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
          color="#E65100"
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
    return Array.from({ length: 12 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 5
      ] as [number, number, number],
      size: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.5 + 0.2
    }));
  }, []);

  const fishes = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      speed: Math.random() * 0.3 + 0.3,
      color: i % 2 === 0 ? "#E65100" : "#DDCBB8"
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {bubbles.map((b, i) => (
        <Bubble key={i} {...b} />
      ))}
      {fishes.map((f, i) => (
        <Fish key={`fish-${i}`} {...f} />
      ))}
    </>
  );
}

export default function SeaLifeCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
