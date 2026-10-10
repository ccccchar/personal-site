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
  /** 采样区域在导航条内的起点（0 = 顶边，1 = 底边） */
  bandTop?: number;
  /** 采样区域占导航条高度的比例 */
  bandHeight?: number;
};

/** WebGL 玻璃几何形态 */
export type WebglGlassShape =
  | "lens"
  | "square"
  | "sphere-fill"
  | "nav-lens";

export type GlassWebglCanvasProps = {
  /** 演示/实验室用静态图 */
  backgroundSrc?: string;
  /** 顶栏：捕获 #site-main 的 canvas（与 backgroundSrc 二选一） */
  captureCanvas?: HTMLCanvasElement;
  crop: GlassWebglCrop;
  shape?: WebglGlassShape;
  /** 顶栏条带 UV（与 shape=nav-lens 联用） */
  navMode?: boolean;
};

function applyCropToTexture(tex: THREE.Texture, crop: GlassWebglCrop) {
  if (crop.boundsW <= 0 || crop.boundsH <= 0) return;
  tex.repeat.set(crop.w / crop.boundsW, crop.h / crop.boundsH);
  tex.offset.set(
    crop.x / crop.boundsW,
    1 - (crop.y + crop.h) / crop.boundsH,
  );
  tex.needsUpdate = true;
}

function BackgroundPlane({
  src,
  crop,
  navMode,
}: {
  src: string;
  crop: GlassWebglCrop;
  navMode?: boolean;
}) {
  const tex = useTexture(src);
  useLayoutEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
  }, [tex]);

  useLayoutEffect(() => {
    applyCropToTexture(tex, crop);
  }, [tex, crop]);

  const bgScale = navMode ? 6 : 3.4;

  return (
    <mesh scale={[bgScale, bgScale, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} />
    </mesh>
  );
}

function BackgroundFromCapture({
  source,
  crop,
  navMode,
}: {
  source: HTMLCanvasElement;
  crop: GlassWebglCrop;
  navMode?: boolean;
}) {
  const tex = useMemo(() => {
    const t = new THREE.CanvasTexture(source);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }, [source]);

  useLayoutEffect(() => {
    tex.image = source;
    applyCropToTexture(tex, crop);
  }, [source, crop, tex]);

  useFrame(() => {
    tex.needsUpdate = true;
  });

  const bgScale = navMode ? 6 : 3.4;

  return (
    <mesh scale={[bgScale, bgScale, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
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

/** 顶栏：正面平面铺满 canvas（避免扁盒只看到一条侧棱） */
function NavBarPlaneGlass({ buffer }: { buffer: THREE.WebGLRenderTarget }) {
  const { viewport } = useThree();

  return (
    <mesh position={[0, 0, 0.45]}>
      <planeGeometry args={[viewport.width * 1.02, viewport.height * 1.05]} />
      <MeshTransmissionMaterial
        buffer={buffer.texture}
        ior={1.18}
        thickness={1.8}
        anisotropy={0.1}
        chromaticAberration={0.08}
        roughness={0.06}
        transmission={1}
        backside={false}
        samples={6}
        resolution={512}
      />
    </mesh>
  );
}

/** 整块方玻璃：薄盒铺满可视区（演示用小面板） */
function SquareGlass({ buffer }: { buffer: THREE.WebGLRenderTarget }) {
  const { viewport } = useThree();
  const pad = 0.96;

  return (
    <mesh
      position={[0, 0, 0.5]}
      scale={[viewport.width * pad, viewport.height * pad, 0.14]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <MeshTransmissionMaterial
        buffer={buffer.texture}
        ior={1.15}
        thickness={1.4}
        anisotropy={0.12}
        chromaticAberration={0.06}
        roughness={0.04}
        transmission={1}
        backside
        samples={4}
        resolution={256}
      />
    </mesh>
  );
}

/**
 * 满铺球：薄盒铺满整块面板（四角也有玻璃）+ 大球叠加中心放大。
 */
function SphereFillGlass({ buffer }: { buffer: THREE.WebGLRenderTarget }) {
  const { viewport } = useThree();
  const pad = 0.99;
  const sphereD = Math.max(viewport.width, viewport.height) * 0.98;

  return (
    <>
      <mesh
        position={[0, 0, 0.48]}
        scale={[viewport.width * pad, viewport.height * pad, 0.16]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={1.15}
          thickness={1.5}
          anisotropy={0.1}
          chromaticAberration={0.05}
          roughness={0.05}
          transmission={1}
          backside
          samples={4}
          resolution={256}
        />
      </mesh>
      <mesh position={[0, 0, 0.54]} scale={sphereD * 0.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <TransmissionGlass buffer={buffer} thickness={3} ior={1.2} />
      </mesh>
    </>
  );
}

/**
 * 顶栏整块长方形玻璃：铺满 Canvas 宽高（与对比区方玻璃同手法，无球体）。
 */
function NavRectGlass({ buffer }: { buffer: THREE.WebGLRenderTarget }) {
  const { viewport } = useThree();

  return (
    <mesh
      position={[0, 0, 0.5]}
      scale={[viewport.width, viewport.height, 0.16]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <MeshTransmissionMaterial
        buffer={buffer.texture}
        ior={1.18}
        thickness={2.2}
        anisotropy={0.12}
        chromaticAberration={0.08}
        roughness={0.04}
        transmission={1}
        backside
        samples={8}
        resolution={512}
      />
    </mesh>
  );
}

function GlassMesh({
  shape,
  buffer,
  navMode,
}: {
  shape: WebglGlassShape;
  buffer: THREE.WebGLRenderTarget;
  navMode?: boolean;
}) {
  switch (shape) {
    case "square":
      if (navMode) return <NavBarPlaneGlass buffer={buffer} />;
      return <SquareGlass buffer={buffer} />;
    case "sphere-fill":
      return <SphereFillGlass buffer={buffer} />;
    case "nav-lens":
      return <NavRectGlass buffer={buffer} />;
    default:
      return <LensGlass buffer={buffer} />;
  }
}

function Scene({
  src,
  captureCanvas,
  crop,
  shape,
  navMode,
}: {
  src?: string;
  captureCanvas?: HTMLCanvasElement;
  crop: GlassWebglCrop;
  shape: WebglGlassShape;
  navMode?: boolean;
}) {
  const isNavLens = shape === "nav-lens";
  const stripMode = navMode || isNavLens;
  const fboSize = stripMode ? 512 : 256;
  const buffer = useFBO(fboSize, fboSize);
  const bgScene = useMemo(() => new THREE.Scene(), []);
  const { gl, camera } = useThree();

  useFrame(() => {
    gl.setRenderTarget(buffer);
    gl.clear();
    gl.render(bgScene, camera);
    gl.setRenderTarget(null);
  });

  const background =
    captureCanvas != null ? (
      <BackgroundFromCapture
        source={captureCanvas}
        crop={crop}
        navMode={stripMode}
      />
    ) : src != null ? (
      <BackgroundPlane src={src} crop={crop} navMode={stripMode} />
    ) : null;

  return (
    <>
      {background ? createPortal(background, bgScene) : null}
      <GlassMesh shape={shape} buffer={buffer} navMode={stripMode} />
    </>
  );
}

export function GlassWebglCanvas({
  backgroundSrc,
  captureCanvas,
  crop,
  shape = "lens",
  navMode = false,
}: GlassWebglCanvasProps) {
  const isNavLens = shape === "nav-lens";
  const hiRes = navMode || isNavLens;

  return (
    <Canvas
      className="block h-full w-full bg-transparent"
      camera={{ position: [0, 0, 2.6], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={hiRes ? [1, 1.5] : [1, 1.5]}
      frameloop="always"
    >
      <Scene
        src={backgroundSrc}
        captureCanvas={captureCanvas}
        crop={crop}
        shape={shape}
        navMode={navMode || isNavLens}
      />
    </Canvas>
  );
}
