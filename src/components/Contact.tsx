"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SplitWords } from "./Reveal";
import { SITE } from "@/data/site";
import { useLang } from "@/i18n/lang";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Closing section: a big staggered invitation and a one-tap way to write. */
export default function Contact() {
  const { t } = useLang();
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

  const links = [
    { label: "LinkedIn", href: SITE.linkedin },
    { label: t({ en: "Resume", es: "Currículum" }), href: SITE.cv },
  ];

  return (
    <div className="relative">
      <p className="font-mono text-[13px] tracking-wide uppercase">
        {t({ en: "Got a project or an opening?", es: "¿Tienes un proyecto o una vacante?" })}
      </p>
      <h2 className="mt-6 text-[clamp(3.2rem,11vw,10rem)] leading-[0.86] tracking-[-0.055em] uppercase">
        <SplitWords key={t({ en: "a", es: "b" })} text={t({ en: "Let's create", es: "Creemos" })} className="block" />
        <SplitWords key={t({ en: "c", es: "d" })} text={t({ en: "something", es: "algo" })} delay={0.1} className="block pl-[1em] text-brand" />
        <SplitWords key={t({ en: "e", es: "f" })} text={t({ en: "memorable.", es: "memorable." })} delay={0.2} className="block" />
      </h2>

      <div className="mt-14 grid gap-8 border-t border-line pt-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="relative">
          <button
            type="button"
            onClick={copy}
            data-cursor={copied ? t({ en: "Done!", es: "¡Listo!" }) : t({ en: "Copy", es: "Copiar" })}
            className="group flex items-center gap-4 text-left text-[clamp(1.2rem,3.4vw,2.4rem)] tracking-[-0.03em] break-all"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size,color] duration-700 ease-[var(--ease-fluid)] group-hover:bg-[length:100%_1.5px] group-hover:text-brand">
              {SITE.email}
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border border-ink/25 text-[14px] transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-paper">
              {copied ? "✓" : "⧉"}
            </span>
          </button>
          <AnimatePresence>
            {copied && (
              <motion.span
                role="status"
                className="absolute -top-10 left-0 rounded-[4px] bg-brand px-3 py-1.5 font-mono text-[12px] text-paper"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {t({ en: "Email copied ✓", es: "Correo copiado ✓" })}
              </motion.span>
            )}
          </AnimatePresence>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-3 inline-block font-mono text-[12.5px] text-muted uppercase underline underline-offset-4 transition-colors hover:text-ink"
          >
            {t({ en: "or write to me directly", es: "o escríbeme directo" })}
          </a>
        </div>

        <ul className="flex flex-wrap gap-3">
          {links.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-[4px] border border-ink/30 px-5 py-3 text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-paper"
              >
                {s.label}
                <span className="transition-transform duration-500 group-hover:rotate-45">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
