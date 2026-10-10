import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** 文章、时间线等长文可略窄 */
  narrow?: boolean;
};

/**
 * 用左右内边距居中，而不是 margin: auto。
 * 截图会丢掉 auto 边距，文字会整段贴左；内边距能原样进玻璃。
 */
export function SiteContainer({ children, className = "", narrow }: Props) {
  const align = narrow
    ? "px-[calc(max(0px,(100%-56rem)/2)+1.25rem)] sm:px-[calc(max(0px,(100%-56rem)/2)+2rem)] lg:px-[calc(max(0px,(100%-56rem)/2)+3rem)]"
    : "px-[calc(max(0px,(100%-88rem)/2)+1.25rem)] sm:px-[calc(max(0px,(100%-88rem)/2)+2rem)] lg:px-[calc(max(0px,(100%-88rem)/2)+3rem)]";

  return <div className={`w-full ${align} ${className}`.trim()}>{children}</div>;
}
