"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/i18n/lang";

/** To-do checkbox: the tick draws itself and a line crosses the task out. */
export default function Tarea() {
  const { t } = useLang();
  const [done, setDone] = useState(false);

  return (
    <label className="flex cursor-pointer items-center gap-4 rounded-[18px] border-[3px] border-ink bg-paper px-5 py-4 shadow-[5px_5px_0_rgb(43_34_48)] select-none">
      <input type="checkbox" className="peer sr-only" checked={done} onChange={(e) => setDone(e.target.checked)} />
      <motion.span
        className="flex size-8 items-center justify-center rounded-[10px] border-[3px] border-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2"
        animate={{ backgroundColor: done ? "#34c79a" : "#fff8ea", scale: done ? [1, 1.25, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="#2b2230" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <motion.path d="m5 12.5 4.5 4.5L19 7.5" initial={false} animate={{ pathLength: done ? 1 : 0 }} transition={{ duration: 0.3, delay: done ? 0.1 : 0 }} />
        </svg>
      </motion.span>
      <span className="relative text-[17px] font-semibold">
        {t({ en: "Go down the slide", es: "Tirarme por el tobogán" })}
        <motion.span className="absolute top-1/2 left-0 h-[3px] w-full origin-left rounded-full bg-coral" initial={false} animate={{ scaleX: done ? 1 : 0 }} transition={{ duration: 0.35, delay: done ? 0.25 : 0 }} />
      </span>
    </label>
  );
}
