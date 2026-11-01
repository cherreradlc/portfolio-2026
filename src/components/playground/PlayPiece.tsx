"use client";

import { motion } from "motion/react";
import type { PlayItem } from "@/data/playground";
import { useLang } from "@/i18n/lang";
import { ITEMS } from "./items";
import { markPlay } from "./plays";
import { DAY_INK } from "./colors";

/**
 * A piece loose in the park: the live component, a hand-written name with a
 * little arrow, and a round "i" sticker that opens how it was built.
 */
export default function PlayPiece({ item, onInfo }: { item: PlayItem; onInfo: () => void }) {
  const { t } = useLang();
  const Live = ITEMS[item.slug];

  return (
    <div className="relative flex flex-col items-center gap-5">
      {/* cada vez que alguien juega con la pieza suma una jugada */}
      {/* las piezas conservan su tinta y papel de día también en modo noche */}
      <div onPointerDown={() => markPlay(item.slug)} onKeyDown={() => markPlay(item.slug)} className="text-ink" style={DAY_INK}>
        {Live ? <Live /> : null}
      </div>

      <div className="flex items-center gap-3" style={{ rotate: `${item.tilt}deg` }}>
        <svg viewBox="0 0 40 30" className="w-8 -scale-x-100 text-ink" aria-hidden="true">
          <path d="M4 26 C10 10 22 6 34 8 M27 3 L34 8 L28 14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-serif text-[22px] italic">{t(item.title)}</span>
        {/* la "i" aparece cuando la pieza ya tiene sus capturas de Figma */}
        {item.shots.length > 0 && <motion.button
          type="button"
          onClick={onInfo}
          aria-haspopup="dialog"
          aria-label={`${t({ en: "How it was built", es: "Cómo se construyó" })}: ${t(item.title)}`}
          className="flex size-9 items-center justify-center rounded-full border-2 border-ink/25 bg-paper/80 font-serif text-[18px] text-ink/60 italic backdrop-blur-sm transition-colors hover:border-ink/50 hover:text-ink"
          whileHover={{ rotate: 18, scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 14 }}
        >
          i
        </motion.button>}
      </div>
    </div>
  );
}
