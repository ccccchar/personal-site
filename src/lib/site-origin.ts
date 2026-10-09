/** 站点根 URL（用于 metadataBase、绝对链接）；本地 dev 默认 localhost */
export function siteOrigin(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (process.env.NODE_ENV === "production" && basePath) {
    return `https://ccccchar.github.io${basePath}`;
  }
  const port = process.env.PORT ?? "3000";
  return `http://localhost:${port}${basePath}`;
}
