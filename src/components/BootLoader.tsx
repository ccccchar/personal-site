"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "载入字体与视觉系统",
  "预热渐变与玻璃层",
  "编译页面路由",
  "缓存静态资源",
  "同步导航与内容",
];

export function BootLoader() {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("site-booted") === "1") {
      setVisible(false);
      return;
    }

    let i = 0;
    const tick = window.setInterval(() => {
      i += 1;
      setStep(Math.min(i, STEPS.length - 1));
      if (i >= STEPS.length) {
        window.clearInterval(tick);
        window.setTimeout(() => {
          sessionStorage.setItem("site-booted", "1");
          setVisible(false);
        }, 320);
      }
    }, 280);

    return () => window.clearInterval(tick);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508] text-zinc-300 transition-opacity duration-500"
      role="status"
      aria-live="polite"
    >
      <div className="mb-8 h-10 w-10 rounded-full border border-violet-500/40 border-t-violet-400 animate-spin" />
      <p className="font-mono text-xs tracking-[0.2em] text-violet-300/90">
        {STEPS[step]}
      </p>
    </div>
  );
}
