"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const CARA = (v: number) => (v === 0 ? "😴" : v < 40 ? "🙂" : v < 75 ? "😄" : "🤩");

/** Volume slider: the track fills with colour and the face reacts to the level. */
export default function Volumen() {
  const { t } = useLang();
  const [v, setV] = useState(50);
  const cara = CARA(v);

  return (
    <div className="flex w-60 flex-col items-center gap-4">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={cara} className="text-[44px] leading-none" aria-hidden="true"
          initial={{ scale: 0.4, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0.4, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 14 }}>
          {cara}
        </motion.span>
      </AnimatePresence>
      <input
        type="range"
        min={0}
        max={100}
        value={v}
        onChange={(e) => setV(+e.target.value)}
        aria-label={t({ en: "Volume", es: "Volumen" })}
        className="h-5 w-full cursor-pointer appearance-none rounded-full border-[3px] border-ink [&::-moz-range-thumb]:size-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-ink [&::-moz-range-thumb]:bg-paper [&::-webkit-slider-thumb]:size-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-paper [&::-webkit-slider-thumb]:shadow-[2px_2px_0_rgb(43_34_48)]"
        style={{ background: `linear-gradient(90deg, #ff8fc8 0%, #ffc83d ${v}%, #fff ${v}%)` }}
      />
    </div>
  );
}
