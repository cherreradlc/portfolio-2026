"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { isSmall } from "./SizedImage";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Screens shown where they live: inside phones. One screen stands alone and
 * tilts on hover; three fan out with the first in front. The side phones sit
 * behind the front one and peek out from its edges, so its screen is never
 * covered — but not as mirror images: the left one sits lower and tilts more,
 * the right one higher and tilts less. Sized by height so the screenshots are
 * never drawn wider than they were captured.
 */

// izquierda, frente, derecha: giro (°) y desplazamiento vertical
const SIDES = [
  { rotate: -9, y: "6%" },
  { rotate: 0, y: "0%" },
  { rotate: 5, y: "-5%" },
];

export default function PhoneFan({
  screens,
  height = "82%",
  animateIn = false,
}: {
  screens: string[];
  height?: string;
  animateIn?: boolean;
}) {
  const [front, ...rest] = screens;
  const order = rest.length ? [rest[0], front, rest[1] ?? rest[0]] : [front];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {order.map((src, i) => {
        const side = order.length === 1 ? 0 : i - 1;
        const pose = order.length === 1 ? { rotate: -4, y: "0%" } : SIDES[i];
        return (
          <motion.div
            key={`${src}-${i}`}
            className={`relative aspect-[390/844] overflow-hidden rounded-[clamp(18px,2.4vw,32px)] border-[clamp(4px,0.5vw,7px)] border-ink bg-ink shadow-[0_40px_80px_-30px_rgb(43_34_48/0.55)] transition-transform duration-[1.2s] ease-[var(--ease-fluid)] ${
              side === 0
                ? "z-10 group-hover:-translate-y-2 group-hover:rotate-0"
                : side < 0
                  ? "-mr-[6%] max-sm:hidden group-hover:-translate-x-3"
                  : "-ml-[6%] max-sm:hidden group-hover:translate-x-3"
            }`}
            style={{
              height: side === 0 ? height : `calc(${height} * ${side < 0 ? 0.82 : 0.88})`,
              rotate: `${pose.rotate}deg`,
              translate: `0 ${pose.y}`,
            }}
            initial={animateIn ? { y: 80, opacity: 0 } : false}
            animate={animateIn ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 1.1, ease: EASE, delay: 0.4 + Math.abs(side) * 0.15 }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 60vw, 400px"
              unoptimized={isSmall(src)}
              className="object-cover object-top"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
