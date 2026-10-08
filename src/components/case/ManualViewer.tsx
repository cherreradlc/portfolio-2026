"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { IMAGE_SIZES } from "@/data/image-sizes";
import { FadeUp, SplitWords } from "../Reveal";
import { useLang } from "@/i18n/lang";

const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A page-by-page reader for a full brand manual: one page large, arrows and
 * keyboard to turn, swipe on phones, and a strip of thumbnails to jump.
 * Pages listed in `lowRes` hold mockups embedded at low resolution in the
 * original file, so they are drawn smaller to stay sharp.
 */
export default function ManualViewer({
  eyebrow,
  title,
  folder,
  pages,
  lowRes = [],
}: {
  eyebrow: string;
  title: string;
  folder: string;
  pages: number;
  lowRes?: number[];
}) {
  const { t } = useLang();
  const [page, setPage] = useState(1);
  const [dir, setDir] = useState(1);
  const section = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);

  const go = (to: number) => {
    const next = Math.min(pages, Math.max(1, to));
    if (next === page) return;
    setDir(next > page ? 1 : -1);
    setPage(next);
  };

  // Flechas del teclado mientras el visor está en pantalla.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const r = section.current?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > window.innerHeight) return;
      if (e.key === "ArrowRight") go(page + 1);
      if (e.key === "ArrowLeft") go(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // La miniatura activa queda siempre a la vista en la tira.
  useEffect(() => {
    const el = strip.current?.querySelector<HTMLElement>(`[data-page="${page}"]`);
    if (el && strip.current) {
      strip.current.scrollTo({ left: el.offsetLeft - strip.current.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
    }
  }, [page]);

  const src = `${folder}/${pad(page)}.jpg`;
  const size = IMAGE_SIZES[src] ?? { w: 1600, h: 1131 };
  const portrait = size.h > size.w;
  const maxW = lowRes.includes(page) ? 560 : portrait ? 320 : 1100;

  return (
    <section ref={section}>
      <FadeUp>
        <p className="text-[13px] tracking-[0.22em] text-muted">{eyebrow.toUpperCase()}</p>
      </FadeUp>
      <div className="mt-5 mb-10 flex flex-wrap items-end justify-between gap-4">
        <SplitWords
          as="h2"
          text={title}
          stagger={0.035}
          className="max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)] leading-[1] font-medium tracking-[-0.035em]"
        />
        <p className="text-[14px] text-muted">{t({ en: "Use the arrows or swipe to turn the pages", es: "Usa las flechas o desliza para pasar las páginas" })}</p>
      </div>

      <div className="relative overflow-hidden rounded-[24px] bg-paper-2 px-4 py-8 sm:px-16 sm:py-12">
        <div className="relative flex min-h-[min(62vw,calc(100svh-260px))] items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={page}
              custom={dir}
              variants={{
                enter: (d: number) => ({ x: d * 80, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d * -80, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(page + 1);
                else if (info.offset.x > 60) go(page - 1);
              }}
              className="w-full cursor-grab active:cursor-grabbing"
              // la página completa siempre cabe en la altura de la pantalla
              style={{ maxWidth: `min(${maxW}px, calc((100svh - 260px) * ${(size.w / size.h).toFixed(3)}))` }}
            >
              <Image
                src={src}
                alt={`${t({ en: "Hila brand manual, page", es: "Manual de marca Hila, página" })} ${page} / ${pages}`}
                width={size.w}
                height={size.h}
                sizes={`(max-width: ${maxW}px) 92vw, ${maxW}px`}
                unoptimized
                draggable={false}
                priority={page === 1}
                className="h-auto w-full rounded-[10px] shadow-[0_30px_60px_-30px_rgb(58_16_48/0.45)] select-none"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {(["prev", "next"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => go(page + (k === "next" ? 1 : -1))}
            disabled={k === "prev" ? page === 1 : page === pages}
            aria-label={k === "next" ? t({ en: "Next page", es: "Página siguiente" }) : t({ en: "Previous page", es: "Página anterior" })}
            className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-[18px] text-paper transition-all duration-300 hover:scale-110 disabled:opacity-25 disabled:hover:scale-100 sm:flex ${
              k === "next" ? "right-4" : "left-4"
            }`}
          >
            {k === "next" ? "→" : "←"}
          </button>
        ))}

        <div className="mt-6 flex items-center justify-center gap-5 text-[14px]">
          <button type="button" onClick={() => go(page - 1)} disabled={page === 1} className="disabled:opacity-30 sm:hidden" aria-label={t({ en: "Previous page", es: "Página anterior" })}>
            ←
          </button>
          <span className="tabular-nums text-muted">
            <span className="text-ink">{pad(page)}</span> / {pad(pages)}
          </span>
          <button type="button" onClick={() => go(page + 1)} disabled={page === pages} className="disabled:opacity-30 sm:hidden" aria-label={t({ en: "Next page", es: "Página siguiente" })}>
            →
          </button>
        </div>
      </div>

      <div ref={strip} className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            data-page={n}
            onClick={() => go(n)}
            aria-label={`${t({ en: "Go to page", es: "Ir a la página" })} ${n}`}
            aria-current={n === page}
            className={`relative h-16 shrink-0 overflow-hidden rounded-[6px] border-2 transition-all duration-300 ${
              n === page ? "border-tangerine opacity-100" : "border-transparent opacity-55 hover:opacity-100"
            }`}
          >
            <Image
              src={`${folder}/mini/${pad(n)}.jpg`}
              alt=""
              width={IMAGE_SIZES[`${folder}/${pad(n)}.jpg`]?.w ?? 1600}
              height={IMAGE_SIZES[`${folder}/${pad(n)}.jpg`]?.h ?? 1131}
              unoptimized
              className="h-full w-auto"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
