"use client";

import { useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useLang } from "@/i18n/lang";

const UMBRAL = 70;

/** Pull to refresh: drag the list down; past the line a swing rocks while it reloads. */
export default function Refrescar() {
  const { t, lang } = useLang();
  const y = useMotionValue(0);
  const rotate = useTransform(y, [0, UMBRAL], [-30, 30]);
  const opacity = useTransform(y, [10, UMBRAL], [0, 1]);
  const [cargando, setCargando] = useState(false);
  const [hora, setHora] = useState<string | null>(null);

  const soltar = () => {
    if (y.get() < UMBRAL) return animate(y, 0, { type: "spring", stiffness: 400, damping: 30 });
    setCargando(true);
    animate(y, 60, { type: "spring", stiffness: 400, damping: 30 });
    window.setTimeout(() => {
      setHora(new Date().toLocaleTimeString(lang === "es" ? "es-CL" : "en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setCargando(false);
      animate(y, 0, { type: "spring", stiffness: 300, damping: 26 });
    }, 1500);
  };

  return (
    <div className="relative h-52 w-64 overflow-hidden rounded-[22px] border-[3px] border-ink bg-paper shadow-[5px_5px_0_rgb(43_34_48)]">
      <motion.div className="absolute inset-x-0 top-2 flex justify-center text-[30px]" style={{ opacity }} aria-hidden="true">
        <motion.span className="origin-top" style={{ rotate }} animate={cargando ? { rotate: [-30, 30, -30] } : undefined} transition={cargando ? { repeat: Infinity, duration: 0.9, ease: "easeInOut" } : undefined}>
          🪀
        </motion.span>
      </motion.div>
      <motion.ul
        drag={cargando ? false : "y"}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        onDragEnd={soltar}
        style={{ y }}
        className="relative flex h-full cursor-grab touch-none flex-col gap-2 bg-paper p-3 active:cursor-grabbing"
      >
        <li className="text-center font-mono text-[11px] tracking-wide text-ink/50 uppercase">
          {cargando ? t({ en: "Loading…", es: "Cargando…" }) : hora ? `${t({ en: "Updated", es: "Actualizado" })} ${hora}` : t({ en: "Pull down", es: "Tira hacia abajo" })}
        </li>
        {["🛝", "🎠", "🪁"].map((e, i) => (
          <li key={e} className="flex items-center gap-3 rounded-[12px] border-2 border-ink/80 bg-[#fff8ea] px-3 py-2 text-[14px] font-semibold">
            <span aria-hidden="true">{e}</span>
            {t([{ en: "Slide", es: "Tobogán" }, { en: "Carousel", es: "Carrusel" }, { en: "Kite", es: "Volantín" }][i])}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
