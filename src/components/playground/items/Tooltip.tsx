"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

/** Tooltip: a speech bubble springs up when you hover or focus the button. */
export default function Tooltip() {
  const { t } = useLang();
  const [on, setOn] = useState(false);
  const id = useId();

  return (
    <div className="relative flex flex-col items-center pt-20">
      <AnimatePresence>
        {on && (
          <motion.span
            id={id}
            role="tooltip"
            className="absolute top-0 w-48 rounded-[16px] border-[3px] border-ink bg-paper px-4 py-2.5 text-center text-[14px] font-semibold shadow-[4px_4px_0_rgb(43_34_48)]"
            initial={{ y: 12, scale: 0.6, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 8, scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            {t({ en: "Psst! I'm a tooltip", es: "¡Psst! Soy un tooltip" })}
            <span className="absolute -bottom-[9px] left-1/2 size-4 -translate-x-1/2 rotate-45 border-r-[3px] border-b-[3px] border-ink bg-paper" />
          </motion.span>
        )}
      </AnimatePresence>
      <button
        type="button"
        aria-describedby={on ? id : undefined}
        onMouseEnter={() => setOn(true)}
        onMouseLeave={() => setOn(false)}
        onFocus={() => setOn(true)}
        onBlur={() => setOn(false)}
        onClick={() => setOn((v) => !v)}
        className="flex size-14 items-center justify-center rounded-full border-[3px] border-ink bg-coral text-[26px] font-bold shadow-[4px_4px_0_rgb(43_34_48)]"
      >
        ?
      </button>
    </div>
  );
}
