"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import type { Project } from "@/data/projects";
import { isSmall } from "./SizedImage";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Selected work as a magazine contents page: numbered rows with the title in
 * the display serif, discipline and year in columns. Hovering a row washes it
 * pink, nudges the title and floats that project's image beside the pointer.
 * Phones have no hover, so each row carries its own image instead.
 */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <div className="label hidden grid-cols-12 gap-6 border-b border-ink pb-3 text-muted md:grid">
        <span className="col-span-1">N.º</span>
        <span className="col-span-6">Proyecto</span>
        <span className="col-span-3">Disciplina</span>
        <span className="col-span-2 text-right">Año</span>
      </div>

      <ul>
        {projects.map((p, i) => (
          <li key={p.slug} className="border-b border-line">
            <Link
              href={`/proyectos/${p.slug}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              className="group relative block overflow-hidden"
            >
              {/* lavado rosa que entra desde la izquierda */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-blush transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:scale-x-100"
              />
              <motion.div
                className="relative grid grid-cols-12 items-baseline gap-x-6 gap-y-3 py-7 md:py-9"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
              >
                <span className="col-span-2 font-serif text-[15px] text-muted italic md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 font-serif text-[clamp(1.9rem,4.4vw,4rem)] leading-[1] tracking-[-0.015em] transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:translate-x-4 md:col-span-6">
                  {p.title}
                </span>
                <span className="col-span-10 col-start-3 text-[14.5px] text-ink-soft md:col-span-3 md:col-start-auto">
                  {p.category}
                </span>
                <span className="hidden text-right text-[14.5px] text-ink-soft md:col-span-2 md:flex md:items-baseline md:justify-end md:gap-3">
                  {p.year}
                  <span className="inline-block -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </span>

                {/* en celular la imagen va dentro de la fila */}
                <div className="relative col-span-10 col-start-3 mt-2 aspect-[4/3] overflow-hidden bg-blush md:hidden">
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    sizes="80vw"
                    unoptimized={isSmall(p.cover)}
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </Link>
          </li>
        ))}
      </ul>

      {/* imagen flotante que sigue al cursor (solo escritorio) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block"
        style={{ x: sx, y: sy }}
        aria-hidden="true"
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={projects[active].slug}
              className="relative ml-8 -mt-[190px] h-[380px] w-[300px] overflow-hidden bg-blush shadow-[0_30px_60px_-30px_rgb(58_16_48/0.55)]"
              initial={{ clipPath: "inset(100% 0 0 0)", rotate: -4 }}
              animate={{ clipPath: "inset(0% 0 0 0)", rotate: 0 }}
              exit={{ clipPath: "inset(0 0 100% 0)", rotate: 3 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <Image
                src={projects[active].cover}
                alt=""
                fill
                sizes="300px"
                unoptimized={isSmall(projects[active].cover)}
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
