"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

/** Add to cart: the balloon flies in an arc to the cart and the count jumps. */
export default function Carrito() {
  const { t } = useLang();
  const [total, setTotal] = useState(0);
  const [vuelos, setVuelos] = useState<number[]>([]);

  return (
    <div className="relative flex w-64 items-end justify-between">
      <div className="flex flex-col items-center gap-2 rounded-[18px] border-[3px] border-ink bg-paper p-3 shadow-[4px_4px_0_rgb(43_34_48)]">
        <span className="text-[38px] leading-none" aria-hidden="true">🎈</span>
        <button
          type="button"
          onClick={() => setVuelos((v) => [...v, Date.now()])}
          className="rounded-full border-2 border-ink bg-coral px-3 py-1 text-[13px] font-bold"
        >
          + {t({ en: "Add", es: "Agregar" })}
        </button>
      </div>

      <AnimatePresence>
        {vuelos.map((id) => (
          <motion.span
            key={id}
            className="pointer-events-none absolute top-1 left-6 text-[30px]"
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{ x: [0, 90, 176], y: [0, -70, 26], scale: [1, 1.1, 0.4], rotate: [0, -20, 10] }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            onAnimationComplete={() => {
              setVuelos((v) => v.filter((x) => x !== id));
              setTotal((n) => n + 1);
            }}
            aria-hidden="true"
          >
            🎈
          </motion.span>
        ))}
      </AnimatePresence>

      <motion.div key={total} className="relative" initial={{ scale: 1 }} animate={total ? { scale: [1, 1.3, 0.9, 1], rotate: [0, -8, 6, 0] } : {}} transition={{ duration: 0.45 }}>
        <span className="flex size-16 items-center justify-center rounded-full border-[3px] border-ink bg-pool text-[28px] shadow-[4px_4px_0_rgb(43_34_48)]" aria-hidden="true">🛒</span>
        <span className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full border-2 border-ink bg-sun text-[13px] font-bold" aria-label={t({ en: "Items in cart", es: "Productos en el carro" })} aria-live="polite">
          {total}
        </span>
      </motion.div>
    </div>
  );
}
