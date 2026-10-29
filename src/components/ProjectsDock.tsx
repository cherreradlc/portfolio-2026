"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLang } from "@/i18n/lang";
import { useProjects } from "@/i18n/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Floating "All projects" button in the bottom-right corner. It shows up
 * once the hero is gone and opens a compact index of every case study.
 */
export default function ProjectsDock() {
  const { t } = useLang();
  const projects = useProjects();
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    // Visible entre la portada y el contacto, donde ya hay botones propios.
    const end = document.documentElement.scrollHeight - window.innerHeight * 1.8;
    const next = y > window.innerHeight * 0.6 && y < end;
    setShown(next);
    if (!next) setOpen(false);
  });

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-2 sm:right-9 sm:bottom-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <AnimatePresence>
            {open && (
              <motion.ul
                className="w-[min(300px,calc(100vw-2rem))] overflow-hidden rounded-[6px] border border-line bg-white/90 p-1.5 shadow-[0_20px_50px_-20px_rgb(43_34_48/0.35)] backdrop-blur-xl"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {projects.map((p, i) => (
                  <li key={p.slug}>
                    <Link
                      href={`/proyectos/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-3 rounded-[4px] px-3 py-2.5 transition-colors hover:bg-paper-2"
                    >
                      <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                      <span className="text-[13.5px] leading-snug">{p.title}</span>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex items-center gap-2.5 rounded-[6px] border border-line bg-white/85 px-4 py-3 text-[12.5px] font-medium tracking-wide uppercase shadow-[0_10px_30px_-15px_rgb(43_34_48/0.3)] backdrop-blur-xl transition-colors hover:border-brand/40"
          >
            <span className="grid grid-cols-2 gap-[3px]" aria-hidden="true">
              {[0, 1, 2, 3].map((n) => (
                <span key={n} className={`h-[5px] w-[7px] rounded-[1px] border border-current transition-colors ${open ? "bg-current" : ""}`} />
              ))}
            </span>
            {t({ en: "All projects", es: "Proyectos" })}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
