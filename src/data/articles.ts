export type Article = {
  slug: string;
  index: string;
  category: string;
  title: string;
  summary: string;
  date: string;
  latest?: boolean;
};

export const articles: Article[] = [];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
