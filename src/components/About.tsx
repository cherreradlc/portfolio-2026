"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { SKILLS, SOFTWARE } from "@/data/site";
import { FadeUp, ScrollText } from "./Reveal";

/**
 * Portrait card that tilts toward the pointer and drifts on scroll, next to a
 * bio that fills in word by word.
 */
export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });

  return (
    <div ref={ref} className="grid items-start gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
      {/* La foto actual es pequeña (170 px): la tarjeta no la estira más allá. */}
      <motion.div style={{ y: drift }} className="mx-auto w-full max-w-[190px] [perspective:900px]">
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
          className="relative rotate-[-3deg] rounded-[22px] bg-paper p-3 pb-14 shadow-[0_30px_60px_-25px_rgb(18_17_16/0.45)]"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-[14px]">
            <Image src="/consuelo.jpg" alt="Consuelo Herrera De La Calle" fill sizes="200px" unoptimized className="object-cover" />
          </div>
          <figcaption className="absolute bottom-4 left-5 font-serif text-[22px] italic">Hola, soy Consu ✶</figcaption>
        </motion.figure>
      </motion.div>

      <div>
        <ScrollText
          className="text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.18] font-medium tracking-[-0.025em]"
          text="Convierto problemas complejos en experiencias simples. Vengo del diseño gráfico, donde aprendí a construir marcas y sistemas visuales consistentes, y hoy uso esa mirada para diseñar productos digitales claros, accesibles y centrados en las personas."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <FadeUp>
            <h3 className="text-[12px] tracking-[0.22em] text-muted">EXPERIENCIA</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
              Diseñadora gráfica para empresas nuevas: manuales de marca, identidades corporativas y piezas para campañas políticas en Chile.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h3 className="text-[12px] tracking-[0.22em] text-muted">FORMACIÓN</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
              Diseño, con especialización en UX/UI: investigación, arquitectura de información, usabilidad y diseño de interfaces.
            </p>
          </FadeUp>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <FadeUp>
            <h3 className="text-[12px] tracking-[0.22em] text-muted">SOFTWARE</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SOFTWARE.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-ink px-4 py-2 text-[14px] text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-tangerine"
                >
                  {t}
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h3 className="text-[12px] tracking-[0.22em] text-muted">HABILIDADES</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SKILLS.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-ink/20 px-4 py-2 text-[14px] transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {t}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
