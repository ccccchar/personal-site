import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="group flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-violet-500/30 hover:bg-white/[0.05]"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
        <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-violet-300">
          {project.role}
        </span>
        {project.version ? <span>v{project.version}</span> : null}
      </div>
      <h3 className="mt-4 font-mono text-lg font-medium text-zinc-100">
        {project.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
        {project.summary}
      </p>
      <ul className="mt-4 space-y-1.5 text-sm text-zinc-500">
        {project.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-violet-500/80">·</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex text-sm font-medium text-violet-300 transition group-hover:text-violet-200"
      >
        查看仓库 →
      </a>
    </article>
  );
}
