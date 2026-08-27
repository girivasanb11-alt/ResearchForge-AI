"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

export function IsometricCube() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = 220;
    const height = 180;

    const scene = new THREE.Scene();
    // Isometric-like perspective camera angle
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(120, 100, 140);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Glowing Pedestal / Platform Ring (Base)
    const baseGeo = new THREE.CylinderGeometry(42, 46, 4, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0c1527"),
      emissive: new THREE.Color("#1e1b4b"),
      roughness: 0.3,
      metalness: 0.8,
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -22;
    scene.add(base);

    // Outer glow ring on base
    const ringGeo = new THREE.RingGeometry(44, 47, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#38bdf8"),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -19.5;
    scene.add(ring);

    // 2. Isometric Cyber Cube (Glowing Glass / Wireframe Box)
    const cubeGroup = new THREE.Group();

    // Solid inner core box
    const innerGeo = new THREE.BoxGeometry(26, 26, 26);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#06b6d4"),
      emissive: new THREE.Color("#4338ca"),
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.5,
    });
    const innerCube = new THREE.Mesh(innerGeo, innerMat);
    cubeGroup.add(innerCube);

    // Outer wireframe glowing edges
    const edgesGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(28, 28, 28));
    const edgesMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#38bdf8"),
      linewidth: 2,
    });
    const edges = new THREE.LineSegments(edgesGeo, edgesMat);
    cubeGroup.add(edges);

    // Floating outer translucent shell
    const outerGeo = new THREE.BoxGeometry(34, 34, 34);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#c084fc"),
      emissive: new THREE.Color("#38bdf8"),
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.25,
      roughness: 0.05,
      transmission: 0.9,
    });
    const outerCube = new THREE.Mesh(outerGeo, outerMat);
    cubeGroup.add(outerCube);

    cubeGroup.position.y = 8;
    scene.add(cubeGroup);

    // 3. Tiny Laser Connection Nodes (Corner dots)
    const nodeGeo = new THREE.SphereGeometry(1.2, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color("#38bdf8") });
    [
      [-14, -14, -14],
      [14, -14, -14],
      [-14, 14, -14],
      [14, 14, -14],
      [-14, -14, 14],
      [14, -14, 14],
      [-14, 14, 14],
      [14, 14, 14],
    ].forEach(([x, y, z]) => {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(x, y, z);
      cubeGroup.add(node);
    });

    // 4. Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(amb);

    const lightCyan = new THREE.PointLight("#38bdf8", 5, 200);
    lightCyan.position.set(60, 50, 40);
    scene.add(lightCyan);

    const lightPurple = new THREE.PointLight("#c084fc", 4, 200);
    lightPurple.position.set(-60, 40, -40);
    scene.add(lightPurple);

    // 5. Animation
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Floating oscillation
      cubeGroup.position.y = 8 + Math.sin(t * 2) * 3.5;

      // Rotation
      cubeGroup.rotation.y = t * 0.5;
      outerCube.rotation.x = Math.sin(t * 0.4) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      baseGeo.dispose();
      baseMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute w-36 h-36 rounded-full bg-cyan-500/20 blur-2xl -z-10" />
      <motion.div ref={containerRef} className="w-[200px] h-[160px]" />
    </div>
  );
}
