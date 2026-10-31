"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import LangToggle from "./LangToggle";
import { SITE } from "@/data/site";
import Logo from "./Logo";
import { useLang } from "@/i18n/lang";

const LINKS = [
  { href: "/", label: { en: "Home", es: "Inicio" } },
  { href: "/#proyectos", label: { en: "Projects", es: "Proyectos" } },
  { href: "/#sobre-mi", label: { en: "About", es: "Sobre mí" } },
  { href: "/#servicios", label: { en: "Services", es: "Servicios" } },
  { href: "/#contacto", label: { en: "Contact", es: "Contacto" } },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Chile time, ticking, so remote teams see her working hours at a glance. */
function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", timeZone: SITE.timezone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

/**
 * A quiet bar: monogram and name on the left, local time, language and a
 * menu button on the right. The menu opens as a full-screen sheet of large
 * uppercase links on every screen size.
 */
export default function Nav() {
  const pathname = usePathname();
  const { t } = useLang();
  const time = useClock();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 24));

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
      <header
        className={`fixed inset-x-0 top-0 z-50 px-4 pt-[env(safe-area-inset-top)] transition-colors duration-500 sm:px-9 ${
          solid && !open ? "bg-paper/80 backdrop-blur-xl" : ""
        }`}
      >
        <nav className="flex h-[72px] items-center justify-between sm:h-[88px]">
          <Link href="/" className="group flex items-center gap-3" aria-label={t({ en: "Home", es: "Inicio" })}>
            <Logo className="h-10 w-auto text-brand transition-colors duration-300 group-hover:text-brand-deep" />
            <span className="text-[13px] leading-tight font-semibold tracking-[0.08em] uppercase">
              Consuelo
              <br />
              Herrera
            </span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <p className="hidden font-mono text-[12.5px] tracking-wide text-muted md:block">
              CHILE <span className="mx-1 opacity-50">·</span>
              <span className="text-ink">{time}</span>
            </p>
            <LangToggle />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? t({ en: "Close menu", es: "Cerrar menú" }) : t({ en: "Open menu", es: "Abrir menú" })}
              className="relative flex h-11 w-11 items-center justify-center"
            >
              <motion.span
                className="absolute h-[1.5px] w-7 bg-ink"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
              <motion.span
                className="absolute h-[1.5px] w-7 bg-ink"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-paper-2 px-4 pt-28 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-9 sm:pt-36"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <ul className="flex flex-col border-t border-line">
              {LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-line">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.06 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between gap-4 py-3 sm:py-4"
                    >
                      <span className="text-[clamp(2.4rem,7vw,5.5rem)] leading-none tracking-[-0.04em] uppercase transition-transform duration-500 ease-[var(--ease-fluid)] group-hover:translate-x-4 group-hover:text-brand">
                        {t(l.label)}
                      </span>
                      <span className="font-mono text-[12px] text-muted">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-10 flex flex-col gap-3 font-mono text-[13px] text-ink-soft sm:flex-row sm:justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a>
              <span className="flex gap-6">
                <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand">LINKEDIN ↗</a>
                <a href={t(SITE.cv)} target="_blank" rel="noreferrer" className="hover:text-brand">{t({ en: "RESUME ↗", es: "CV ↗" })}</a>
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
