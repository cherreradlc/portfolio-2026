"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLang } from "@/i18n/lang";
import { FadeUp } from "../Reveal";
import Doodles from "./Doodles";
import { DAY_INK } from "./colors";
import Confeti from "./items/Confeti";
import Onda from "./items/Onda";
import MeGusta from "./items/MeGusta";
import { markPlay, usePlays } from "./plays";

const LETTER_COLORS = ["text-coral", "text-pool", "text-sun", "text-mint", "text-grape", "text-bubble"];
const PIEZAS = [
  { slug: "me-gusta", C: MeGusta, rotate: -4 },
  { slug: "onda", C: Onda, rotate: 3 },
  { slug: "confeti", C: Confeti, rotate: -2 },
];

/**
 * A taste of the playground on the home page: the bouncy title, three pieces
 * you can play with right here, the live play count and a way in.
 */
export default function PlaygroundTeaser() {
  const { t, lang } = useLang();
  const plays = usePlays();
  const title = t({ en: "Playground", es: "Patio de juegos" });

  return (
    <FadeUp>
      <div className="relative overflow-hidden rounded-[36px] border-[3px] border-ink bg-(--park) px-6 py-14 md:px-12 md:py-16">
        <Doodles />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="font-mono text-[13px] tracking-wide uppercase">{t({ en: "New · Designed in Figma, built in code", es: "Nuevo · Diseñado en Figma, construido en código" })}</p>
            <p key={lang} aria-hidden="true" className="mt-5 flex flex-wrap text-[clamp(2.8rem,7vw,5.6rem)] leading-[0.9] font-semibold tracking-[-0.05em] uppercase">
              {title.split("").map((ch, i) =>
                ch === " " ? (
                  <span key={i} className="w-[0.3em]" />
                ) : (
                  <motion.span
                    key={i}
                    className={`inline-block ${LETTER_COLORS[i % LETTER_COLORS.length]} [-webkit-text-stroke:2.5px_rgb(43_34_48)] [paint-order:stroke_fill]`}
                    initial={{ y: 0 }}
                    whileInView={{ y: [0, -18, 0] }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease: "easeOut" }}
                  >
                    {ch}
                  </motion.span>
                ),
              )}
            </p>
            <h2 className="sr-only">{title}</h2>
            <p className="mt-6 max-w-md font-mono text-[14px] leading-[1.7] text-ink-soft">
              {t({
                en: "Almost 40 buttons, animations and a mini game I designed and built. Try a few right here, then come in and play.",
                es: "Casi 40 botones, animaciones y un minijuego que diseñé y programé. Prueba algunos aquí mismo y entra a jugar.",
              })}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href="/playground"
                className="group inline-flex items-center gap-3 rounded-full border-[3px] border-ink bg-sun px-7 py-3.5 text-[16px] font-bold text-[#2b2230] shadow-[5px_5px_0_rgb(43_34_48)] transition-transform hover:-translate-y-0.5 active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0_rgb(43_34_48)]"
              >
                {t({ en: "Enter the playground", es: "Entrar al patio de juegos" })}
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
              {plays != null && plays > 0 && (
                <span className="rotate-[-3deg] rounded-[12px] border-2 border-ink bg-coral px-3 py-1.5 font-mono text-[12.5px] font-semibold text-[#2b2230]">
                  {plays.toLocaleString(lang === "es" ? "es-CL" : "en-GB")} {t({ en: "plays so far", es: "jugadas hasta ahora" })}
                </span>
              )}
            </div>
          </div>

          {/* tres piezas para jugar sin salir del inicio */}
          <div className="flex flex-col items-center gap-10 sm:flex-row sm:flex-wrap sm:justify-center lg:flex-col" style={DAY_INK}>
            {PIEZAS.map(({ slug, C, rotate }) => (
              <div key={slug} style={{ rotate: `${rotate}deg` }} onPointerDown={() => markPlay(slug)} onKeyDown={() => markPlay(slug)} className="text-ink">
                <C />
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeUp>
  );
}
