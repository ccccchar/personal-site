import { AmbientBackground } from "./AmbientBackground";
import { BootLoader } from "./BootLoader";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BootLoader />
      <AmbientBackground />
      <SiteHeader />
      <div className="flex min-h-[calc(100vh-8rem)] flex-col">{children}</div>
      <SiteFooter />
    </>
  );
}
