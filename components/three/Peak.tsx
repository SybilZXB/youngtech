"use client";

import { useRef, useMemo, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

const ICE = "#9BD4F5";

/**
 * Stylised low-poly sacred peak (Kailash-inspired) — pure geometry, no textures,
 * so it stays razor-sharp at any resolution and on software WebGL.
 * Faceted snow/rock body + glacier-blue topo wireframe + alpine night fog.
 */
function buildPeakGeometry() {
  const g = new THREE.ConeGeometry(1.85, 2.9, 7, 16, false);
  const pos = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  const H = 2.9;
  const apexY = H / 2;

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const h = (v.y + apexY) / H; // 0 base → 1 apex
    const ang = Math.atan2(v.z, v.x);
    // layered ridge noise — stronger toward the base, calmer near the summit
    const ridge =
      Math.sin(ang * 5) * 0.16 +
      Math.sin(ang * 11 + 1.3) * 0.09 +
      Math.sin(ang * 19 + 0.6) * 0.045 +
      Math.sin(v.y * 6.0) * 0.05;
    const amp = (1 - h) * 0.9 + 0.08;
    const radial = new THREE.Vector3(v.x, 0, v.z);
    if (radial.lengthSq() > 0.0001) {
      radial.normalize().multiplyScalar(ridge * amp);
      v.x += radial.x;
      v.z += radial.z;
    }
    v.y += Math.sin(ang * 8 + v.y * 3) * 0.03 * (1 - h);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();

  // height-based vertex colours: slate rock → cool grey → snow
  const rock = new THREE.Color("#4f6170");
  const grey = new THREE.Color("#93a6b3");
  const snow = new THREE.Color("#eef5fb");
  const colors: number[] = [];
  for (let i = 0; i < pos.count; i++) {
    const h = (pos.getY(i) + apexY) / H;
    const c = new THREE.Color();
    if (h > 0.58) {
      const t = Math.min(1, (h - 0.58) / 0.42);
      c.copy(grey).lerp(snow, t);
    } else {
      const t = h / 0.58;
      c.copy(rock).lerp(grey, t);
    }
    colors.push(c.r, c.g, c.b);
  }
  g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  return g;
}

function Peak3D({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const geo = useMemo(buildPeakGeometry, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.07;
    const p = progressRef.current;
    group.current.rotation.x = THREE.MathUtils.lerp(0.02, 0.16, Math.min(1, Math.max(0, (p - 0.7) / 0.3)));
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      {/* faceted body */}
      <mesh geometry={geo}>
        <meshStandardMaterial vertexColors flatShading roughness={0.92} metalness={0.04} />
      </mesh>
      {/* topo wireframe — tech / design layer */}
      <mesh geometry={geo} scale={1.004}>
        <meshBasicMaterial color={ICE} wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Scene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  return (
    <>
      <fog attach="fog" args={["#0a1622", 4.2, 10.5]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[-4, 5, 3]} intensity={2.4} color="#eaf4ff" />
      <directionalLight position={[5, 1, -2]} intensity={0.6} color={ICE} />
      <Stars radius={50} depth={28} count={900} factor={2.6} saturation={0} fade speed={0.4} />
      <Peak3D progressRef={progressRef} />
    </>
  );
}

export default function Peak({ progressRef }: { progressRef: MutableRefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.2], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false }}
      dpr={1}
      frameloop="always"
      onCreated={({ gl, camera }) => {
        camera.lookAt(0, 0.1, 0);
        gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault(), false);
      }}
    >
      <Scene progressRef={progressRef} />
    </Canvas>
  );
}
