"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const AVISOS = [
  { en: "Your swing is ready!", es: "¡Tu columpio está listo!", emoji: "🛝", bg: "bg-mint" },
  { en: "New friend in the sandbox", es: "Nueva amiga en el arenero", emoji: "🏖️", bg: "bg-sun" },
  { en: "Ice cream truck nearby", es: "Pasa el carro de los helados", emoji: "🍦", bg: "bg-bubble" },
];
type Aviso = { id: number; i: number };

/** Toasts: they slide in, leave on their own and can be swiped away. */
export default function Toast() {
  const { t } = useLang();
  const [lista, setLista] = useState<Aviso[]>([]);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!lista.length) return;
    const id = window.setTimeout(() => setLista((l) => l.slice(1)), 3200);
    return () => window.clearTimeout(id);
  }, [lista]);

  return (
    <div className="flex w-64 flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => { setLista((l) => [...l.slice(-2), { id: Date.now(), i: n % AVISOS.length }]); setN((v) => v + 1); }}
        className="rounded-full border-[3px] border-ink bg-paper px-6 py-3 text-[15px] font-bold shadow-[4px_4px_0_rgb(43_34_48)]"
      >
        🔔 {t({ en: "Notify me", es: "Avísame" })}
      </button>
      <ul className="flex min-h-[150px] w-full flex-col gap-2" aria-live="polite">
        <AnimatePresence initial={false}>
          {lista.map((a) => {
            const aviso = AVISOS[a.i];
            return (
              <motion.li
                key={a.id}
                layout
                drag="x"
                dragSnapToOrigin
                onDragEnd={(_, info) => Math.abs(info.offset.x) > 80 && setLista((l) => l.filter((x) => x.id !== a.id))}
                initial={{ y: 30, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ x: 120, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`flex cursor-grab touch-pan-y items-center gap-2 rounded-[14px] border-[3px] border-ink px-3 py-2 text-[14px] font-semibold shadow-[3px_3px_0_rgb(43_34_48)] ${aviso.bg}`}
              >
                <span aria-hidden="true">{aviso.emoji}</span> {t(aviso)}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
