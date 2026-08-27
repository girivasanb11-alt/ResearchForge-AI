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
    const camera = new THREE.PerspectiveCamera(52, width / height, 1, 4000);
    // Positioned to capture the exact diagonal sweep from bottom-left to center-right
    camera.position.set(-220, 260, 520);
    camera.lookAt(-20, -10, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. High-Density Main Particle Wave Mesh
    const SEPARATION_X = 16;
    const SEPARATION_Y = 16;
    const AMOUNTX = 140;
    const AMOUNTY = 100;
    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);
    const colors = new Float32Array(numParticles * 3);

    const colorMagenta = new THREE.Color("#C084FC"); // Vibrant light purple
    const colorPurple = new THREE.Color("#8B5CF6");  // Primary electric purple
    const colorIndigo = new THREE.Color("#6366F1");  // Deep indigo
    const colorCyan = new THREE.Color("#38BDF8");    // Electric cyan
    const colorBlue = new THREE.Color("#0EA5E9");    // Deep cyan-blue
    const tempColor = new THREE.Color();

    let i = 0;
    let j = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        // Position grid centered
        positions[i] = ix * SEPARATION_X - (AMOUNTX * SEPARATION_X) / 1.8;
        positions[i + 1] = 0;
        positions[i + 2] = iy * SEPARATION_Y - (AMOUNTY * SEPARATION_Y) / 2.2;

        scales[j] = Math.random() * 1.8 + 2.4;

        // Multi-stop gradient along diagonal X/Y
        const ratio = (ix / AMOUNTX) * 0.55 + (iy / AMOUNTY) * 0.45;
        if (ratio < 0.3) {
          tempColor.copy(colorMagenta).lerp(colorPurple, ratio / 0.3);
        } else if (ratio < 0.65) {
          tempColor.copy(colorPurple).lerp(colorIndigo, (ratio - 0.3) / 0.35);
        } else if (ratio < 0.85) {
          tempColor.copy(colorIndigo).lerp(colorCyan, (ratio - 0.65) / 0.2);
        } else {
          tempColor.copy(colorCyan).lerp(colorBlue, (ratio - 0.85) / 0.15);
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

    // Particle sprite texture with sharp core and soft glowing radial aura
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(192, 132, 252, 0.95)");
      gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.5)");
      gradient.addColorStop(0.8, "rgba(56, 189, 248, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 4.8,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Floating 3D Bokeh Orbs (Soft out-of-focus light specks as seen in the image)
    const bokehCount = 45;
    const bokehGeo = new THREE.BufferGeometry();
    const bokehPositions = new Float32Array(bokehCount * 3);
    const bokehColors = new Float32Array(bokehCount * 3);
    const bokehSizes = new Float32Array(bokehCount);

    const bokehCanvas = document.createElement("canvas");
    bokehCanvas.width = 64;
    bokehCanvas.height = 64;
    const bCtx = bokehCanvas.getContext("2d");
    if (bCtx) {
      const bGrad = bCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      bGrad.addColorStop(0, "rgba(255, 255, 255, 0.85)");
      bGrad.addColorStop(0.35, "rgba(168, 85, 247, 0.6)");
      bGrad.addColorStop(0.7, "rgba(56, 189, 248, 0.25)");
      bGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      bCtx.fillStyle = bGrad;
      bCtx.fillRect(0, 0, 64, 64);
    }
    const bokehTexture = new THREE.CanvasTexture(bokehCanvas);

    for (let k = 0; k < bokehCount; k++) {
      bokehPositions[k * 3] = (Math.random() - 0.5) * 1600 - 150;
      bokehPositions[k * 3 + 1] = Math.random() * 320 - 40;
      bokehPositions[k * 3 + 2] = (Math.random() - 0.5) * 800;

      const bokehRatio = Math.random();
      const bColor = bokehRatio > 0.5 ? colorCyan : colorMagenta;
      bokehColors[k * 3] = bColor.r;
      bokehColors[k * 3 + 1] = bColor.g;
      bokehColors[k * 3 + 2] = bColor.b;

      bokehSizes[k] = Math.random() * 12 + 6;
    }

    bokehGeo.setAttribute("position", new THREE.BufferAttribute(bokehPositions, 3));
    bokehGeo.setAttribute("color", new THREE.BufferAttribute(bokehColors, 3));

    const bokehMat = new THREE.PointsMaterial({
      size: 14,
      map: bokehTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.65,
    });

    const bokehParticles = new THREE.Points(bokehGeo, bokehMat);
    scene.add(bokehParticles);

    // 4. Mouse Interaction & Dynamic Parallax
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

    // 5. Resize Listener
    const onWindowResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onWindowResize);

    // 6. Animation Loop (60 FPS Smooth Sinuous Waves)
    let count = 0;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth damped camera parallax
      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;
      camera.position.x = -220 + targetX * 0.25;
      camera.position.y = 260 + -targetY * 0.12;
      camera.lookAt(-20, -10, 0);

      const posArray = geometry.attributes.position.array as Float32Array;

      let idx = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Complex layered multi-harmonic sinusoidal waves matching reference curves
          posArray[idx + 1] =
            Math.sin((ix * 0.22 + count * 0.8)) * 38 +
            Math.sin((iy * 0.35 + count * 0.9)) * 36 +
            Math.cos((ix * 0.14 + iy * 0.18 + count * 0.6)) * 26 +
            Math.sin((ix * 0.08 - iy * 0.1 + count * 0.4)) * 18;

          idx += 3;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Gentle drift for bokeh particles
      const bPos = bokehGeo.attributes.position.array as Float32Array;
      for (let b = 0; b < bokehCount; b++) {
        bPos[b * 3 + 1] += Math.sin(count + b) * 0.25;
        bPos[b * 3] += Math.cos(count * 0.5 + b) * 0.15;
      }
      bokehGeo.attributes.position.needsUpdate = true;

      count += 0.035;

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
      bokehGeo.dispose();
      bokehMat.dispose();
      bokehTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-95 mix-blend-screen"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
