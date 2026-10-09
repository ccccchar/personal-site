"use client";

import type { GlassPanelProps } from "../types";
import { GlassDragFrame } from "../GlassDragFrame";

/** 方案 A：纯 CSS backdrop-filter，无额外运行时依赖 */
export function GlassCssPanel(props: GlassPanelProps) {
  const size = props.size ?? 132;

  return (
    <GlassDragFrame
      {...props}
      variantLabel="CSS"
      surface={
        <div
          className="h-full w-full border border-white/25 bg-white/10 backdrop-blur-xl backdrop-saturate-150"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.08)",
          }}
        />
      }
    />
  );
}

/** 包裹导航等 DOM：毛玻璃容器（不可拖动） */
export function GlassCssShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-white/20 bg-white/10 backdrop-blur-xl backdrop-saturate-150 ${className}`}
    >
      {children}
    </div>
  );
}
