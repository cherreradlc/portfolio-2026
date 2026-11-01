"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { useLang } from "@/i18n/lang";

const CARTAS = [
  { emoji: "🛝", en: "Slide", es: "Tobogán", bg: "bg-pool" },
  { emoji: "🎠", en: "Carousel", es: "Carrusel", bg: "bg-bubble" },
  { emoji: "🪁", en: "Kite", es: "Volantín", bg: "bg-sun" },
  { emoji: "⚽", en: "Football", es: "Pichanga", bg: "bg-mint" },
];

function Carta({ c, onSalir }: { c: (typeof CARTAS)[number]; onSalir: (dir: number) => void }) {
  const { t } = useLang();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);
  const si = useTransform(x, [20, 100], [0, 1]);
  const no = useTransform(x, [-100, -20], [1, 0]);

  return (
    <motion.div
      className={`absolute inset-0 flex cursor-grab touch-pan-y flex-col items-center justify-center gap-2 rounded-[20px] border-[3px] border-ink shadow-[4px_4px_0_rgb(43_34_48)] active:cursor-grabbing ${c.bg}`}
      style={{ x, rotate }}
      drag="x"
      dragSnapToOrigin
      onDragEnd={(_, info: PanInfo) => {
        if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 600) onSalir(Math.sign(info.offset.x || info.velocity.x));
      }}
      initial={{ scale: 0.9, y: 10, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      variants={{ salir: (dir: number) => ({ x: 260 * dir, rotate: 25 * dir, opacity: 0, transition: { duration: 0.3 } }) }}
      exit="salir"
    >
      <motion.span style={{ opacity: si }} className="absolute top-3 left-3 rotate-[-12deg] rounded-[8px] border-2 border-ink bg-mint px-2 text-[13px] font-bold">♥</motion.span>
      <motion.span style={{ opacity: no }} className="absolute top-3 right-3 rotate-[12deg] rounded-[8px] border-2 border-ink bg-coral px-2 text-[13px] font-bold">✕</motion.span>
      <span className="text-[48px]" aria-hidden="true">{c.emoji}</span>
      <span className="text-[18px] font-bold">{t(c)}</span>
    </motion.div>
  );
}

/** Swipe cards: drag right for yes, left for no; the card tilts as you pull. */
export default function Deslizar() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const [likes, setLikes] = useState(0);
  // hacia dónde sale la carta de arriba: 1 derecha (sí), -1 izquierda (no)
  const [dir, setDir] = useState(1);
  const c = CARTAS[i];
  const elegir = (d: number) => {
    setDir(d);
    if (d > 0) setLikes((n) => n + 1);
    setI((n) => n + 1);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-48 w-40">
        <AnimatePresence custom={dir}>
          {c ? (
            <Carta key={i} c={c} onSalir={elegir} />
          ) : (
            <motion.button key="fin" type="button" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              onClick={() => { setI(0); setLikes(0); }}
              className="absolute inset-0 rounded-[20px] border-[3px] border-dashed border-ink/50 text-[15px] font-bold">
              {t({ en: `You liked ${likes}. Again?`, es: `Te gustaron ${likes}. ¿Otra vez?` })}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      {c && (
        <div className="flex gap-3">
          <button type="button" onClick={() => elegir(-1)} aria-label={t({ en: "No", es: "No" })} className="flex size-10 items-center justify-center rounded-full border-2 border-ink bg-coral font-bold">✕</button>
          <button type="button" onClick={() => elegir(1)} aria-label={t({ en: "Yes", es: "Sí" })} className="flex size-10 items-center justify-center rounded-full border-2 border-ink bg-mint font-bold">♥</button>
        </div>
      )}
    </div>
  );
}
