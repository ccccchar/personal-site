import { PageIntro } from "@/components/PageIntro";
import { EmptyState } from "@/components/EmptyState";
import { SiteContainer } from "@/components/SiteContainer";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata = {
  title: "开源",
};

export default function OpensourcePage() {
  return (
    <>
      <PageIntro eyebrow="Open Source" title="开源" />
      <SiteContainer className="pb-20">
        {projects.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </SiteContainer>
    </>
  );
}
