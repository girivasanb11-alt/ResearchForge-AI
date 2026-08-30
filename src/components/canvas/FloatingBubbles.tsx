"use client";

import React, { useMemo } from "react";
import { Float, Sphere, MeshTransmissionMaterial } from "@react-three/drei";

interface FloatingBubblesProps {
  count?: number;
}

export function FloatingBubbles({ count = 12 }: FloatingBubblesProps) {
  // Generate random data for each bubble once
  const bubblesData = useMemo(() => {
    const palette = ["#1D7CFF", "#8B5CF6", "#A855F7", "#00A6FF"];
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 40, // Wider spread across global background
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20 - 5
      ] as [number, number, number],
      scale: Math.random() * 1.5 + 0.5, // slightly larger
      speed: Math.random() * 1.5 + 0.5,
      rotationIntensity: Math.random() * 2,
      floatIntensity: Math.random() * 3 + 1,
      color: palette[Math.floor(Math.random() * palette.length)]
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
          <Sphere args={[data.scale, 64, 64]}> {/* Higher res sphere for cleaner glass */}
            <MeshTransmissionMaterial
              backside
              backsideThickness={data.scale * 3}
              thickness={data.scale * 2.0} // Increased thickness for stronger refraction
              chromaticAberration={0.4} // Higher chromatic aberration for iridescent feel
              transmission={1.0}
              roughness={0.0}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0.0}
              color={data.color}
              transparent
              opacity={0.8}
            />
          </Sphere>
          
          {/* Inner contained energy core */}
          <Sphere args={[data.scale * 0.3, 16, 16]}>
            <meshBasicMaterial 
               color={data.color} 
               wireframe 
               transparent 
               opacity={0.2} 
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}
