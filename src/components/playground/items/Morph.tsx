"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/i18n/lang";

// Play y pausa con los mismos puntos, para que una forma se transforme en la otra.
const PAUSA = ["M6 5 L10 5 L10 19 L6 19 Z", "M14 5 L18 5 L18 19 L14 19 Z"];
const PLAY = ["M7 4.5 L13 8 L13 16 L7 19.5 Z", "M13 8 L20 12 L20 12 L13 16 Z"];

/** Morphing icon: play melts into pause and back. */
export default function Morph() {
  const { t } = useLang();
  const [play, setPlay] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => setPlay((v) => !v)}
      aria-label={play ? t({ en: "Pause", es: "Pausar" }) : t({ en: "Play", es: "Reproducir" })}
      className="flex size-20 items-center justify-center rounded-full border-[3px] border-ink bg-pool shadow-[5px_5px_0_rgb(43_34_48)]"
      whileTap={{ scale: 0.9 }}
    >
      <svg viewBox="0 0 24 24" className="size-10" aria-hidden="true">
        {[0, 1].map((k) => (
          <motion.path
            key={k}
            fill="#2b2230"
            stroke="#2b2230"
            strokeWidth="1"
            strokeLinejoin="round"
            initial={false}
            animate={{ d: play ? PAUSA[k] : PLAY[k] }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          />
        ))}
      </svg>
    </motion.button>
  );
}
