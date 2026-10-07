"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PROCESS } from "@/data/site";
import { FadeUp } from "./Reveal";

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
  const at = index / PROCESS.length;
  const bg = useTransform(progress, [at, at + 0.08], ["#f3f5f9", "#2f54eb"]);
  const color = useTransform(progress, [at, at + 0.08], ["#2f54eb", "#ffffff"]);

  return (
    <li className="group relative">
      <FadeUp delay={index * 0.08}>
        <motion.span
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-brand text-[13px] font-medium transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundColor: bg, color }}
        >
          {step.n}
        </motion.span>
        <h3 className="mt-6 font-serif text-[40px] leading-none italic transition-colors duration-300 group-hover:text-tangerine">
          {step.title}
        </h3>
        <p className="mt-4 max-w-xs text-[15.5px] leading-relaxed text-muted">{step.body}</p>
      </FadeUp>
    </li>
  );
}
