"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Block } from "@/data/projects";
import { FadeUp, SplitWords } from "../Reveal";
import { Eyebrow } from "./Chapters";
import { useLang } from "@/i18n/lang";

const EASE = [0.22, 1, 0.36, 1] as const;
// el azul de selección de Figma: se reconoce al tiro como "esto es un archivo de diseño"
const FIGMA = "#0d99ff";
// las capturas son de un teléfono de 390 × 844 puntos
const DEVICE = { w: 390, h: 844 };

/**
 * Design notes over a real screen, like comments in a Figma file. Each note
 * is a numbered pin on the screen and an entry in the list; the selected one
 * gets Figma's selection frame, corner handles and its size in points.
 * Selecting is by tap, click, hover or keyboard, never by scrolling.
 */
export default function Annotated({ block: b }: { block: Extract<Block, { type: "notes" }> }) {
  const { t } = useLang();
  const [screen, setScreen] = useState(0);
  const [active, setActive] = useState(0);
  const s = b.screens[screen];
  const n = s.notes[active];

  const pick = (i: number) => {
    setScreen(i);
    setActive(0);
  };

  return (
    <section>
      <Eyebrow text={b.eyebrow} />
      <SplitWords
        as="h2"
        text={b.title}
        stagger={0.035}
        className="mt-5 max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)] leading-[1] font-medium tracking-[-0.035em]"
      />
      {b.body && (
        <FadeUp delay={0.1}>
          <p className="mt-6 max-w-2xl text-[17.5px] leading-[1.7] text-ink-soft">{b.body}</p>
        </FadeUp>
      )}

      <FadeUp delay={0.15}>
        {/* en el teléfono: pestañas, pantalla y la nota elegida, para que el
            marco se vea mientras se cambia de nota; en el computador la lista va al lado */}
        <div className="mt-12 grid content-start items-start gap-6 md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr] md:gap-x-16">
          {b.screens.length > 1 && (
            <div
              role="tablist"
              aria-label={t({ en: "Screens", es: "Pantallas" })}
              className="order-1 inline-flex flex-wrap gap-1 justify-self-center md:order-none rounded-[8px] border border-line bg-paper-2 p-1 md:col-start-2 md:row-start-1 md:justify-self-start"
            >
              {b.screens.map((x, i) => (
                <button
                  key={x.src}
                  type="button"
                  role="tab"
                  aria-selected={i === screen}
                  onClick={() => pick(i)}
                  className={`rounded-[6px] px-3.5 py-2 font-mono text-[12px] tracking-wide uppercase transition-colors ${
                    i === screen ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
                  }`}
                >
                  {x.label}
                </button>
              ))}
            </div>
          )}

          {/* la pantalla, con un número por nota y el marco de selección */}
          <div className="order-2 mx-auto w-[min(58vw,300px)] md:order-none md:col-start-1 md:row-span-2 md:row-start-1">
            <div className="relative aspect-[390/844] rounded-[30px] border-[6px] border-ink bg-ink shadow-[0_30px_60px_-30px_rgb(43_34_48/0.55)]">
              <Image
                key={s.src}
                src={s.src}
                alt={s.alt}
                fill
                sizes="300px"
                className="rounded-[24px] object-cover object-top"
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute"
                style={{ outline: `1.5px solid ${FIGMA}` }}
                initial={false}
                animate={{ left: `${n.x}%`, top: `${n.y}%`, width: `${n.w}%`, height: `${n.h}%` }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {["-left-[4px] -top-[4px]", "-right-[4px] -top-[4px]", "-left-[4px] -bottom-[4px]", "-right-[4px] -bottom-[4px]"].map((pos) => (
                  <span key={pos} className={`absolute h-[7px] w-[7px] border bg-white ${pos}`} style={{ borderColor: FIGMA }} />
                ))}
                <span
                  className="absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-[3px] px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-white"
                  style={{ background: FIGMA }}
                >
                  {Math.round((n.w / 100) * DEVICE.w)} × {Math.round((n.h / 100) * DEVICE.h)}
                </span>
              </motion.div>
              {s.notes.map((note, i) => (
                <button
                  key={note.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`${t({ en: "Note", es: "Nota" })} ${i + 1}: ${note.title}`}
                  aria-pressed={i === active}
                  className={`absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 font-mono text-[11px] font-medium shadow-[0_4px_10px_rgb(43_34_48/0.3)] transition-colors ${
                    i === active ? "border-brand bg-brand text-paper" : "border-brand bg-white text-brand"
                  }`}
                  style={{ left: `${note.x}%`, top: `${note.y}%` }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* teléfono: solo la nota elegida, con flechas */}
          <div className="order-4 flex items-start gap-3 rounded-[14px] border border-brand bg-white p-5 md:hidden" aria-live="polite">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand font-mono text-[11px] font-medium text-paper">
              {active + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[18px] leading-snug font-medium tracking-tight">{n.title}</span>
              <span className="mt-1.5 block text-[15px] leading-relaxed text-muted">{n.body}</span>
            </span>
          </div>
          <div className="order-3 flex items-center justify-between md:hidden">
            <span className="order-2 font-mono text-[12px] text-muted">
              {active + 1} / {s.notes.length}
            </span>
            {([-1, 1] as const).map((dir) => (
              <button
                style={{ order: dir < 0 ? 1 : 3 }}
                key={dir}
                type="button"
                onClick={() => setActive((a) => (a + dir + s.notes.length) % s.notes.length)}
                aria-label={dir < 0 ? t({ en: "Previous note", es: "Nota anterior" }) : t({ en: "Next note", es: "Nota siguiente" })}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink"
              >
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={dir < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
                </svg>
              </button>
            ))}
          </div>

          <div className="hidden md:col-start-2 md:row-start-2 md:block">
            <ol className="flex flex-col gap-2">
              {s.notes.map((note, i) => (
                <li key={`${s.src}-${note.title}`}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-pressed={i === active}
                    className={`flex w-full gap-4 rounded-[14px] border p-5 text-left transition-colors duration-300 ${
                      i === active ? "border-brand bg-white" : "border-line bg-paper-2/40 hover:border-ink/30"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-brand font-mono text-[11px] font-medium ${
                        i === active ? "bg-brand text-paper" : "bg-white text-brand"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-[18px] leading-snug font-medium tracking-tight">{note.title}</span>
                      <span className="mt-1.5 block text-[15px] leading-relaxed text-muted">{note.body}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
