"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const COLORES = ["#ffc83d", "#ff6b57", "#34c79a", "#3fa9f5", "#7b4dff", "#ff8fc8"];
type Punto = { id: number; x: number; y: number; c: string };

/** Light painting: moving over the pad leaves a colourful trail that fades away. */
export default function Estela() {
  const { t } = useLang();
  const [puntos, setPuntos] = useState<Punto[]>([]);
  const n = useRef(0);
  const ultimo = useRef({ x: 0, y: 0 });

  return (
    <div
      className="relative h-44 w-64 cursor-crosshair touch-none overflow-hidden rounded-[22px] border-[3px] border-ink bg-[#1a2250] shadow-[5px_5px_0_rgb(43_34_48)]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        if (Math.hypot(x - ultimo.current.x, y - ultimo.current.y) < 8) return;
        ultimo.current = { x, y };
        n.current += 1;
        setPuntos((p) => [...p.slice(-45), { id: n.current, x, y, c: COLORES[n.current % COLORES.length] }]);
      }}
      role="img"
      aria-label={t({ en: "Pad that draws a light trail", es: "Pizarra que dibuja una estela de luz" })}
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[12px] tracking-wide text-white/40 uppercase">{t({ en: "Draw with light", es: "Dibuja con luz" })}</span>
      <AnimatePresence>
        {puntos.map((p) => (
          <motion.span
            key={p.id}
            className="pointer-events-none absolute size-4 rounded-full"
            style={{ left: p.x - 8, top: p.y - 8, background: p.c, boxShadow: `0 0 14px ${p.c}` }}
            initial={{ scale: 1.2, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            onAnimationComplete={() => setPuntos((list) => list.filter((x) => x.id !== p.id))}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
