"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const STAR = "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.6L12 17.4 6.1 20.6l1.2-6.6L2.5 9.4l6.6-.9z";

/** Star rating: hover previews the score, a click pops the stars one by one. */
export default function Estrellas() {
  const { t } = useLang();
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);
  const [pop, setPop] = useState(0);
  const shown = hover || value;

  return (
    <div role="radiogroup" aria-label={t({ en: "Rating", es: "Calificación" })} className="flex gap-1.5" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <motion.button
          key={`${n}-${pop}`}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n}`}
          onMouseEnter={() => setHover(n)}
          onClick={() => {
            setValue(n);
            setPop((p) => p + 1);
          }}
          initial={false}
          animate={n <= value && pop ? { scale: [1, 1.5, 1], rotate: [0, -15, 0] } : { scale: 1 }}
          transition={{ duration: 0.4, delay: (n - 1) * 0.07 }}
          whileHover={{ y: -4 }}
        >
          <svg viewBox="0 0 24 24" className="size-11" aria-hidden="true">
            <path d={STAR} fill={n <= shown ? "#ffc83d" : "#fff8ea"} stroke="#2b2230" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        </motion.button>
      ))}
    </div>
  );
}
