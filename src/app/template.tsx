"use client";

import { motion } from "motion/react";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Each navigation lifts a plum curtain off the new page, like turning a
 * magazine page; the content settles in just behind it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] bg-brand"
        initial={{ clipPath: "inset(0 0 0% 0)" }}
        animate={{ clipPath: "inset(0 0 100% 0)" }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
}
