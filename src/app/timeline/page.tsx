import { PageIntro } from "@/components/PageIntro";
import { EmptyState } from "@/components/EmptyState";
import { SiteContainer } from "@/components/SiteContainer";
import { TimelineView } from "@/components/TimelineView";
import { timeline } from "@/data/timeline";

export const metadata = {
  title: "轨迹",
};

export default function TimelinePage() {
  return (
    <>
      <PageIntro eyebrow="Timeline" title="轨迹" />
      <SiteContainer narrow className="pb-20">
        {timeline.length > 0 ? (
          <TimelineView entries={timeline} />
        ) : (
          <EmptyState />
        )}
      </SiteContainer>
    </>
  );
}
