"use client";

import type { GlassVariant } from "./types";
import { GlassCssShell } from "./css/GlassCssPanel";
import { GlassSvgShell } from "./svg/GlassSvgPanel";
import { GlassWebglTopNavShell } from "./webgl/GlassWebglTopNavShell";

type Props = {
  variant: GlassVariant;
  children: React.ReactNode;
  className?: string;
};

/** 导航栏毛玻璃：css / svg / webgl，由 `glassNavVariant` 切换 */
export function GlassNavWrapper({ variant, children, className }: Props) {
  if (variant === "webgl") {
    return (
      <GlassWebglTopNavShell className={className}>
        {children}
      </GlassWebglTopNavShell>
    );
  }
  if (variant === "svg") {
    return <GlassSvgShell className={className}>{children}</GlassSvgShell>;
  }
  return <GlassCssShell className={className}>{children}</GlassCssShell>;
}
