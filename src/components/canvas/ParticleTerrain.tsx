"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AMOUNT_X = 200;
const AMOUNT_Y = 200;

export function ParticleTerrain() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, uvs] = useMemo(() => {
    const numParticles = AMOUNT_X * AMOUNT_Y;
    const pos = new Float32Array(numParticles * 3);
    const uv = new Float32Array(numParticles * 2);

    let i = 0;
    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        // Wide grid spanning the whole screen horizontally and deeply into the Z axis
        pos[i * 3] = (ix / AMOUNT_X - 0.5) * 120; // X spread
        pos[i * 3 + 1] = 0; // Y driven by vertex shader
        pos[i * 3 + 2] = (iy / AMOUNT_Y - 0.5) * 120; // Z depth

        uv[i * 2] = ix / AMOUNT_X;
        uv[i * 2 + 1] = iy / AMOUNT_Y;
        
        i++;
      }
    }

    return [pos, uv];
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color("#1D7CFF") }, // Electric Blue
    uColorB: { value: new THREE.Color("#8B5CF6") }, // Deep Purple
    uColorC: { value: new THREE.Color("#00D8FF") }  // Cyan Highlights
  }), []);

  useFrame((state) => {
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <points ref={pointsRef} position={[0, -10, -15]} rotation={[0.2, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-uv" args={[uvs, 2]} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          
          // Simplex Noise (2D)
          vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
          float snoise(vec2 v){
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod(i, 289.0);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
              dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }

          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // 3 Layers of organic noise for "Neural Ocean" effect
            float noise1 = snoise(pos.xz * 0.03 + uTime * 0.2) * 3.0;
            float noise2 = snoise(pos.xz * 0.1 - uTime * 0.4) * 1.0;
            float noise3 = snoise(pos.xz * 0.01 + uTime * 0.1) * 5.0; // Deep swells
            
            float elevation = noise1 + noise2 + noise3;
            pos.y += elevation;
            vElevation = elevation;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            // Perspective size attenuation (bigger when close, smaller when far)
            gl_PointSize = (120.0 / -mvPosition.z) * (1.0 + (elevation * 0.1));
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform vec3 uColorC;
          varying vec2 vUv;
          varying float vElevation;

          void main() {
            // Soft circular particle
            vec2 xy = gl_PointCoord.xy - vec2(0.5);
            float ll = length(xy);
            if(ll > 0.5) discard;
            float alpha = (0.5 - ll) * 2.0;
            
            // Map elevation to color (Deep purple valleys, Electric Blue peaks, Cyan crests)
            float mixRatio = smoothstep(-4.0, 4.0, vElevation);
            vec3 color = mix(uColorB, uColorA, mixRatio);
            
            // Add ultra-bright cyan highlights on the very highest peaks
            float highlight = smoothstep(0.7, 1.0, mixRatio);
            color = mix(color, uColorC, highlight);
            
            // 400% Brightness multiplier
            color *= 3.0;

            // Fade edges of the entire grid out to black smoothly
            float edgeFadeX = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
            float edgeFadeY = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
            float globalAlpha = edgeFadeX * edgeFadeY * alpha;

            gl_FragColor = vec4(color, globalAlpha);
          }
        `}
      />
    </points>
  );
}
