"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenis: Lenis | null = null;

/** Scrolls to an element or the top, smoothly when Lenis is running. */
export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === "string" ? -24 : 0, duration: 1.4 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target });
  else document.querySelector(target)?.scrollIntoView();
}

/**
 * Inertial scrolling for the "fluid" feel. Skipped entirely for people who
 * ask for reduced motion, and in-page anchor links are routed through it so
 * they glide instead of jumping.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, lerp: 0.09, wheelMultiplier: 1 });

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#'], a[href^='/#']");
      if (!a) return;
      const hash = a.getAttribute("href")!.replace(/^\//, "");
      if (window.location.pathname !== "/" && a.getAttribute("href")!.startsWith("/#")) return;
      const el = hash.length > 1 ? document.querySelector(hash) : null;
      if (!el && hash !== "#") return;
      e.preventDefault();
      scrollToTarget(el ? hash : 0);
      history.replaceState(null, "", hash === "#" ? window.location.pathname : hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Cada página nueva empieza arriba, o en la sección del enlace.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => scrollToTarget(hash));
    } else {
      lenis?.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
