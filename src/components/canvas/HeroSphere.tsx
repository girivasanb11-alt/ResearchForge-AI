"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshTransmissionMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

export function HeroSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const energyRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.rotation.x = t * 0.02;
    }

    if (coreRef.current) {
      // Pulse effect
      const scale = 1 + Math.sin(t * 1.5) * 0.03;
      coreRef.current.scale.set(scale, scale, scale);
      
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 2 + Math.sin(t * 2) * 1.5;
      }
    }
    
    if (energyRef.current) {
        energyRef.current.rotation.z = -t * 0.2;
        energyRef.current.rotation.y = t * 0.3;
        const scale = 1.05 + Math.cos(t * 2.5) * 0.04;
        energyRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Deep Inner Plasma Core */}
      <Sphere ref={coreRef} args={[1.7, 64, 64]}>
        <meshStandardMaterial
          color="#5A3BFF"
          emissive="#8A5BFF"
          emissiveIntensity={3}
          roughness={0.1}
          metalness={1}
          wireframe={false}
        />
      </Sphere>

      {/* Energy Veins / Plasma effect around core */}
      <Sphere ref={energyRef} args={[1.8, 32, 32]}>
        <MeshWobbleMaterial
            factor={1}
            speed={2}
            color="#00D8FF"
            emissive="#00BFFF"
            emissiveIntensity={2}
            wireframe
            transparent
            opacity={0.3}
        />
      </Sphere>

      {/* Outer Cosmic Glass Shell (Apple Vision Pro style) */}
      <Sphere args={[2.5, 64, 64]}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={1.5}
          samples={16}
          resolution={1024}
          transmission={1.0}
          roughness={0.0}
          thickness={1.2}
          ior={1.5}
          chromaticAberration={0.15}
          anisotropy={1.0}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.15}
          clearcoat={1}
          clearcoatRoughness={0.0}
          color="#C26CFF"
        />
      </Sphere>
    </group>
  );
}
