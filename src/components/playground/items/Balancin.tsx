"use client";

import { motion } from "motion/react";
import { useLang } from "@/i18n/lang";

/** A loader that plays: a seesaw rocks while two balls roll from end to end. */
export default function Balancin() {
  const { t } = useLang();
  const rock = { repeat: Infinity, repeatType: "reverse" as const, duration: 0.9, ease: "easeInOut" as const };

  return (
    <div className="flex flex-col items-center gap-4" role="status" aria-label={t({ en: "Loading", es: "Cargando" })}>
      <div className="relative h-24 w-56">
        <motion.div className="absolute top-10 left-0 h-3 w-full origin-center rounded-full border-2 border-ink bg-sun" animate={{ rotate: [-14, 14] }} transition={rock}>
          <motion.span className="absolute -top-[30px] size-7 rounded-full border-[3px] border-ink bg-coral" animate={{ left: ["4%", "80%"] }} transition={rock} />
        </motion.div>
        {/* el apoyo */}
        <span className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[22px] border-b-[36px] border-x-transparent border-b-ink" />
      </div>
      <p className="font-mono text-[13px] tracking-wide uppercase">
        {t({ en: "Loading", es: "Cargando" })}
        {[0, 1, 2].map((i) => (
          <motion.span key={i} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}>.</motion.span>
        ))}
      </p>
    </div>
  );
}
