"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function ParticleWaveCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // =========================================================================
    // 1. SCENE, CAMERA, RENDERER
    // =========================================================================
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.001);

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 3000);
    camera.position.set(-50, 95, 320);
    camera.lookAt(0, 25, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // =========================================================================
    // 2. CINEMATIC LIGHTING
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const purplePoint = new THREE.PointLight(0x8b5cf6, 5, 600);
    purplePoint.position.set(-120, 150, 100);
    scene.add(purplePoint);

    const cyanPoint = new THREE.PointLight(0x38bdf8, 4, 600);
    cyanPoint.position.set(140, 120, 70);
    scene.add(cyanPoint);

    // =========================================================================
    // 3. LAYER 3: HIGH-PERFORMANCE 3D PARTICLE WAVE OCEAN (6,000 GPU PARTICLES)
    // =========================================================================
    const AMOUNT_X = 100;
    const AMOUNT_Y = 60;
    const SEPARATION_X = 18;
    const SEPARATION_Y = 18;
    const numWaveParticles = AMOUNT_X * AMOUNT_Y;

    const wavePositions = new Float32Array(numWaveParticles * 3);
    const waveScales = new Float32Array(numWaveParticles);
    const waveColors = new Float32Array(numWaveParticles * 3);
    const initialBaseX = new Float32Array(numWaveParticles);
    const initialBaseZ = new Float32Array(numWaveParticles);

    // Curated Brand Color Palette
    const colorViolet = new THREE.Color("#8B5CF6");  // Electric Violet
    const colorPurple = new THREE.Color("#7C3AED");  // Deep Purple
    const colorNeonBlue = new THREE.Color("#38BDF8"); // Neon Blue
    const colorCyan = new THREE.Color("#22D3EE");     // Cyan Highlight
    const colorMagenta = new THREE.Color("#D946EF");  // Pink Crest
    const tempColor = new THREE.Color();

    let pIdx = 0;
    let sIdx = 0;
    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        const xPos = ix * SEPARATION_X - (AMOUNT_X * SEPARATION_X) / 1.7;
        const zPos = iy * SEPARATION_Y - (AMOUNT_Y * SEPARATION_Y) / 2.0;

        wavePositions[pIdx] = xPos;
        wavePositions[pIdx + 1] = 0;
        wavePositions[pIdx + 2] = zPos;

        initialBaseX[sIdx] = xPos;
        initialBaseZ[sIdx] = zPos;
        waveScales[sIdx] = Math.random() * 2.0 + 3.0;

        // Diagonal gradient mapping
        const u = ix / AMOUNT_X;
        const v = iy / AMOUNT_Y;
        const gradientRatio = u * 0.55 + v * 0.45;

        if (gradientRatio < 0.22) {
          tempColor.copy(colorMagenta).lerp(colorViolet, gradientRatio / 0.22);
        } else if (gradientRatio < 0.52) {
          tempColor.copy(colorViolet).lerp(colorPurple, (gradientRatio - 0.22) / 0.3);
        } else if (gradientRatio < 0.8) {
          tempColor.copy(colorPurple).lerp(colorNeonBlue, (gradientRatio - 0.52) / 0.28);
        } else {
          tempColor.copy(colorNeonBlue).lerp(colorCyan, (gradientRatio - 0.8) / 0.2);
        }

        waveColors[pIdx] = tempColor.r;
        waveColors[pIdx + 1] = tempColor.g;
        waveColors[pIdx + 2] = tempColor.b;

        pIdx += 3;
        sIdx++;
      }
    }

    const waveGeometry = new THREE.BufferGeometry();
    waveGeometry.setAttribute("position", new THREE.BufferAttribute(wavePositions, 3));
    waveGeometry.setAttribute("scale", new THREE.BufferAttribute(waveScales, 1));
    waveGeometry.setAttribute("color", new THREE.BufferAttribute(waveColors, 3));

    // High-Resolution Radial Glow Sprite
    const createGlowTexture = () => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d");
      if (ctx) {
        const radGrad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        radGrad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
        radGrad.addColorStop(0.2, "rgba(217, 70, 239, 0.95)");
        radGrad.addColorStop(0.45, "rgba(139, 92, 246, 0.6)");
        radGrad.addColorStop(0.75, "rgba(56, 189, 248, 0.25)");
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(c);
    };

    const particleTexture = createGlowTexture();

    const waveMaterial = new THREE.PointsMaterial({
      size: 5.6,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.92,
    });

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    scene.add(wavePoints);

    // =========================================================================
    // 4. LAYER 4: UPPER-CENTER HERO HOLOGRAPHIC RESEARCH CORE
    // =========================================================================
    const heroOrbGroup = new THREE.Group();
    heroOrbGroup.position.set(0, 75, 15);
    scene.add(heroOrbGroup);

    // Inner Radiant Pulsing Core
    const heroCoreGeo = new THREE.IcosahedronGeometry(24, 3);
    const heroCoreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#7C3AED"),
      emissive: new THREE.Color("#8B5CF6"),
      emissiveIntensity: 0.9,
      roughness: 0.15,
      metalness: 0.85,
    });
    const heroCoreMesh = new THREE.Mesh(heroCoreGeo, heroCoreMat);
    heroOrbGroup.add(heroCoreMesh);

    // Outer Glass Holographic Shell
    const heroShellGeo = new THREE.IcosahedronGeometry(32, 2);
    const heroShellMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#38BDF8"),
      emissive: new THREE.Color("#0284C7"),
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.45,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.45,
      wireframe: true,
    });
    const heroShellMesh = new THREE.Mesh(heroShellGeo, heroShellMat);
    heroOrbGroup.add(heroShellMesh);

    // Gyroscopic Holographic Energy Rings
    const createOrbRing = (radius: number, color: string, rotX: number, rotY: number) => {
      const rGeo = new THREE.TorusGeometry(radius, 0.65, 12, 80);
      const rMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      });
      const rMesh = new THREE.Mesh(rGeo, rMat);
      rMesh.rotation.x = rotX;
      rMesh.rotation.y = rotY;
      heroOrbGroup.add(rMesh);
      return rMesh;
    };

    const ringA = createOrbRing(40, "#A855F7", Math.PI / 3, Math.PI / 6);
    const ringB = createOrbRing(46, "#06B6D4", -Math.PI / 4, Math.PI / 4);
    const ringC = createOrbRing(52, "#38BDF8", Math.PI / 2, 0);

    // =========================================================================
    // 5. LAYER 4: AUXILIARY FLOATING ENERGY SPHERES (DEPTH MULTI-PLANE)
    // =========================================================================
    interface FloatingOrb {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
      floatPhase: number;
      orbitRadius: number;
    }

    const floatingOrbs: FloatingOrb[] = [];
    const orbColors = ["#8B5CF6", "#38BDF8", "#D946EF", "#06B6D4"];

    for (let o = 0; o < 6; o++) {
      const radius = Math.random() * 5 + 3.5;
      const oGeo = new THREE.SphereGeometry(radius, 16, 16);
      const orbColorHex = orbColors[o % orbColors.length];
      const oMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(orbColorHex),
        emissive: new THREE.Color(orbColorHex),
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.6,
        roughness: 0.1,
        transmission: 0.7,
        ior: 1.3,
      });
      const oMesh = new THREE.Mesh(oGeo, oMat);

      const bx = (Math.random() - 0.5) * 600;
      const by = Math.random() * 140 - 10;
      const bz = (Math.random() - 0.5) * 350 - 40;

      oMesh.position.set(bx, by, bz);
      scene.add(oMesh);

      floatingOrbs.push({
        mesh: oMesh,
        baseX: bx,
        baseY: by,
        baseZ: bz,
        speed: Math.random() * 0.35 + 0.25,
        floatPhase: Math.random() * Math.PI * 2,
        orbitRadius: Math.random() * 20 + 8,
      });
    }

    // =========================================================================
    // 6. AMBIENT MICRO-SPARKLE DUST FIELD (LAYER 5)
    // =========================================================================
    const sparkCount = 80;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkColors = new Float32Array(sparkCount * 3);

    for (let sp = 0; sp < sparkCount; sp++) {
      sparkPositions[sp * 3] = (Math.random() - 0.5) * 1000;
      sparkPositions[sp * 3 + 1] = Math.random() * 240 - 30;
      sparkPositions[sp * 3 + 2] = (Math.random() - 0.5) * 600;

      const isCyan = Math.random() > 0.45;
      const sColor = isCyan ? colorNeonBlue : colorMagenta;
      sparkColors[sp * 3] = sColor.r;
      sparkColors[sp * 3 + 1] = sColor.g;
      sparkColors[sp * 3 + 2] = sColor.b;
    }

    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
    sparkGeo.setAttribute("color", new THREE.BufferAttribute(sparkColors, 3));

    const sparkMat = new THREE.PointsMaterial({
      size: 8,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.8,
    });

    const sparkParticles = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkParticles);

    // =========================================================================
    // 7. MOUSE DAMPING & PARALLAX
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onPointerMove = (e: MouseEvent) => {
      mouseX = e.clientX - windowHalfX;
      mouseY = e.clientY - windowHalfY;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // =========================================================================
    // 8. RESIZE LISTENER
    // =========================================================================
    const onWindowResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onWindowResize);

    // =========================================================================
    // 9. 60 FPS MULTI-HARMONIC ANIMATION LOOP
    // =========================================================================
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;
      camera.position.x = -50 + targetX * 0.12;
      camera.position.y = 95 + -targetY * 0.08;
      camera.lookAt(0, 25, 0);

      // Fast, vectorized wave math
      const posArray = waveGeometry.attributes.position.array as Float32Array;
      let idx = 0;

      for (let ix = 0; ix < AMOUNT_X; ix++) {
        const u = ix * 0.16;
        for (let iy = 0; iy < AMOUNT_Y; iy++) {
          const v = iy * 0.24;
          const t = elapsedTime * 0.85;

          posArray[idx + 1] =
            Math.sin(u + t * 1.1) * 42 +
            Math.cos(v + t * 0.9) * 36 +
            Math.sin((u + v) * 0.5 + t * 0.7) * 24;

          idx += 3;
        }
      }
      waveGeometry.attributes.position.needsUpdate = true;

      // Hero Holographic Core
      const heroPulse = 1 + Math.sin(elapsedTime * 1.5) * 0.04;
      heroCoreMesh.scale.set(heroPulse, heroPulse, heroPulse);
      heroCoreMesh.rotation.y = elapsedTime * 0.3;
      heroCoreMesh.rotation.x = elapsedTime * 0.15;

      heroShellMesh.rotation.y = -elapsedTime * 0.2;
      heroShellMesh.rotation.z = elapsedTime * 0.25;

      ringA.rotation.z = elapsedTime * 0.4;
      ringB.rotation.z = -elapsedTime * 0.35;
      ringC.rotation.x = Math.PI / 2 + Math.sin(elapsedTime * 0.8) * 0.15;
      ringC.rotation.z = elapsedTime * 0.2;

      heroOrbGroup.position.y = 75 + Math.sin(elapsedTime * 0.75) * 6;

      // Auxiliary Floating Orbs
      floatingOrbs.forEach((orb) => {
        const ot = elapsedTime * orb.speed + orb.floatPhase;
        orb.mesh.position.y = orb.baseY + Math.sin(ot) * 12;
        orb.mesh.position.x = orb.baseX + Math.cos(ot * 0.7) * orb.orbitRadius;
      });

      // Ambient Sparkles
      const sparkPosArray = sparkGeo.attributes.position.array as Float32Array;
      for (let s = 0; s < sparkCount; s++) {
        sparkPosArray[s * 3 + 1] += Math.sin(elapsedTime * 0.8 + s) * 0.25;
      }
      sparkGeo.attributes.position.needsUpdate = true;

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
      waveGeometry.dispose();
      waveMaterial.dispose();
      particleTexture.dispose();
      heroCoreGeo.dispose();
      heroCoreMat.dispose();
      heroShellGeo.dispose();
      heroShellMat.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-100 mix-blend-screen select-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
