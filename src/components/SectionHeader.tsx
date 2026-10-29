"use client";

import { useLang, type T } from "@/i18n/lang";
import { FadeUp } from "./Reveal";

/** A thin monospaced label row that opens a section: index, name and a note. */
export default function SectionHeader({ index, eyebrow, meta }: { index: string; eyebrow: T; meta?: string }) {
  const { t } = useLang();
  return (
    <FadeUp y={14} className="mb-12 md:mb-16">
      <p className="flex items-center justify-between gap-4 border-b border-line pb-4 font-mono text-[12.5px] tracking-wide uppercase">
        <span>
          <span className="text-muted">({index})</span> {t(eyebrow)}
        </span>
        {meta && <span className="text-muted">{meta}</span>}
      </p>
    </FadeUp>
  );
}
