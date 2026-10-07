"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SERVICES } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Rows that open on hover (desktop) or tap (phones) to show what each service
 * covers. A colour wipe runs under the row as it opens.
 */
export default function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-line">
      {SERVICES.map((s, i) => {
        const active = open === i;
        return (
          <li
            key={s.title}
            className="relative overflow-hidden border-b border-line"
            onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
          >
            <motion.div
              className="absolute inset-0 origin-left bg-brand-deep"
              initial={false}
              animate={{ scaleX: active ? 1 : 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => setOpen(active ? null : i)}
              aria-expanded={active}
              className={`relative flex w-full items-center justify-between gap-6 px-2 py-7 text-left transition-colors duration-500 sm:px-6 ${
                active ? "text-paper" : ""
              }`}
            >
              <span className="flex items-baseline gap-5">
                <span className={`text-[13px] ${active ? "text-paper/50" : "text-muted"}`}>0{i + 1}</span>
                <span className="text-[clamp(1.8rem,4.5vw,3.6rem)] leading-none font-medium tracking-[-0.035em]">
                  {s.title}
                </span>
              </span>
              <motion.span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[22px] ${
                  active ? "bg-sky text-brand-deep" : "border border-ink/25"
                }`}
                animate={{ rotate: active ? 45 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="relative overflow-hidden"
                >
                  <div className="flex flex-col gap-5 px-2 pb-8 text-paper sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:pl-[4.5rem]">
                    <p className="max-w-lg text-[16.5px] leading-relaxed text-paper/75">{s.body}</p>
                    <ul className="flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <li key={t} className="rounded-full border border-paper/25 px-3 py-1 text-[13px]">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
