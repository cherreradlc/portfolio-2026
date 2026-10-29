"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import type { Accent, Project } from "@/data/projects";
import { useLang } from "@/i18n/lang";
import { useProjects } from "@/i18n/projects";
import PhoneFan from "./PhoneFan";
import { isSmall, naturalWidth } from "./SizedImage";

/** Card tints: soft, light washes of each project's accent. */
export const ACCENT_STYLES: Record<Accent, { card: string; tint: string; chip: string; dark?: boolean }> = {
  tangerine: { card: "bg-[#f7e6ec]", tint: "#f7e6ec", chip: "bg-tangerine text-paper" },
  violet: { card: "bg-[#eee8f5]", tint: "#eee8f5", chip: "bg-brand text-paper" },
  sage: { card: "bg-[#f3e9f0]", tint: "#f3e9f0", chip: "bg-sage text-paper" },
  wine: { card: "bg-[#f5e5e9]", tint: "#f5e5e9", chip: "bg-wine text-paper" },
  ink: { card: "bg-[#ece6ee]", tint: "#ece6ee", chip: "bg-brand text-paper" },
};

/**
 * Selected work, one large panel per project. Each panel tips in from a
 * 3D tilt as it enters, lies flat while it is centred and tips away again
 * as it leaves, so scrolling feels like leafing through physical boards.
 */
export default function ProjectStack() {
  const projects = useProjects();
  return (
    <div className="flex flex-col gap-[12vh] pb-[6vh]">
      {projects.map((p, i) => (
        <Card key={p.slug} project={p} index={i} total={projects.length} />
      ))}
    </div>
  );
}

function Card({ project: p, index, total }: { project: Project; index: number; total: number }) {
  const { t } = useLang();
  const style = ACCENT_STYLES[p.accent];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const flip = index % 2 ? -1 : 1;
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [26, 0, 0, -14]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-3 * flip, 0, 0, 2 * flip]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.86, 1, 1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const fills = !p.screens && naturalWidth(p.cover) >= 1600;

  return (
    <div ref={ref} className="[perspective:1600px]">
      <motion.article
        style={{ rotateX, rotateZ, scale, y }}
        className={`relative mx-auto aspect-[4/5] w-full max-w-[1100px] overflow-hidden rounded-md sm:aspect-[16/10] ${style.card} shadow-[0_40px_80px_-50px_rgb(43_34_48/0.45)]`}
      >
        <Link href={`/proyectos/${p.slug}`} data-cursor={t({ en: "View project", es: "Ver proyecto" })} className="group absolute inset-0 block">
          {/* Imagen: las grandes llenan el panel; el resto se ve entera, sin estirarse. */}
          <div className="absolute inset-x-0 top-0 bottom-[150px] sm:bottom-[120px]">
            {p.screens ? (
              <PhoneFan screens={p.screens} height="88%" />
            ) : fills ? (
              <Image
                src={p.cover}
                alt={p.coverAlt}
                fill
                sizes="(max-width: 1100px) 100vw, 1100px"
                className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-fluid)] group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 p-6 sm:p-10">
                <div className="relative h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-fluid)] group-hover:scale-[1.03]">
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    sizes="(max-width: 768px) 90vw, 600px"
                    unoptimized={isSmall(p.cover)}
                    className="object-contain drop-shadow-[0_24px_40px_rgb(43_34_48/0.22)]"
                  />
                </div>
              </div>
            )}
          </div>

          <div
            className="absolute inset-x-0 bottom-0 px-5 pt-16 pb-5 sm:px-7 sm:pb-6"
            style={{ background: `linear-gradient(to top, ${style.tint} 62%, transparent)` }}
          >
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.05] tracking-[-0.03em] uppercase">{p.title}</h3>
              <span className="hidden font-mono text-[12px] text-muted sm:block">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-3 border-t border-ink/15 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[11.5px] tracking-wide text-ink-soft uppercase">
                {p.category} <span className="mx-1 opacity-50">·</span> {p.year}
              </p>
              <span className="relative inline-flex w-fit items-center gap-2 overflow-hidden rounded-[4px] border border-ink/30 px-4 py-2 text-[12px] font-medium tracking-wide uppercase">
                <span className="absolute inset-0 translate-y-full bg-brand transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:translate-y-0" />
                <span className="relative transition-colors duration-500 group-hover:text-paper">
                  {t({ en: "View project", es: "Ver proyecto" })} →
                </span>
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    </div>
  );
}
