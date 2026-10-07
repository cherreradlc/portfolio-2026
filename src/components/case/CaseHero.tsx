"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import type { Project } from "@/data/projects";
import { ACCENT_STYLES } from "../ProjectStack";
import Magnetic from "../Magnetic";
import { FadeUp, SplitWords } from "../Reveal";
import PhoneFan from "../PhoneFan";
import SizedImage from "../SizedImage";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Title, facts and a cover that opens up from a rounded card as you scroll. */
export default function CaseHero({ project: p }: { project: Project }) {
  const cover = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cover, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.5], [40, 20]);
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const style = ACCENT_STYLES[p.accent];

  const facts = [
    { k: "Rol", v: p.role },
    { k: "Año", v: p.year },
    { k: "Enfoque", v: p.tools.join(" · ") },
  ];

  return (
    <header>
      <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 md:pt-40">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
          <Link
            href="/#proyectos"
            className="group inline-flex items-center gap-2 text-[14px] text-muted transition-colors hover:text-ink"
          >
            <span className="transition-transform duration-500 group-hover:-translate-x-1">←</span> Todos los proyectos
          </Link>
        </motion.div>

        <motion.span
          className={`mt-10 inline-block rounded-full px-3 py-1 text-[13px] ${style.chip}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          {p.category}
        </motion.span>

        <SplitWords
          as="h1"
          text={p.title}
          immediate
          delay={0.15}
          stagger={0.05}
          className="mt-6 max-w-6xl text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.9] font-medium tracking-[-0.05em]"
        />

        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-[1.3fr_1fr]">
          <FadeUp>
            <p className="max-w-2xl text-[clamp(1.15rem,1.9vw,1.45rem)] leading-[1.55] text-ink-soft">{p.intro}</p>
            {p.live && (
              <Magnetic className="mt-8">
                <a
                  href={p.live.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Abrir"
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-ink py-3.5 pr-3.5 pl-6 text-[15px] text-paper"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-tangerine transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:scale-y-100" />
                  <span className="relative">{p.live.label}</span>
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:rotate-45">
                    ↗
                  </span>
                </a>
              </Magnetic>
            )}
          </FadeUp>
          <dl className="grid gap-6 sm:grid-cols-2 md:grid-cols-1">
            {facts.map((f, i) => (
              <FadeUp key={f.k} delay={0.1 + i * 0.07}>
                <dt className="text-[12px] tracking-[0.22em] text-muted">{f.k.toUpperCase()}</dt>
                <dd className="mt-2 text-[16px] leading-snug">{f.v}</dd>
              </FadeUp>
            ))}
          </dl>
        </div>
      </div>

      <div ref={cover} className="mt-16 px-2 sm:px-4 md:mt-24">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className={`relative mx-auto max-w-[1440px] overflow-hidden ${style.card}`}
        >
          {p.screens ? (
            <div className="relative aspect-[4/3] sm:aspect-[16/9]">
              <PhoneFan screens={p.screens} height="84%" animateIn />
            </div>
          ) : (
            // La imagen se presenta entera y a su tamaño real sobre el color
            // del proyecto; solo se desplaza un poco, nunca se agranda.
            <motion.div style={{ y: imgY }} className="flex justify-center px-4 py-8 sm:px-10 sm:py-14">
              <SizedImage
                src={p.cover}
                alt={p.coverAlt}
                maxHeight={720}
                priority
                className="rounded-[12px] shadow-[0_30px_70px_-35px_rgb(31_42_34/0.5)]"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </header>
  );
}
