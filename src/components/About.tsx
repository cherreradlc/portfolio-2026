"use client";

import { SITE, SKILLS, SOFTWARE } from "@/data/site";
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
              en: "Hi, I'm Consuelo, a graphic and UX/UI designer from Chile. I come from graphic design, where I learned to build brands and consistent visual systems, and today I bring that eye to designing clear, accessible, human-centered digital products. And I build what I design, with Next.js, React and Supabase.",
              es: "Hola, soy Consuelo, diseñadora gráfica y UX/UI de Chile. Vengo del diseño gráfico, donde aprendí a construir marcas y sistemas visuales consistentes, y hoy uso esa mirada para diseñar productos digitales claros, accesibles y centrados en las personas. Y construyo lo que diseño, con Next.js, React y Supabase.",
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

        <FadeUp delay={0.12}>
          <dl className="grid gap-6 border-t border-line pt-6 text-[12.5px] sm:grid-cols-2">
            <div>
              <dt className="tracking-[0.12em] text-muted">SOFTWARE</dt>
              <dd className="mt-2 text-ink">{SOFTWARE.join(" · ")}</dd>
            </div>
            <div>
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
              <span className="relative">{t({ en: "Start a project", es: "Empecemos" })}</span>
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
              href={SITE.cv}
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
