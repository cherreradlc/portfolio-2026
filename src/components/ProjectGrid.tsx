"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "./Reveal";
import PhoneFan from "./PhoneFan";
import { ACCENT_STYLES } from "./ProjectStack";
import { useLang } from "@/i18n/lang";
import { useProjects } from "@/i18n/projects";

/**
 * Recent work as simple cards: a picture, the title and a one-line category.
 * Nothing more on the home page — the story lives inside each project.
 */
export default function ProjectGrid() {
  const { t } = useLang();
  const projects = useProjects();

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {projects.map((p, i) => (
        <li key={p.slug}>
          <FadeUp delay={i * 0.08} y={30}>
            <Link
              href={`/proyectos/${p.slug}`}
              data-cursor={t({ en: "View", es: "Ver" })}
              className="group block overflow-hidden rounded-[14px] border border-line bg-white transition duration-500 ease-[var(--ease-fluid)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-36px_rgb(43_34_48/0.45)]"
            >
              <span
                className={`relative block aspect-[4/3] overflow-hidden ${ACCENT_STYLES[p.accent].card}`}
              >
                {p.screens ? (
                  <PhoneFan screens={p.screens} height="84%" />
                ) : (
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:scale-[1.04]"
                  />
                )}
              </span>
              <span className="flex items-end justify-between gap-4 px-5 py-4">
                <span>
                  <span className="block text-[17px] leading-snug font-medium tracking-[-0.01em]">{p.title}</span>
                  <span className="mt-1 block font-mono text-[12px] tracking-wide text-muted uppercase">{p.category}</span>
                </span>
                <span className="text-[18px] text-brand transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          </FadeUp>
        </li>
      ))}
    </ul>
  );
}
