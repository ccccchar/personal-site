# personal-site

基于 **Next.js（App Router）+ 静态导出** 的个人站，通过 **GitHub Actions** 发布到 [GitHub Pages](https://docs.github.com/en/pages)。

## 本地开发

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

若 GitHub 仓库名不是 `用户名.github.io`（即站点在子路径 `/仓库名/` 下），本地请用：

```bash
npm run dev:pages
```

（默认按仓库名 `personal-site` 设置 `NEXT_PUBLIC_BASE_PATH`，改名后请改 `package.json` 里对应脚本。）

## 发布

1. 在 GitHub 创建仓库并推送本项目（`main` 分支）。
2. **Settings → Pages → Build and deployment** 选择 **GitHub Actions**。
3. 推送代码后，`Deploy GitHub Pages` workflow 会自动 `npm run build`，将 `out/` 部署到 Pages。

| 仓库类型 | 访问地址 |
|----------|----------|
| 普通仓库 `my-site` | `https://<user>.github.io/my-site/` |
| 用户站 `user.github.io` | `https://<user>.github.io/` |

## 常用命令

```bash
npm run build   # 生成静态文件到 out/
npm run lint
```

## 目录

- `src/app/` — 页面与布局
- `public/` — 静态资源（含 `.nojekyll`，避免 Pages 误用 Jekyll）
- `.github/workflows/deploy.yml` — CI 部署
