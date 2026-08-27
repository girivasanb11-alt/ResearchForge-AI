"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function ParticleWaveCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 3000);
    camera.position.set(-150, 220, 500);
    camera.lookAt(0, -30, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Particle Grid Mesh with Dense Points & Double Frequency
    const SEPARATION_X = 22;
    const SEPARATION_Y = 22;
    const AMOUNTX = 110;
    const AMOUNTY = 90;
    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);
    const colors = new Float32Array(numParticles * 3);

    const colorPurple = new THREE.Color("#8B5CF6");
    const colorCyan = new THREE.Color("#38BDF8");
    const colorIndigo = new THREE.Color("#6366F1");
    const tempColor = new THREE.Color();

    let i = 0;
    let j = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATION_X - (AMOUNTX * SEPARATION_X) / 2; // x
        positions[i + 1] = 0; // y
        positions[i + 2] = iy * SEPARATION_Y - (AMOUNTY * SEPARATION_Y) / 2; // z

        scales[j] = Math.random() * 1.5 + 2.0;

        // Gradient color along X/Z
        const ratio = (ix / AMOUNTX) * 0.6 + (iy / AMOUNTY) * 0.4;
        if (ratio < 0.5) {
          tempColor.copy(colorPurple).lerp(colorIndigo, ratio * 2);
        } else {
          tempColor.copy(colorIndigo).lerp(colorCyan, (ratio - 0.5) * 2);
        }

        colors[i] = tempColor.r;
        colors[i + 1] = tempColor.g;
        colors[i + 2] = tempColor.b;

        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle texture with smooth radial light halo
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.25, "rgba(168, 85, 247, 0.9)");
      gradient.addColorStop(0.6, "rgba(56, 189, 248, 0.4)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 4.2,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Mouse Interaction & Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onPointerMove = (event: MouseEvent) => {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // 4. Resize Listener
    const onWindowResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onWindowResize);

    // 5. Animation Loop
    let count = 0;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;
      camera.position.x = -150 + targetX * 0.3;
      camera.position.y = 220 + -targetY * 0.15;
      camera.lookAt(0, -30, 0);

      const posArray = geometry.attributes.position.array as Float32Array;

      let idx = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Beautiful fluid undulating wave formulation
          posArray[idx + 1] =
            Math.sin((ix + count) * 0.32) * 32 +
            Math.sin((iy + count) * 0.45) * 32 +
            Math.cos((ix * 0.5 + iy * 0.5 + count) * 0.22) * 20;

          idx += 3;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      count += 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onWindowResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-90 mix-blend-screen"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
