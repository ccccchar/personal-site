type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, id }: Props) {
  return (
    <div id={id} className="mb-10 scroll-mt-24">
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-400/90">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-400 lg:max-w-none">
          {description}
        </p>
      ) : null}
    </div>
  );
}
