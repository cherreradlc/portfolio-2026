"use client";

import { useLang, type T } from "@/i18n/lang";
import { FadeUp, SplitWords } from "./Reveal";

/** Numbered eyebrow, big headline and an optional aside, shared by every section. */
export default function SectionHeader({
  index,
  eyebrow,
  title,
  aside,
  dark = false,
}: {
  index: string;
  eyebrow: T;
  title: T;
  aside?: T;
  dark?: boolean;
}) {
  const { t } = useLang();
  return (
    <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <FadeUp y={14}>
          <p className={`flex items-center gap-3 text-[13px] tracking-[0.22em] ${dark ? "text-paper/50" : "text-muted"}`}>
            <span className={`h-px w-8 ${dark ? "bg-paper/40" : "bg-ink/40"}`} />
            {index} — {t(eyebrow).toUpperCase()}
          </p>
        </FadeUp>
        {/* key por idioma: al cambiarlo, el título vuelve a entrar animado */}
        <SplitWords
          key={t(title)}
          as="h2"
          text={t(title)}
          className="mt-5 text-[clamp(2.6rem,7vw,6.2rem)] leading-[0.92] font-medium tracking-[-0.045em]"
        />
      </div>
      {aside && (
        <FadeUp delay={0.2}>
          <p className={`max-w-xs text-[16px] leading-relaxed ${dark ? "text-paper/65" : "text-muted"}`}>{t(aside)}</p>
        </FadeUp>
      )}
    </div>
  );
}
