"use client";

import type { GlassPanelProps } from "./types";
import { useDraggable } from "./useDraggable";

type FrameProps = GlassPanelProps & {
  variantLabel: string;
  surface: React.ReactNode;
};

export function GlassDragFrame({
  boundsRef,
  defaultPosition = { x: 24, y: 24 },
  size = 132,
  label = "拖动",
  variantLabel,
  className = "",
  surface,
}: FrameProps) {
  const { position, handlers } = useDraggable(boundsRef, defaultPosition, size);

  return (
    <div
      className={`absolute touch-none select-none ${className}`}
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
      }}
      {...handlers}
    >
      <span
        className="pointer-events-none absolute -top-2 left-2 z-20 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-violet-300"
      >
        {variantLabel}
      </span>
      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
        {surface}
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-medium text-white/90 drop-shadow-md"
        >
          {label}
        </span>
      </div>
    </div>
  );
}
