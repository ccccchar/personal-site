import Link from "next/link";
import { nav, site } from "@/data/site";
import { SiteContainer } from "./SiteContainer";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050508]/70 backdrop-blur-xl">
      <SiteContainer className="flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-100"
        >
          <span
            className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 shadow-[0_0_12px_rgba(167,139,250,0.6)]"
            aria-hidden
          />
          {site.name}
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-violet-500/40 hover:bg-violet-500/10 sm:text-sm"
        >
          联系
        </Link>
      </SiteContainer>
      <SiteContainer className="flex gap-1 overflow-x-auto pb-3 sm:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full border border-white/5 px-3 py-1 text-xs text-zinc-400"
          >
            {item.label}
          </Link>
        ))}
      </SiteContainer>
    </header>
  );
}
