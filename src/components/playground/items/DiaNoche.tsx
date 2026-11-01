"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const ESTRELLAS = [
  [22, 14, 3], [40, 30, 2], [58, 12, 2.5], [30, 40, 1.8], [50, 42, 2.2],
] as const;

/**
 * Day/night switch: the sun rolls over and becomes the moon, stars come out,
 * and the whole page turns to night (html[data-noche] in globals.css). Leaving
 * the playground brings the day back.
 */
export default function DiaNoche() {
  const { t } = useLang();
  const [noche, setNoche] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (noche) html.dataset.noche = "";
    else delete html.dataset.noche;
    return () => {
      delete html.dataset.noche;
    };
  }, [noche]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={noche}
      aria-label={t({ en: "Night mode", es: "Modo noche" })}
      onClick={() => setNoche((v) => !v)}
      className={`relative h-[68px] w-[148px] overflow-hidden rounded-full border-[3px] border-ink shadow-[5px_5px_0_rgb(43_34_48)] transition-colors duration-500 ${noche ? "bg-[#1f2a5c]" : "bg-[#9fd8ff]"}`}
    >
      {/* nubes de día */}
      <AnimatePresence>
        {!noche && (
          <motion.span className="absolute top-[34px] right-4 flex" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }} transition={{ duration: 0.4 }}>
            <span className="size-5 rounded-full bg-white" />
            <span className="-ml-2 -mt-2 size-7 rounded-full bg-white" />
            <span className="-ml-2 size-5 rounded-full bg-white" />
          </motion.span>
        )}
      </AnimatePresence>
      {/* estrellas de noche */}
      <AnimatePresence>
        {noche &&
          ESTRELLAS.map(([x, y, r], i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white"
              style={{ left: x, top: y, width: r * 2, height: r * 2 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.6, 1], opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
            />
          ))}
      </AnimatePresence>
      {/* sol que rueda y se convierte en luna */}
      <motion.span
        className="absolute top-[6px] left-[6px] size-[50px] rounded-full border-[3px] border-ink"
        animate={{ x: noche ? 80 : 0, rotate: noche ? 360 : 0, backgroundColor: noche ? "#e9e6f5" : "#ffc83d" }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
      >
        <motion.span className="absolute top-[9px] left-[22px] size-[9px] rounded-full bg-[#b9b3d6]" animate={{ scale: noche ? 1 : 0 }} transition={{ delay: noche ? 0.25 : 0 }} />
        <motion.span className="absolute top-[24px] left-[9px] size-[12px] rounded-full bg-[#b9b3d6]" animate={{ scale: noche ? 1 : 0 }} transition={{ delay: noche ? 0.3 : 0 }} />
        <motion.span className="absolute top-[28px] left-[27px] size-[6px] rounded-full bg-[#b9b3d6]" animate={{ scale: noche ? 1 : 0 }} transition={{ delay: noche ? 0.35 : 0 }} />
      </motion.span>
    </button>
  );
}
