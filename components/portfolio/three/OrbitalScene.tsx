"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { MathUtils, type Group, type Points } from "three";

function Sculpture({
  mobile,
  animated,
}: {
  mobile: boolean;
  animated: boolean;
}) {
  const group = useRef<Group>(null);
  const time = useRef(0);
  useFrame(({ pointer }, delta) => {
    if (!group.current || !animated) return;
    const step = Math.min(delta, 0.04);
    time.current += step;
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      Math.sin(time.current * 0.16) * 0.25 + pointer.x * 0.12,
      2,
      step,
    );
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      Math.cos(time.current * 0.13) * 0.09 - pointer.y * 0.08,
      2,
      step,
    );
    group.current.position.y = Math.sin(time.current * 0.45) * 0.075;
    group.current.rotation.z = Math.sin(time.current * 0.12) * 0.06;
  });
  return (
    <group ref={group} rotation={[0.04, 0.1, -0.08]}>
      <mesh rotation={[0.87, -0.46, -0.42]}>
        <torusGeometry
          args={[1.4, 0.34, mobile ? 18 : 40, mobile ? 76 : 160]}
        />
        <meshPhysicalMaterial
          color="#bdc9ec"
          metalness={1}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.12}
          envMapIntensity={1.65}
        />
      </mesh>
      <mesh rotation={[0.28, 1.12, 0.7]}>
        <torusGeometry
          args={[1.26, 0.13, mobile ? 12 : 28, mobile ? 68 : 128]}
        />
        <meshPhysicalMaterial
          color="#99a9df"
          metalness={0.96}
          roughness={0.18}
          clearcoat={1}
          envMapIntensity={1.9}
        />
      </mesh>
      <mesh position={[0, 0, -0.12]}>
        <sphereGeometry args={[0.93, mobile ? 28 : 56, mobile ? 20 : 40]} />
        <meshPhysicalMaterial
          color={mobile ? "#7788cd" : "#aebbea"}
          roughness={mobile ? 0.22 : 0.07}
          metalness={mobile ? 0.8 : 0.12}
          transmission={mobile ? 0 : 0.94}
          thickness={1.8}
          ior={1.35}
          clearcoat={1}
          envMapIntensity={1.6}
          iridescence={0.8}
          iridescenceIOR={1.3}
        />
      </mesh>
      <mesh rotation={[0.76, 0.1, -0.61]}>
        <torusGeometry args={[2.05, 0.008, 8, mobile ? 80 : 160]} />
        <meshBasicMaterial color="#7d91d2" transparent opacity={0.48} />
      </mesh>
      {!mobile && (
        <mesh rotation={[1.5, -0.5, 0.8]}>
          <torusGeometry args={[1.92, 0.005, 6, 120]} />
          <meshBasicMaterial color="#a6b2d4" transparent opacity={0.3} />
        </mesh>
      )}
      <mesh position={[1.84, 0.87, 0.1]}>
        <sphereGeometry args={[0.095, 16, 12]} />
        <meshStandardMaterial
          color="#c6d2f5"
          metalness={1}
          roughness={0.15}
          envMapIntensity={2}
        />
      </mesh>
      <mesh position={[-1.69, -1.01, 0.6]}>
        <sphereGeometry args={[0.055, 12, 10]} />
        <meshStandardMaterial color="#b1a0e6" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Starfield({
  mobile,
  animated,
}: {
  mobile: boolean;
  animated: boolean;
}) {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const count = mobile ? 36 : 84;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = i * 2.39996323;
      const radius = 1.9 + ((i * 37) % 101) / 35;
      data[i * 3] = Math.cos(angle) * radius;
      data[i * 3 + 1] = Math.sin(angle) * radius * 0.85;
      data[i * 3 + 2] = -2 - ((i * 13) % 37) / 12;
    }
    return data;
  }, [mobile]);
  useFrame((_, delta) => {
    if (ref.current && animated)
      ref.current.rotation.z += Math.min(delta, 0.04) * 0.009;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a5b9ff"
        size={mobile ? 0.014 : 0.018}
        transparent
        opacity={0.58}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function OrbitalScene({
  isMobile,
  animated,
  onReady,
  onFailure,
  cosmicOnly = false,
}: {
  isMobile: boolean;
  animated: boolean;
  onReady: () => void;
  onFailure: () => void;
  cosmicOnly?: boolean;
}) {
  return (
    <Canvas
      className="orbital-canvas"
      aria-hidden="true"
      camera={{ position: [0, 0, 6.65], fov: 43, near: 0.1, far: 30 }}
      dpr={isMobile ? [1, 1.25] : [1, 1.6]}
      frameloop={animated ? "always" : "demand"}
      gl={{
        alpha: true,
        antialias: !isMobile,
        powerPreference: isMobile ? "low-power" : "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onFailure, {
          once: true,
        });
        onReady();
      }}
      fallback={null}
    >
      <Suspense fallback={null}>
        {/* Local Lightformer environment adapted from upstream; no HDR/CDN. */}
        {!cosmicOnly && (
          <Environment resolution={isMobile ? 64 : 128} frames={1}>
            <Lightformer
              intensity={3.5}
              color="#e6edff"
              position={[-3, 4, 3]}
              rotation={[0, Math.PI / 4, 0]}
              scale={[3, 7, 1]}
            />
            <Lightformer
              intensity={2}
              color="#ffffff"
              position={[3, 2, 2]}
              rotation={[0, -Math.PI / 3, 0]}
              scale={[1.5, 6, 1]}
            />
            <Lightformer
              intensity={2.5}
              color="#5375f4"
              position={[1, -3, 2]}
              rotation={[Math.PI / 3, 0, 0]}
              scale={[6, 2, 1]}
            />
            <Lightformer
              intensity={2}
              color="#a18bff"
              position={[-4, 1, -2]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[4, 5, 1]}
            />
            <Lightformer
              intensity={1.5}
              color="#ffffff"
              position={[0, 4, -3]}
              rotation={[Math.PI / 4, 0, 0]}
              scale={[5, 2, 1]}
            />
          </Environment>
        )}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[-3, 5, 5]}
          intensity={2.7}
          color="#e3eaff"
        />
        <pointLight position={[3, -2, 2]} intensity={16} color="#4267ff" />
        <pointLight position={[-3, 1, -2]} intensity={12} color="#8a5fff" />
        <Starfield mobile={isMobile} animated={animated} />
        {!cosmicOnly && <Sculpture mobile={isMobile} animated={animated} />}
      </Suspense>
    </Canvas>
  );
}
