"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CosmicDustProps {
  count?: number;
}

export function CosmicDust({ count = 10000 }: CosmicDustProps) {
  const pointsRef = useRef<THREE.Group>(null);

  // Memoize the geometry attributes so we aren't recomputing 10k vertices on every render
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorA = new THREE.Color("#1D7CFF"); // Electric Blue
    const colorB = new THREE.Color("#A855F7"); // Neon Violet
    const colorC = new THREE.Color("#00A6FF"); // Thunder Blue

    for (let i = 0; i < count; i++) {
      // Spread them in a large volume
      pos[i * 3] = (Math.random() - 0.5) * 60; // Wider spread for global background
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;

      // Mix colors using all 3
      const mix = Math.random();
      let mixedColor;
      if (mix < 0.33) {
        mixedColor = colorA.clone().lerp(colorB, Math.random());
      } else if (mix < 0.66) {
        mixedColor = colorB.clone().lerp(colorC, Math.random());
      } else {
        mixedColor = colorC.clone().lerp(colorA, Math.random());
      }
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
    <group ref={pointsRef}>
      {/* Layer 1: Tiny distant stars (Deep Space) */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[new Float32Array(Array.from({length: count}, () => Math.random() * 0.8 + 0.2)), 1]} />
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
              gl_PointSize = size * (20.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying vec3 vColor;
            void main() {
              vec2 xy = gl_PointCoord.xy - vec2(0.5);
              float ll = length(xy);
              float alpha = smoothstep(0.5, 0.45, ll) * 0.6; // Dimmer distant stars
              if (alpha < 0.01) discard;
              gl_FragColor = vec4(vColor, alpha);
            }
          `}
        />
      </points>

      {/* Layer 2/3: Medium and Glowing Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[new Float32Array(Array.from({length: count}, () => Math.random() * 2.5 + 1.0)), 1]} />
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
              vec4 mvPosition = modelViewMatrix * vec4(position * 0.7, 1.0); // Pull them closer
              gl_PointSize = size * (40.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying vec3 vColor;
            void main() {
              vec2 xy = gl_PointCoord.xy - vec2(0.5);
              float ll = length(xy);
              float alpha = smoothstep(0.5, 0.3, ll); // Slightly softer glow
              if (alpha < 0.01) discard;
              gl_FragColor = vec4(vColor * 1.5, alpha); // Boosted brightness
            }
          `}
        />
      </points>

      {/* Layer 4: Large Soft Energy Orbs */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[new Float32Array(Array.from({length: count}, () => Math.random() * 8.0 + 4.0)), 1]} />
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
              // Only render a fraction of these for the large orbs effect
              vec4 mvPosition = modelViewMatrix * vec4(position * 0.4, 1.0);
              gl_PointSize = size * (15.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying vec3 vColor;
            void main() {
              // Only render ~10% of particles in this layer
              if (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) > 0.05) discard;
              
              vec2 xy = gl_PointCoord.xy - vec2(0.5);
              float ll = length(xy);
              // Ultra soft gradient for energy orbs
              float alpha = (1.0 - (ll * 2.0)) * 0.15; 
              if (alpha < 0.01) discard;
              gl_FragColor = vec4(vColor * 2.0, alpha);
            }
          `}
        />
      </points>
    </group>
  );
}
