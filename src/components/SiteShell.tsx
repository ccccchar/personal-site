import { fluidBarChrome } from "@/config/glass";
import { siteMainBottomPadVh } from "@/config/layout";
import { FluidBarChrome } from "@/components/fluid";
import { AmbientBackground } from "./AmbientBackground";
import { BootLoader } from "./BootLoader";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({ children }: { children: React.ReactNode }) {
  if (fluidBarChrome) {
    return (
      <>
        <BootLoader />
        <FluidBarChrome>
          <div className="flex min-h-screen flex-col">{children}</div>
          <SiteFooter />
        </FluidBarChrome>
      </>
    );
  }

  return (
    <>
      <BootLoader />
      <AmbientBackground />
      <SiteHeader />
      <div
        id="site-main"
        className="relative z-0 flex min-h-[calc(100vh-8rem)] flex-col"
        style={{ paddingBottom: `${siteMainBottomPadVh}vh` }}
      >
        {children}
      </div>
      <SiteFooter />
    </>
  );
}
