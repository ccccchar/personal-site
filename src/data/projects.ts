export type Project = {
  slug: string;
  name: string;
  role: string;
  version?: string;
  summary: string;
  bullets: string[];
  href: string;
};

export const projects: Project[] = [
  {
    slug: "personal-site",
    name: "personal-site",
    role: "作者",
    version: "0.1.0",
    summary:
      "Next.js 静态导出 + GitHub Pages 的个人站模板，含多页面与部署 workflow。",
    bullets: [
      "App Router、Tailwind、子路径 basePath 自动适配",
      "GitHub Actions 构建并发布 out/",
      "参考 cerrda 信息架构的首页与轨迹页",
    ],
    href: "https://github.com/ccccchar/personal-site",
  },
  {
    slug: "placeholder-tool",
    name: "your-next-package",
    role: "作者",
    version: "—",
    summary: "在这里放你的 npm 包或开源仓库简介。",
    bullets: [
      "解决什么问题、面向谁",
      "核心能力三条以内",
      "链接到 npm / GitHub README",
    ],
    href: "https://github.com/ccccchar",
  },
];
