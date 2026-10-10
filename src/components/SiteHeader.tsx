import { fluidFullCanvas, glassNavVariant } from "@/config/glass";
import { GlassNavWrapper } from "@/components/glass/GlassNavWrapper";
import { FluidTopSphereCanvas } from "@/components/fluid/FluidTopSphereCanvas";
import { SiteHeaderContent } from "./SiteHeaderContent";

export function SiteHeader() {
  if (fluidFullCanvas) {
    return (
      <header className="sticky top-3 z-50 px-3 sm:px-5">
        <div
          data-nav-glass-bar
          className="relative overflow-hidden rounded-[1.75rem] border border-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_10px_30px_rgba(0,0,0,0.18)]"
        >
          <div className="pointer-events-none absolute inset-0">
            <FluidTopSphereCanvas />
          </div>
          <div className="relative z-10">
            <SiteHeaderContent />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50">
      <GlassNavWrapper variant={glassNavVariant}>
        <SiteHeaderContent />
      </GlassNavWrapper>
    </header>
  );
}
