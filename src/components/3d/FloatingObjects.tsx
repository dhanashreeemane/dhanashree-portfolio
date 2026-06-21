"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatProps {
  position: [number, number, number];
  speed?: number;
  color?: string;
}

/** A server-rack-like wireframe box — represents infrastructure/compute. */
export function FloatingServer({ position, speed = 1, color = "#3B82F6" }: FloatProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.3;
    ref.current.rotation.y = t * 0.3;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.1;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[1.1, 1.6, 0.6]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
      </mesh>
      {/* rack slot lines */}
      {[-0.5, -0.15, 0.2, 0.55].map((y, i) => (
        <mesh key={i} position={[0, y, 0.31]}>
          <planeGeometry args={[0.9, 0.06]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/** An icosahedron — represents a distributed/cluster node. */
export function FloatingNode({ position, speed = 1, color = "#22D3EE" }: FloatProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.y = position[1] + Math.cos(t) * 0.25;
    ref.current.rotation.y = t * 0.4;
    ref.current.rotation.z = t * 0.15;
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.7, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
    </mesh>
  );
}

/** A torus — reads as a shield/perimeter ring, represents security. */
export function FloatingShield({ position, speed = 1, color = "#8B5CF6" }: FloatProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.28;
    ref.current.rotation.x = t * 0.25;
    ref.current.rotation.y = t * 0.2;
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[0.55, 0.12, 12, 36]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
    </mesh>
  );
}
