import type { RefObject } from "react";

export type GlassVariant = "css" | "svg" | "webgl";

export type GlassPanelProps = {
  /** 可拖动区域（一般为演示区容器） */
  boundsRef: RefObject<HTMLElement | null>;
  /** 初始位置（相对 bounds 左上角） */
  defaultPosition?: { x: number; y: number };
  size?: number;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  /** WebGL：与演示区相同的背景图，用于采样折射 */
  backgroundSrc?: string;
};
