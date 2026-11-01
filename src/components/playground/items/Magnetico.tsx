"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useLang } from "@/i18n/lang";

const ALCANCE = 42; // cuánto se puede estirar hacia el puntero o el dedo

/**
 * Magnetic button: it leans toward the pointer and springs back on leave.
 * On phones there's no hover, so it follows your finger while you hold it
 * and snaps back like a rubber band when you let go.
 */
export default function Magnetico() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const tocando = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 13, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 13, mass: 0.4 });

  const seguir = (e: React.PointerEvent, fuerza: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const clamp = (v: number) => Math.max(-ALCANCE, Math.min(ALCANCE, v));
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * fuerza));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * fuerza));
  };
  const soltar = () => {
    tocando.current = false;
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      // área un poco más grande que el botón, para que el imán se sienta antes de tocarlo
      className="flex size-44 touch-none items-center justify-center"
      onPointerMove={(e) => {
        if (e.pointerType === "mouse") seguir(e, 0.45);
        else if (tocando.current) seguir(e, 0.7);
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") return;
        tocando.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        seguir(e, 0.7);
      }}
      onPointerUp={soltar}
      onPointerCancel={soltar}
      onPointerLeave={(e) => e.pointerType === "mouse" && soltar()}
    >
      <motion.button
        type="button"
        style={{ x: sx, y: sy }}
        className="flex size-28 items-center justify-center rounded-full border-[3px] border-ink bg-mint text-center text-[15px] leading-tight font-bold shadow-[5px_5px_0_rgb(43_34_48)]"
      >
        {t({ en: "Come closer", es: "Acércate" })}
      </motion.button>
    </div>
  );
}
