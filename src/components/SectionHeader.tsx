import { FadeUp, Rule, SplitWords } from "./Reveal";

/**
 * Section opener in the magazine style: a rule that draws across, a small
 * label with the section number on the left and the title in the display
 * serif. No eyebrow-dash-number pattern; just the folio and the headline.
 */
export default function SectionHeader({
  index,
  eyebrow,
  title,
  aside,
  dark = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  aside?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <Rule className={dark ? "text-paper/30" : "text-ink"} />
      <div className="mt-4 grid gap-6 md:grid-cols-12">
        <FadeUp y={10} className="md:col-span-3">
          <p className={`label ${dark ? "text-sky" : "text-muted"}`}>
            {eyebrow} <span className="ml-2 font-serif text-[13px] tracking-normal normal-case italic">({index})</span>
          </p>
        </FadeUp>
        <div className="md:col-span-9">
          <SplitWords
            as="h2"
            text={title}
            className="font-serif text-[clamp(2.4rem,5.6vw,5.2rem)] leading-[0.98] tracking-[-0.02em]"
          />
          {aside && (
            <FadeUp delay={0.15}>
              <p className={`mt-5 max-w-xl text-[16.5px] leading-relaxed ${dark ? "text-paper/70" : "text-ink-soft"}`}>
                {aside}
              </p>
            </FadeUp>
          )}
        </div>
      </div>
    </div>
  );
}
