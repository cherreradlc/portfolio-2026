"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Accent, Project } from "@/data/projects";
import { SplitWords } from "./Reveal";
import { useLang } from "@/i18n/lang";
import { useProjects } from "@/i18n/projects";
import PhoneFan from "./PhoneFan";
import { isSmall, naturalWidth } from "./SizedImage";

/** Card colours: a soft tint of each project's accent, or ink for the dark one. */
export const ACCENT_STYLES: Record<Accent, { card: string; chip: string; dark?: boolean }> = {
  // champán, azul polvo, salvia gris y arcilla: tintes suaves y sobrios
  tangerine: { card: "bg-[#f6dde4]", chip: "bg-tangerine text-paper" },
  violet: { card: "bg-[#e9def2]", chip: "bg-brand text-paper" },
  sage: { card: "bg-[#f3dce6]", chip: "bg-sage text-paper" },
  wine: { card: "bg-[#f1d7dc]", chip: "bg-wine text-paper" },
  ink: { card: "bg-brand-deep text-paper", chip: "bg-sky text-brand-deep", dark: true },
};

/**
 * Selected work as a deck: every card pins near the top and the next one
 * slides over it while the ones underneath shrink back a little. Reads as a
 * single fluid motion instead of a grid of thumbnails.
 */
export default function ProjectStack() {
  const projects = useProjects();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative">
      {projects.map((p, i) => (
        <Card
          key={p.slug}
          project={p}
          index={i}
          total={projects.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function Card({
  project: p,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const { t } = useLang();
  const style = ACCENT_STYLES[p.accent];
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.04]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, index === total - 1 ? 0 : 0.18]);

  return (
    <div className="sticky top-0 flex min-h-[100svh] items-start justify-center pt-[12svh] sm:pt-[14vh]">
      <motion.article
        style={{ scale, top: `${index * 14}px` }}
        className={`relative w-full origin-top overflow-hidden rounded-[28px] ${style.card} shadow-[0_-20px_60px_-30px_rgb(58_16_48/0.35)]`}
      >
        <Link
          href={`/proyectos/${p.slug}`}
          data-cursor={t({ en: "View case", es: "Ver caso" })}
          className="group grid min-h-[72svh] gap-6 p-5 sm:p-8 md:grid-cols-[1fr_1.15fr] md:gap-10 md:p-10"
        >
          <div className="flex flex-col justify-between gap-8">
            <div className="flex items-center justify-between gap-4 text-[13px]">
              <span className={`rounded-full px-3 py-1 ${style.chip}`}>{p.category}</span>
              <span className={style.dark ? "text-paper/60" : "text-ink/55"}>
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>

            <div>
              <SplitWords
                key={p.title}
                as="h3"
                text={p.title}
                className="text-[clamp(2rem,4.6vw,4rem)] leading-[0.95] font-medium tracking-[-0.035em]"
                stagger={0.04}
              />
              <p className={`mt-5 max-w-md text-[16px] leading-relaxed ${style.dark ? "text-paper/70" : "text-ink/70"}`}>
                {p.short}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <li
                    key={tag}
                    className={`rounded-full border px-3 py-1 text-[12.5px] ${
                      style.dark ? "border-paper/25" : "border-ink/20"
                    }`}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <span
                className={`flex items-center gap-2 rounded-full px-5 py-3 text-[14px] transition-all duration-500 ease-[var(--ease-fluid)] group-hover:gap-4 ${
                  style.dark ? "bg-paper text-brand-deep" : "bg-brand text-paper"
                }`}
              >
                {t({ en: "View case", es: "Ver caso" })} <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>

          <div
            className={`relative min-h-[44svh] overflow-hidden rounded-[20px] md:min-h-0 ${
              style.dark ? "bg-paper/10" : "bg-paper/45"
            }`}
          >
            {p.screens ? (
              <PhoneFan screens={p.screens} />
            ) : naturalWidth(p.cover) >= 1600 ? (
              // Solo las imágenes grandes llenan el recuadro; el resto se
              // muestra entera para no estirarla.
              <Image
                src={p.cover}
                alt={p.coverAlt}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-fluid)] group-hover:scale-[1.04]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
                <div className="relative h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-fluid)] group-hover:scale-[1.03]">
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    sizes="(max-width: 768px) 90vw, 45vw"
                    unoptimized={isSmall(p.cover)}
                    className="object-contain drop-shadow-[0_24px_40px_rgb(58_16_48/0.25)]"
                  />
                </div>
              </div>
            )}
          </div>
        </Link>
        <motion.div
          className="pointer-events-none absolute inset-0 bg-brand-deep"
          style={{ opacity: dim }}
          aria-hidden="true"
        />
      </motion.article>
    </div>
  );
}
