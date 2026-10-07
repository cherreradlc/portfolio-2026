"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import Magnetic from "./Magnetic";
import { SplitWords } from "./Reveal";
import { SITE } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const ROTATING = ["marcas con carácter", "interfaces accesibles", "experiencias claras", "ideas que se entienden"];

/**
 * Opening screen. Three blurred colour fields drift on their own and lean
 * toward the pointer, so the page feels liquid before anything is scrolled.
 * The headline sinks and fades as you leave, handing over to the work.
 */
export default function Hero() {
  const [word, setWord] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setWord((w) => (w + 1) % ROTATING.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const bx = useTransform(sx, (v) => v * -0.6);
  const by = useTransform(sy, (v) => v * -0.6);

  const { scrollY } = useScroll();
  const lift = useTransform(scrollY, [0, 700], [0, -140]);
  const fade = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden md:justify-end px-4 pt-32 pb-10 sm:px-6 sm:pb-14"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 160);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 160);
      }}
    >
      {/* campos de color fluidos */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          className="absolute top-[8%] left-[52%] h-[46vmax] w-[46vmax] rounded-full bg-tangerine/45 blur-[90px]"
          style={{ x: sx, y: sy }}
          animate={{ scale: [1, 1.15, 0.95, 1], rotate: [0, 30, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[30%] left-[10%] h-[38vmax] w-[38vmax] rounded-full bg-violet/35 blur-[100px]"
          style={{ x: bx, y: by }}
          animate={{ scale: [1, 0.9, 1.12, 1], x: [0, 60, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[20%] left-[35%] h-[34vmax] w-[34vmax] rounded-full bg-sage/35 blur-[90px]"
          animate={{ scale: [1, 1.2, 1], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div style={{ y: lift, opacity: fade }} className="mx-auto w-full max-w-7xl">
        <motion.div
          className="mb-8 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        >
          <span className="flex items-center gap-2.5 rounded-full border border-line bg-paper/60 px-4 py-2 text-[13px] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-sage [animation:pulse-dot_1.6s_ease-out_infinite]" />
            {SITE.availability}
          </span>
          <span className="text-[13px] text-muted">Portafolio 2026</span>
        </motion.div>

        {/* Syne es ancha: tamaños algo menores que con una grotesca normal */}
        <h1 className="font-[family-name:var(--font-syne)] leading-[0.92] tracking-[-0.035em] uppercase">
          <SplitWords
            text="Consuelo"
            immediate
            delay={0.3}
            // "CONSUELO" en Syne mide ~9,2 veces su tamaño de letra: 9vw cabe
            // en un celular de 360 px y el tope de 8rem en la columna de 1232 px.
            className="block text-[clamp(2rem,9vw,8rem)] font-bold"
          />
          <SplitWords
            text="Herrera De La Calle"
            immediate
            delay={0.45}
            stagger={0.08}
            className="mt-2 block text-[clamp(1.25rem,4.6vw,4.2rem)] font-normal tracking-[-0.01em]"
          />
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-xl text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug tracking-tight text-ink-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1 }}
          >
            Diseñadora gráfica &amp; UX/UI. Diseño{" "}
            <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={ROTATING[word]}
                  className="inline-block font-serif text-[1.15em] italic text-tangerine"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  {ROTATING[word]}
                </motion.span>
              </AnimatePresence>
            </span>
            .
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.15 }}
          >
            <Magnetic>
              <a
                href="#proyectos"
                data-cursor="Ver"
                className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-ink py-4 pr-4 pl-7 text-[15px] text-paper"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-tangerine transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:scale-y-100" />
                <span className="relative">Ver proyectos</span>
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:rotate-90">
                  ↓
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={SITE.cv}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-full border border-ink/25 px-6 py-4 text-[15px] transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
              >
                Ver CV
                <span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] tracking-[0.3em] text-muted md:flex"
        style={{ opacity: fade }}
        aria-hidden="true"
      >
        SCROLL
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 h-4 bg-ink"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
