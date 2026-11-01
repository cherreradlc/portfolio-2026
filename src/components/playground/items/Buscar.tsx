"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/i18n/lang";

/** Search: a round magnifier that stretches into a field and back. */
export default function Buscar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      className="flex h-14 items-center overflow-hidden rounded-full border-[3px] border-ink bg-paper shadow-[5px_5px_0_rgb(43_34_48)]"
      animate={{ width: open ? 250 : 56 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      onAnimationComplete={() => open && input.current?.focus()}
    >
      <button
        type="button"
        aria-label={t({ en: "Search", es: "Buscar" })}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-pool"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="#2b2230" strokeWidth="2.8" strokeLinecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5" /></svg>
      </button>
      <input
        ref={input}
        tabIndex={open ? 0 : -1}
        placeholder={t({ en: "Find a game…", es: "Busca un juego…" })}
        aria-label={t({ en: "Search", es: "Buscar" })}
        onBlur={(e) => !e.target.value && setOpen(false)}
        className="min-w-0 flex-1 bg-transparent px-3 text-[15px] outline-none"
      />
    </motion.div>
  );
}
