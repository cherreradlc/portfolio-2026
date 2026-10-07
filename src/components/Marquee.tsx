"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";

/**
 * An endless band of words whose speed and direction follow the scroll:
 * scrolling fast makes it rush, scrolling back reverses it, standing still
 * lets it drift. The text is repeated four times and wrapped at a quarter.
 */
export default function Marquee({
  items,
  baseVelocity = -2,
  className,
}: {
  items: string[];
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const row = items.map((t) => (
    <span key={t} className="flex items-center gap-8 pr-8">
      <span>{t}</span>
      <span className="text-tangerine" aria-hidden="true">✦</span>
    </span>
  ));

  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className ?? ""}`} aria-label={items.join(", ")}>
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
