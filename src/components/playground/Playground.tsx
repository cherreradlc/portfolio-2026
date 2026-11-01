"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PLAYGROUND, type PlayItem } from "@/data/playground";
import { useLang } from "@/i18n/lang";
import { FadeUp } from "../Reveal";
import Doodles from "./Doodles";
import InfoModal from "./InfoModal";
import PlayPiece from "./PlayPiece";
import { usePlays } from "./plays";

// desfase vertical por columna en pantallas grandes, para que no parezca una tabla
const OFFSET = ["", "lg:translate-y-12", "lg:-translate-y-6", "lg:translate-y-8"];

const LETTER_COLORS =["text-coral", "text-pool", "text-sun", "text-mint", "text-grape", "text-bubble"];

/** The playground: a bouncy title, a ticket with the play count and the park. */
export default function Playground() {
  const { t, lang } = useLang();
  const plays = usePlays();
  const [open, setOpen] = useState<PlayItem | null>(null);
  const title = t({ en: "Playground", es: "Patio de juegos" });
  const lineas = lang === "es" ? ["Patio de", "juegos"] : ["Playground"];
  const inicio = lineas.map((_, l) => lineas.slice(0, l).join("").length);

  return (
    <div className="mx-auto max-w-7xl">
      <p className="font-mono text-[13px] tracking-wide uppercase">{t({ en: "Designed in Figma, built in code", es: "Diseñado en Figma, construido en código" })}</p>

      {/* cada letra de un color y salta al pasar encima; en español va en dos líneas: "Patio de" / "juegos" */}
      <h1 key={lang} aria-label={title} className="mt-6 text-[clamp(3.2rem,11vw,9rem)] leading-[0.9] font-semibold tracking-[-0.05em] uppercase">
        {lineas.map((linea, l) => (
          <span key={l} className="flex whitespace-nowrap" aria-hidden="true">
            {linea.split("").map((ch, k) => {
              const i = inicio[l] + k; // posición en todo el título, para colores y retraso de la ola
              return ch === " " ? (
                <span key={k} className="w-[0.3em]" />
              ) : (
                <motion.span
                  key={k}
                  className={`inline-block cursor-default ${LETTER_COLORS[i % LETTER_COLORS.length]} [-webkit-text-stroke:3px_rgb(43_34_48)] [paint-order:stroke_fill]`}
                  // al entrar: las letras suben, y luego pasa una ola que las hace saltar una tras otra
                  // (en el celular no hay hover, así que esta es la animación que se ve)
                  initial={{ y: 60, rotate: -12, opacity: 0 }}
                  animate={{ y: [60, 0, 0, -26, 0], rotate: [-12, 0, 0, i % 2 ? 8 : -8, 0], opacity: [0, 1, 1, 1, 1] }}
                  transition={{ duration: 1.5, times: [0, 0.3, 0.55, 0.72, 1], ease: "easeOut", delay: i * 0.06 }}
                  whileHover={{ y: -18, rotate: i % 2 ? 8 : -8, transition: { type: "spring", stiffness: 500, damping: 10 } }}
                  whileTap={{ y: -22, scale: 1.1, transition: { type: "spring", stiffness: 500, damping: 10 } }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        ))}
      </h1>

      <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <FadeUp>
          <p className="max-w-xl font-mono text-[14px] leading-[1.7] text-ink-soft">
            {t({
              en: "Small interactions I design and then build myself. Touch, drag and press everything: nothing breaks.",
              es: "Pequeñas interacciones que diseño y luego construyo yo misma. Toca, arrastra y presiona todo: nada se rompe.",
            })}
          </p>
        </FadeUp>

        {/* contador como ticket de entrada al parque */}
        <motion.div
          className="relative self-start rounded-[18px] border-[3px] border-[#2b2230] bg-coral px-7 py-4 text-[#2b2230] shadow-[6px_6px_0_rgb(43_34_48)] md:mr-14 md:self-auto"
          initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
          animate={{ rotate: -4, scale: 1, opacity: 1 }}
          whileHover={{ rotate: 2, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          aria-live="polite"
        >
          <span className="absolute top-1/2 -left-[11px] size-5 -translate-y-1/2 rounded-full border-[3px] border-ink bg-paper" aria-hidden="true" />
          <span className="absolute top-1/2 -right-[11px] size-5 -translate-y-1/2 rounded-full border-[3px] border-ink bg-paper" aria-hidden="true" />
          <span className="block text-center text-[clamp(2.6rem,6vw,4rem)] leading-none font-semibold tracking-[-0.04em]">
            {plays == null ? "—" : plays.toLocaleString(lang === "es" ? "es-CL" : "en-GB")}
          </span>
          <span className="mt-1 block border-t-2 border-dashed border-ink/50 pt-1 text-center font-mono text-[12px] tracking-wide uppercase">
            {t({ en: "plays in the park", es: "jugadas en el parque" })}
          </span>
        </motion.div>
      </div>

      {/* el parque: piezas sueltas sobre una alfombra de juegos */}
      <section
        aria-label={title}
        className="relative mt-14 overflow-hidden rounded-[36px] border-[3px] border-ink bg-(--park) px-6 py-16 transition-colors duration-700 md:px-10 md:py-24"
      >
        <Doodles />
        <div className="relative grid grid-cols-1 justify-items-center gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20 lg:grid-cols-4">
          {PLAYGROUND.map((item, i) => {
            // las piezas anchas (el minijuego) ocupan toda la fila y no cuentan para el desfase
            const col = PLAYGROUND.slice(0, i).filter((x) => !x.wide).length;
            return (
              <div
                key={item.slug}
                className={`flex items-center justify-center ${item.wide ? "md:col-span-2 lg:col-span-4" : `md:min-h-[220px] ${OFFSET[col % 4]}`}`}
              >
                <PlayPiece item={item} onInfo={() => setOpen(item)} />
              </div>
            );
          })}
        </div>
      </section>

      <AnimatePresence>{open && <InfoModal key={open.slug} item={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div>
  );
}
