import { PageIntro } from "@/components/PageIntro";
import { SiteContainer } from "@/components/SiteContainer";
import { GlassPlayground, GlassWebglVariantsPlayground } from "@/components/glass";

export const metadata = {
  title: "玻璃对比",
};

export default function GlassLabPage() {
  return (
    <>
      <PageIntro
        eyebrow="Lab"
        title="液态玻璃对比"
        description="三种实现分包：css/、svg/、webgl/。切换导航请改 src/config/glass.ts。"
      />
      <SiteContainer className="space-y-14 pb-20">
        <GlassPlayground />
        <GlassWebglVariantsPlayground />
      </SiteContainer>
    </>
  );
}
