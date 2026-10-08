export const site = {
  name: "ccccchar",
  tagline: "",
  headline: "",
  description: "",
  copyright: "ccccchar",
  links: {
    email: "",
    github: "https://github.com/ccccchar",
    juejin: "",
  },
} as const;

export const nav = [
  { href: "/about/", label: "关于" },
  { href: "/opensource/", label: "开源" },
  { href: "/skills/", label: "技能" },
  { href: "/writing/", label: "文章" },
  { href: "/timeline/", label: "轨迹" },
] as const;
