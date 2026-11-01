"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useLang } from "@/i18n/lang";

/** Download button: it fills up like a progress bar, then says it's done. */
export default function Descarga() {
  const { t } = useLang();
  const [estado, setEstado] = useState<"listo" | "bajando" | "hecho">("listo");
  const p = useMotionValue(0);
  const width = useTransform(p, (v) => `${v}%`);
  const [pct, setPct] = useState(0);

  useEffect(() => p.on("change", (v) => setPct(Math.round(v))), [p]);

  useEffect(() => {
    if (estado !== "hecho") return;
    const id = window.setTimeout(() => {
      p.set(0);
      setEstado("listo");
    }, 1800);
    return () => window.clearTimeout(id);
  }, [estado, p]);

  return (
    <button
      type="button"
      disabled={estado === "bajando"}
      onClick={() => {
        setEstado("bajando");
        animate(p, 100, { duration: 2, ease: [0.3, 0, 0.2, 1] }).then(() => setEstado("hecho"));
      }}
      className="relative h-14 w-52 overflow-hidden rounded-full border-[3px] border-ink bg-paper font-mono text-[14px] font-semibold uppercase shadow-[5px_5px_0_rgb(43_34_48)]"
    >
      <motion.span className="absolute inset-y-0 left-0 bg-pool" style={{ width }} aria-hidden="true" />
      <span className="relative" aria-live="polite">
        {estado === "listo" && <>↓ {t({ en: "Download", es: "Descargar" })}</>}
        {estado === "bajando" && `${pct}%`}
        {estado === "hecho" && <>✓ {t({ en: "Done", es: "Listo" })}</>}
      </span>
    </button>
  );
}
