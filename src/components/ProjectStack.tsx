"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Accent, Project } from "@/data/projects";
import { SplitWords } from "./Reveal";

/** Card colours: a soft tint of each project's accent, or ink for the dark one. */
export const ACCENT_STYLES: Record<Accent, { card: string; chip: string; dark?: boolean }> = {
  tangerine: { card: "bg-[#ffd8c6]", chip: "bg-tangerine text-paper" },
  violet: { card: "bg-[#dcd6ff]", chip: "bg-violet text-paper" },
  sage: { card: "bg-[#dde1cc]", chip: "bg-sage text-paper" },
  wine: { card: "bg-[#ecd5d6]", chip: "bg-wine text-paper" },
  ink: { card: "bg-ink text-paper", chip: "bg-paper text-ink", dark: true },
};

/**
 * Selected work as a deck: every card pins near the top and the next one
 * slides over it while the ones underneath shrink back a little. Reads as a
 * single fluid motion instead of a grid of thumbnails.
 */
export default function ProjectStack({ projects }: { projects: Project[] }) {
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
  const style = ACCENT_STYLES[p.accent];
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.04]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, index === total - 1 ? 0 : 0.18]);

  return (
    <div className="sticky top-0 flex min-h-[100svh] items-start justify-center pt-[12svh] sm:pt-[14vh]">
      <motion.article
        style={{ scale, top: `${index * 14}px` }}
        className={`relative w-full origin-top overflow-hidden rounded-[28px] ${style.card} shadow-[0_-20px_60px_-30px_rgb(18_17_16/0.35)]`}
      >
        <Link
          href={`/proyectos/${p.slug}`}
          data-cursor="Ver caso"
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
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className={`rounded-full border px-3 py-1 text-[12.5px] ${
                      style.dark ? "border-paper/25" : "border-ink/20"
                    }`}
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <span
                className={`flex items-center gap-2 rounded-full px-5 py-3 text-[14px] transition-all duration-500 ease-[var(--ease-fluid)] group-hover:gap-4 ${
                  style.dark ? "bg-paper text-ink" : "bg-ink text-paper"
                }`}
              >
                Ver caso <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>

          <div className="relative min-h-[38svh] overflow-hidden rounded-[20px] md:min-h-0">
            {p.coverKind === "phone" ? (
              <PhoneCover project={p} />
            ) : (
              <Image
                src={p.cover}
                alt={p.coverAlt}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-fluid)] group-hover:scale-[1.06]"
              />
            )}
          </div>
        </Link>
        <motion.div
          className="pointer-events-none absolute inset-0 bg-ink"
          style={{ opacity: dim }}
          aria-hidden="true"
        />
      </motion.article>
    </div>
  );
}

/** Mobile-first work shown where it lives: inside a phone, tilting on hover. */
function PhoneCover({ project: p }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#c9cfb2] to-[#eef0e4]">
      <div className="relative aspect-[390/844] h-[88%] max-h-[560px] rotate-[-6deg] rounded-[34px] border-[7px] border-ink bg-ink shadow-[0_40px_80px_-30px_rgb(18_17_16/0.6)] transition-transform duration-[1.2s] ease-[var(--ease-fluid)] group-hover:rotate-0 group-hover:scale-[1.04]">
        <div className="absolute top-2 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
        <div className="relative h-full w-full overflow-hidden rounded-[27px]">
          <Image src={p.cover} alt={p.coverAlt} fill sizes="320px" className="object-cover object-top" />
        </div>
      </div>
    </div>
  );
}
