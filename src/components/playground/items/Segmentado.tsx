"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const OPCIONES = [
  { en: "Swing", es: "Columpio" },
  { en: "Slide", es: "Tobogán" },
  { en: "Sand", es: "Arena" },
];

/** Segmented control: a coloured pill slides under the chosen option. */
export default function Segmentado() {
  const { t } = useLang();
  const [sel, setSel] = useState(0);

  return (
    <div role="radiogroup" aria-label={t({ en: "Pick a game", es: "Elige un juego" })} className="flex rounded-full border-[3px] border-ink bg-paper p-1.5 shadow-[5px_5px_0_rgb(43_34_48)]">
      {OPCIONES.map((o, i) => (
        <button
          key={o.en}
          type="button"
          role="radio"
          aria-checked={sel === i}
          onClick={() => setSel(i)}
          className="relative rounded-full px-4 py-2 text-[15px] font-semibold"
        >
          {sel === i && (
            <motion.span layoutId="segmentado-pill" className="absolute inset-0 rounded-full border-2 border-ink bg-sun" transition={{ type: "spring", stiffness: 420, damping: 30 }} />
          )}
          <span className="relative">{t(o)}</span>
        </button>
      ))}
    </div>
  );
}
