"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/i18n/lang";

/** Flip card: turns over in 3D to show its back. */
export default function Voltear() {
  const { t } = useLang();
  const [back, setBack] = useState(false);
  const face = "absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-[20px] border-[3px] border-ink p-4 text-center [backface-visibility:hidden]";

  return (
    <button
      type="button"
      onClick={() => setBack((v) => !v)}
      aria-pressed={back}
      aria-label={t({ en: "Flip the card", es: "Dar vuelta la tarjeta" })}
      className="h-48 w-36 [perspective:800px]"
    >
      <motion.span
        className="relative block size-full [transform-style:preserve-3d]"
        animate={{ rotateY: back ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 14 }}
      >
        <span className={`${face} bg-pool shadow-[5px_5px_0_rgb(43_34_48)]`}>
          <span className="text-[40px]">🃏</span>
          <span className="text-[15px] font-bold">{t({ en: "Flip me", es: "Dame vuelta" })}</span>
        </span>
        <span className={`${face} bg-bubble [transform:rotateY(180deg)]`}>
          <span className="text-[40px]">🎠</span>
          <span className="text-[15px] font-bold">{t({ en: "Hello from the back!", es: "¡Hola desde atrás!" })}</span>
        </span>
      </motion.span>
    </button>
  );
}
