import Link from "next/link";
import type { Article } from "@/data/articles";

export function ArticleRow({ article }: { article: Article }) {
  return (
    <Link
      href={`/writing/${article.slug}/`}
      className="group grid gap-2 rounded-xl border border-transparent px-4 py-5 transition hover:border-white/8 hover:bg-white/[0.03] sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-6"
    >
      <span className="font-mono text-sm text-zinc-600">{article.index}</span>
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <span>{article.category}</span>
          {article.latest ? (
            <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-rose-300">
              Latest
            </span>
          ) : null}
        </div>
        <h3 className="mt-1 text-base font-medium text-zinc-100 group-hover:text-violet-200">
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-500">{article.summary}</p>
      </div>
      <span className="text-sm text-zinc-600 sm:text-right">{article.date}</span>
    </Link>
  );
}
