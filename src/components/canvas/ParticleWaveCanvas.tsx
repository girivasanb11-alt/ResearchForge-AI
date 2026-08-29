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
    // Deep obsidian/navy cosmic fog matching Layer 1 & 2
    scene.fog = new THREE.FogExp2(0x030712, 0.001);

    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 3000);
    // Positioned to view the sweeping wave rising from bottom-left to center-right
    camera.position.set(-60, 85, 300);
    camera.lookAt(15, 20, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // =========================================================================
    // 2. CINEMATIC LIGHTING
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.5);
    scene.add(ambientLight);

    // Electric purple light from left
    const purpleLight = new THREE.PointLight(0x8b5cf6, 6, 800);
    purpleLight.position.set(-140, 160, 60);
    scene.add(purpleLight);

    // Neon cyan light from right
    const cyanLight = new THREE.PointLight(0x38bdf8, 6, 800);
    cyanLight.position.set(160, 120, 60);
    scene.add(cyanLight);

    // Magenta backlight for volumetric feel
    const magentaLight = new THREE.PointLight(0xd946ef, 3, 500);
    magentaLight.position.set(0, -30, 120);
    scene.add(magentaLight);

    // =========================================================================
    // 3. LAYER 3: 3D PARTICLE WAVE OCEAN (9,600 GPU PARTICLES)
    // =========================================================================
    const AMOUNT_X = 120;
    const AMOUNT_Y = 80;
    const SEPARATION_X = 16;
    const SEPARATION_Y = 16;
    const numWaveParticles = AMOUNT_X * AMOUNT_Y;

    const wavePositions = new Float32Array(numWaveParticles * 3);
    const waveScales = new Float32Array(numWaveParticles);
    const waveColors = new Float32Array(numWaveParticles * 3);
    const initialBaseX = new Float32Array(numWaveParticles);
    const initialBaseZ = new Float32Array(numWaveParticles);

    // Exact reference palette
    const colorViolet = new THREE.Color("#8B5CF6");    // Electric Violet
    const colorDeepPurple = new THREE.Color("#7C3AED"); // Deep Purple
    const colorNeonBlue = new THREE.Color("#38BDF8");   // Neon Blue
    const colorCyan = new THREE.Color("#22D3EE");       // Cyan
    const colorMagenta = new THREE.Color("#D946EF");    // Magenta
    const tempColor = new THREE.Color();

    let pIdx = 0;
    let sIdx = 0;
    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        // Position grid
        const xPos = ix * SEPARATION_X - (AMOUNT_X * SEPARATION_X) / 1.7;
        const zPos = iy * SEPARATION_Y - (AMOUNT_Y * SEPARATION_Y) / 2.0;

        wavePositions[pIdx] = xPos;
        wavePositions[pIdx + 1] = 0;
        wavePositions[pIdx + 2] = zPos;

        initialBaseX[sIdx] = xPos;
        initialBaseZ[sIdx] = zPos;
        waveScales[sIdx] = Math.random() * 2.2 + 3.2;

        // X-axis interpolation: Magenta -> Deep Purple -> Neon Blue
        const u = ix / AMOUNT_X;
        
        if (u < 0.5) {
          // Left to center: Magenta to Deep Purple
          tempColor.copy(colorMagenta).lerp(colorDeepPurple, u * 2.0);
        } else {
          // Center to right: Deep Purple to Neon Blue
          tempColor.copy(colorDeepPurple).lerp(colorNeonBlue, (u - 0.5) * 2.0);
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
        radGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.6)");
        radGrad.addColorStop(0.8, "rgba(56, 189, 248, 0.2)");
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(c);
    };

    const particleTexture = createGlowTexture();

    const waveMaterial = new THREE.PointsMaterial({
      size: 5.8,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.95,
    });

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    scene.add(wavePoints);

    // =========================================================================
    // 4. LAYER 4: HERO HOLOGRAPHIC ORB (UPPER-RIGHT QUADRANT POSITION)
    // =========================================================================
    const heroOrbGroup = new THREE.Group();
    // Centered orb directly in the top middle
    heroOrbGroup.position.set(0, 95, 10);
    scene.add(heroOrbGroup);

    // Inner Radiant Pulsing Core
    const heroCoreGeo = new THREE.SphereGeometry(30, 64, 64);
    const heroCoreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#7C3AED"),
      emissive: new THREE.Color("#8B5CF6"),
      emissiveIntensity: 0.95,
      roughness: 0.1,
      metalness: 0.85,
    });
    const heroCoreMesh = new THREE.Mesh(heroCoreGeo, heroCoreMat);
    heroOrbGroup.add(heroCoreMesh);

    // Outer Glass Refraction Shell
    const heroShellGeo = new THREE.SphereGeometry(33, 64, 64);
    const heroShellMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#38BDF8"),
      emissive: new THREE.Color("#0284C7"),
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.46,
      roughness: 0.05,
      metalness: 0.15,
      transmission: 0.94,
      ior: 1.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      wireframe: false,
    });
    const heroShellMesh = new THREE.Mesh(heroShellGeo, heroShellMat);
    heroOrbGroup.add(heroShellMesh);

    // =========================================================================
    // 5. LAYER 4: DYNAMIC FLOATING SPHERES (MATCHING IMAGE PLACEMENT)
    // =========================================================================
    interface FloatingSphere {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
      floatPhase: number;
      radiusY: number;
    }

    const floatingSpheres: FloatingSphere[] = [];

    const createFloatingSphere = (size: number, colorHex: string, bx: number, by: number, bz: number, speed: number) => {
      const sGeo = new THREE.SphereGeometry(size, 24, 24);
      const sMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(colorHex),
        emissive: new THREE.Color(colorHex),
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.65,
        roughness: 0.1,
        transmission: 0.8,
        ior: 1.35,
      });
      const sMesh = new THREE.Mesh(sGeo, sMat);
      sMesh.position.set(bx, by, bz);
      scene.add(sMesh);

      floatingSpheres.push({
        mesh: sMesh,
        baseX: bx,
        baseY: by,
        baseZ: bz,
        speed,
        floatPhase: Math.random() * Math.PI * 2,
        radiusY: Math.random() * 12 + 6,
      });
    };

    // Medium magenta orb floating ominously in mid-left
    createFloatingSphere(9, "#D946EF", -140, 70, -20, 0.45);
    // Small violet orb floating far top-left
    createFloatingSphere(5, "#8B5CF6", -180, 140, -60, 0.38);
    // Medium cyan orb floating on upper-right
    createFloatingSphere(8, "#38BDF8", 150, 90, -40, 0.32);

    // =========================================================================
    // 6. AMBIENT MICRO-PARTICLES (LAYER 5)
    // =========================================================================
    const sparkCount = 120;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkColors = new Float32Array(sparkCount * 3);

    for (let sp = 0; sp < sparkCount; sp++) {
      sparkPositions[sp * 3] = (Math.random() - 0.5) * 1100;
      sparkPositions[sp * 3 + 1] = Math.random() * 260 - 30;
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
      size: 7,
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
    // 7. MOUSE PARALLAX & DAMPING
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
    // 9. ANIMATION LOOP
    // =========================================================================
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;
      camera.position.x = -60 + targetX * 0.12;
      camera.position.y = 85 + -targetY * 0.08;
      camera.lookAt(15, 20, 0);

      // Fast, vectorized wave math
      const posArray = waveGeometry.attributes.position.array as Float32Array;
      let idx = 0;

      for (let ix = 0; ix < AMOUNT_X; ix++) {
        const u = ix * 0.15;
        for (let iy = 0; iy < AMOUNT_Y; iy++) {
          const v = iy * 0.22;
          const t = elapsedTime * 0.9;

          posArray[idx + 1] =
            Math.sin(u + t * 1.15) * 44 +
            Math.cos(v + t * 0.95) * 36 +
            Math.sin((u + v) * 0.5 + t * 0.7) * 24;

          idx += 3;
        }
      }
      waveGeometry.attributes.position.needsUpdate = true;

      // Hero Holographic Core
      const heroPulse = 1 + Math.sin(elapsedTime * 1.55) * 0.04;
      heroCoreMesh.scale.set(heroPulse, heroPulse, heroPulse);
      heroCoreMesh.rotation.y = elapsedTime * 0.32;
      heroCoreMesh.rotation.x = elapsedTime * 0.16;

      heroShellMesh.rotation.y = -elapsedTime * 0.22;
      heroShellMesh.rotation.z = elapsedTime * 0.26;

      heroOrbGroup.position.y = 95 + Math.sin(elapsedTime * 0.75) * 6;

      // Floating auxiliary spheres
      floatingSpheres.forEach((sphere) => {
        const st = elapsedTime * sphere.speed + sphere.floatPhase;
        sphere.mesh.position.y = sphere.baseY + Math.sin(st) * sphere.radiusY;
        sphere.mesh.position.x = sphere.baseX + Math.cos(st * 0.6) * 12;
      });

      // Ambient Sparkles
      const sparkPosArray = sparkGeo.attributes.position.array as Float32Array;
      for (let s = 0; s < sparkCount; s++) {
        sparkPosArray[s * 3 + 1] += Math.sin(elapsedTime * 0.8 + s) * 0.22;
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
