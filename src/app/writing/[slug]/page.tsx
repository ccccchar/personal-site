import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteContainer } from "@/components/SiteContainer";
import { articles, getArticle } from "@/data/articles";
import { articleBodies } from "@/data/article-body";

type Props = { params: Promise<{ slug: string }> };

/** 静态导出要求至少一条；无文章时仅生成占位路由，访问即 404 */
export function generateStaticParams() {
  if (articles.length > 0) {
    return articles.map((a) => ({ slug: a.slug }));
  }
  return [{ slug: "_" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "文章" };
  return { title: article.title, description: article.summary };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const bodyFn = articleBodies[slug];
  const body = bodyFn ? bodyFn(article) : article.summary;

  return (
    <SiteContainer narrow className="py-12 pb-20">
      <p className="font-mono text-xs text-zinc-500">
        {article.category} · {article.date}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-50">
        {article.title}
      </h1>
      <p className="mt-4 text-zinc-400">{article.summary}</p>
      <div className="prose-article mt-10 whitespace-pre-wrap text-base">{body}</div>
      <p className="mt-12 border-t border-white/10 pt-8">
        <Link href="/writing/" className="text-sm text-violet-300 hover:underline">
          ← 全部文章
        </Link>
      </p>
    </SiteContainer>
  );
}
