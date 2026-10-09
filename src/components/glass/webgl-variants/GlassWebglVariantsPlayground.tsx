"use client";

import { useRef } from "react";
import { assetPath } from "@/lib/asset-path";
import { GlassWebglPanel } from "../webgl/GlassWebglPanel";

const DEMO_BG = assetPath("/demo/glass-bg.jpg");

/**
 * WebGL 形态对比：小透镜 / 整块方玻璃 / 球铺满面板。
 * 与主 playground 的 CSS·SVG·WebGL 三分法独立，专注 transmission 几何差异。
 */
export function GlassWebglVariantsPlayground() {
  const boundsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-medium text-zinc-100">WebGL 形态</h2>
        <p className="mt-1 text-sm text-zinc-400">
          同一张背景采样与 FBO 流程，仅改变折射网格：中心透镜、薄盒铺满、大球铺满。
          拖动可对比边缘与中心折射范围。
        </p>
      </div>
      <div
        ref={boundsRef}
        className="relative h-[min(52vh,420px)] w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-inner"
        style={{
          backgroundImage: `url(${DEMO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <GlassWebglPanel
          boundsRef={boundsRef}
          defaultPosition={{ x: 28, y: 36 }}
          backgroundSrc={DEMO_BG}
          shape="lens"
          badge="透镜"
          label="小透镜"
        />
        <GlassWebglPanel
          boundsRef={boundsRef}
          defaultPosition={{ x: 180, y: 52 }}
          backgroundSrc={DEMO_BG}
          shape="square"
          badge="方玻璃"
          label="整块"
        />
        <GlassWebglPanel
          boundsRef={boundsRef}
          defaultPosition={{ x: 332, y: 68 }}
          backgroundSrc={DEMO_BG}
          shape="sphere-fill"
          badge="满铺球"
          label="大球"
        />
      </div>
    </section>
  );
}
