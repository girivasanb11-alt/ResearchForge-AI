"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function HeroSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const secondary1 = useRef<THREE.Mesh>(null);
  const secondary2 = useRef<THREE.Mesh>(null);
  const secondary3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.5;
    }

    if (coreRef.current) {
      // Pulse effect
      const scale = 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
      
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 1.5 + Math.sin(t * 3) * 0.5;
      }
    }

    // Orbiting secondary spheres
    if (secondary1.current) {
      secondary1.current.position.x = Math.cos(t * 0.8) * 4;
      secondary1.current.position.z = Math.sin(t * 0.8) * 4;
      secondary1.current.position.y = Math.sin(t * 1.5) * 1.5;
    }
    
    if (secondary2.current) {
      secondary2.current.position.x = Math.cos(t * -0.5 + Math.PI) * 5;
      secondary2.current.position.z = Math.sin(t * -0.5 + Math.PI) * 5;
      secondary2.current.position.y = Math.cos(t * 1.2) * 2;
    }

    if (secondary3.current) {
      secondary3.current.position.x = Math.sin(t * 0.6 + Math.PI / 2) * 3.5;
      secondary3.current.position.y = Math.cos(t * 0.6 + Math.PI / 2) * 3.5;
      secondary3.current.position.z = Math.sin(t * 1.1) * 2;
    }
  });

  return (
    <group ref={groupRef} position={[4, 0, 0]}>
      {/* Radiant Energy Core */}
      <Sphere ref={coreRef} args={[1.8, 64, 64]}>
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#8B5CF6"
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Outer Glass Shell (Apple Vision Pro style) */}
      <Sphere args={[2.4, 64, 64]}>
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={1024}
          transmission={1}
          roughness={0.05}
          thickness={0.5}
          ior={1.45}
          chromaticAberration={0.05}
          anisotropy={0.3}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.1}
          clearcoat={1}
          color="#38BDF8"
        />
      </Sphere>

      {/* Orbiting Elements */}
      <Sphere ref={secondary1} args={[0.3, 32, 32]}>
        <meshPhysicalMaterial color="#D946EF" emissive="#D946EF" emissiveIntensity={1.5} roughness={0.1} metalness={0.9} />
      </Sphere>
      
      <Sphere ref={secondary2} args={[0.2, 32, 32]}>
        <meshPhysicalMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={1} roughness={0.1} metalness={0.8} />
      </Sphere>

      <Sphere ref={secondary3} args={[0.4, 32, 32]}>
        <MeshTransmissionMaterial transmission={0.9} roughness={0.1} thickness={0.5} ior={1.5} color="#8B5CF6" />
      </Sphere>
    </group>
  );
}
