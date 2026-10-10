"use client";

import { useEffect, useState } from "react";

/** 0–1，与 window 滚动同步（供 WebGL 背景位移） */
export function useDocumentScrollOffset() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setOffset(max > 0 ? window.scrollY / max : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return offset;
}
