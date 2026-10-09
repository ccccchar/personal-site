"use client";

import type { GlassPanelProps } from "../types";
import { GlassDragFrame } from "../GlassDragFrame";
import { GlassSvgDefs, useGlassSvgFilterId } from "./GlassSvgDefs";

/** 方案 B：DOM + SVG feDisplacementMap（无 Three.js） */
export function GlassSvgPanel(props: GlassPanelProps) {
  const filterId = useGlassSvgFilterId();

  return (
    <GlassDragFrame
      {...props}
      variantLabel="SVG"
      surface={
        <>
          <GlassSvgDefs filterId={filterId} />
          <div
            className="h-full w-full border border-white/20 bg-white/5 backdrop-blur-md"
            style={{
              filter: `url(#${filterId})`,
              WebkitBackdropFilter: "blur(16px) saturate(1.4)",
              backdropFilter: "blur(16px) saturate(1.4)",
            }}
          />
        </>
      }
    />
  );
}

export function GlassSvgShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const filterId = useGlassSvgFilterId();
  return (
    <div className={`relative ${className}`}>
      <GlassSvgDefs filterId={filterId} />
      <div
        className="border border-white/20 bg-white/5 backdrop-blur-md"
        style={{ filter: `url(#${filterId})` }}
      >
        {children}
      </div>
    </div>
  );
}
