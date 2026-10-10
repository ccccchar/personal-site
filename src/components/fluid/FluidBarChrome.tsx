"use client";

import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, Scroll, ScrollControls } from "@react-three/drei";
import { fluidScrollPages } from "@/config/glass";
import { FluidBarRig } from "./FluidBarRig";
import { FluidScrollBackdrop } from "./FluidScrollBackdrop";
import { FluidBottomNav } from "./FluidBottomNav";

type Props = {
  children: ReactNode;
};

/**
 * 全屏 Canvas + 底部 bar 液态玻璃。
 * DOM 正文走 Scroll html，与 FBO 内 WebGL 背景共用 ScrollControls 滚动。
 */
export function FluidBarChrome({ children }: Props) {
  return (
    <>
      <div className="fixed inset-0 z-[8]" aria-hidden>
        <Canvas
          camera={{ position: [0, 0, 20], fov: 15 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          className="h-full w-full"
        >
          <Suspense fallback={null}>
            <ScrollControls pages={fluidScrollPages} damping={0.18} distance={0.4}>
              <FluidBarRig>
                <Scroll>
                  <FluidScrollBackdrop />
                </Scroll>
              </FluidBarRig>
              <Scroll html style={{ width: "100%" }}>
                <div
                  className="pointer-events-auto w-full min-h-screen text-zinc-100"
                  style={{
                    paddingBottom: "calc(5.5rem + env(safe-area-inset-bottom, 0px))",
                  }}
                >
                  {children}
                </div>
              </Scroll>
              <Preload all />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
      <FluidBottomNav />
    </>
  );
}
