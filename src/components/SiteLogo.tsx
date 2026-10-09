import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { site } from "@/data/site";

type Props = {
  size?: number;
  className?: string;
};

export function SiteLogo({ size = 36, className = "" }: Props) {
  return (
    <Image
      src={assetPath(site.logo)}
      alt={`${site.name} logo`}
      width={size}
      height={size}
      className={`rounded-full object-cover ring-1 ring-white/20 shadow-[0_0_12px_rgba(167,139,250,0.35)] ${className}`}
      priority
    />
  );
}
