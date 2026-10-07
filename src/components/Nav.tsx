"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

const LINKS = [
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#contacto", label: "Contacto" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A thin masthead bar: monogram and name on the left, plain text links on the
 * right. It slides away while reading down and returns on the first scroll
 * up. On phones the links open as a plum sheet.
 */
export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
    setSolid(y > 24);
  });

  // Al cambiar de página el menú se cierra (ajuste durante el render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 border-b px-4 pt-[env(safe-area-inset-top)] transition-colors duration-500 sm:px-8 ${
          open
            ? "border-transparent bg-transparent"
            : solid
              ? "border-line bg-paper/90 backdrop-blur-md"
              : "border-transparent"
        }`}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between">
          <Link href="/" className="group flex items-center gap-3" aria-label="Inicio">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full font-serif text-[17px] italic transition-transform duration-700 group-hover:rotate-[360deg] ${
                open ? "bg-pink text-ink" : "bg-brand text-paper"
              }`}
            >
              ch
            </span>
            <span className={`hidden font-serif text-[18px] sm:inline ${open ? "text-paper" : ""}`}>
              Consuelo Herrera
            </span>
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-draw flex items-baseline gap-1.5 pb-0.5 text-[14.5px]">
                  <span className="text-[10px] text-muted">0{i + 1}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={`label md:hidden ${open ? "text-paper" : ""}`}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-brand px-6 pt-28 pb-[max(2rem,env(safe-area-inset-bottom))] text-paper md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ul className="flex flex-col">
              {LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-paper/15">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    <Link href={l.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-4">
                      <span className="font-serif text-[46px] leading-none">{l.label}</span>
                      <span className="text-[12px] text-sky">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <p className="text-[14px] text-paper/70">c.herrera.dlc@gmail.com</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
