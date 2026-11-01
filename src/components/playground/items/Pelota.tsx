"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useLang } from "@/i18n/lang";

/** A ball you can drag and throw; it bounces off the walls of its box. */
export default function Pelota() {
  const { t } = useLang();
  const box = useRef<HTMLDivElement>(null);

  return (
    <div ref={box} className="relative flex h-48 w-72 items-center justify-center rounded-[24px] border-[3px] border-dashed border-ink/40">
      <motion.div
        drag
        dragConstraints={box}
        dragElastic={0.9}
        // más impulso al soltarla y un rebote más elástico contra las paredes
        dragTransition={{ power: 0.7, timeConstant: 600, bounceStiffness: 700, bounceDamping: 4 }}
        whileDrag={{ scale: 1.15 }}
        whileTap={{ cursor: "grabbing" }}
        role="img"
        aria-label={t({ en: "Ball you can drag", es: "Pelota que se puede arrastrar" })}
        className="size-16 cursor-grab touch-none rounded-full border-[3px] border-ink bg-[radial-gradient(circle_at_35%_30%,#fff_0_12%,#ff6b57_13%_100%)] shadow-[4px_4px_0_rgb(43_34_48)]"
      />
      <span className="pointer-events-none absolute bottom-2 font-mono text-[11px] tracking-wide text-ink/50 uppercase">{t({ en: "Drag & throw", es: "Arrastra y lanza" })}</span>
    </div>
  );
}
