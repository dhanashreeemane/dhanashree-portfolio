"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function CloudCore({ compact }: { compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const cursor = useRef(new THREE.Vector2());
  const nodes = useMemo(
    () => [
      [-1.45, 0.85, 0.1], [1.4, 0.9, -0.1], [-1.6, -0.75, -0.2],
      [1.55, -0.7, 0.2], [0, 1.65, -0.4], [0, -1.55, 0.15],
    ] as [number, number, number][],
    []
  );

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      cursor.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    const pointer = cursor.current;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.42, 4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, pointer.y * 0.28, 4, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, pointer.x * 0.16, 3, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, pointer.y * 0.1, 3, delta);
    group.current.rotation.z += delta * 0.025;
    if (inner.current) inner.current.rotation.y -= delta * 0.22;
  });

  return (
    <group ref={group} scale={compact ? 0.82 : 1}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.92, compact ? 1 : 2]} />
        <meshPhysicalMaterial color="#07162d" emissive="#147ea1" emissiveIntensity={0.55} roughness={0.16} metalness={0.82} clearcoat={1} wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.68, 2]} />
        <meshPhysicalMaterial color="#22d3ee" emissive="#087ea4" emissiveIntensity={1.1} roughness={0.2} metalness={0.5} transparent opacity={0.72} />
      </mesh>
      {[1.3, 1.65, 2.05].map((radius, index) => (
        <mesh key={radius} rotation={[index * 0.75, 0.35 + index * 0.5, index * 0.35]}>
          <torusGeometry args={[radius, index === 1 ? 0.018 : 0.012, 8, compact ? 48 : 80]} />
          <meshBasicMaterial color={index === 1 ? "#8b5cf6" : "#38bdf8"} transparent opacity={0.46} />
        </mesh>
      ))}
      {nodes.slice(0, compact ? 4 : nodes.length).map((position, index) => (
        <group key={index} position={position}>
          <mesh>
            <octahedronGeometry args={[0.13, 0]} />
            <meshStandardMaterial color={index % 2 ? "#a78bfa" : "#67e8f9"} emissive={index % 2 ? "#7c3aed" : "#0891b2"} emissiveIntensity={1.5} />
          </mesh>
          <pointLight color={index % 2 ? "#8b5cf6" : "#22d3ee"} intensity={compact ? 0.35 : 0.65} distance={1.4} />
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.95, 0]}>
        <cylinderGeometry args={[1.75, 2.3, 0.03, 64, 1, true]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame((_, delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.18, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.12, 3, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function StaticFallback() {
  return (
    <div className="hero-orb" aria-hidden="true">
      <span className="hero-orb__core" />
      <span className="hero-orb__ring hero-orb__ring--one" />
      <span className="hero-orb__ring hero-orb__ring--two" />
    </div>
  );
}

export default function HeroScene() {
  const reducedMotion = useReducedMotion();
  const [compact, setCompact] = useState(true);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(media.matches || (navigator.hardwareConcurrency || 4) <= 4);
    update();
    media.addEventListener("change", update);
    try {
      const canvas = document.createElement("canvas");
      setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch { setWebgl(false); }
    return () => media.removeEventListener("change", update);
  }, []);

  if (reducedMotion || !webgl) return <StaticFallback />;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, compact ? 6.8 : 6], fov: 46 }}
        dpr={compact ? 1 : [1, 1.5]}
        gl={{ antialias: !compact, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} color="#b9f4ff" />
        <pointLight position={[-3, -2, 3]} intensity={2} color="#7c3aed" />
        <CloudCore compact={compact} />
        {!compact && <CameraRig />}
      </Canvas>
    </div>
  );
}
