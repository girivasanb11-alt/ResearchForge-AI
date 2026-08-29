"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CosmicDustProps {
  count?: number;
}

export function CosmicDust({ count = 10000 }: CosmicDustProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Memoize the geometry attributes so we aren't recomputing 10k vertices on every render
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorA = new THREE.Color("#00D8FF"); // Cyan
    const colorB = new THREE.Color("#FF5FD7"); // Pink/Purple

    for (let i = 0; i < count; i++) {
      // Spread them in a large volume
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;

      // Mix colors
      const mixedColor = colorA.clone().lerp(colorB, Math.random());
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // Very slow cosmic drift rotation
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        {/* Pass randomized sizes to the shader */}
        <bufferAttribute attach="attributes-size" args={[new Float32Array(Array.from({length: count}, () => Math.random() * 2.0 + 0.5)), 1]} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            // Attenuate size based on distance
            gl_PointSize = size * (30.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            // Soft circular glow for particles
            vec2 xy = gl_PointCoord.xy - vec2(0.5);
            float ll = length(xy);
            if(ll > 0.5) discard;
            // Radial gradient glow
            float alpha = (0.5 - ll) * 2.0;
            // Enhance the color glow
            gl_FragColor = vec4(vColor * 1.5, alpha * 0.8);
          }
        `}
      />
    </points>
  );
}
