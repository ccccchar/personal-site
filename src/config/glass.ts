import type { GlassVariant } from "@/components/glass";

/**
 * 顶栏 WebGL 满铺球 + 正常 DOM 页面。
 * 关闭则恢复普通顶栏毛玻璃。
 */
export const fluidFullCanvas = true;

/** 底栏版全屏 Canvas（实验） */
export const fluidBarChrome = false;

/** 非 Canvas 模式下的顶栏毛玻璃 */
export const glassNavVariant: GlassVariant = "webgl";

/** WebGL 背景随页面滚动的虚拟页数 */
export const fluidScrollPages = 5;

/** 顶栏 WebGL 区域高度（与 SiteHeader 一致） */
export const fluidNavHeight = "7.75rem";
