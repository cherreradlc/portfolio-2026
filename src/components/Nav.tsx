"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Magnetic from "./Magnetic";
import LangToggle from "./LangToggle";
import { useLang } from "@/i18n/lang";

const LINKS = [
  { href: "/#proyectos", label: { en: "Work", es: "Proyectos" } },
  { href: "/#sobre-mi", label: { en: "About", es: "Sobre mí" } },
  { href: "/#servicios", label: { en: "Services", es: "Servicios" } },
  { href: "/#contacto", label: { en: "Contact", es: "Contacto" } },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Slides away while reading down and comes back on the first scroll up, so it
 * never covers the work but is always one flick away. On phones the links
 * open as a full-screen sheet.
 */
export default function Nav() {
  const pathname = usePathname();
  const { t } = useLang();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
    setSolid(y > 24);
  });

  // Al cambiar de página el menú se cierra (ajuste durante el render, sin efecto).
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
        className="fixed inset-x-0 top-0 z-50 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6"
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 sm:px-4 ${
            open
              ? "border-transparent"
              : solid
                ? "border-line bg-paper/75 shadow-[0_8px_30px_-12px_rgb(58_16_48/0.18)] backdrop-blur-xl"
                : "border-transparent"
          }`}
        >
          <Link href="/" className="group flex items-center gap-2.5" aria-label={t({ en: "Home", es: "Inicio" })}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-serif text-[17px] italic text-paper transition-transform duration-500 group-hover:rotate-[360deg]">
              ch
            </span>
            <span className="hidden text-[14px] font-medium tracking-tight sm:inline">Consuelo Herrera</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group relative block overflow-hidden rounded-full px-4 py-2 text-[14px]"
                >
                  <span className="block transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:-translate-y-full">
                    {t(l.label)}
                  </span>
                  <span className="absolute inset-x-4 top-full block text-tangerine transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:-translate-y-full">
                    {t(l.label)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LangToggle />
            <Magnetic className="hidden sm:inline-block">
              <Link
                href="/#contacto"
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-brand px-5 py-2.5 text-[14px] text-paper"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-brand-deep transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:translate-y-0" />
                <span className="relative">{t({ en: "Let's talk", es: "Hablemos" })}</span>
                <span className="relative transition-transform duration-500 group-hover:rotate-45">↗</span>
              </Link>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? t({ en: "Close menu", es: "Cerrar menú" }) : t({ en: "Open menu", es: "Abrir menú" })}
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brand md:hidden"
            >
              <motion.span
                className="absolute h-[1.5px] w-5 bg-paper"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              />
              <motion.span
                className="absolute h-[1.5px] w-5 bg-paper"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-brand-deep px-6 pt-28 pb-[max(2rem,env(safe-area-inset-bottom))] text-paper md:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.07 }}
                  >
                    <Link href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-2">
                      <span className="text-[13px] text-paper/40">0{i + 1}</span>
                      <span className="font-serif text-[52px] leading-none italic">{t(l.label)}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.p
              className="text-[14px] text-paper/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              contact.consudesign@gmail.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
