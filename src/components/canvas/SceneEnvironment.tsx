"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, Environment } from "@react-three/drei";
import { HeroSphere } from "./HeroSphere";
import { ParticleTerrain } from "./ParticleTerrain";
import { CosmicDust } from "./CosmicDust";
import { FloatingBubbles } from "./FloatingBubbles";
import * as THREE from "three";
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    // Smooth, Apple Vision Pro style parallax
    // Map pointer (-1 to 1) to camera position offset
    target.current.x = pointer.x * 2.5;
    target.current.y = pointer.y * 1.5;

    // Linearly interpolate camera position for that smooth floating feel
    camera.position.x += (target.current.x - camera.position.x) * 2 * delta;
    camera.position.y += (target.current.y - camera.position.y) * 2 * delta;
    
    // Always look at center
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function SceneEnvironment() {
  return (
    <div className="absolute inset-0 z-0 bg-[#020617] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#020617"]} />
        <fogExp2 attach="fog" args={["#020617", 0.04]} />
        
        {/* Camera interaction logic */}
        <CameraRig />

        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[-10, 10, 5]} intensity={1.5} color="#8A5BFF" />
        <spotLight position={[10, 5, 10]} intensity={3} color="#00D8FF" angle={0.5} penumbra={1} />
        <pointLight position={[0, -10, 0]} intensity={2} color="#FF5FD7" />
        
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          <CosmicDust count={10000} />
          <FloatingBubbles count={12} />

          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8} position={[4, 0, -2]}>
            <HeroSphere />
          </Float>
          
          <ParticleTerrain />

          {/* Premium Post-Processing Pipeline */}
          <EffectComposer>
            <DepthOfField 
              target={[0, 0, 0]}
              focalLength={0.02} 
              bokehScale={2} 
              height={480} 
            />
            <Bloom 
              luminanceThreshold={0.5} 
              luminanceSmoothing={0.9} 
              intensity={1.2} 
              mipmapBlur 
            />
            <ChromaticAberration 
              blendFunction={BlendFunction.NORMAL} 
              offset={new THREE.Vector2(0.002, 0.002)} 
            />
            <Vignette 
              eskil={false} 
              offset={0.1} 
              darkness={1.1} 
            />
          </EffectComposer>

        </Suspense>
      </Canvas>
      
      {/* Soft Vignette Overlay to blend edges on DOM level just in case */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
    </div>
  );
}
