"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const CHISPAS = ["#ffc83d", "#ff6b57", "#34c79a", "#7b4dff", "#ff8fc8", "#3fa9f5"];

/** Like button: the heart fills, six sparks burst out and the count goes up. */
export default function MeGusta() {
  const { t } = useLang();
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(0);

  return (
    <motion.button
      type="button"
      aria-pressed={liked}
      onClick={() => {
        setLiked((v) => !v);
        if (!liked) setBurst((b) => b + 1);
      }}
      className={`relative flex items-center gap-3 rounded-full border-[3px] border-ink px-6 py-3.5 text-[16px] font-semibold shadow-[5px_5px_0_rgb(43_34_48)] transition-colors duration-300 ${liked ? "bg-coral" : "bg-pool"}`}
      whileHover={{ y: -3, boxShadow: "7px 8px 0 rgb(43 34 48)" }}
      whileTap={{ y: 2, boxShadow: "2px 2px 0 rgb(43 34 48)" }}
      transition={{ type: "spring", stiffness: 500, damping: 22 }}
    >
      <span className="relative flex size-6 items-center justify-center">
        <motion.svg viewBox="0 0 24 24" className="size-6" animate={liked ? { scale: [1, 1.45, 0.9, 1.1, 1] } : { scale: 1 }} transition={{ duration: 0.5 }}>
          <path
            d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.8 3.8 4.5 7.2 4.5c2 0 3.4 1.1 4.8 2.9 1.4-1.8 2.8-2.9 4.8-2.9 3.4 0 5.6 3.3 4.4 6.7-1.7 4.7-9.2 9.3-9.2 9.3z"
            fill={liked ? "#2b2230" : "none"}
            stroke="#2b2230"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </motion.svg>
        {/* chispas: salen en círculo y se desvanecen */}
        <AnimatePresence>
          {liked &&
            CHISPAS.map((c, i) => {
              const a = (i / CHISPAS.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <motion.span
                  key={`${burst}-${i}`}
                  className="absolute size-2 rounded-full border border-ink"
                  style={{ background: c }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{ x: Math.cos(a) * 34, y: Math.sin(a) * 34, scale: [0, 1.4, 0], opacity: [1, 1, 0] }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              );
            })}
        </AnimatePresence>
      </span>
      <span>{t({ en: "Like", es: "Me gusta" })}</span>
      <span className="relative inline-flex h-6 w-6 overflow-hidden tabular-nums">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={liked ? 13 : 12} className="absolute inset-0" initial={{ y: liked ? 20 : -20 }} animate={{ y: 0 }} exit={{ y: liked ? -20 : 20 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
            {liked ? 13 : 12}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
