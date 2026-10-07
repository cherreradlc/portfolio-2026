"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";

/** A full-width invitation to keep reading, with the next cover sliding in on hover. */
export default function NextProject({ project: p }: { project: Project }) {
  return (
    <Link
      href={`/proyectos/${p.slug}`}
      data-cursor="Siguiente"
      className="group relative block overflow-hidden rounded-[28px] bg-ink px-6 py-16 text-paper sm:px-10 md:py-24"
    >
      <motion.div
        className="absolute inset-y-0 right-0 w-full opacity-0 transition-opacity duration-700 group-hover:opacity-40 md:w-1/2"
        aria-hidden="true"
      >
        <Image src={p.cover} alt="" fill sizes="50vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-fluid)] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink to-transparent" />
      </motion.div>
      <p className="relative text-[13px] tracking-[0.22em] text-paper/50">SIGUIENTE PROYECTO</p>
      <p className="relative mt-5 flex items-end justify-between gap-6 text-[clamp(2.4rem,6.5vw,6rem)] leading-[0.92] font-medium tracking-[-0.045em]">
        <span className="max-w-4xl transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:translate-x-3">
          {p.title}
        </span>
        <span className="hidden shrink-0 text-tangerine transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:translate-x-3 sm:inline">
          →
        </span>
      </p>
    </Link>
  );
}
