"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SITE } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** One line of the masthead, rising out of its own mask. */
function Line({ children, delay, className }: { children: React.ReactNode; delay: number; className: string }) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.3, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Opening spread, set like a magazine cover: the name as a masthead across
 * the page, a thin rule of facts above it, and a plum panel that opens from
 * the bottom with the statement and the two ways in. On scroll the masthead
 * drifts sideways a little, as if the page were being turned.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const driftA = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const driftB = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section ref={ref} className="overflow-hidden px-4 pt-24 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-[1400px]">
        {/* línea de datos, como el folio de una revista */}
        <motion.div
          className="label flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line pb-3 text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span>Portafolio · 2026</span>
          <span className="hidden sm:inline">Diseño gráfico — UX/UI</span>
          <span>{SITE.location} · remoto</span>
        </motion.div>

        <h1 className="mt-6 font-serif leading-[0.86] tracking-[-0.025em] text-ink sm:mt-8">
          <motion.span style={{ x: driftA }} className="block">
            <Line delay={0.25} className="text-[clamp(4.2rem,17vw,16.5rem)]">
              Consuelo
            </Line>
          </motion.span>
          <motion.span style={{ x: driftB }} className="block text-right">
            <Line delay={0.4} className="text-[clamp(2.6rem,10.4vw,10rem)] italic">
              Herrera De La Calle
            </Line>
          </motion.span>
        </h1>
      </div>

      {/* panel ciruela que se abre desde abajo */}
      <motion.div
        className="mx-auto mt-8 max-w-[1400px] bg-brand text-paper sm:mt-12"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.75 }}
      >
        <div className="grid gap-10 px-6 py-10 sm:px-10 sm:py-12 md:grid-cols-12 md:gap-8">
          <motion.p
            className="font-serif text-[clamp(1.7rem,3.2vw,2.75rem)] leading-[1.12] md:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.2 }}
          >
            Diseñadora gráfica y UX/UI. Diseño{" "}
            {/* resaltado como fondo del texto: sigue a cada línea si la frase
                se parte en varias (box-decoration-break: clone) */}
            <motion.span
              className="[box-decoration-break:clone] bg-no-repeat [-webkit-box-decoration-break:clone]"
              style={{
                backgroundImage: "linear-gradient(rgb(255 122 168 / 0.7), rgb(255 122 168 / 0.7))",
                backgroundPosition: "0 88%",
              }}
              initial={{ backgroundSize: "0% 0.32em" }}
              animate={{ backgroundSize: "100% 0.32em" }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.9 }}
            >
              interfaces que se entienden
            </motion.span>{" "}
            a la primera, y marcas con carácter.
          </motion.p>

          <motion.div
            className="flex flex-col justify-between gap-8 md:col-span-4 md:col-start-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.5 }}
          >
            <dl className="grid grid-cols-2 gap-4 text-[14px]">
              <div>
                <dt className="label text-sky">Disponible</dt>
                <dd className="mt-1.5 text-paper/85">Full-time o freelance</dd>
              </div>
              <div>
                <dt className="label text-sky">Modalidad</dt>
                <dd className="mt-1.5 text-paper/85">Presencial o remoto</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-3">
              <a
                href="#proyectos"
                className="group relative overflow-hidden bg-pink px-6 py-3.5 text-[15px] font-medium text-ink"
              >
                <span className="absolute inset-0 -translate-x-full bg-paper transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:translate-x-0" />
                <span className="relative">Ver proyectos ↓</span>
              </a>
              <a
                href={SITE.cv}
                target="_blank"
                rel="noreferrer"
                className="border border-paper/40 px-6 py-3.5 text-[15px] transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-brand"
              >
                Currículum ↗
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
