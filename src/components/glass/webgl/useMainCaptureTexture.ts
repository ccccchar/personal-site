"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { toCanvas } from "html-to-image";
import type { GlassWebglCrop } from "./GlassWebglCanvas";

const MAIN_ID = "site-main";

export function computeNavCrop(
  headerEl: HTMLElement,
  mainEl: HTMLElement,
): GlassWebglCrop | null {
  const headerRect = headerEl.getBoundingClientRect();
  const mainRect = mainEl.getBoundingClientRect();
  const overlapTop = Math.max(headerRect.top, mainRect.top);
  const overlapBottom = Math.min(headerRect.bottom, mainRect.bottom);
  const overlapH = overlapBottom - overlapTop;
  const overlapW =
    Math.min(headerRect.right, mainRect.right) -
    Math.max(headerRect.left, mainRect.left);
  if (overlapH < 0.5 || overlapW < 1 || headerRect.height < 1) return null;

  // 与 html-to-image 的取景一致（client + border），不要用 scrollWidth，否则只会采到截图左侧。
  const boundsW = Math.max(mainEl.offsetWidth, 1);
  const boundsH = Math.max(mainEl.offsetHeight, 1);
  const x = Math.max(headerRect.left, mainRect.left) - mainRect.left;
  const y = overlapTop - mainRect.top;

  return {
    x: Math.min(Math.max(x, 0), Math.max(boundsW - overlapW, 0)),
    y: Math.min(Math.max(y, 0), Math.max(boundsH - overlapH, 0)),
    w: overlapW,
    h: overlapH,
    boundsW,
    boundsH,
    bandTop: (overlapTop - headerRect.top) / headerRect.height,
    bandHeight: overlapH / headerRect.height,
  };
}

function resolveNavBarEl(ref: RefObject<HTMLElement | null>): HTMLElement | null {
  const el = ref.current;
  if (!el) return null;
  return el.closest<HTMLElement>("[data-nav-glass-bar]") ?? el;
}

export function useMainCaptureTexture(
  headerRef: RefObject<HTMLElement | null>,
) {
  const [captureCanvas, setCaptureCanvas] = useState<HTMLCanvasElement | null>(
    null,
  );
  const [crop, setCrop] = useState<GlassWebglCrop | null>(null);
  const busyRef = useRef(false);
  const resizeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const header = resolveNavBarEl(headerRef);
    const main = document.getElementById(MAIN_ID);
    if (!header || !main) return;

    const capture = async () => {
      if (busyRef.current) return;
      const el = document.getElementById(MAIN_ID);
      const h = resolveNavBarEl(headerRef);
      if (!el || !h) return;
      busyRef.current = true;
      try {
        const canvas = await toCanvas(el, {
          pixelRatio: Math.min(window.devicePixelRatio, 1.25),
          cacheBust: false,
          filter: (node) => !(node instanceof HTMLCanvasElement),
        });
        setCaptureCanvas(canvas);
        setCrop(computeNavCrop(h, el));
      } catch {
        /* 字体/跨域图可能导致捕获失败，保留上一帧 */
      } finally {
        busyRef.current = false;
      }
    };

    const onResize = () => {
      if (resizeTimerRef.current != null) {
        window.clearTimeout(resizeTimerRef.current);
      }
      resizeTimerRef.current = window.setTimeout(() => {
        resizeTimerRef.current = null;
        void capture();
      }, 200);
    };

    void capture();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(main);
    ro.observe(header);

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (resizeTimerRef.current != null) {
        window.clearTimeout(resizeTimerRef.current);
      }
    };
  }, [headerRef]);

  return { captureCanvas, crop };
}
