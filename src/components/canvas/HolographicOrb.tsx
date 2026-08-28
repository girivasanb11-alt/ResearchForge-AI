"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

export function HolographicOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = 380;
    const height = 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Radiant Energy Core
    const coreGeo = new THREE.IcosahedronGeometry(46, 4);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#7C3AED"),
      emissive: new THREE.Color("#8B5CF6"),
      emissiveIntensity: 0.95,
      roughness: 0.1,
      metalness: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 2. Outer Glass Holographic Refraction Shell (Apple Vision Pro cinematic quality)
    const shellGeo = new THREE.IcosahedronGeometry(60, 3);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#38BDF8"),
      emissive: new THREE.Color("#0284C7"),
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.48,
      roughness: 0.05,
      metalness: 0.15,
      transmission: 0.92,
      ior: 1.48,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: true,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    scene.add(shellMesh);

    // 3. Gyroscopic Holographic Energy Rings
    const createRing = (radius: number, color: string, rotX: number, rotY: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.75, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      scene.add(ringMesh);
      return ringMesh;
    };

    const ring1 = createRing(76, "#C084FC", Math.PI / 3, Math.PI / 6);
    const ring2 = createRing(88, "#22D3EE", -Math.PI / 4, Math.PI / 4);
    const ring3 = createRing(100, "#38BDF8", Math.PI / 2, 0);

    // 4. Volumetric Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight("#8B5CF6", 5, 350);
    pointLight1.position.set(90, 90, 90);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight("#38BDF8", 5, 350);
    pointLight2.position.set(-90, -90, 90);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight("#D946EF", 3, 250);
    pointLight3.position.set(0, 100, -50);
    scene.add(pointLight3);

    // 5. Animation Loop
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Breathing scale oscillation
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.045;
      coreMesh.scale.set(scale, scale, scale);

      // Smooth Rotations
      coreMesh.rotation.y = elapsedTime * 0.32;
      coreMesh.rotation.x = elapsedTime * 0.16;

      shellMesh.rotation.y = -elapsedTime * 0.22;
      shellMesh.rotation.z = elapsedTime * 0.26;

      ring1.rotation.z = elapsedTime * 0.42;
      ring2.rotation.z = -elapsedTime * 0.36;
      ring3.rotation.x = Math.PI / 2 + Math.sin(elapsedTime * 0.85) * 0.18;
      ring3.rotation.z = elapsedTime * 0.22;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative flex items-center justify-center pointer-events-none select-none"
    >
      {/* Outer energy radial backdrop glow */}
      <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-purple-600/35 via-indigo-500/25 to-cyan-400/35 blur-3xl animate-pulse -z-10" />

      {/* Floating 3D Canvas Container */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        ref={containerRef}
        className="w-[340px] h-[340px] sm:w-[380px] sm:h-[380px]"
      />
    </motion.div>
  );
}
