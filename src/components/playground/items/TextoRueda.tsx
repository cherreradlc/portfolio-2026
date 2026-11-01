"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/i18n/lang";

/**
 * Rolling label: on hover every letter rolls up, one after another, and an
 * identical copy rolls in from below, like a slot machine. Tap on phones.
 */
export default function TextoRueda() {
  const { t } = useLang();
  const [on, setOn] = useState(false);
  const label = t({ en: "Let's play", es: "A jugar" });

  return (
    <button
      type="button"
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onClick={() => setOn((v) => !v)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      aria-label={label}
      className="flex items-center gap-3 rounded-full border-[3px] border-ink bg-grape px-8 py-4 text-[20px] font-bold text-paper uppercase shadow-[5px_5px_0_rgb(43_34_48)]"
    >
      <span className="flex overflow-hidden" aria-hidden="true">
        {label.split("").map((ch, i) => (
          <span key={i} className="relative inline-block h-[1.2em] overflow-hidden leading-[1.2em]">
            <motion.span
              className="flex flex-col"
              animate={{ y: on ? "-50%" : "0%" }}
              transition={{ type: "spring", stiffness: 380, damping: 24, delay: i * 0.03 }}
            >
              <span className="whitespace-pre">{ch}</span>
              <span className={`whitespace-pre ${i % 2 ? "text-sun" : "text-bubble"}`}>{ch}</span>
            </motion.span>
          </span>
        ))}
      </span>
      <motion.span aria-hidden="true" animate={{ rotate: on ? 45 : 0, x: on ? 4 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
        →
      </motion.span>
    </button>
  );
}
