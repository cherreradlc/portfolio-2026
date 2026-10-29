"use client";

import { motion } from "motion/react";
import { useLang, type Lang } from "@/i18n/lang";

const OPTIONS: { value: Lang; label: string; name: string }[] = [
  { value: "en", label: "EN", name: "English" },
  { value: "es", label: "ES", name: "Español" },
];

/** Two-way language switch with a sliding marker, in the monospaced UI voice. */
export default function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      className="relative flex rounded-[6px] border border-line bg-white/60 p-[3px] font-mono text-[12px] backdrop-blur"
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
            className={`relative z-10 h-7 w-9 rounded-[4px] transition-colors duration-300 ${
              active ? "text-paper" : "text-ink-soft hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-marker"
                className="absolute inset-0 -z-10 rounded-[4px] bg-brand"
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
