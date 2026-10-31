"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { SERVICES } from "@/data/site";
import { useLang } from "@/i18n/lang";
import SizedImage from "./SizedImage";

const EASE = [0.22, 1, 0.36, 1] as const;

/** One board of real work per service, on a light wash of colour. */
const BOARDS = [
  { src: "/projects/ux4all/wireframe-dashboard.jpg", alt: "UX4ALL dashboard sketch", tint: "#eee8f5", maxHeight: 560 },
  { src: "/projects/invitacion-verano/portada.jpg", alt: "Summer wedding invitation cover", tint: "#f3e9f0", maxHeight: 560 },
  { src: "/projects/fresco/inicio.jpg", alt: "Fresco sales app home screen", tint: "#eef1e6", maxHeight: 560 },
  { src: "/projects/hila/portada.jpg", alt: "Hila brand guidelines cover", tint: "#f7e6ec", maxHeight: 560 },
];

/**
 * Split screen. On desktop the left half is a column of full-height boards
 * that scroll past while the right half stays pinned: whichever board is in
 * view opens its service in the list. On phones it is a plain accordion.
 */
export default function Services() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    setActive(Math.min(SERVICES.length - 1, Math.floor(v * SERVICES.length)));
  });

  return (
    <div ref={ref} className="grid md:grid-cols-2">
      <div className="hidden md:block">
        {BOARDS.map((b) => (
          <div
            key={b.src}
            className="flex h-[100svh] items-center justify-center overflow-hidden px-10"
            style={{ background: b.tint }}
          >
            <SizedImage
              src={b.src}
              alt={b.alt}
              maxHeight={b.maxHeight}
              sizes="(max-width: 1440px) 40vw, 600px"
              className="rounded-[4px] shadow-[0_40px_70px_-40px_rgb(43_34_48/0.45)]"
            />
          </div>
        ))}
      </div>

      <div className="bg-paper-2">
        <div className="flex flex-col justify-center px-4 py-20 sm:px-9 md:sticky md:top-0 md:h-[100svh] md:py-0 lg:px-16">
          <p className="border-b border-ink/15 pb-5 font-mono text-[12.5px] tracking-wide uppercase">
            {t({ en: "Services overview", es: "Servicios" })}
          </p>
          <ul>
            {SERVICES.map((s, i) => {
              const open = active === i;
              return (
                <li key={s.title.en} className="border-b border-ink/15">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={open}
                    className="flex w-full items-baseline justify-between gap-4 py-5 text-left"
                  >
                    <span
                      className={`text-[clamp(1.5rem,2.4vw,2rem)] leading-none tracking-[-0.03em] uppercase transition-colors duration-500 ${
                        open ? "text-brand" : "text-ink"
                      }`}
                    >
                      {t(s.title)}
                    </span>
                    <span className="font-mono text-[12px] text-muted">0{i + 1}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[52ch] pb-4 font-mono text-[13.5px] leading-[1.7] text-ink-soft">{t(s.body)}</p>
                        <ul className="flex flex-wrap gap-2 pb-6">
                          {s.tags.map((tag) => (
                            <li key={tag.en} className="rounded-[4px] border border-ink/20 px-2.5 py-1 font-mono text-[11.5px] uppercase">
                              {t(tag)}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
