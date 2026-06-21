"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Environment } from "@react-three/drei";
import * as THREE from "three";

// The abstract floating hero object in the background
function AbstractKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Slowly rotate the mesh frame by frame to make it feel "alive"
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.03;
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, -10]}>
        {/* Complex geometric shape */}
        <torusKnotGeometry args={[12, 2.5, 200, 32]} />
        {/* Premium stealth wireframe material */}
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.2}
          wireframe={true}
          transparent={true}
          opacity={0.06} // Keep it very subtle so it doesn't distract from the cards
        />
      </mesh>
    </Float>
  );
}

export default function Environment3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      {/* Dynamic Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={2} color="#6366f1" /> {/* Subtle indigo rim light */}

      {/* Centerpiece */}
      <AbstractKnot />

      {/* Ambient Depth Dust */}
      <Sparkles
        count={250}
        scale={60}
        size={1.5}
        speed={0.2}
        opacity={0.3}
        color="#a1a1aa" // zinc-400
      />

      {/* Realistic HDRI reflections */}
      <Environment preset="city" />
    </Canvas>
  );
}