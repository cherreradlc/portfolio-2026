"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const COLORES = ["#ffc83d", "#ff6b57", "#34c79a", "#3fa9f5", "#ff8fc8"];
type Onda = { id: number; x: number; y: number; color: string };

/** Ripple button: every click drops a coloured wave from where you touched. */
export default function Onda() {
  const { t } = useLang();
  const [ondas, setOndas] = useState<Onda[]>([]);

  return (
    <button
      type="button"
      onPointerDown={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const o = { id: Date.now() + Math.random(), x: e.clientX - r.left, y: e.clientY - r.top, color: COLORES[Math.floor(Math.random() * COLORES.length)] };
        setOndas((list) => [...list.slice(-6), o]);
      }}
      className="relative h-16 w-56 overflow-hidden rounded-[18px] border-[3px] border-ink bg-grape text-[18px] font-bold text-paper shadow-[5px_5px_0_rgb(43_34_48)]"
    >
      <AnimatePresence>
        {ondas.map((o) => (
          <motion.span
            key={o.id}
            className="pointer-events-none absolute size-10 rounded-full"
            style={{ left: o.x - 20, top: o.y - 20, background: o.color }}
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 14, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() => setOndas((list) => list.filter((x) => x.id !== o.id))}
          />
        ))}
      </AnimatePresence>
      <span className="relative">{t({ en: "Make waves", es: "Haz olas" })}</span>
    </button>
  );
}
