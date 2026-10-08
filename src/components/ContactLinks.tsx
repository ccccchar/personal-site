import Link from "next/link";
import { site } from "@/data/site";

const linkClass =
  "rounded-full border border-white/10 px-4 py-2 text-zinc-300 hover:border-violet-500/40";

export function ContactLinks() {
  return (
    <ul className="flex flex-wrap gap-4 text-sm">
      {site.links.email ? (
        <li>
          <a href={site.links.email} className={linkClass}>邮箱</a>
        </li>
      ) : null}
      {site.links.github ? (
        <li>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
        </li>
      ) : null}
      {site.links.juejin ? (
        <li>
          <a
            href={site.links.juejin}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            掘金
          </a>
        </li>
      ) : null}
      <li>
        <Link href="/timeline/" className={linkClass}>轨迹</Link>
      </li>
    </ul>
  );
}
