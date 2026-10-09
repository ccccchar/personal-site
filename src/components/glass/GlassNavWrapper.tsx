"use client";

import type { GlassVariant } from "./types";
import { GlassCssShell } from "./css/GlassCssPanel";
import { GlassSvgShell } from "./svg/GlassSvgPanel";

type Props = {
  variant: GlassVariant;
  children: React.ReactNode;
  className?: string;
};

/**
 * 导航栏等静态容器：仅 CSS / SVG（WebGL 不适合包整段 DOM 导航）。
 * 在 site 或 layout 里设 `glassNavVariant` 即可切换。
 */
export function GlassNavWrapper({ variant, children, className }: Props) {
  if (variant === "svg") {
    return <GlassSvgShell className={className}>{children}</GlassSvgShell>;
  }
  /* WebGL 仅用于演示透镜，导航请用 css 或 svg */
  return <GlassCssShell className={className}>{children}</GlassCssShell>;
}
