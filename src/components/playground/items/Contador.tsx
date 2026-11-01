"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

/** Stepper: the number rolls up or down depending on which side you press. */
export default function Contador() {
  const { t } = useLang();
  const [n, setN] = useState(3);
  const [dir, setDir] = useState(1);
  const btn = "flex size-12 items-center justify-center rounded-full border-[3px] border-ink text-[24px] font-bold shadow-[3px_3px_0_rgb(43_34_48)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-40";

  return (
    <div className="flex items-center gap-4">
      <button type="button" className={`${btn} bg-bubble`} disabled={n === 0} aria-label={t({ en: "Less", es: "Menos" })} onClick={() => { setDir(-1); setN((v) => v - 1); }}>−</button>
      <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-[16px] border-[3px] border-ink bg-paper text-[32px] font-bold tabular-nums" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.span key={n} custom={dir}
            initial={{ y: dir * 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: dir * -40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}>
            {n}
          </motion.span>
        </AnimatePresence>
      </span>
      <button type="button" className={`${btn} bg-mint`} disabled={n === 9} aria-label={t({ en: "More", es: "Más" })} onClick={() => { setDir(1); setN((v) => v + 1); }}>+</button>
    </div>
  );
}
