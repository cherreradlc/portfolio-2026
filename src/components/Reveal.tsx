"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children the first time they scroll into view. */
export function FadeUp({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A heading that rises out of a mask as one block, the way a magazine page
 * turns into view. (Kept under its old name; it used to split into words.)
 */
export function SplitWords({
  text,
  className,
  delay = 0,
  as: Tag = "span",
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = immediate || inView;

  return (
    <Tag ref={ref as never} className={className}>
      <span className="block overflow-hidden pb-[0.08em]">
        <motion.span
          className="block"
          initial={{ y: "105%" }}
          animate={show ? { y: "0%" } : undefined}
          transition={{ duration: 1.1, ease: EASE, delay }}
        >
          {text}
        </motion.span>
      </span>
    </Tag>
  );
}

/** A hairline rule that draws itself from the left when it scrolls into view. */
export function Rule({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`block h-px origin-left bg-current ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.2, ease: EASE, delay }}
    />
  );
}
