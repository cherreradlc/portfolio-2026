"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useSpring, type MotionValue } from "motion/react";
import { useLang } from "@/i18n/lang";

const COLORES = ["text-coral", "text-pool", "text-sun", "text-mint", "text-grape", "text-bubble"];

function Letra({ ch, i, px, py }: { ch: string; i: number; px: MotionValue<number>; py: MotionValue<number> }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 260, damping: 14 });
  const y = useSpring(0, { stiffness: 260, damping: 14 });

  const huir = () => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = r.left + r.width / 2 - px.get();
    const dy = r.top + r.height / 2 - py.get();
    const d = Math.hypot(dx, dy);
    const f = d < 90 ? (90 - d) / 90 : 0;
    x.set((dx / (d || 1)) * f * 46);
    y.set((dy / (d || 1)) * f * 46);
  };
  useMotionValueEvent(px, "change", huir);
  useMotionValueEvent(py, "change", huir);

  return (
    <motion.span ref={ref} style={{ x, y }} className={`inline-block [-webkit-text-stroke:2px_rgb(43_34_48)] [paint-order:stroke_fill] ${COLORES[i % COLORES.length]}`}>
      {ch}
    </motion.span>
  );
}

/** Shy letters: they run away from the pointer and come back when it leaves. */
export default function LetrasHuyen() {
  const { t } = useLang();
  const px = useMotionValue(-9999);
  const py = useMotionValue(-9999);
  const word = t({ en: "CATCH ME", es: "ATRÁPAME" });

  return (
    <p
      className="cursor-crosshair touch-none px-6 py-10 text-[40px] font-black tracking-tight whitespace-nowrap select-none"
      aria-label={word}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); px.set(e.clientX); py.set(e.clientY); }}
      onPointerMove={(e) => { px.set(e.clientX); py.set(e.clientY); }}
      onPointerUp={(e) => { if (e.pointerType !== "mouse") { px.set(-9999); py.set(-9999); } }}
      onPointerCancel={() => { px.set(-9999); py.set(-9999); }}
      onPointerLeave={() => { px.set(-9999); py.set(-9999); }}
    >
      <span aria-hidden="true">
        {word.split("").map((ch, i) => (ch === " " ? <span key={i} className="inline-block w-3" /> : <Letra key={`${word}-${i}`} ch={ch} i={i} px={px} py={py} />))}
      </span>
    </p>
  );
}
