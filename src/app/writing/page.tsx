import { PageIntro } from "@/components/PageIntro";
import { ArticleRow } from "@/components/ArticleRow";
import { EmptyState } from "@/components/EmptyState";
import { SiteContainer } from "@/components/SiteContainer";
import { articles } from "@/data/articles";

export const metadata = {
  title: "文章",
};

export default function WritingPage() {
  return (
    <>
      <PageIntro eyebrow="Writing" title="文章" />
      <SiteContainer className="pb-20">
        {articles.length > 0 ? (
          <div className="divide-y divide-white/5 rounded-2xl border border-white/8">
            {articles.map((a) => (
              <ArticleRow key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </SiteContainer>
    </>
  );
}
