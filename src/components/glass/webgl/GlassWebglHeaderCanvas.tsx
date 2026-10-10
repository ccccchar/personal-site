"use client";

/* eslint-disable react/no-unknown-property */
import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, useFBO } from "@react-three/drei";
import type { GlassWebglCrop } from "./GlassWebglCanvas";

function CapturedBackground({
  source,
  crop,
}: {
  source: HTMLCanvasElement;
  crop: GlassWebglCrop;
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
    if (crop.boundsW <= 0 || crop.boundsH <= 0) return;
    tex.repeat.set(1, crop.h / crop.boundsH);
    tex.offset.set(0, 1 - (crop.y + crop.h) / crop.boundsH);
    tex.needsUpdate = true;
  }, [source, crop, tex]);

  return (
    <mesh scale={[6, 6, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

function NavPlaneGlass({ buffer }: { buffer: THREE.WebGLRenderTarget }) {
  const { viewport } = useThree();

  return (
    <mesh position={[0, 0, 0.45]}>
      <planeGeometry args={[viewport.width * 1.02, viewport.height * 1.05]} />
      <MeshTransmissionMaterial
        buffer={buffer.texture}
        ior={1.18}
        thickness={2}
        anisotropy={0.1}
        chromaticAberration={0.09}
        roughness={0.05}
        transmission={1}
        backside={false}
        samples={6}
        resolution={512}
      />
    </mesh>
  );
}

function Scene({
  source,
  crop,
}: {
  source: HTMLCanvasElement;
  crop: GlassWebglCrop;
}) {
  const buffer = useFBO(512, 512);
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
      {createPortal(
        <CapturedBackground source={source} crop={crop} />,
        bgScene,
      )}
      <NavPlaneGlass buffer={buffer} />
    </>
  );
}

/** 顶栏尺寸 Canvas：FBO 烘焙主内容捕获图 + 透射玻璃 */
export function GlassWebglHeaderCanvas({
  source,
  crop,
}: {
  source: HTMLCanvasElement;
  crop: GlassWebglCrop;
}) {
  return (
    <Canvas
      className="block h-full w-full bg-transparent"
      camera={{ position: [0, 0, 2.6], fov: 38 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <Scene source={source} crop={crop} />
    </Canvas>
  );
}
