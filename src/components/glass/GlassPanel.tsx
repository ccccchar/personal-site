"use client";

import type { GlassPanelProps, GlassVariant } from "./types";
import { GlassCssPanel } from "./css/GlassCssPanel";
import { GlassSvgPanel } from "./svg/GlassSvgPanel";
import { GlassWebglPanel } from "./webgl/GlassWebglPanel";

export type { GlassVariant, GlassPanelProps } from "./types";

/** 统一入口：按 variant 切换实现（便于导航栏等只引一种） */
export function GlassPanel({
  variant,
  ...props
}: GlassPanelProps & { variant: GlassVariant }) {
  switch (variant) {
    case "css":
      return <GlassCssPanel {...props} />;
    case "svg":
      return <GlassSvgPanel {...props} />;
    case "webgl":
      return <GlassWebglPanel {...props} />;
    default:
      return <GlassCssPanel {...props} />;
  }
}
