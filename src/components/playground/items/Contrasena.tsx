"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const NIVELES = [
  { en: "Too short", es: "Muy corta", color: "#ff6b57" },
  { en: "Weak", es: "Débil", color: "#ff6b57" },
  { en: "Okay", es: "Más o menos", color: "#ffa53d" },
  { en: "Good", es: "Buena", color: "#ffc83d" },
  { en: "Strong!", es: "¡Fuerte!", color: "#34c79a" },
];

const fuerza = (p: string) =>
  p.length < 6 ? 0 : [/[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(p)).length + (p.length >= 10 ? 1 : 0);

/** Password field: an eye shows or hides it, a bar fills from red to green. */
export default function Contrasena() {
  const { t } = useLang();
  const [p, setP] = useState("");
  const [ver, setVer] = useState(false);
  const n = Math.min(4, fuerza(p));
  const nivel = NIVELES[n];

  return (
    <div className="flex w-64 flex-col gap-2">
      <label htmlFor="pg-pass" className="font-mono text-[12px] tracking-wide uppercase">{t({ en: "Password", es: "Contraseña" })}</label>
      <div className="flex items-center rounded-[14px] border-[3px] border-ink bg-paper pl-4 shadow-[4px_4px_0_rgb(43_34_48)]">
        <input id="pg-pass" type={ver ? "text" : "password"} value={p} onChange={(e) => setP(e.target.value)} className="h-12 min-w-0 flex-1 bg-transparent text-[16px] outline-none" autoComplete="new-password" />
        <button type="button" onClick={() => setVer((v) => !v)} aria-label={ver ? t({ en: "Hide password", es: "Ocultar contraseña" }) : t({ en: "Show password", es: "Mostrar contraseña" })} className="flex size-12 items-center justify-center">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="#2b2230" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
            <motion.circle cx="12" cy="12" r="3" animate={{ scale: ver ? 1 : 0.6 }} />
            <motion.path d="M4 4l16 16" initial={false} animate={{ pathLength: ver ? 0 : 1 }} transition={{ duration: 0.25 }} />
          </svg>
        </button>
      </div>
      <div className="h-3 overflow-hidden rounded-full border-2 border-ink bg-paper">
        <motion.div className="h-full" animate={{ width: `${p ? Math.max(12, n * 25) : 0}%`, backgroundColor: nivel.color }} transition={{ type: "spring", stiffness: 200, damping: 22 }} />
      </div>
      <p className="h-5 text-[13px] font-semibold" aria-live="polite">{p ? t(nivel) : ""}</p>
    </div>
  );
}
