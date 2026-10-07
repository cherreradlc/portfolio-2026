"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SplitWords } from "./Reveal";
import { SITE } from "@/data/site";

/** Closing spread: a direct question, the address set large, and two links. */
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

  return (
    <div>
      <p className="label text-sky">Contacto</p>
      <SplitWords
        as="h2"
        text="¿Conversamos?"
        className="mt-6 font-serif text-[clamp(3.6rem,13vw,12rem)] leading-[0.9] tracking-[-0.03em] italic"
      />

      <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="max-w-md text-[16.5px] leading-relaxed text-paper/75">
            Busco un equipo donde diseñar productos claros y marcas con carácter, en Chile o de forma remota.
            Escríbeme y te respondo pronto.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="group mt-8 inline-block font-serif text-[clamp(1.6rem,4.2vw,3.4rem)] leading-tight"
          >
            <span className="relative">
              {SITE.email}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-[3px] origin-left scale-x-[0.18] bg-pink transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:scale-x-100"
              />
            </span>
          </a>
          <div className="relative mt-5 h-6">
            <button type="button" onClick={copy} className="label text-paper/70 transition-colors hover:text-pink">
              Copiar correo
            </button>
            <AnimatePresence>
              {copied && (
                <motion.span
                  role="status"
                  className="label absolute top-0 left-36 text-pink"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Copiado ✓
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <ul className="flex flex-col gap-3 md:col-span-4 md:items-end">
          {[
            { label: "LinkedIn", href: SITE.linkedin },
            { label: "Currículum (PDF)", href: SITE.cv },
          ].map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="underline-draw pb-0.5 text-[18px]"
              >
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
