"use client";

import { SITE } from "@/data/site";
import { useLang } from "@/i18n/lang";

/** A small tab pinned to the right edge that opens the résumé from anywhere. */
export default function SideTab() {
  const { t } = useLang();
  return (
    <a
      href={SITE.cv}
      target="_blank"
      rel="noreferrer"
      data-cursor="PDF"
      className="group fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 flex-col items-center gap-10 rounded-l-md border border-r-0 border-line bg-white px-3 pt-4 pb-5 shadow-[0_10px_30px_-15px_rgb(43_34_48/0.3)] transition-[padding] duration-500 ease-[var(--ease-fluid)] hover:pr-5 md:flex"
    >
      <span className="font-serif text-[20px] leading-none italic text-brand">ch.</span>
      <span className="text-[12px] font-semibold tracking-[0.12em] uppercase [writing-mode:vertical-rl] rotate-180">
        {t({ en: "Resume", es: "Currículum" })} ↗
      </span>
    </a>
  );
}
