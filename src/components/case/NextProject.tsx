"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import PhoneFan from "../PhoneFan";
import { isSmall, naturalWidth } from "../SizedImage";

/**
 * The next case as a plum panel: the title large in the display serif, a pink
 * rule that runs the full width on hover, and the next project's visual
 * sliding in on the right.
 */
export default function NextProject({ project: p }: { project: Project }) {
  const fills = !p.screens && naturalWidth(p.cover) >= 1600;

  return (
    <Link href={`/proyectos/${p.slug}`} className="group relative block overflow-hidden bg-brand px-6 py-16 text-paper sm:px-10 md:py-24">
      <div
        className="absolute inset-y-0 right-0 hidden w-1/2 translate-x-8 opacity-0 transition-all duration-700 ease-[var(--ease-fluid)] group-hover:translate-x-0 group-hover:opacity-70 md:block"
        aria-hidden="true"
      >
        {p.screens ? (
          <PhoneFan screens={p.screens} height="78%" />
        ) : (
          <Image
            src={p.cover}
            alt=""
            fill
            sizes="(max-width: 1280px) 50vw, 640px"
            unoptimized={isSmall(p.cover)}
            className={fills ? "object-cover" : "object-contain p-8"}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/40 to-transparent" />
      </div>
      <p className="label relative text-sky">Siguiente proyecto</p>
      <p className="relative mt-5 max-w-4xl font-serif text-[clamp(2.4rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.02em] transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:translate-x-3">
        {p.title} <span className="text-pink">→</span>
      </p>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-pink transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:scale-x-100"
      />
    </Link>
  );
}
