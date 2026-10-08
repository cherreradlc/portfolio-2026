"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from "motion/react";
import { useLang, type T } from "@/i18n/lang";

/**
 * An endless band of words drifting at one constant speed, unaffected by
 * scrolling. The text is repeated four times and wrapped at a quarter, so
 * the loop is seamless. `speed` is in percent of the band per second.
 */
export default function Marquee({
  items,
  speed = 2,
  className,
}: {
  items: T[];
  speed?: number;
  className?: string;
}) {
  const { t } = useLang();
  const labels = items.map(t);
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  useAnimationFrame((_, delta) => {
    baseX.set(baseX.get() - speed * (delta / 1000));
  });

  const row = labels.map((label) => (
    <span key={label} className="flex items-center gap-5 pr-5">
      <span>{label}</span>
      <span className="text-tangerine" aria-hidden="true">✦</span>
    </span>
  ));

  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className ?? ""}`} aria-label={labels.join(", ")}>
      <motion.div className="flex" style={{ x }} aria-hidden="true">
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="flex">
            {row}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
