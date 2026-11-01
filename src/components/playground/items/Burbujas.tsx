"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const POS = [
  [18, 30, 46], [62, 18, 36], [112, 40, 52], [170, 22, 40], [210, 62, 34],
  [40, 98, 38], [96, 112, 44], [150, 96, 50], [204, 120, 30],
] as const;
const COLORES = ["#3fa9f5", "#ff8fc8", "#34c79a", "#ffc83d", "#7b4dff"];

/** Bubbles: they float; tap one and it pops into droplets, then grows back. */
export default function Burbujas() {
  const { t } = useLang();
  const [rotas, setRotas] = useState<Record<number, number>>({});

  const reventar = (i: number) => {
    setRotas((r) => ({ ...r, [i]: Date.now() }));
    window.setTimeout(() => setRotas((r) => { const n = { ...r }; delete n[i]; return n; }), 1600);
  };

  return (
    <div className="relative h-44 w-64" aria-label={t({ en: "Bubbles to pop", es: "Burbujas para reventar" })} role="group">
      {POS.map(([x, y, s], i) => {
        const c = COLORES[i % COLORES.length];
        const rota = rotas[i];
        return (
          <div key={i} className="absolute" style={{ left: x, top: y, width: s, height: s }}>
            <AnimatePresence>
              {!rota ? (
                <motion.button
                  key="b"
                  type="button"
                  aria-label={t({ en: "Pop", es: "Reventar" })}
                  onClick={() => reventar(i)}
                  className="absolute inset-0 rounded-full border-2 border-ink/70"
                  style={{ background: `radial-gradient(circle at 32% 28%, #fff 0 14%, ${c}66 15% 100%)` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, y: [0, -6, 0] }}
                  exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ y: { repeat: Infinity, duration: 2 + (i % 3) * 0.5, ease: "easeInOut" }, scale: { type: "spring", stiffness: 300, damping: 12 } }}
                />
              ) : (
                Array.from({ length: 6 }, (_, k) => {
                  const a = (k / 6) * Math.PI * 2;
                  return (
                    <motion.span key={`${rota}-${k}`} className="absolute top-1/2 left-1/2 size-2 rounded-full" style={{ background: c }}
                      initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: Math.cos(a) * s * 0.8, y: Math.sin(a) * s * 0.8 + 10, opacity: 0 }} transition={{ duration: 0.5 }} />
                  );
                })
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
