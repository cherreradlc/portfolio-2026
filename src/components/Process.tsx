"use client";

import { motion } from "motion/react";
import { PROCESS } from "@/data/site";
import { Rule } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Four steps as columns. Each column's rule draws in turn, left to right, and
 * the large italic numeral slides up after it — the sequence reads as a
 * process even before the text is read.
 */
export default function Process() {
  return (
    <ol className="grid gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
      {PROCESS.map((s, i) => (
        <li key={s.n} className="group">
          <Rule className="text-ink" delay={i * 0.18} />
          <div className="overflow-hidden">
            <motion.span
              className="mt-5 block font-serif text-[clamp(3.6rem,6vw,5.4rem)] leading-none text-pink italic transition-colors duration-500 group-hover:text-brand"
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: 0.25 + i * 0.18 }}
            >
              {s.n}
            </motion.span>
          </div>
          <h3 className="mt-4 font-serif text-[28px] leading-none">{s.title}</h3>
          <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
