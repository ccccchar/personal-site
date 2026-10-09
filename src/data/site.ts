export const site = {
  name: "ccccchar",
  logo: "/logo.jpg",
  faviconPng: "/favicon-48.png",
  appleTouchIcon: "/apple-touch-icon.png",
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
  { href: "/glass/", label: "玻璃" },
] as const;
