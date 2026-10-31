"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import PhoneFan from "../PhoneFan";
import { useLang } from "@/i18n/lang";
import { naturalWidth } from "../SizedImage";

/**
 * A full-width invitation to keep reading, with the next project's visual
 * sliding in on hover: phones for mobile work, the cover for everything else
 * (filling the panel only when the file is large enough not to stretch).
 */
export default function NextProject({ project: p }: { project: Project }) {
  const { t } = useLang();
  const fills = !p.screens && naturalWidth(p.cover) >= 1600;

  return (
    <Link
      href={`/proyectos/${p.slug}`}
      className="group relative block overflow-hidden rounded-md bg-paper-2 px-6 py-16 sm:px-10 md:py-24"
    >
      <div
        className="absolute inset-y-0 right-0 hidden w-1/2 opacity-0 transition-opacity duration-700 group-hover:opacity-90 md:block"
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
            className={`transition-transform duration-[1.4s] ease-[var(--ease-fluid)] group-hover:scale-[1.03] ${
              fills ? "object-cover" : "object-contain p-8"
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-paper-2 via-paper-2/40 to-transparent" />
      </div>
      <p className="relative font-mono text-[12.5px] tracking-wide text-muted uppercase">{t({ en: "NEXT PROJECT", es: "SIGUIENTE PROYECTO" })}</p>
      <p className="relative mt-5 flex items-end justify-between gap-6 text-[clamp(2.4rem,6.5vw,6rem)] leading-[0.9] tracking-[-0.05em] uppercase">
        <span className="max-w-4xl transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:translate-x-3">
          {p.title}
        </span>
        <span className="hidden shrink-0 text-brand transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:translate-x-3 sm:inline">
          →
        </span>
      </p>
    </Link>
  );
}
