import Link from "next/link";
import { articles } from "@/data/articles";
import { projects } from "@/data/projects";
import { skillBlocks, skillIntro } from "@/data/skills";
import { site } from "@/data/site";
import { ArticleRow } from "./ArticleRow";
import { ContactLinks } from "./ContactLinks";
import { EmptyState } from "./EmptyState";
import { ProjectCard } from "./ProjectCard";
import { SiteContainer } from "./SiteContainer";
import { SectionHeading } from "./SectionHeading";

export function HomeSections() {
  const title = site.headline || site.name;

  return (
    <SiteContainer className="pb-20">
      <section className="py-16 sm:py-24">
        {site.tagline ? (
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet-400/90">
            {site.tagline}
          </p>
        ) : null}
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {site.description ? (
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400 lg:text-xl">
            {site.description}
          </p>
        ) : null}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/about/"
            className="inline-flex h-11 items-center rounded-full bg-violet-600 px-6 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            关于
          </Link>
          <Link
            href="/opensource/"
            className="inline-flex h-11 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-zinc-200 transition hover:bg-white/5"
          >
            开源
          </Link>
        </div>
      </section>

      {(skillBlocks.length > 0 || site.description) && (
        <section className="border-t border-white/5 py-16">
          <SectionHeading eyebrow="About" title="关于" />
          {skillBlocks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-3">
              {skillBlocks.map((block) => (
                <div
                  key={block.title}
                  className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"
                >
                  <h3 className="text-sm font-semibold text-zinc-200">{block.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-zinc-500">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500">
              <Link href="/about/" className="text-violet-300 hover:underline">
                查看关于页 →
              </Link>
            </p>
          )}
        </section>
      )}

      <section className="border-t border-white/5 py-16">
        <SectionHeading eyebrow="Open Source" title="开源" />
        {projects.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      <section className="border-t border-white/5 py-16">
        <SectionHeading
          eyebrow="Skills"
          title="技能"
          description={skillIntro || undefined}
        />
        {skillBlocks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-3">
            {skillBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"
              >
                <h3 className="text-sm font-semibold text-zinc-200">{block.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-zinc-500">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      <section className="border-t border-white/5 py-16">
        <SectionHeading eyebrow="Writing" title="文章" />
        {articles.length > 0 ? (
          <div className="divide-y divide-white/5 rounded-2xl border border-white/8">
            {articles.slice(0, 5).map((a) => (
              <ArticleRow key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-white/5 py-16">
        <SectionHeading eyebrow="Connect" title="联系" />
        <ContactLinks />
      </section>
    </SiteContainer>
  );
}
