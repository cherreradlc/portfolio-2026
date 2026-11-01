"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

/** Skeleton loading: grey shapes with a passing shine, then the real card. */
export default function Esqueleto() {
  const { t } = useLang();
  const [cargando, setCargando] = useState(true);
  const [vuelta, setVuelta] = useState(0);

  useEffect(() => {
    if (!cargando) return;
    const id = window.setTimeout(() => setCargando(false), 2000);
    return () => window.clearTimeout(id);
  }, [cargando, vuelta]);

  const brillo = "relative overflow-hidden rounded-[8px] bg-ink/10 after:absolute after:inset-0 after:-translate-x-full after:animate-[brillo_1.2s_infinite] after:bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.7),transparent)]";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-36 w-60 rounded-[18px] border-[3px] border-ink bg-paper p-4 shadow-[4px_4px_0_rgb(43_34_48)]" aria-busy={cargando}>
        <AnimatePresence mode="wait">
          {cargando ? (
            <motion.div key="sk" className="flex h-full gap-3" exit={{ opacity: 0 }}>
              <div className={`size-14 shrink-0 rounded-full ${brillo}`} />
              <div className="flex flex-1 flex-col gap-2.5 pt-1">
                <div className={`h-4 w-4/5 ${brillo}`} />
                <div className={`h-3 w-full ${brillo}`} />
                <div className={`h-3 w-3/5 ${brillo}`} />
              </div>
            </motion.div>
          ) : (
            <motion.div key="ok" className="flex h-full gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-sun text-[28px]" aria-hidden="true">🎡</span>
              <div className="pt-1">
                <p className="text-[16px] font-bold">{t({ en: "Ferris wheel", es: "Rueda de la fortuna" })}</p>
                <p className="mt-1 text-[13px] leading-snug text-ink/70">{t({ en: "Open every day, 10 to 20 h", es: "Abierta todos los días, de 10 a 20 h" })}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button type="button" onClick={() => { setCargando(true); setVuelta((v) => v + 1); }} className="rounded-full border-2 border-ink bg-paper px-4 py-1.5 text-[13px] font-bold">
        ↻ {t({ en: "Reload", es: "Recargar" })}
      </button>
    </div>
  );
}
