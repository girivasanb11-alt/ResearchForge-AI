"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Float, Environment } from "@react-three/drei";
import { HeroSphere } from "./HeroSphere";
import { ParticleTerrain } from "./ParticleTerrain";

export function SceneEnvironment() {
  return (
    <div className="absolute inset-0 z-0 bg-[#020617] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#020617"]} />
        <fogExp2 attach="fog" args={["#020617", 0.05]} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[-10, 10, 5]} intensity={2} color="#8B5CF6" />
        <pointLight position={[10, 5, 5]} intensity={2} color="#38BDF8" />
        <pointLight position={[0, -10, 0]} intensity={1.5} color="#D946EF" />
        
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <HeroSphere />
          </Float>
          
          <ParticleTerrain />
        </Suspense>
      </Canvas>
      
      {/* Soft Vignette Overlay to blend edges */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
    </div>
  );
}
