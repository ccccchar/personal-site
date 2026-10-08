import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** 文章、时间线等长文可略窄 */
  narrow?: boolean;
};

export function SiteContainer({ children, className = "", narrow }: Props) {
  const width = narrow ? "max-w-4xl" : "max-w-[88rem]";
  return (
    <div
      className={`mx-auto w-full ${width} px-5 sm:px-8 lg:px-12 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
