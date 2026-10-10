"use client";

import { useRef } from "react";
import { GlassWebglHeaderCanvas } from "./GlassWebglHeaderCanvas";
import { useMainCaptureTexture } from "./useMainCaptureTexture";

/**
 * 顶栏 WebGL Canvas：捕获 #site-main 滚动内容进 FBO，布局与 DOM 导航不变。
 */
export function GlassWebglTopNavShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const { captureCanvas, crop } = useMainCaptureTexture(shellRef);

  const ready = captureCanvas && crop;

  return (
    <div
      ref={shellRef}
      className={`relative overflow-hidden border-b border-white/15 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1] min-h-full w-full"
        aria-hidden
      >
        {ready ? (
          <GlassWebglHeaderCanvas source={captureCanvas} crop={crop} />
        ) : null}
      </div>
      <div
        className="relative z-10"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
