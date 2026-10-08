export type TimelineEntry = {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    year: "2026",
    title: "个人站上线",
    subtitle: "Next.js · GitHub Pages",
    description:
      "搭建多页面个人站，开源工具与文章轨迹集中展示，参考 cerrda 信息架构。",
    tags: ["Next.js", "Tailwind", "CI"],
  },
  {
    year: "2025",
    title: "国际化活动与 H5",
    subtitle: "业务交付",
    description: "活动页、网关与多语言配置等企业级前端实践。（按你的经历修改）",
    tags: ["React", "i18n"],
  },
  {
    year: "—",
    title: "更早的经历",
    description: "在 src/data/timeline.ts 按时间倒序补充教育、项目与里程碑。",
    tags: ["编辑我"],
  },
];
