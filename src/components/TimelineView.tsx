import type { TimelineEntry } from "@/data/timeline";

export function TimelineView({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative space-y-0 border-l border-white/10 ml-1">
      {entries.map((entry) => (
        <li key={`${entry.year}-${entry.title}`} className="relative pb-12 pl-8 last:pb-0">
          <span
            className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 ring-4 ring-[#050508]"
            aria-hidden
          />
          <p className="font-mono text-sm text-violet-400/90">{entry.year}</p>
          <h3 className="mt-1 text-lg font-semibold text-zinc-100">{entry.title}</h3>
          {entry.subtitle ? (
            <p className="text-sm text-zinc-500">{entry.subtitle}</p>
          ) : null}
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
            {entry.description}
          </p>
          {entry.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
