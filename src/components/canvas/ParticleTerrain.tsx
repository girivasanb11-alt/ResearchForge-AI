"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AMOUNT_X = 150;
const AMOUNT_Y = 150;

export function ParticleTerrain() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const numParticles = AMOUNT_X * AMOUNT_Y;
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    const colorA = new THREE.Color("#5A3BFF"); // Deep Purple
    const colorB = new THREE.Color("#00D8FF"); // Bright Cyan

    let i = 0;
    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        // Space out particles tighter for a dense point cloud
        positions[i * 3] = ix * 0.3 - (AMOUNT_X * 0.3) / 2;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = iy * 0.3 - (AMOUNT_Y * 0.3) / 2;

        // Gradient based on X position to simulate a data flow
        const mixRatio = ix / AMOUNT_X;
        const mixedColor = colorA.clone().lerp(colorB, mixRatio + (Math.random() * 0.2 - 0.1));
        
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;

        i++;
      }
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime() * 0.3;
    
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    let i = 0;
    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        // Quantum network wave function
        const y = Math.sin((ix + time * 3) * 0.15) * 1.2 
                + Math.cos((iy + time * 2) * 0.15) * 1.2
                + Math.sin((ix * iy) * 0.002 + time) * 0.5;
        
        pos[i * 3 + 1] = y;
        i++;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[0, -8, -15]} rotation={[0.2, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
