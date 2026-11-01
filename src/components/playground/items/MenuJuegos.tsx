"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const OPCIONES = [
  { label: { en: "Swings", es: "Columpios" }, bg: "bg-sun" },
  { label: { en: "Slide", es: "Tobogán" }, bg: "bg-mint" },
  { label: { en: "Seesaw", es: "Balancín" }, bg: "bg-pool" },
  { label: { en: "Sandbox", es: "Arenero" }, bg: "bg-coral" },
];

/** Menu: the burger turns into an ✕ and the options pop out one by one. */
export default function MenuJuegos() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? t({ en: "Close menu", es: "Cerrar menú" }) : t({ en: "Open menu", es: "Abrir menú" })}
        onClick={() => setOpen((v) => !v)}
        className="relative flex size-16 items-center justify-center rounded-full border-[3px] border-ink bg-bubble shadow-[5px_5px_0_rgb(43_34_48)]"
      >
        {[-8, 0, 8].map((y, i) => (
          <motion.span
            key={i}
            className="absolute h-[3px] w-7 rounded-full bg-ink"
            animate={
              open
                ? { y: 0, rotate: i === 1 ? 0 : i === 0 ? 45 : -45, opacity: i === 1 ? 0 : 1, scaleX: i === 1 ? 0 : 1 }
                : { y, rotate: 0, opacity: 1, scaleX: 1 }
            }
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
          />
        ))}
      </button>

      <ul id={id} className="mt-4 flex flex-col items-center gap-2.5">
        <AnimatePresence>
          {open &&
            OPCIONES.map((o, i) => (
              <motion.li
                key={o.label.en}
                initial={{ y: -16, scale: 0.6, opacity: 0, rotate: i % 2 ? 6 : -6 }}
                animate={{ y: 0, scale: 1, opacity: 1, rotate: i % 2 ? 2 : -2 }}
                exit={{ y: -10, scale: 0.6, opacity: 0, transition: { delay: (OPCIONES.length - 1 - i) * 0.04 } }}
                transition={{ type: "spring", stiffness: 420, damping: 18, delay: i * 0.07 }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`rounded-full border-[3px] border-ink px-5 py-1.5 text-[15px] font-semibold shadow-[3px_3px_0_rgb(43_34_48)] transition-transform hover:-translate-y-0.5 ${o.bg}`}
                >
                  {t(o.label)}
                </button>
              </motion.li>
            ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
