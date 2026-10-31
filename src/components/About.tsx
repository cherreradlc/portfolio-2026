"use client";

import { CODE_TOOLS, DESIGN_TOOLS, SITE, SKILLS } from "@/data/site";
import { FadeUp, SplitWords } from "./Reveal";
import { useLang } from "@/i18n/lang";

/**
 * "Hi there, call me Consu": a huge staggered greeting and a monospaced bio
 * with the calls to action. No portrait here — the hero already shows it.
 */
export default function About() {
  const { t } = useLang();

  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-10">
      <div className="relative">
        <p className="font-mono text-[13px] tracking-wide uppercase">{t({ en: "Hi there,", es: "Hola," })}</p>
        <h2 className="mt-6 text-[clamp(3.6rem,10vw,8.5rem)] leading-[0.86] tracking-[-0.055em] uppercase">
          <SplitWords key={t({ en: "a", es: "b" })} text={t({ en: "Call me", es: "Soy" })} className="block" />
          <SplitWords text="Consu" delay={0.12} className="block pl-[1.2em] text-brand" />
        </h2>
      </div>

      <div className="flex flex-col justify-end gap-8 font-mono text-[14px] leading-[1.7] text-ink-soft md:pt-40 md:pr-12">
        <FadeUp>
          <p>
            {t({
              en: "Hi, I'm Consuelo, a UX/UI designer and front-end developer based in Chile. I come from graphic design, where I learned to build brands and consistent visual systems. Today I design clear, accessible, human-centered digital products, and build them myself with React, Next.js and Supabase.",
              es: "Hola, soy Consuelo, diseñadora UX/UI y desarrolladora front-end en Chile. Vengo del diseño gráfico, donde aprendí a construir marcas y sistemas visuales consistentes. Hoy diseño productos digitales claros, accesibles y centrados en las personas, y los construyo yo misma con React, Next.js y Supabase.",
            })}
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p>
            {t({
              en: "I've designed brand guidelines, corporate identities and campaign materials for startups and small businesses, and earned my UX/UI certification (SENCE Talento Digital, June 2026): research, information architecture, usability and interface design.",
              es: "He diseñado manuales de marca, identidades corporativas y piezas de campaña para empresas nuevas, y me certifiqué en UX/UI (SENCE Talento Digital, junio 2026): investigación, arquitectura de información, usabilidad y diseño de interfaces.",
            })}
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p>
            {t({
              en: `I work remotely from ${SITE.location} as a freelancer or contractor, and adapt my schedule to overlap with European teams. English B2, Spanish native.`,
              es: `Trabajo en remoto desde ${SITE.location} como freelance o contractor, y adapto mi horario para coincidir con equipos en Europa. Inglés B2, español nativo.`,
            })}
          </p>
        </FadeUp>

        <FadeUp delay={0.12}>
          <dl className="grid gap-6 border-t border-line pt-6 text-[12.5px] sm:grid-cols-2">
            <div>
              <dt className="tracking-[0.12em] text-muted">{t({ en: "DESIGN", es: "DISEÑO" })}</dt>
              <dd className="mt-2 text-ink">{DESIGN_TOOLS.join(" · ")}</dd>
            </div>
            <div>
              <dt className="tracking-[0.12em] text-muted">{t({ en: "CODE", es: "CÓDIGO" })}</dt>
              <dd className="mt-2 text-ink">{CODE_TOOLS.join(" · ")}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="tracking-[0.12em] text-muted">{t({ en: "SKILLS", es: "HABILIDADES" })}</dt>
              <dd className="mt-2 text-ink">{SKILLS.map(t).join(" · ")}</dd>
            </div>
          </dl>
        </FadeUp>

        <FadeUp delay={0.16}>
          <div className="flex flex-wrap gap-3 border-t border-line pt-7 font-sans">
            <a
              href="#contacto"
              className="group relative flex min-w-[220px] items-center justify-between gap-6 overflow-hidden rounded-[4px] bg-brand px-5 py-3.5 text-[13px] font-medium tracking-wide text-paper uppercase"
            >
              <span className="absolute inset-0 translate-y-full bg-brand-deep transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:translate-y-0" />
              <span className="relative">{t({ en: "Get in touch", es: "Conversemos" })}</span>
              <span className="relative text-[18px] leading-none transition-transform duration-500 group-hover:rotate-90">+</span>
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-[4px] border border-ink/30 px-5 py-3.5 text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 hover:border-brand hover:text-brand"
            >
              LinkedIn
            </a>
            <a
              href={t(SITE.cv)}
              target="_blank"
              rel="noreferrer"
              className="rounded-[4px] border border-ink/30 px-5 py-3.5 text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 hover:border-brand hover:text-brand"
            >
              {t({ en: "Resume", es: "CV" })}
            </a>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
