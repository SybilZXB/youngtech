"use client";

import { useRef, useMemo, type MutableRefObject } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars, Line } from "@react-three/drei";
import * as THREE from "three";

const R = 1.6; // globe radius

// lat/long → 3D point on sphere
function latLngToVec3(lat: number, lng: number, radius = R) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

const LOCATIONS = [
  { name: "Himalaya", lat: 27.99, lng: 86.93, hub: true },
  { name: "Andes", lat: -32.65, lng: -70.01 },
  { name: "Alaska", lat: 63.07, lng: -151.0 },
  { name: "Antarctica", lat: -78.5, lng: -85.6 },
  { name: "Alps", lat: 45.83, lng: 6.86 },
  { name: "Kilimanjaro", lat: -3.07, lng: 37.35 },
];

const ICE = "#9BD4F5";
const BLUE = "#3A93D8";

// great-circle-ish arc between two points, bowed outward
function arcPoints(a: THREE.Vector3, b: THREE.Vector3) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const lift = 1 + 0.35 * (a.distanceTo(b) / (2 * R));
  mid.normalize().multiplyScalar(R * lift);
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  return curve.getPoints(40);
}

function Earth() {
  const tex = useLoader(THREE.TextureLoader, "/textures/earth_day.jpg");
  return (
    <mesh>
      <sphereGeometry args={[R, 64, 64]} />
      <meshStandardMaterial map={tex} roughness={1} metalness={0} />
    </mesh>
  );
}

function Atmosphere() {
  return (
    <mesh scale={1.18}>
      <sphereGeometry args={[R, 48, 48]} />
      <shaderMaterial
        transparent
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        uniforms={{ uColor: { value: new THREE.Color(BLUE) } }}
        vertexShader={`
          varying vec3 vN;
          void main(){
            vN = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }`}
        fragmentShader={`
          varying vec3 vN;
          uniform vec3 uColor;
          void main(){
            float i = pow(0.75 - dot(vN, vec3(0.0,0.0,1.0)), 3.0);
            gl_FragColor = vec4(uColor, 1.0) * i;
          }`}
      />
    </mesh>
  );
}

function Markers() {
  return (
    <>
      {LOCATIONS.map((loc) => {
        const p = latLngToVec3(loc.lat, loc.lng, R * 1.01);
        return (
          <group key={loc.name} position={p}>
            <mesh>
              <sphereGeometry args={[loc.hub ? 0.035 : 0.025, 16, 16]} />
              <meshBasicMaterial color={loc.hub ? ICE : "#ffffff"} />
            </mesh>
            {/* glow ring */}
            <mesh>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color={ICE} transparent opacity={0.18} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function Arcs() {
  const hub = LOCATIONS.find((l) => l.hub)!;
  const hubV = latLngToVec3(hub.lat, hub.lng);
  return (
    <>
      {LOCATIONS.filter((l) => !l.hub).map((loc) => {
        const pts = arcPoints(hubV, latLngToVec3(loc.lat, loc.lng));
        return <Line key={loc.name} points={pts} color={ICE} lineWidth={1} transparent opacity={0.5} />;
      })}
    </>
  );
}

function Satellite({ radius, speed, tilt, phase }: { radius: number; speed: number; tilt: number; phase: number }) {
  const ref = useRef<THREE.Group>(null);
  const ringPts = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 90; i++) {
      const a = (i / 90) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return pts;
  }, [radius]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    ref.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <Line points={ringPts} color={BLUE} lineWidth={1} transparent opacity={0.22} />
      <group ref={ref}>
        <mesh>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshBasicMaterial color={ICE} />
        </mesh>
      </group>
    </group>
  );
}

function Scene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const root = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!root.current) return;
    // continuous slow spin + scroll-driven extra rotation
    root.current.rotation.y += delta * 0.08;
    const p = progressRef.current; // 0..1 over the whole mission
    // tilt the globe slightly as we ascend into the finale
    root.current.rotation.x = THREE.MathUtils.lerp(0.15, 0.42, Math.min(1, Math.max(0, (p - 0.7) / 0.3)));
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 2, 4]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-4, -1, -2]} intensity={0.4} color={BLUE} />
      <Stars radius={50} depth={30} count={1400} factor={3} saturation={0} fade speed={0.5} />
      <group ref={root}>
        <Earth />
        <Atmosphere />
        <Markers />
        <Arcs />
      </group>
      <Satellite radius={2.5} speed={0.35} tilt={0.5} phase={0} />
      <Satellite radius={2.9} speed={0.26} tilt={-0.7} phase={2.1} />
    </>
  );
}

export default function Globe({ progressRef }: { progressRef: MutableRefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false }}
      dpr={1}
      frameloop="always"
      onCreated={({ gl }) => {
        // recover gracefully if the GPU drops the context
        const canvas = gl.domElement;
        canvas.addEventListener("webglcontextlost", (e) => e.preventDefault(), false);
      }}
    >
      <Scene progressRef={progressRef} />
    </Canvas>
  );
}
