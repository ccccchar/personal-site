import { assetPath } from "@/lib/asset-path";
import { site } from "@/data/site";

/** 仅使用 public 静态资源，避免 Next app/favicon.ico 注入默认 N 图标 */
export function SiteHeadIcons() {
  const ico = assetPath("/favicon.ico");
  const png = assetPath(site.faviconPng);
  const logo = assetPath(site.logo);
  const apple = assetPath(site.appleTouchIcon);

  return (
    <>
      <link rel="icon" href={ico} sizes="any" type="image/x-icon" />
      <link rel="icon" href={png} type="image/png" sizes="48x48" />
      <link rel="icon" href={logo} type="image/jpeg" sizes="any" />
      <link rel="apple-touch-icon" href={apple} type="image/png" />
    </>
  );
}
