"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";
import { SiteLogo } from "@/components/SiteLogo";

/** 底栏 DOM 导航（叠在 bar 玻璃上方，链接触摸） */
export function FluidBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="pointer-events-auto fixed inset-x-0 bottom-0 z-[100] flex items-center justify-center gap-1 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2"
      aria-label="主导航"
    >
      <div
        className="flex w-full max-w-3xl items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 shadow-lg backdrop-blur-sm sm:px-4"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-zinc-100 sm:text-sm"
        >
          <SiteLogo size={28} />
          <span className="hidden sm:inline">{site.name}</span>
        </Link>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-0.5 overflow-x-auto sm:justify-center sm:gap-1">
          {nav.map((item) => {
            const base = item.href.replace(/\/$/, "");
            const active =
              pathname === item.href ||
              pathname === base ||
              pathname.startsWith(`${base}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-full px-2 py-1 text-[11px] transition sm:px-2.5 sm:text-xs ${
                  active
                    ? "bg-violet-500/25 text-violet-100"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
