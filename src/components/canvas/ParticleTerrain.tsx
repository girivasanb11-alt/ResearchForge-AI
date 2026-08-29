"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ParticleTerrain() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const AMOUNT_X = 150;
  const AMOUNT_Y = 80;
  const SEPARATION = 0.5;

  const [positions, colors] = useMemo(() => {
    const numParticles = AMOUNT_X * AMOUNT_Y;
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);
    
    const colorDeepPurple = new THREE.Color("#7C3AED");
    const colorNeonBlue = new THREE.Color("#38BDF8");
    const colorMagenta = new THREE.Color("#D946EF");
    const tempColor = new THREE.Color();

    let i = 0;
    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        // Center the grid
        const x = ix * SEPARATION - (AMOUNT_X * SEPARATION) / 2;
        const z = iy * SEPARATION - (AMOUNT_Y * SEPARATION) / 2;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = 0; // Y will be animated
        positions[i * 3 + 2] = z;

        // Gradient color based on X
        const u = ix / AMOUNT_X;
        if (u < 0.5) {
          tempColor.lerpColors(colorMagenta, colorDeepPurple, u * 2);
        } else {
          tempColor.lerpColors(colorDeepPurple, colorNeonBlue, (u - 0.5) * 2);
        }

        colors[i * 3] = tempColor.r;
        colors[i * 3 + 1] = tempColor.g;
        colors[i * 3 + 2] = tempColor.b;

        i++;
      }
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime() * 0.5;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    let i = 0;
    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];
        
        // Complex wave function for procedural terrain
        const y = Math.sin((ix + time * 2) * 0.1) * 1.5 
                + Math.cos((iy + time) * 0.1) * 1.5
                + Math.sin((ix * iy) * 0.005 + time) * 0.5;
        
        positions[i * 3 + 1] = y;
        i++;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[0, -6, -10]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
