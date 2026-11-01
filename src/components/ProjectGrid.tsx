"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "./Reveal";
import PhoneFan from "./PhoneFan";
import ProjectBackdrop from "./ProjectBackdrop";
import { ACCENT_STYLES } from "./ProjectStack";
import { useLang } from "@/i18n/lang";
import { useProjects } from "@/i18n/projects";
import type { Project } from "@/data/projects";

type Filtro = "todos" | Project["kind"];

/** Las palabras del inicio ("diseñadora", "front-end") avisan con este evento qué tipo mostrar. */
export const TIPO_EVENT = "portafolio:tipo";

const FILTROS: { id: Filtro; label: { en: string; es: string } }[] = [
  { id: "todos", label: { en: "All", es: "Todos" } },
  { id: "diseno", label: { en: "Design", es: "Diseño" } },
  { id: "frontend", label: { en: "Front-end", es: "Front-end" } },
];

/**
 * Recent work as simple cards: a picture, the title and a one-line category.
 * Nothing more on the home page — the story lives inside each project.
 * Tabs above filter them by type: design, or designed-and-built front-end.
 */
export default function ProjectGrid() {
  const { t } = useLang();
  const all = useProjects();
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const projects = filtro === "todos" ? all : all.filter((p) => p.kind === filtro);

  useEffect(() => {
    const on = (e: Event) => setFiltro((e as CustomEvent<Filtro>).detail);
    window.addEventListener(TIPO_EVENT, on);
    return () => window.removeEventListener(TIPO_EVENT, on);
  }, []);

  return (
    <>
      <div role="group" aria-label={t({ en: "Filter by type", es: "Filtrar por tipo" })} className="mb-8 flex flex-wrap gap-1.5 sm:gap-2">
        {FILTROS.map((f) => {
          const n = f.id === "todos" ? all.length : all.filter((p) => p.kind === f.id).length;
          const on = filtro === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFiltro(f.id)}
              className={`rounded-full border px-3.5 py-2 font-mono text-[11.5px] sm:px-4 sm:text-[12.5px] tracking-wide uppercase transition-colors duration-300 ${on ? "border-brand bg-brand text-paper" : "border-ink/25 hover:border-brand hover:text-brand"}`}
            >
              {t(f.label)} <span className={on ? "opacity-75" : "text-muted"}>({n})</span>
            </button>
          );
        })}
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {projects.map((p, i) => (
          <li key={`${filtro}-${p.slug}`}>
            <FadeUp delay={i * 0.08} y={30}>
              <Link
                href={`/proyectos/${p.slug}`}
                className="group block overflow-hidden rounded-[14px] border border-line bg-white transition duration-500 ease-[var(--ease-fluid)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-36px_rgb(43_34_48/0.45)]"
              >
                <span
                  className={`relative block aspect-[4/3] overflow-hidden ${ACCENT_STYLES[p.accent].card}`}
                >
                  {p.screens ? (
                    <>
                      <ProjectBackdrop slug={p.slug} />
                      <PhoneFan screens={p.screens} height="84%" />
                    </>
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
    </>
  );
}
