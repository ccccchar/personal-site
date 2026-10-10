"use client";

import { useRef } from "react";
import { useMainCaptureTexture } from "@/components/glass/webgl/useMainCaptureTexture";
import { NavRectGlassCanvas } from "./NavRectGlassCanvas";

/** 顶栏整块长方形 WebGL 玻璃：画布常驻，滚动时按帧对齐背后的内容 */
export function FluidTopSphereCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const { captureCanvas } = useMainCaptureTexture(hostRef);

  return (
    <div ref={hostRef} className="absolute inset-0 h-full w-full">
      <NavRectGlassCanvas source={captureCanvas} />
    </div>
  );
}
