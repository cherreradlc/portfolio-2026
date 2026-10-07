"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Magnetic from "./Magnetic";
import { SplitWords } from "./Reveal";
import { SITE } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Closing section: a big invitation to talk and a one-tap way to do it. */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  }

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const socials = [
    { label: "LinkedIn", href: SITE.linkedin },
    { label: "Instagram", href: SITE.instagram },
    { label: "Currículum", href: SITE.cv },
  ];

  return (
    <div className="relative">
      <p className="text-[13px] tracking-[0.22em] text-paper/50">¿TIENES UN PROYECTO O UNA VACANTE?</p>
      <h2 className="mt-6 text-[clamp(3.4rem,12vw,11rem)] leading-[0.88] font-medium tracking-[-0.05em]">
        <SplitWords text="Creemos algo" className="block" />
        <SplitWords text="memorable." delay={0.15} className="block font-serif font-normal italic text-sky" />
      </h2>

      <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="relative">
          <Magnetic strength={0.25}>
            <button
              type="button"
              onClick={copy}
              data-cursor={copied ? "¡Listo!" : "Copiar"}
              className="group relative flex items-center gap-4 overflow-hidden rounded-full border border-paper/25 py-3 pr-3 pl-6 text-left text-[clamp(1.05rem,2.6vw,1.6rem)] tracking-tight transition-colors duration-500 hover:border-sky"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-brand transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:scale-x-100" />
              <span className="relative">{SITE.email}</span>
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper text-[15px] text-brand-deep">
                {copied ? "✓" : "⧉"}
              </span>
            </button>
          </Magnetic>
          <AnimatePresence>
            {copied && (
              <motion.span
                role="status"
                className="absolute -top-11 left-6 rounded-full bg-paper px-4 py-2 text-[13px] text-ink"
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                Correo copiado ✓
              </motion.span>
            )}
          </AnimatePresence>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-3 ml-6 inline-block text-[14px] text-paper/55 underline underline-offset-4 transition-colors hover:text-paper"
          >
            o escríbeme directo
          </a>
        </div>

        <ul className="flex flex-wrap gap-3">
          {socials.map((s) =>
            s.href ? (
              <li key={s.label}>
                <Magnetic>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 rounded-full border border-paper/25 px-5 py-3 text-[15px] transition-colors duration-300 hover:bg-paper hover:text-ink"
                  >
                    {s.label}
                    <span className="transition-transform duration-500 group-hover:rotate-45">↗</span>
                  </a>
                </Magnetic>
              </li>
            ) : (
              <li
                key={s.label}
                className="flex items-center gap-2 rounded-full border border-dashed border-paper/20 px-5 py-3 text-[15px] text-paper/40"
                title="Disponible pronto"
              >
                {s.label} <span className="text-[11px] tracking-wider">PRONTO</span>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}
