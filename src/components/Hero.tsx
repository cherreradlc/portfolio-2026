"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from "motion/react";
import { SITE } from "@/data/site";
import { useLang } from "@/i18n/lang";
import { TIPO_EVENT } from "./ProjectGrid";

const EASE = [0.22, 1, 0.36, 1] as const;

// cada palabra lleva a los proyectos de su tipo
const verTipo = (tipo: "diseno" | "frontend") => window.dispatchEvent(new CustomEvent(TIPO_EVENT, { detail: tipo }));

// fragmentos que flotan del lado de la programadora
const CODE = [
  "<consuelo />",
  "const design = true;",
  "npm run dev",
  "export default Invitation",
  "supabase.from('guests')",
  "display: grid;",
  "git push origin main",
  "</>",
];

/**
 * Opening screen: her portrait split in two. On the left the photo — the
 * designer; on the right the same photo as pixels and circuits — the
 * programmer. Moving the pointer toward one side shows more of that half:
 * the seam slides the opposite way, so the side you point at grows. On touch
 * screens the seam drifts on its own until touched; from then on it stays
 * exactly where the finger leaves it.
 */
export default function Hero() {
  const { t } = useLang();
  // 0 = todo diseñadora, 1 = todo programadora
  const side = useMotionValue(0.5);
  const smooth = useSpring(side, { stiffness: 70, damping: 20, mass: 0.6 });
  // en pantallas angostas los títulos casi no se corren, para que no se salgan
  const [shift, setShift] = useState(24);
  useEffect(() => setShift(window.innerWidth < 768 ? 6 : 24), []);

  useEffect(() => {
    const touch = window.matchMedia("(hover: none)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) return;

    if (!touch) {
      const move = (e: PointerEvent) => side.set(Math.min(1, Math.max(0, e.clientX / window.innerWidth)));
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    }

    // sin mouse: va y viene sola hasta que la tocan; desde ahí la línea
    // queda donde la deja el dedo y no vuelve a moverse sola
    const el = document.getElementById("retrato");
    let tocada = false;
    let dragging = false;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      if (tocada) return;
      side.set(0.5 + Math.sin((now - t0) / 1600) * 0.32);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // la línea queda justo bajo el dedo, medido sobre el retrato
    const seguir = (x: number) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const v = 1 - Math.min(1, Math.max(0, (x - r.left) / r.width));
      side.set(v);
      smooth.jump(v);
    };
    const down = (e: TouchEvent) => {
      tocada = true;
      dragging = true;
      cancelAnimationFrame(raf);
      seguir(e.touches[0].clientX);
    };
    const moveTouch = (e: TouchEvent) => {
      if (dragging) seguir(e.touches[0].clientX);
    };
    const up = () => (dragging = false);
    el?.addEventListener("touchstart", down, { passive: true });
    window.addEventListener("touchmove", moveTouch, { passive: true });
    window.addEventListener("touchend", up);
    return () => {
      cancelAnimationFrame(raf);
      el?.removeEventListener("touchstart", down);
      window.removeEventListener("touchmove", moveTouch);
      window.removeEventListener("touchend", up);
    };
  }, [side, smooth]);

  // la línea divisoria se corre al lado contrario del puntero
  const seam = useTransform(smooth, [0, 1], [100, 0]);
  const clip = useMotionTemplate`inset(0 0 0 ${seam}%)`;
  const seamLeft = useMotionTemplate`${seam}%`;
  const designer = useTransform(smooth, [0.15, 0.7], [1, 0.22]);
  const coder = useTransform(smooth, [0.3, 0.85], [0.22, 1]);
  const designerX = useTransform(smooth, (v) => v * -shift);
  const coderX = useTransform(smooth, (v) => (1 - v) * shift);

  return (
    <section className="relative isolate overflow-hidden border-b border-line pt-24">
      <h1 className="sr-only">
        {t({ en: "Consuelo Herrera, designer and front-end developer", es: "Consuelo Herrera, diseñadora y desarrolladora front-end" })}
      </h1>

      <div className="relative mx-auto grid max-w-[1280px] max-md:pt-6 md:min-h-[calc(100svh-6rem)] grid-rows-[auto_auto] px-4 sm:px-9 md:grid-cols-[1fr_auto_1fr] md:grid-rows-1 md:items-center max-md:content-end max-md:grid-cols-2">
        {/* Diseñadora */}
        <motion.div
          style={{ opacity: designer, x: designerX }}
          className="z-10 max-md:col-start-1 max-md:row-start-1 max-md:w-1/2 max-md:pr-3 md:pr-8 md:text-right"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          <a href="#proyectos" onClick={() => verTipo("diseno")} className="group block">
            <span className="block text-[clamp(2rem,6.2vw,5.4rem)] leading-[0.95] font-medium tracking-[-0.045em] transition-colors duration-300 group-hover:text-ink">
              {t({ en: "designer", es: "diseñadora" })}
            </span>
            <span className="mt-2 block whitespace-nowrap font-mono text-[10.5px] tracking-wide text-muted uppercase transition-colors duration-300 group-hover:text-brand md:text-[12.5px]">
              {t({ en: "See projects ↓", es: "Ver proyectos ↓" })}
            </span>
          </a>
          <p className="mt-4 hidden text-[clamp(13px,1.35vw,16px)] leading-[1.55] text-ink-soft md:block md:ml-auto md:max-w-[30ch]">
            {t({
              en: "UX/UI and graphic designer: research, clear interfaces and brands.",
              es: "Diseñadora UX/UI y gráfica: investigación, interfaces claras y marcas.",
            })}
          </p>
        </motion.div>

        {/* el retrato partido */}
        <div
          id="retrato"
          className="relative mx-auto touch-pan-y -translate-x-[10%] aspect-[900/1147] h-[min(68svh,700px)] self-end max-md:col-span-2 max-md:row-start-2 max-md:mt-3 max-md:h-[min(60svh,540px)] md:row-start-1 md:col-start-2"
        >
          <motion.div
            // bordes difuminados: el fondo gris de la foto se funde con la página
            className="absolute inset-0 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent),linear-gradient(to_bottom,transparent,#000_12%)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          >
            <Image
              src="/consuelo.jpg"
              alt={t({ en: "Consuelo Herrera", es: "Consuelo Herrera" })}
              fill
              priority
              sizes="(max-width: 768px) 80vw, 560px"
              className="object-cover object-bottom"
            />
            <motion.div className="absolute inset-0" style={{ clipPath: clip }} aria-hidden="true">
              <Image
                src="/consuelo-programadora.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 80vw, 560px"
                className="object-cover object-bottom"
              />
            </motion.div>
            {/* la costura: una línea fina con un brillo */}
            <motion.span
              aria-hidden="true"
              className="absolute top-[6%] bottom-0 w-px bg-gradient-to-b from-transparent via-brand/60 to-transparent"
              style={{ left: seamLeft }}
            />
          </motion.div>
          {/* el retrato se funde con la sección de abajo */}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-paper to-transparent" aria-hidden="true" />
        </div>

        {/* Programadora */}
        <motion.div
          style={{ opacity: coder, x: coderX }}
          className="relative z-10 max-md:col-start-2 max-md:row-start-1 max-md:pl-3 max-md:text-right md:pl-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        >
          <a href="#proyectos" onClick={() => verTipo("frontend")} className="group block">
            <span className="block whitespace-nowrap text-[clamp(2rem,6.2vw,5.4rem)] leading-[0.95] font-medium tracking-[-0.045em] text-brand transition-colors duration-300 group-hover:text-brand-deep">
              front-end
            </span>
            <span className="mt-2 block whitespace-nowrap font-mono text-[10.5px] tracking-wide text-muted uppercase transition-colors duration-300 group-hover:text-brand md:text-[12.5px]">
              {t({ en: "See projects ↓", es: "Ver proyectos ↓" })}
            </span>
          </a>
          <p className="mt-4 hidden text-[clamp(13px,1.35vw,16px)] leading-[1.55] text-ink-soft md:block max-md:ml-auto md:max-w-[30ch]">
            {t({
              en: "I build what I design: clean code with Next.js, React and Supabase.",
              es: "Construyo lo que diseño: código limpio con Next.js, React y Supabase.",
            })}
          </p>
          <div className="pointer-events-none absolute top-full left-8 mt-6 hidden flex-col gap-1.5 font-mono text-[12.5px] text-sage md:flex" aria-hidden="true">
            {CODE.map((line, i) => (
              <motion.span
                key={line}
                style={{ marginLeft: `${(i * 37) % 90}px` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.25, 0.75, 0.25] }}
                transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
              >
                {line}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <p className="absolute top-24 left-1/2 hidden -translate-x-1/2 items-center gap-2.5 font-mono text-[12px] text-muted md:flex">
        <span className="h-2 w-2 rounded-full bg-online [animation:pulse-dot_1.6s_ease-out_infinite]" />
        {t(SITE.availability)}
      </p>
    </section>
  );
}
