"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import type { Project } from "@/data/projects";
import { ACCENT_STYLES } from "@/data/accents";
import { FadeUp, Rule, SplitWords } from "../Reveal";
import PhoneFan from "../PhoneFan";
import SizedImage from "../SizedImage";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Case-study opener in the magazine style: a folio line, the title in the
 * display serif, the standfirst beside a table of facts, and the cover on its
 * tinted panel, which opens from the bottom and drifts a little on scroll.
 */
export default function CaseHero({ project: p }: { project: Project }) {
  const cover = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cover, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const style = ACCENT_STYLES[p.accent];

  const facts = [
    { k: "Rol", v: p.role },
    { k: "Año", v: p.year },
    { k: "Herramientas", v: p.tools.join(", ") },
  ];

  return (
    <header>
      <div className="mx-auto max-w-[1400px] px-4 pt-24 sm:px-8 md:pt-28">
        <motion.div
          className="label flex items-center justify-between border-b border-line pb-3 text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Link href="/#proyectos" className="underline-draw pb-0.5 text-ink">
            ← Todos los proyectos
          </Link>
          <span>{p.category}</span>
        </motion.div>

        <SplitWords
          as="h1"
          text={p.title}
          immediate
          delay={0.15}
          className="mt-8 max-w-6xl font-serif text-[clamp(2.8rem,7.4vw,7rem)] leading-[0.95] tracking-[-0.02em]"
        />

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <FadeUp className="md:col-span-7">
            <p className="max-w-2xl font-serif text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.45] text-ink-soft">
              {p.intro}
            </p>
            {p.live && (
              <a
                href={p.live.href}
                target="_blank"
                rel="noreferrer"
                className="group relative mt-8 inline-block overflow-hidden bg-brand px-6 py-3.5 text-[15px] text-paper"
              >
                <span className="absolute inset-0 -translate-x-full bg-pink transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:translate-x-0" />
                <span className="relative transition-colors duration-300 group-hover:text-ink">{p.live.label} ↗</span>
              </a>
            )}
          </FadeUp>
          <dl className="md:col-span-4 md:col-start-9">
            {facts.map((f, i) => (
              <FadeUp key={f.k} delay={0.1 + i * 0.07}>
                <Rule className="text-line" delay={0.1 + i * 0.07} />
                <div className="grid grid-cols-3 gap-4 py-4">
                  <dt className="label pt-0.5 text-brand">{f.k}</dt>
                  <dd className="col-span-2 text-[15px] leading-snug">{f.v}</dd>
                </div>
              </FadeUp>
            ))}
          </dl>
        </div>
      </div>

      <div ref={cover} className="mt-14 px-4 sm:px-8 md:mt-20">
        <motion.div
          className={`relative mx-auto max-w-[1400px] overflow-hidden ${style.card}`}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
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
                className="shadow-[0_30px_70px_-35px_rgb(58_16_48/0.5)]"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </header>
  );
}
