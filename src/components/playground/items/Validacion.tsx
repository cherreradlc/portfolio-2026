"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { useLang } from "@/i18n/lang";

const OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Email field: it checks itself a moment after you stop typing (phones have
 * no reliable "leave the field" moment), shakes and explains when it's wrong,
 * and turns green when it's right. The arrow button checks right away.
 */
export default function Validacion() {
  const { t } = useLang();
  const [value, setValue] = useState("");
  const [estado, setEstado] = useState<"neutro" | "error" | "ok">("neutro");
  const [scope, animate] = useAnimate();
  const msg = useId();

  const revisar = (v: string) => {
    if (!v.trim()) return setEstado("neutro");
    if (OK.test(v.trim())) return setEstado("ok");
    setEstado("error");
    animate(scope.current, { x: [0, -12, 10, -8, 6, -3, 0] }, { duration: 0.45 });
  };

  // revisa sola cuando dejas de escribir
  useEffect(() => {
    if (!value) return;
    const id = window.setTimeout(() => revisar(value), 900);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- revisar solo depende de value
  }, [value]);

  const fondo = { neutro: "bg-paper", error: "bg-[#ffe1dc]", ok: "bg-[#d8f5ea]" }[estado];

  return (
    <form className="flex w-64 flex-col gap-2" noValidate onSubmit={(e) => { e.preventDefault(); revisar(value); }}>
      <label htmlFor={`${msg}-in`} className="font-mono text-[12px] tracking-wide uppercase">{t({ en: "Your email", es: "Tu correo" })}</label>
      <div ref={scope} className={`flex items-center rounded-[14px] border-[3px] border-ink pl-4 shadow-[4px_4px_0_rgb(43_34_48)] transition-colors ${fondo}`}>
        <input
          id={`${msg}-in`}
          type="email"
          inputMode="email"
          autoCapitalize="none"
          autoCorrect="off"
          enterKeyHint="done"
          value={value}
          onChange={(e) => { setValue(e.target.value); if (estado !== "neutro") setEstado("neutro"); }}
          placeholder="hola@parque.cl"
          aria-invalid={estado === "error"}
          aria-describedby={msg}
          className="h-12 min-w-0 flex-1 bg-transparent text-[16px] outline-none"
        />
        <AnimatePresence mode="wait" initial={false}>
          {estado === "ok" ? (
            <motion.span key="ok" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className="mr-2.5 flex size-8 items-center justify-center rounded-full bg-mint text-[15px] font-bold" aria-hidden="true">✓</motion.span>
          ) : (
            <motion.button key="ir" type="submit" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} aria-label={t({ en: "Check", es: "Revisar" })} className="mr-2 flex size-8 items-center justify-center rounded-full border-2 border-ink bg-sun text-[15px] font-bold">
              →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <p id={msg} className="h-5 text-[13px] font-semibold" aria-live="polite">
        {estado === "error" && <span className="text-coral">{t({ en: "That doesn't look like an email", es: "Eso no parece un correo" })}</span>}
        {estado === "ok" && <span className="text-mint">{t({ en: "Perfect!", es: "¡Perfecto!" })}</span>}
      </p>
    </form>
  );
}
