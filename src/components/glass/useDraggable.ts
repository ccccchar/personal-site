"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

type Point = { x: number; y: number };

export function useDraggable(
  boundsRef: RefObject<HTMLElement | null>,
  defaultPosition: Point,
  size: number,
) {
  const [position, setPosition] = useState(defaultPosition);
  const dragging = useRef(false);
  const pointerStart = useRef<Point>({ x: 0, y: 0 });
  const positionStart = useRef<Point>(defaultPosition);

  const clamp = useCallback(
    (x: number, y: number) => {
      const bounds = boundsRef.current;
      if (!bounds) return { x, y };
      const maxX = Math.max(0, bounds.clientWidth - size);
      const maxY = Math.max(0, bounds.clientHeight - size);
      return {
        x: Math.min(maxX, Math.max(0, x)),
        y: Math.min(maxY, Math.max(0, y)),
      };
    },
    [boundsRef, size],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      pointerStart.current = { x: e.clientX, y: e.clientY };
      positionStart.current = position;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [position],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - pointerStart.current.x;
      const dy = e.clientY - pointerStart.current.y;
      setPosition(
        clamp(positionStart.current.x + dx, positionStart.current.y + dy),
      );
    },
    [clamp],
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    setPosition((p) => clamp(p.x, p.y));
  }, [clamp]);

  return {
    position,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}
