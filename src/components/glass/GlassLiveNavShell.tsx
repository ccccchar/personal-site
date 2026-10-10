"use client";

import { GlassSvgDefs, useGlassSvgFilterId } from "./svg/GlassSvgDefs";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** 是否叠加 SVG 位移（轻微液态感） */
  liquidSvg?: boolean;
};

/**
 * 顶栏玻璃壳（无 backdrop-filter，可与 WebGL 层叠用）。
 */
export function GlassLiveNavShell({
  children,
  className = "",
  liquidSvg = true,
}: Props) {
  const filterId = useGlassSvgFilterId();

  return (
    <div
      className={`relative overflow-hidden border-b border-white/15 ${className}`}
    >
      {liquidSvg ? <GlassSvgDefs filterId={filterId} /> : null}
      {liquidSvg ? (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ filter: `url(#${filterId})` }}
          aria-hidden
        />
      ) : null}
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
