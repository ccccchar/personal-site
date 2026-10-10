"use client";

import { useEffect, useRef } from "react";
import { assetPath } from "@/lib/asset-path";
import { GlassCssPanel } from "./css/GlassCssPanel";
import { GlassSvgPanel } from "./svg/GlassSvgPanel";
import { GlassWebglPanel } from "./webgl/GlassWebglPanel";

const DEMO_BG = assetPath("/demo/glass-bg.jpg");

/** 用绝对定位模拟 cover，避免截图时 background-size:cover 被画到左侧。 */
function CoverPhoto({ src }: { src: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img) return;

    const layout = () => {
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;
      const fw = frame.clientWidth;
      const fh = frame.clientHeight;
      if (!nw || !nh || !fw || !fh) return;
      const scale = Math.max(fw / nw, fh / nh);
      const w = nw * scale;
      const h = nh * scale;
      img.style.width = `${w}px`;
      img.style.height = `${h}px`;
      img.style.left = `${(fw - w) / 2}px`;
      img.style.top = `${(fh - h) / 2}px`;
      window.dispatchEvent(new Event("resize"));
    };

    if (img.complete) layout();
    img.addEventListener("load", layout);
    const ro = new ResizeObserver(layout);
    ro.observe(frame);
    return () => {
      img.removeEventListener("load", layout);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={frameRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <img ref={imgRef} src={src} alt="" className="absolute max-w-none" />
    </div>
  );
}

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
      >
        <CoverPhoto src={DEMO_BG} />
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
          shape="sphere-fill"
          badge="WebGL"
        />
      </div>
    </section>
  );
}
