"use client";

import { useRef } from "react";
import { animate, motion, useMotionValue, useVelocity } from "motion/react";
import { useLang } from "@/i18n/lang";

const MAX = 75; // grados: más allá el columpio daría la vuelta
const PIVOTE = 14; // alto del punto de amarre dentro de la caja

/**
 * A swing seen from the side, as swings really move: grab the seat and it
 * follows your hand around the top of the frame, like a pendulum. Let go and
 * it swings back and forth until it settles.
 */
export default function Columpio() {
  const { t } = useLang();
  const caja = useRef<HTMLDivElement>(null);
  const angle = useMotionValue(0);
  const vel = useVelocity(angle);

  // ángulo entre el punto de amarre y el puntero
  const hacia = (x: number, y: number) => {
    const r = caja.current!.getBoundingClientRect();
    const deg = (Math.atan2(r.left + r.width / 2 - x, y - (r.top + PIVOTE)) * 180) / Math.PI;
    return Math.max(-MAX, Math.min(MAX, deg));
  };
  const soltar = () =>
    animate(angle, 0, { type: "spring", stiffness: 24, damping: 1.8, velocity: Math.max(-260, Math.min(260, vel.get())) });

  return (
    <div ref={caja} className="relative h-56 w-60">
      {/* armazón en forma de A, visto de lado */}
      <svg viewBox="0 0 240 224" className="absolute inset-0 size-full" aria-hidden="true">
        <path d="M30 220 L120 14 L210 220" fill="none" stroke="#2b2230" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 220 L120 14 L210 220" fill="none" stroke="#ff6b57" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <motion.div
        className="absolute left-1/2 h-40 w-14 -translate-x-1/2 cursor-grab touch-none active:cursor-grabbing"
        style={{ top: PIVOTE, rotate: angle, originX: 0.5, originY: 0 }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          angle.stop();
          angle.set(hacia(e.clientX, e.clientY));
        }}
        onPointerMove={(e) => {
          // solo mientras lo tienes tomado (el puntero quedó capturado al apretar)
          if (e.currentTarget.hasPointerCapture(e.pointerId)) angle.set(hacia(e.clientX, e.clientY));
        }}
        onPointerUp={soltar}
        onPointerCancel={soltar}
        role="img"
        aria-label={t({ en: "A swing you can push", es: "Un columpio que puedes empujar" })}
      >
        {/* cuerda y asiento */}
        <span className="absolute top-0 left-1/2 h-[148px] w-[3px] -translate-x-1/2 rounded-full bg-ink" />
        <span className="absolute bottom-0 left-1/2 h-3 w-12 -translate-x-1/2 rounded-[4px] border-[3px] border-ink bg-sun shadow-[2px_2px_0_rgb(43_34_48)]" />
      </motion.div>
      <span className="absolute top-[11px] left-1/2 size-2.5 -translate-x-1/2 rounded-full border-2 border-ink bg-paper" aria-hidden="true" />

      <span className="pointer-events-none absolute -bottom-6 w-full text-center font-mono text-[11px] tracking-wide text-ink/50 uppercase">
        {t({ en: "Grab the seat & let go", es: "Toma el asiento y suéltalo" })}
      </span>
    </div>
  );
}
