import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeadIcons } from "@/components/SiteHeadIcons";
import { SiteShell } from "@/components/SiteShell";
import { assetPath } from "@/lib/asset-path";
import { siteOrigin } from "@/lib/site-origin";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description || undefined,
  icons: {
    icon: [
      { url: assetPath("/favicon.ico"), sizes: "any", type: "image/x-icon" },
      { url: assetPath(site.faviconPng), type: "image/png", sizes: "48x48" },
      { url: assetPath(site.logo), type: "image/jpeg", sizes: "any" },
    ],
    apple: [{ url: assetPath(site.appleTouchIcon), type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <SiteHeadIcons />
      </head>
      <body className="min-h-full flex flex-col text-zinc-100">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
