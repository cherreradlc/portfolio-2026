"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const COLORES = ["#ffc83d", "#ff6b57", "#34c79a", "#3fa9f5", "#7b4dff", "#ff8fc8"];
type Pieza = { id: string; x: number; y: number; r: number; color: string; w: number };

/** Party button: each press throws a handful of confetti that falls and spins. */
export default function Confeti() {
  const { t } = useLang();
  const [piezas, setPiezas] = useState<Pieza[]>([]);

  const lanzar = () => {
    const tiro = Date.now();
    const nuevas = Array.from({ length: 26 }, (_, i) => {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
      const v = 90 + Math.random() * 110;
      return { id: `${tiro}-${i}`, x: Math.cos(a) * v, y: Math.sin(a) * v, r: (Math.random() - 0.5) * 720, color: COLORES[i % COLORES.length], w: 6 + Math.random() * 6 };
    });
    setPiezas(nuevas);
  };

  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence>
        {piezas.map((p) => (
          <motion.span
            key={p.id}
            className="pointer-events-none absolute top-1/2 left-1/2 h-3 rounded-[2px]"
            style={{ width: p.w, background: p.color }}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{ x: [0, p.x, p.x * 1.15], y: [0, p.y, p.y + 140], rotate: p.r, opacity: [1, 1, 0] }}
            transition={{ duration: 1.3, times: [0, 0.4, 1], ease: "easeOut" }}
            onAnimationComplete={() => setPiezas((list) => list.filter((x) => x.id !== p.id))}
          />
        ))}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={lanzar}
        whileTap={{ scale: 0.9, rotate: -4 }}
        className="relative rounded-full border-[3px] border-ink bg-sun px-7 py-4 text-[18px] font-bold shadow-[5px_5px_0_rgb(43_34_48)]"
      >
        🎉 {t({ en: "Party!", es: "¡Fiesta!" })}
      </motion.button>
    </div>
  );
}
