"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

/** Accordion: the answer slides open and the plus turns into a minus. */
export default function Acordeon() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="w-64 overflow-hidden rounded-[20px] border-[3px] border-ink bg-sun shadow-[5px_5px_0_rgb(43_34_48)]">
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[16px] font-bold">
        {t({ en: "How do I play?", es: "¿Cómo se juega?" })}
        <span className="relative size-4" aria-hidden="true">
          <span className="absolute top-1/2 left-0 h-[3px] w-4 -translate-y-1/2 rounded-full bg-ink" />
          <motion.span className="absolute top-1/2 left-0 h-[3px] w-4 -translate-y-1/2 rounded-full bg-ink" animate={{ rotate: open ? 0 : 90 }} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={id} initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ type: "spring", stiffness: 260, damping: 30 }} className="overflow-hidden">
            <p className="border-t-[3px] border-ink bg-paper px-5 py-4 text-[14.5px] leading-relaxed">
              {t({ en: "Touch everything. Nothing breaks, and every piece has an “i” telling how it was made.", es: "Toca todo. Nada se rompe, y cada pieza tiene una “i” que cuenta cómo se hizo." })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
