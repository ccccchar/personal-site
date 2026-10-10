"use client";

/* eslint-disable react/no-unknown-property */
import { Image } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { assetPath } from "@/lib/asset-path";

const BG = assetPath("/demo/glass-bg.jpg");
const LOGO = assetPath("/logo.jpg");

/** 进入 FBO 的 WebGL 背景（与 DOM 滚动通过 ScrollControls 同步） */
export function FluidScrollBackdrop() {
  const { viewport } = useThree();
  const w = viewport.width;
  const h = viewport.height;

  return (
    <group>
      <mesh position={[0, 0, -2]} scale={[w * 1.4, h * 1.4, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#050508" />
      </mesh>
      <Image
        position={[-w * 0.35, h * 0.15, 0]}
        scale={[w * 0.55, h * 0.45]}
        url={BG}
        transparent
        opacity={0.95}
      />
      <Image
        position={[w * 0.38, h * 0.05, 1.5]}
        scale={[w * 0.42, h * 0.38]}
        url={LOGO}
        transparent
        opacity={0.85}
      />
      <Image
        position={[0, -h * 1.05, 2]}
        scale={[w * 0.7, h * 0.5]}
        url={BG}
        transparent
        opacity={0.9}
      />
      <Image
        position={[-w * 0.25, -h * 2.1, 1]}
        scale={[w * 0.5, h * 0.55]}
        url={LOGO}
        transparent
        opacity={0.75}
      />
      <Image
        position={[w * 0.3, -h * 2.8, 2.5]}
        scale={[w * 0.6, h * 0.45]}
        url={BG}
        transparent
        opacity={0.85}
      />
    </group>
  );
}
