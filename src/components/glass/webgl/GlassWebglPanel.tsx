"use client";

import { useEffect, useState } from "react";
import type { GlassPanelProps } from "../types";
import { useDraggable } from "../useDraggable";
import {
  GlassWebglCanvas,
  type GlassWebglCrop,
  type WebglGlassShape,
} from "./GlassWebglCanvas";

export type GlassWebglPanelProps = GlassPanelProps & {
  /** 玻璃几何，默认中心小透镜 */
  shape?: WebglGlassShape;
  /** 角标文案 */
  badge?: string;
};

/** 方案 C：Three.js + FBO + MeshTransmissionMaterial（仅本目录依赖 three 系） */
export function GlassWebglPanel({
  boundsRef,
  defaultPosition = { x: 280, y: 120 },
  size = 132,
  label = "拖动",
  backgroundSrc = "",
  shape = "lens",
  badge = "WebGL",
}: GlassWebglPanelProps) {
  const { position, handlers } = useDraggable(boundsRef, defaultPosition, size);
  const [bounds, setBounds] = useState({ w: 1, h: 1 });

  useEffect(() => {
    const el = boundsRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setBounds({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setBounds({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, [boundsRef]);

  const crop: GlassWebglCrop = {
    x: position.x,
    y: position.y,
    w: size,
    h: size,
    boundsW: bounds.w,
    boundsH: bounds.h,
  };

  if (!backgroundSrc) return null;

  return (
    <div
      className="absolute touch-none select-none"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
      }}
      {...handlers}
    >
      <span
        className="pointer-events-none absolute -top-2 left-2 z-20 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-fuchsia-300"
      >
        {badge}
      </span>
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        <GlassWebglCanvas backgroundSrc={backgroundSrc} crop={crop} shape={shape} />
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-medium text-white/85 drop-shadow-md"
        >
          {label}
        </span>
      </div>
    </div>
  );
}
