"use client";

/* eslint-disable react/no-unknown-property */
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, useFBO, useTexture } from "@react-three/drei";

export type GlassWebglCrop = {
  x: number;
  y: number;
  w: number;
  h: number;
  boundsW: number;
  boundsH: number;
};

/** WebGL 玻璃几何形态 */
export type WebglGlassShape = "lens" | "square" | "sphere-fill";

export type GlassWebglCanvasProps = {
  backgroundSrc: string;
  crop: GlassWebglCrop;
  shape?: WebglGlassShape;
};

function BackgroundPlane({ src, crop }: { src: string; crop: GlassWebglCrop }) {
  const tex = useTexture(src);
  useLayoutEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
  }, [tex]);

  useLayoutEffect(() => {
    if (crop.boundsW <= 0 || crop.boundsH <= 0) return;
    tex.repeat.set(crop.w / crop.boundsW, crop.h / crop.boundsH);
    tex.offset.set(crop.x / crop.boundsW, 1 - (crop.y + crop.h) / crop.boundsH);
    tex.needsUpdate = true;
  }, [tex, crop]);

  return (
    <mesh scale={[3.4, 3.4, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} />
    </mesh>
  );
}

function TransmissionGlass({
  buffer,
  ior = 1.18,
  thickness = 2.2,
}: {
  buffer: THREE.WebGLRenderTarget;
  ior?: number;
  thickness?: number;
}) {
  return (
    <MeshTransmissionMaterial
      buffer={buffer.texture}
      ior={ior}
      thickness={thickness}
      anisotropy={0.12}
      chromaticAberration={0.06}
      roughness={0.05}
      transmission={1}
      backside
      samples={4}
      resolution={256}
    />
  );
}

/** 中心小透镜（原 Fluid Glass 轻量版） */
function LensGlass({ buffer }: { buffer: THREE.WebGLRenderTarget }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const target = Math.sin(Date.now() * 0.0005) * 0.06;
    mesh.rotation.z += (target - mesh.rotation.z) * Math.min(1, delta * 5);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.55]} scale={viewport.width * 0.2}>
      <sphereGeometry args={[1, 48, 48]} />
      <TransmissionGlass buffer={buffer} />
    </mesh>
  );
}

/** 整块方玻璃：薄盒铺满可视区 */
function SquareGlass({ buffer }: { buffer: THREE.WebGLRenderTarget }) {
  const { viewport } = useThree();
  const pad = 0.96;

  return (
    <mesh
      position={[0, 0, 0.5]}
      scale={[viewport.width * pad, viewport.height * pad, 0.14]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <TransmissionGlass buffer={buffer} thickness={1.4} ior={1.15} />
    </mesh>
  );
}

/** 球体放大至几乎铺满面板 */
function SphereFillGlass({ buffer }: { buffer: THREE.WebGLRenderTarget }) {
  const { viewport } = useThree();
  const diameter = Math.min(viewport.width, viewport.height) * 0.94;

  return (
    <mesh position={[0, 0, 0.52]} scale={diameter * 0.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <TransmissionGlass buffer={buffer} thickness={3} ior={1.2} />
    </mesh>
  );
}

function GlassMesh({
  shape,
  buffer,
}: {
  shape: WebglGlassShape;
  buffer: THREE.WebGLRenderTarget;
}) {
  switch (shape) {
    case "square":
      return <SquareGlass buffer={buffer} />;
    case "sphere-fill":
      return <SphereFillGlass buffer={buffer} />;
    default:
      return <LensGlass buffer={buffer} />;
  }
}

function Scene({
  src,
  crop,
  shape,
}: {
  src: string;
  crop: GlassWebglCrop;
  shape: WebglGlassShape;
}) {
  const buffer = useFBO(256, 256);
  const bgScene = useMemo(() => new THREE.Scene(), []);
  const { gl, camera } = useThree();

  useFrame(() => {
    gl.setRenderTarget(buffer);
    gl.clear();
    gl.render(bgScene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(<BackgroundPlane src={src} crop={crop} />, bgScene)}
      <GlassMesh shape={shape} buffer={buffer} />
    </>
  );
}

export function GlassWebglCanvas({
  backgroundSrc,
  crop,
  shape = "lens",
}: GlassWebglCanvasProps) {
  return (
    <Canvas
      className="h-full w-full bg-transparent"
      camera={{ position: [0, 0, 2.6], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <Scene src={backgroundSrc} crop={crop} shape={shape} />
    </Canvas>
  );
}
