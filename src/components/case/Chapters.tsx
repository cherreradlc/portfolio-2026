"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Block } from "@/data/projects";
import { FadeUp } from "../Reveal";
import { useLang } from "@/i18n/lang";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A case study read as chapters: every block with an eyebrow is one, numbered
 * in order. The number shows in the eyebrow, in an index at the start and in
 * a small tab in the corner that says which chapter you are reading. The tab
 * only swaps its text; nothing moves with the scroll.
 */
export type Chapter = { n: number; title: string; block: number };

export const chapterId = (n: number) => `capitulo-${n}`;
const pad = (n: number) => String(n).padStart(2, "0");

export function chaptersOf(blocks: Block[]): Chapter[] {
  const out: Chapter[] = [];
  blocks.forEach((b, i) => {
    const title = "eyebrow" in b ? b.eyebrow : undefined;
    if (title) out.push({ n: out.length + 1, title, block: i });
  });
  return out;
}

const ChapterContext = createContext<number | null>(null);
export const ChapterProvider = ChapterContext.Provider;

/** A block's eyebrow, with its chapter number when it has one. */
export function Eyebrow({ text }: { text: string }) {
  const n = useContext(ChapterContext);
  return (
    <p className="text-[13px] tracking-[0.22em] text-muted">
      {n !== null && <span className="text-brand">{pad(n)} — </span>}
      {text.toUpperCase()}
    </p>
  );
}

/** The list of chapters at the start of the case study. */
export function ChapterIndex({ chapters }: { chapters: Chapter[] }) {
  const { t } = useLang();
  if (chapters.length < 2) return null;
  return (
    <FadeUp>
      <nav aria-label={t({ en: "Chapters", es: "Capítulos" })} className="border-y border-line py-6">
        <p className="font-mono text-[12px] tracking-[0.14em] text-muted uppercase">
          {t({ en: "In this case study", es: "En este caso" })}
        </p>
        <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c) => (
            <li key={c.n}>
              <a href={`#${chapterId(c.n)}`} className="group flex items-baseline gap-3 py-1 text-[15px]">
                <span className="font-mono text-[12px] text-brand">{pad(c.n)}</span>
                <span className="text-ink-soft transition-colors group-hover:text-ink">{c.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </FadeUp>
  );
}

/** Small tab in the corner: the chapter in view, and the list on tap. */
export function ChapterTab({ chapters }: { chapters: Chapter[] }) {
  const { t } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(chapterId(c.n))).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    // el capítulo activo es el último cuyo comienzo ya pasó la mitad de la pantalla
    const update = () => {
      const mid = window.innerHeight * 0.5;
      let current: number | null = null;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top < mid) current = chapters[i].n;
      });
      // pasado el último capítulo (siguiente proyecto, pie) la pestaña se esconde
      const last = els[els.length - 1].getBoundingClientRect();
      if (last.bottom < 0) current = null;
      setActive(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [chapters]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (chapters.length < 2) return null;
  const current = chapters.find((c) => c.n === active);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 sm:bottom-8 sm:left-9"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <AnimatePresence>
            {open && (
              <motion.ol
                id="lista-capitulos"
                className="mb-2 w-[min(18rem,calc(100vw-2rem))] rounded-[14px] border border-line bg-paper p-2 shadow-[0_24px_50px_-24px_rgb(43_34_48/0.45)]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {chapters.map((c) => (
                  <li key={c.n}>
                    <a
                      href={`#${chapterId(c.n)}`}
                      onClick={() => setOpen(false)}
                      aria-current={c.n === active ? "true" : undefined}
                      className={`flex items-baseline gap-3 rounded-[8px] px-3 py-2 text-[14px] transition-colors hover:bg-paper-2 ${
                        c.n === active ? "bg-paper-2 text-ink" : "text-ink-soft"
                      }`}
                    >
                      <span className="font-mono text-[12px] text-brand">{pad(c.n)}</span>
                      {c.title}
                    </a>
                  </li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="lista-capitulos"
            className="flex items-center gap-3 rounded-[6px] border border-line bg-white/90 px-4 py-2.5 font-mono text-[12px] tracking-wide uppercase shadow-[0_12px_30px_-18px_rgb(43_34_48/0.5)] backdrop-blur"
          >
            <span className="sr-only">{t({ en: "Chapter", es: "Capítulo" })} </span>
            <span className="text-brand">
              {pad(current.n)} / {pad(chapters.length)}
            </span>
            <span className="max-w-[45vw] truncate text-ink">{current.title}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
