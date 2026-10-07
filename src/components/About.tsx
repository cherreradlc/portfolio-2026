"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { SKILLS, SOFTWARE } from "@/data/site";
import { FadeUp, Rule } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Laid out like a magazine profile: a pull quote in the display serif, a
 * small captioned portrait that unveils from a plum frame, and short columns
 * of facts. The quote drifts slightly slower than the page as you scroll.
 */
export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="grid gap-14 md:grid-cols-12 md:gap-8">
      <motion.blockquote style={{ y: drift }} className="md:col-span-7">
        <FadeUp>
          <p className="font-serif text-[clamp(1.9rem,3.6vw,3.3rem)] leading-[1.1] tracking-[-0.01em]">
            <span className="text-pink">“</span>Vengo del diseño gráfico. Hoy diseño productos digitales con la misma
            obsesión por el detalle, pero empezando siempre por{" "}
            <em className="italic">las personas que los van a usar.</em>
            <span className="text-pink">”</span>
          </p>
        </FadeUp>
      </motion.blockquote>

      <figure className="md:col-span-4 md:col-start-9">
        {/* El marco (siempre visible) dispara la animación: un elemento
            recortado a altura cero nunca cuenta como "en pantalla". */}
        <motion.div
          className="relative w-full max-w-[248px] overflow-hidden bg-brand"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          <motion.div
            className="relative aspect-[248/252]"
            variants={{
              hidden: { clipPath: "inset(0 0 100% 0)", scale: 1.12 },
              shown: { clipPath: "inset(0 0 0% 0)", scale: 1 },
            }}
            transition={{ duration: 1.3, ease: EASE }}
          >
            <Image
              src="/consuelo.jpg"
              alt="Consuelo Herrera De La Calle"
              fill
              sizes="248px"
              unoptimized
              loading="eager"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[13px] text-muted">
          <span className="font-serif text-[16px] text-ink italic">Consuelo Herrera</span>
          <span>Coquimbo, Chile</span>
        </figcaption>
      </figure>

      <div className="grid gap-10 sm:grid-cols-2 md:col-span-12 md:grid-cols-4 md:gap-8">
        {[
          {
            title: "Hoy",
            body: "Diseñadora UX/UI con base en diseño gráfico: investigación, prototipado e interfaces accesibles.",
          },
          {
            title: "Antes",
            body: "Manuales de marca, identidades corporativas y piezas para campañas políticas en Chile.",
          },
          { title: "Herramientas", body: SOFTWARE.join(", ") + "." },
          { title: "Enfoque", body: SKILLS.join(", ") + "." },
        ].map((c, i) => (
          <FadeUp key={c.title} delay={i * 0.08}>
            <Rule className="text-line" delay={i * 0.08} />
            <h3 className="label mt-4 text-brand">{c.title}</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">{c.body}</p>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
