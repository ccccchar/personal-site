import type { Article } from "./articles";

export const articleBodies: Record<string, (article: Article) => string> = {
  "github-pages-next": () => `
Next.js 配置 \`output: 'export'\` 后，\`next build\` 会生成 \`out/\` 目录，可直接交给 GitHub Pages。

**项目站**（\`user.github.io/repo/\`）需要设置 \`basePath\` 与 \`assetPrefix\`，并在 CI 里按仓库名注入环境变量。

**用户站**（仓库 \`user.github.io\`）则保持 basePath 为空。

本地开发与线上一致时，使用 \`npm run dev:pages\` 预览子路径。
  `.trim(),
  "dual-github-accounts": () => `
为每个 GitHub 账号生成独立 SSH 密钥，在 \`~/.ssh/config\` 里配置不同 Host 别名，例如 \`github.com-ccccchar\`。

远程地址写成 \`git@github.com-ccccchar:org/repo.git\`，即可避免默认密钥登录到错误账号。
  `.trim(),
  placeholder: () => `
这里是文章正文占位。可改为 MDX、或从 CMS 拉取；当前为静态 export 友好的纯文本段落。
  `.trim(),
};
