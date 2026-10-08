export const site = {
  name: "ccccchar",
  tagline: "Frontend · Engineering · DX",
  headline: "把工程习惯，写成可复用的工具与页面",
  description:
    "前端方向工程师，关注工程化、开发者体验与可维护的交付。开源小工具、活动页与联调实践。",
  copyright: "ccccchar",
  links: {
    email: "mailto:hello@example.com",
    github: "https://github.com/ccccchar",
    juejin: "https://juejin.cn",
  },
} as const;

export const nav = [
  { href: "/about/", label: "关于" },
  { href: "/opensource/", label: "开源" },
  { href: "/skills/", label: "技能" },
  { href: "/writing/", label: "文章" },
  { href: "/timeline/", label: "轨迹" },
] as const;
