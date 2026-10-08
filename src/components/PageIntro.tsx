import { SiteContainer } from "./SiteContainer";
import { SectionHeading } from "./SectionHeading";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageIntro({ eyebrow, title, description }: Props) {
  return (
    <SiteContainer className="pt-12 pb-8">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
    </SiteContainer>
  );
}
