"use client";

/* eslint-disable react/no-unknown-property */
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, useFBO } from "@react-three/drei";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

const BAR_Z = 15;

/**
 * FBO 离屏场景 + 全屏底图 + 底部 bar 透射（对应掘金 FluidGlass ModeWrapper / Bar）
 */
export function FluidBarRig({ children }: { children: ReactNode }) {
  const buffer = useFBO();
  const bgScene = useMemo(() => new THREE.Scene(), []);
  const barRef = useRef<THREE.Mesh>(null);
  const { viewport, camera, gl } = useThree();

  useFrame(() => {
    gl.setRenderTarget(buffer);
    gl.clear();
    gl.render(bgScene, camera);
    gl.setRenderTarget(null);

    const bar = barRef.current;
    if (!bar) return;
    const view = viewport.getCurrentViewport(camera, [0, 0, BAR_Z]);
    bar.position.set(0, -view.height / 2 + 0.22, BAR_Z);
    bar.scale.set(view.width * 0.97, Math.max(view.height * 0.11, 0.35), 0.42);
  });

  return (
    <>
      {createPortal(children, bgScene)}

      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={buffer.texture} transparent toneMapped={false} />
      </mesh>

      <mesh ref={barRef}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          transmission={1}
          roughness={0}
          thickness={10}
          ior={1.15}
          anisotropy={0.01}
          chromaticAberration={0.1}
          color="#ffffff"
          attenuationColor="#ffffff"
          attenuationDistance={0.25}
          backside
          samples={6}
          resolution={512}
        />
      </mesh>
    </>
  );
}
