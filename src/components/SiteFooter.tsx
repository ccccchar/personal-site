import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-10 text-center text-sm text-zinc-500">
      <p>
        © {new Date().getFullYear()} {site.copyright} · Built with Next.js
      </p>
    </footer>
  );
}
