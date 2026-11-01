"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

/**
 * Copies with the old textarea trick: the Clipboard API only exists on secure
 * pages (https), so it fails when testing on a phone over the local network.
 */
function copiarRespaldo(texto: string) {
  const area = document.createElement("textarea");
  area.value = texto;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  area.setSelectionRange(0, texto.length);
  const ok = document.execCommand("copy");
  area.remove();
  return ok;
}

/** Copy button: copies a line to the clipboard and confirms with a check. */
export default function Copiar() {
  const { t } = useLang();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!ok) return;
    const id = window.setTimeout(() => setOk(false), 1800);
    return () => window.clearTimeout(id);
  }, [ok]);

  return (
    <button
      type="button"
      onClick={async () => {
        const texto = t({ en: "Hi from the playground!", es: "¡Hola desde el patio de juegos!" });
        try {
          await navigator.clipboard.writeText(texto);
          setOk(true);
        } catch {
          setOk(copiarRespaldo(texto));
        }
      }}
      className={`flex h-14 w-48 items-center justify-center gap-2.5 rounded-[16px] border-[3px] border-ink font-mono text-[14px] font-semibold uppercase shadow-[5px_5px_0_rgb(43_34_48)] transition-colors ${ok ? "bg-mint" : "bg-paper"}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={ok ? "ok" : "copy"} className="flex items-center gap-2.5"
          initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.2 }}>
          {ok ? (
            <>✓ {t({ en: "Copied!", es: "¡Copiado!" })}</>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></svg>
              {t({ en: "Copy", es: "Copiar" })}
            </>
          )}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">{ok ? t({ en: "Copied", es: "Copiado" }) : ""}</span>
    </button>
  );
}
