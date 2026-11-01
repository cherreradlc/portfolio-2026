"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { PlayItem } from "@/data/playground";
import { useLang } from "@/i18n/lang";
import { BG, DAY_INK } from "./colors";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "How it was built": the Figma screenshots of a piece, one large with
 * thumbnails to switch, and a short description underneath.
 */
export default function InfoModal({ item, onClose }: { item: PlayItem; onClose: () => void }) {
  const { t } = useLang();
  const [shot, setShot] = useState(0);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const current = item.shots[shot];

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/60 p-3 backdrop-blur-sm sm:items-center sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`info-${item.slug}`}
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-[28px] border-[3px] border-ink bg-paper shadow-[8px_8px_0_rgb(43_34_48)]"
        initial={{ y: 60, rotate: -2, opacity: 0 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        exit={{ y: 40, rotate: 2, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={`flex items-center justify-between gap-4 border-b-[3px] border-ink px-6 py-4 ${BG[item.color]}`} style={DAY_INK}>
          <h2 id={`info-${item.slug}`} className="text-[clamp(1.6rem,4vw,2.4rem)] leading-none font-semibold tracking-[-0.03em]">
            {t(item.title)}
          </h2>
          <button
            ref={close}
            type="button"
            onClick={onClose}
            aria-label={t({ en: "Close", es: "Cerrar" })}
            className="flex size-11 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-paper text-[22px] leading-none transition-transform hover:rotate-90"
          >
            ×
          </button>
        </header>

        <div className="p-6">
          <p className="font-mono text-[12px] tracking-[0.14em] text-muted uppercase">{t({ en: "Built in Figma", es: "Así se ve en Figma" })}</p>

          {current ? (
            <figure className="mt-3">
              <motion.div key={current.src} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: EASE }}
                className="relative overflow-hidden rounded-[18px] border-[3px] border-ink bg-paper-2">
                <Image src={current.src} alt={t(current.alt)} width={1600} height={1000} sizes="(max-width: 768px) 92vw, 720px" className="h-auto w-full" />
              </motion.div>
              {current.caption && <figcaption className="mt-2 text-[14px] text-ink-soft">{t(current.caption)}</figcaption>}
            </figure>
          ) : (
            <div className="mt-3 flex aspect-[16/9] items-center justify-center rounded-[18px] border-[3px] border-dashed border-ink/30 bg-paper-2 p-6 text-center font-mono text-[13px] text-muted">
              {t({ en: "Figma screenshots coming soon", es: "Pronto: las capturas de Figma" })}
            </div>
          )}

          {item.shots.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {item.shots.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={t(s.alt)}
                  aria-current={i === shot}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-[10px] border-[3px] transition-transform hover:-translate-y-1 ${i === shot ? "border-ink" : "border-ink/20"}`}
                >
                  <Image src={s.src} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          <p className="mt-6 text-[16px] leading-relaxed">{t(item.description)}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {item.tools.map((tool) => (
              <li key={tool} className="rounded-full border-2 border-ink px-3 py-1 font-mono text-[12px]">{tool}</li>
            ))}
          </ul>

          {item.figma && (
            <a href={item.figma} target="_blank" rel="noreferrer"
              className={`mt-6 inline-flex items-center gap-2 rounded-full border-[3px] border-ink px-5 py-2.5 font-mono text-[13px] tracking-wide uppercase shadow-[4px_4px_0_rgb(43_34_48)] transition-transform hover:-translate-y-0.5 ${BG[item.color]}`}>
              {t({ en: "Open in Figma ↗", es: "Abrir en Figma ↗" })}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
