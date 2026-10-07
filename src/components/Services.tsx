"use client";

import { motion } from "motion/react";
import { SERVICES } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Services on the plum spread, as a definition list: name in the serif on the
 * left, what it covers on the right. Hovering a row slides a pink marker in
 * front of the name.
 */
export default function Services() {
  return (
    <dl className="border-t border-paper/25">
      {SERVICES.map((s, i) => (
        <motion.div
          key={s.title}
          className="group grid gap-4 border-b border-paper/25 py-8 md:grid-cols-12 md:gap-8 md:py-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.9, ease: EASE, delay: i * 0.07 }}
        >
          <dt className="flex items-center gap-4 md:col-span-5">
            <span
              aria-hidden="true"
              className="h-3 w-0 bg-pink transition-all duration-500 ease-[var(--ease-fluid)] group-hover:w-8"
            />
            <span className="font-serif text-[clamp(2rem,3.6vw,3.2rem)] leading-none transition-transform duration-500 group-hover:translate-x-1">
              {s.title}
            </span>
          </dt>
          <dd className="md:col-span-7">
            <p className="max-w-xl text-[16.5px] leading-relaxed text-paper/80">{s.body}</p>
            <p className="label mt-4 text-sky">{s.tags.join(" · ")}</p>
          </dd>
        </motion.div>
      ))}
    </dl>
  );
}
