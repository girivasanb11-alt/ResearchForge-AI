"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

export function IridescentBubble() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const size = 180;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Organic Deformed Sphere (Simulating Liquid Surface Bubble)
    const geometry = new THREE.SphereGeometry(38, 64, 64);

    // 2. Physical Iridescent Material with Glass Refraction & Dispersion
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0ea5e9"),
      emissive: new THREE.Color("#6366f1"),
      emissiveIntensity: 0.35,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.92,
      thickness: 1.5,
      ior: 1.4,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // 3. Dynamic Colorful Point Lights to create iridescent sheen
    const light1 = new THREE.PointLight("#38bdf8", 6, 200);
    light1.position.set(50, 60, 50);
    scene.add(light1);

    const light2 = new THREE.PointLight("#c084fc", 6, 200);
    light2.position.set(-60, -40, 50);
    scene.add(light2);

    const light3 = new THREE.PointLight("#34d399", 3, 150);
    light3.position.set(0, -60, -30);
    scene.add(light3);

    const ambientLight = new THREE.AmbientLight(0x38bdf8, 0.6);
    scene.add(ambientLight);

    // 4. Tiny Floating Orbiting Particles around the bubble
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 20;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 110;
      particlePositions[i + 1] = (Math.random() - 0.5) * 110;
      particlePositions[i + 2] = (Math.random() - 0.5) * 90;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 2.5,
      color: new THREE.Color("#a855f7"),
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Animation Loop
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Gentle wobble & rotation
      sphere.rotation.y = t * 0.4;
      sphere.rotation.x = Math.sin(t * 0.5) * 0.2;
      sphere.scale.set(
        1 + Math.sin(t * 1.8) * 0.03,
        1 + Math.cos(t * 1.5) * 0.03,
        1 + Math.sin(t * 1.2) * 0.03
      );

      // Light color cycle
      light1.position.x = Math.sin(t * 0.8) * 60;
      light1.position.y = Math.cos(t * 0.8) * 60;
      light2.position.x = -Math.sin(t * 0.6) * 60;
      light2.position.y = -Math.cos(t * 0.6) * 60;

      particles.rotation.y = t * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative flex items-center justify-center pointer-events-none select-none"
    >
      {/* Background glow halo */}
      <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-500/30 to-cyan-400/40 blur-2xl animate-pulse -z-10" />

      {/* Floating 3D Canvas */}
      <motion.div
        animate={{ y: [-5, 6, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        ref={containerRef}
        className="w-[180px] h-[180px]"
      />
    </motion.div>
  );
}
