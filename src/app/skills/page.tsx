import { PageIntro } from "@/components/PageIntro";
import { EmptyState } from "@/components/EmptyState";
import { SiteContainer } from "@/components/SiteContainer";
import { skillBlocks, skillIntro } from "@/data/skills";

export const metadata = {
  title: "技能",
};

export default function SkillsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Skills"
        title="技能"
        description={skillIntro || undefined}
      />
      <SiteContainer className="pb-20">
        {skillBlocks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-3">
            {skillBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-white/8 p-6"
              >
                <h2 className="font-semibold text-zinc-100">{block.title}</h2>
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
      </SiteContainer>
    </>
  );
}
