export type Article = {
  slug: string;
  index: string;
  category: string;
  title: string;
  summary: string;
  date: string;
  latest?: boolean;
};

export const articles: Article[] = [
  {
    slug: "github-pages-next",
    index: "01",
    category: "前端",
    title: "用 Next.js 静态导出部署 GitHub Pages",
    summary:
      "output export、basePath 与 Actions 发布 out/，适合个人站与文档站。",
    date: "2026-10-08",
    latest: true,
  },
  {
    slug: "dual-github-accounts",
    index: "02",
    category: "工具",
    title: "一台电脑两个 GitHub 账号：SSH 别名",
    summary: "为每个账号独立密钥与 Host，避免 push 时身份串号。",
    date: "2026-10-08",
  },
  {
    slug: "placeholder",
    index: "03",
    category: "工程",
    title: "（占位）你的下一篇文章标题",
    summary: "在 src/data/articles.ts 与 writing/[slug] 正文里替换内容。",
    date: "2026-01-01",
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
