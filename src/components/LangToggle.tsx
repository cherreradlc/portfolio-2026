"use client";

import { motion } from "motion/react";
import { useLang, type Lang } from "@/i18n/lang";

const OPTIONS: { value: Lang; label: string; name: string }[] = [
  { value: "en", label: "EN", name: "English" },
  { value: "es", label: "ES", name: "Español" },
];

/**
 * Two-way language switch with a sliding marker. `dark` styles it for the
 * plum mobile menu.
 */
export default function LangToggle({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      className={`relative flex rounded-full border p-1 text-[12.5px] font-medium tracking-wide ${
        dark ? "border-paper/25" : "border-line bg-paper/70 backdrop-blur"
      }`}
    >
      {OPTIONS.map((o) => {
        const active = lang === o.value;
        return (
          <button
            key={o.value}
            type="button"
            lang={o.value}
            onClick={() => setLang(o.value)}
            aria-pressed={active}
            aria-label={o.name}
            className={`relative z-10 h-8 w-10 rounded-full transition-colors duration-300 ${
              active ? (dark ? "text-brand-deep" : "text-paper") : dark ? "text-paper/70 hover:text-paper" : "text-ink-soft hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId={dark ? "lang-marker-dark" : "lang-marker"}
                className={`absolute inset-0 -z-10 rounded-full ${dark ? "bg-sky" : "bg-brand"}`}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
