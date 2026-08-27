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
    
    // Positioned to view the sweeping wave rising from bottom-left to center-right
    camera.position.set(-140, 90, 340);
    camera.lookAt(-20, 25, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. High-Density Particle Wave Grid
    const SEPARATION_X = 14;
    const SEPARATION_Y = 14;
    const AMOUNTX = 160;
    const AMOUNTY = 110;
    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);
    const colors = new Float32Array(numParticles * 3);

    const colorViolet = new THREE.Color("#D946EF"); // Bright magenta-pink highlights
    const colorPurple = new THREE.Color("#8B5CF6"); // Electric purple
    const colorIndigo = new THREE.Color("#6366F1"); // Deep indigo
    const colorCyan = new THREE.Color("#38BDF8");   // Glowing electric cyan
    const colorElectric = new THREE.Color("#06B6D4"); // Deep cyan
    const tempColor = new THREE.Color();

    let i = 0;
    let j = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        // Shift grid towards bottom-left
        positions[i] = ix * SEPARATION_X - (AMOUNTX * SEPARATION_X) / 1.6;
        positions[i + 1] = 0;
        positions[i + 2] = iy * SEPARATION_Y - (AMOUNTY * SEPARATION_Y) / 2.0;

        scales[j] = Math.random() * 2.2 + 3.0;

        // Diagonal gradient mapping matching reference image
        const ratio = (ix / AMOUNTX) * 0.6 + (iy / AMOUNTY) * 0.4;
        if (ratio < 0.25) {
          tempColor.copy(colorViolet).lerp(colorPurple, ratio / 0.25);
        } else if (ratio < 0.6) {
          tempColor.copy(colorPurple).lerp(colorIndigo, (ratio - 0.25) / 0.35);
        } else if (ratio < 0.85) {
          tempColor.copy(colorIndigo).lerp(colorCyan, (ratio - 0.6) / 0.25);
        } else {
          tempColor.copy(colorCyan).lerp(colorElectric, (ratio - 0.85) / 0.15);
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

    // Particle sprite texture with bright core and glowing additive halo
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(217, 70, 239, 0.95)");
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.6)");
      gradient.addColorStop(0.8, "rgba(56, 189, 248, 0.3)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 5.6,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Floating 3D Depth Orbs & Bokeh Specks
    const bokehCount = 40;
    const bokehGeo = new THREE.BufferGeometry();
    const bokehPositions = new Float32Array(bokehCount * 3);
    const bokehColors = new Float32Array(bokehCount * 3);

    const bokehCanvas = document.createElement("canvas");
    bokehCanvas.width = 64;
    bokehCanvas.height = 64;
    const bCtx = bokehCanvas.getContext("2d");
    if (bCtx) {
      const bGrad = bCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      bGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      bGrad.addColorStop(0.3, "rgba(192, 132, 252, 0.7)");
      bGrad.addColorStop(0.7, "rgba(56, 189, 248, 0.3)");
      bGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      bCtx.fillStyle = bGrad;
      bCtx.fillRect(0, 0, 64, 64);
    }
    const bokehTexture = new THREE.CanvasTexture(bokehCanvas);

    for (let k = 0; k < bokehCount; k++) {
      bokehPositions[k * 3] = (Math.random() - 0.5) * 1200 - 100;
      bokehPositions[k * 3 + 1] = Math.random() * 260 - 20;
      bokehPositions[k * 3 + 2] = (Math.random() - 0.5) * 600;

      const isCyan = Math.random() > 0.5;
      const bColor = isCyan ? colorCyan : colorViolet;
      bokehColors[k * 3] = bColor.r;
      bokehColors[k * 3 + 1] = bColor.g;
      bokehColors[k * 3 + 2] = bColor.b;
    }

    bokehGeo.setAttribute("position", new THREE.BufferAttribute(bokehPositions, 3));
    bokehGeo.setAttribute("color", new THREE.BufferAttribute(bokehColors, 3));

    const bokehMat = new THREE.PointsMaterial({
      size: 16,
      map: bokehTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75,
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

    // 6. Animation Loop (60 FPS Multi-Harmonic Wave Motion)
    let count = 0;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse parallax
      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;
      camera.position.x = -140 + targetX * 0.2;
      camera.position.y = 90 + -targetY * 0.1;
      camera.lookAt(-20, 25, 0);

      const posArray = geometry.attributes.position.array as Float32Array;

      let idx = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Pronounced undulating wave crests sweeping upward
          posArray[idx + 1] =
            Math.sin((ix * 0.18 + count * 0.9)) * 48 +
            Math.sin((iy * 0.28 + count * 1.1)) * 42 +
            Math.cos((ix * 0.12 + iy * 0.14 + count * 0.7)) * 32 +
            Math.sin((ix * 0.06 - iy * 0.08 + count * 0.5)) * 22;

          idx += 3;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Bokeh particles float
      const bPos = bokehGeo.attributes.position.array as Float32Array;
      for (let b = 0; b < bokehCount; b++) {
        bPos[b * 3 + 1] += Math.sin(count * 0.8 + b) * 0.3;
        bPos[b * 3] += Math.cos(count * 0.5 + b) * 0.2;
      }
      bokehGeo.attributes.position.needsUpdate = true;

      count += 0.038;

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
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-100 mix-blend-screen"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
