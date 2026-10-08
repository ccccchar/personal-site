import type { NextConfig } from "next";

/**
 * GitHub Pages 项目站地址为 https://<user>.github.io/<repo>/
 * 构建时由 CI 注入；本地预览项目站请：NEXT_PUBLIC_BASE_PATH=/personal-site npm run dev
 * 用户站（仓库名 <user>.github.io）留空即可。
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
