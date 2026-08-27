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

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Core Energy Sphere
    const coreGeo = new THREE.IcosahedronGeometry(48, 4);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#7C3AED"),
      emissive: new THREE.Color("#4C1D95"),
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 2. Outer Glass Refraction Shell
    const shellGeo = new THREE.IcosahedronGeometry(62, 3);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#38BDF8"),
      emissive: new THREE.Color("#0369A1"),
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.9,
      ior: 1.5,
      wireframe: true,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    scene.add(shellMesh);

    // 3. Orbital Energy Rings
    const createRing = (radius: number, color: string, rotX: number, rotY: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.8, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.7,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      scene.add(ringMesh);
      return ringMesh;
    };

    const ring1 = createRing(80, "#A855F7", Math.PI / 3, Math.PI / 6);
    const ring2 = createRing(92, "#06B6D4", -Math.PI / 4, Math.PI / 4);
    const ring3 = createRing(104, "#38BDF8", Math.PI / 2, 0);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight("#8B5CF6", 4, 300);
    pointLight1.position.set(80, 80, 80);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight("#38BDF8", 4, 300);
    pointLight2.position.set(-80, -80, 80);
    scene.add(pointLight2);

    // 5. Animation
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Breathing scale oscillation
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.04;
      coreMesh.scale.set(scale, scale, scale);

      // Rotations
      coreMesh.rotation.y = elapsedTime * 0.3;
      coreMesh.rotation.x = elapsedTime * 0.15;

      shellMesh.rotation.y = -elapsedTime * 0.2;
      shellMesh.rotation.z = elapsedTime * 0.25;

      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.z = -elapsedTime * 0.35;
      ring3.rotation.x = Math.PI / 2 + Math.sin(elapsedTime * 0.8) * 0.15;
      ring3.rotation.z = elapsedTime * 0.2;

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
      <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-cyan-400/30 blur-3xl animate-pulse -z-10" />

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
