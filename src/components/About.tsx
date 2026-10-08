"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { SKILLS, SOFTWARE } from "@/data/site";
import { FadeUp, ScrollText } from "./Reveal";
import { useLang } from "@/i18n/lang";

/**
 * Portrait card that tilts toward the pointer and drifts on scroll, next to a
 * bio that fills in word by word.
 */
export default function About() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });

  return (
    <div ref={ref} className="grid items-start gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
      {/* Foto de 900 × 1147 px: nítida incluso al doble de densidad. */}
      <motion.div style={{ y: drift }} className="mx-auto w-full max-w-[340px] [perspective:900px]">
        <motion.figure
          style={{ rotateX: srx, rotateY: sry }}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
            rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16);
          }}
          onPointerLeave={() => {
            rx.set(0);
            ry.set(0);
          }}
          className="relative rotate-[-3deg] rounded-[22px] bg-paper p-3 pb-14 shadow-[0_30px_60px_-25px_rgb(58_16_48/0.45)]"
        >
          <div className="relative aspect-[900/1147] overflow-hidden rounded-[14px]">
            <Image src="/consuelo.jpg" alt="Consuelo Herrera De La Calle" fill sizes="340px" className="object-cover" />
          </div>
          <figcaption className="absolute bottom-4 left-5 font-serif text-[22px] italic">{t({ en: "Hi, I'm Consu ✶", es: "Hola, soy Consu ✶" })}</figcaption>
        </motion.figure>
      </motion.div>

      <div>
        <ScrollText
          key={t({ en: "en", es: "es" })}
          className="text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.18] font-medium tracking-[-0.025em]"
          text={t({
            en: "I turn complex problems into simple experiences. I come from graphic design, where I learned to build brands and consistent visual systems, and today I bring that eye to designing clear, accessible, human-centered digital products.",
            es: "Convierto problemas complejos en experiencias simples. Vengo del diseño gráfico, donde aprendí a construir marcas y sistemas visuales consistentes, y hoy uso esa mirada para diseñar productos digitales claros, accesibles y centrados en las personas.",
          })}
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <FadeUp>
            <h3 className="text-[12px] tracking-[0.22em] text-muted">{t({ en: "EXPERIENCE", es: "EXPERIENCIA" })}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
              {t({
                en: "Graphic designer for startups and small businesses: brand guidelines, corporate identities and materials for political campaigns in Chile.",
                es: "Diseñadora gráfica para empresas nuevas: manuales de marca, identidades corporativas y piezas para campañas políticas en Chile.",
              })}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h3 className="text-[12px] tracking-[0.22em] text-muted">{t({ en: "EDUCATION", es: "FORMACIÓN" })}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
              {t({
                en: "Design studies and a UX/UI certification (SENCE Talento Digital, 2026): research, information architecture, usability and interface design.",
                es: "Estudios en Diseño y certificación en UX/UI (SENCE Talento Digital, 2026): investigación, arquitectura de información, usabilidad y diseño de interfaces.",
              })}
            </p>
          </FadeUp>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <FadeUp>
            <h3 className="text-[12px] tracking-[0.22em] text-muted">SOFTWARE</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SOFTWARE.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full bg-brand px-4 py-2 text-[14px] text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h3 className="text-[12px] tracking-[0.22em] text-muted">{t({ en: "SKILLS", es: "HABILIDADES" })}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <li
                  key={skill.en}
                  className="rounded-full border border-ink/20 px-4 py-2 text-[14px] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-paper"
                >
                  {t(skill)}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
