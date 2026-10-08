"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type Lang = "en" | "es";

/** A string in both languages. */
export type T = { en: string; es: string };

const KEY = "portfolio-lang";
const EVENT = "portfolio-lang-change";

/**
 * The site opens in English. A visitor's choice is kept in localStorage so it
 * survives reloads and navigation; every component reads it through one
 * external store, so switching re-renders the whole page at once.
 */
function read(): Lang {
  try {
    return localStorage.getItem(KEY) === "es" ? "es" : "en";
  } catch {
    return "en";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useLang() {
  // En el servidor (y en el primer render) siempre inglés.
  const lang = useSyncExternalStore(subscribe, read, () => "en" as Lang);

  const setLang = useCallback((next: Lang) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // sin almacenamiento: el cambio vale solo para esta visita
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const t = useCallback((s: T) => s[lang], [lang]);

  return { lang, setLang, t };
}

/** Keeps <html lang> in sync for screen readers and translation tools. */
export function HtmlLang() {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
