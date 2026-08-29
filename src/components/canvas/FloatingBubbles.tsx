"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FloatingBubblesProps {
  count?: number;
}

export function FloatingBubbles({ count = 12 }: FloatingBubblesProps) {
  // Generate random data for each bubble once
  const bubblesData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      scale: Math.random() * 0.8 + 0.2, // size between 0.2 and 1.0
      speed: Math.random() * 2 + 1,
      rotationIntensity: Math.random() * 2,
      floatIntensity: Math.random() * 3 + 1,
      // Color tint
      color: Math.random() > 0.5 ? "#8A5BFF" : "#00D8FF"
    }));
  }, [count]);

  return (
    <group>
      {bubblesData.map((data, idx) => (
        <Float 
          key={idx}
          position={data.position} 
          speed={data.speed} 
          rotationIntensity={data.rotationIntensity} 
          floatIntensity={data.floatIntensity}
        >
          <Sphere args={[data.scale, 32, 32]}>
            <MeshTransmissionMaterial
              backside
              backsideThickness={data.scale * 2}
              thickness={data.scale}
              chromaticAberration={0.05}
              transmission={1}
              roughness={0.05}
              ior={1.4}
              clearcoat={1}
              color={data.color}
              transparent
              opacity={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}
