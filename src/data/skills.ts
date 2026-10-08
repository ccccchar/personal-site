export type SkillBlock = {
  title: string;
  items: string[];
};

export const skillIntro =
  "技术栈与工程实践沉淀为可复用清单；可按项目替换为你的 Agent Skill、团队规范或技术雷达。";

export const skillBlocks: SkillBlock[] = [
  {
    title: "前端工程",
    items: [
      "React / Next.js、TypeScript、Tailwind",
      "组件库与中后台性能（按需渲染、列表优化）",
      "Vite / 构建与类型同步、Mock 联调",
    ],
  },
  {
    title: "交付与协作",
    items: [
      "GitHub Pages / CI 静态站",
      "OpenAPI 请求层与多环境配置",
      "Code Review 与可维护的目录约定",
    ],
  },
  {
    title: "原则",
    items: [
      "先抽象重复劳动，再写清楚边界",
      "默认静态、按需加动态",
      "文档与仓库同源版本化",
    ],
  },
];

export const installableSkills = [
  {
    index: "01",
    name: "faker-mock-setup",
    hint: "示例 · 可替换",
    summary:
      "按 OpenAPI 或接口名生成页面级 Mock，把联调从口头约定变成可复用流程。",
    bullets: ["由 URL 推导 ApiId", "页面级 mock handler", "Vue / Vite + MSW"],
    command:
      "npx skills add https://github.com/cerrda/skills --skill faker-mock-setup",
  },
];
