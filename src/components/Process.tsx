"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PROCESS } from "@/data/site";
import { FadeUp } from "./Reveal";
import { useLang } from "@/i18n/lang";

/**
 * Four steps joined by a line that draws itself as the section scrolls, each
 * step lighting up when the line reaches it.
 */
export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      <div className="absolute top-[22px] right-0 left-0 hidden h-px bg-line md:block" aria-hidden="true">
        <motion.div className="h-full bg-brand" style={{ width }} />
      </div>
      <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
        {PROCESS.map((s, i) => (
          <Step key={s.n} step={s} index={i} progress={scrollYProgress} />
        ))}
      </ol>
    </div>
  );
}

function Step({
  step,
  index,
  progress,
}: {
  step: (typeof PROCESS)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const { t } = useLang();
  const at = index / PROCESS.length;
  const bg = useTransform(progress, [at, at + 0.08], ["#f8f5f2", "#8c3b72"]);
  const color = useTransform(progress, [at, at + 0.08], ["#8c3b72", "#ffffff"]);

  return (
    <li className="group relative">
      <FadeUp delay={index * 0.08}>
        <motion.span
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-[4px] border border-brand font-mono text-[12px] transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundColor: bg, color }}
        >
          {step.n}
        </motion.span>
        <h3 className="mt-6 text-[clamp(1.6rem,2.4vw,2.1rem)] leading-none tracking-[-0.03em] uppercase transition-colors duration-300 group-hover:text-tangerine">
          {t(step.title)}
        </h3>
        <p className="mt-4 max-w-xs font-mono text-[13px] leading-[1.7] text-ink-soft">{t(step.body)}</p>
      </FadeUp>
    </li>
  );
}
