"use client";

import { useRef } from "react";
import { assetPath } from "@/lib/asset-path";
import { GlassCssPanel } from "./css/GlassCssPanel";
import { GlassSvgPanel } from "./svg/GlassSvgPanel";
import { GlassWebglPanel } from "./webgl/GlassWebglPanel";

const DEMO_BG = assetPath("/demo/glass-bg.jpg");

export function GlassPlayground() {
  const boundsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="space-y-4">
      <p className="text-sm text-zinc-400">
        在彩色背景上拖动三块玻璃对比效果。CSS / SVG 折射真实 DOM 背景；WebGL
        按当前位置采样同一张背景图（文章 Fluid Glass 思路的轻量版）。
      </p>
      <div
        ref={boundsRef}
        className="relative h-[min(52vh,420px)] w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-inner"
        style={{
          backgroundImage: `url(${DEMO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <GlassCssPanel
          boundsRef={boundsRef}
          defaultPosition={{ x: 28, y: 36 }}
        />
        <GlassSvgPanel
          boundsRef={boundsRef}
          defaultPosition={{ x: 180, y: 52 }}
        />
        <GlassWebglPanel
          boundsRef={boundsRef}
          defaultPosition={{ x: 332, y: 68 }}
          backgroundSrc={DEMO_BG}
        />
      </div>
    </section>
  );
}
