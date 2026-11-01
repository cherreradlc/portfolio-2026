"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useLang } from "@/i18n/lang";

function Palabra({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const opacity = useTransform(p, [i / n, (i + 1) / n], [0.12, 1]);
  const y = useTransform(p, [i / n, (i + 1) / n], [8, 0]);
  return <motion.span style={{ opacity, y }} className="mr-[0.28em] inline-block">{w}</motion.span>;
}

/** Scroll reveal: each word lights up as the paragraph scrolls into view. */
export default function TextoScroll() {
  const { t } = useLang();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.45"] });
  const texto = t({
    en: "Every word wakes up as you scroll, as if the park were opening its eyes.",
    es: "Cada palabra despierta mientras bajas, como si el parque abriera los ojos.",
  });
  const words = texto.split(" ");

  return (
    <p ref={ref} className="w-64 text-[22px] leading-snug font-bold" aria-label={texto}>
      <span aria-hidden="true">
        {words.map((w, i) => <Palabra key={`${texto}-${i}`} w={w} i={i} n={words.length} p={scrollYProgress} />)}
      </span>
    </p>
  );
}
