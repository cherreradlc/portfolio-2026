"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { useLang } from "@/i18n/lang";

/** 3D tilt card: it leans toward the pointer and a shine follows it across the surface. */
export default function Tarjeta3D() {
  const { t } = useLang();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-18, 18]), { stiffness: 200, damping: 16 });
  const rotateX = useSpring(useTransform(py, [0, 1], [16, -16]), { stiffness: 200, damping: 16 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  // la posición se limita a la tarjeta: con el dedo capturado puede salirse de ella
  const inclinar = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    px.set(clamp((e.clientX - r.left) / r.width));
    py.set(clamp((e.clientY - r.top) / r.height));
  };
  const centrar = () => { px.set(0.5); py.set(0.5); };
  const brillo = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.65), transparent 55%)`;

  return (
    <div className="[perspective:700px]">
      <motion.div
        className="relative flex h-60 w-44 touch-none flex-col items-center justify-center gap-3 overflow-hidden rounded-[22px] border-[3px] border-ink bg-[linear-gradient(150deg,#7b4dff,#ff8fc8_60%,#ffc83d)] shadow-[6px_6px_0_rgb(43_34_48)]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); inclinar(e); }}
        onPointerMove={inclinar}
        onPointerUp={(e) => e.pointerType !== "mouse" && centrar()}
        onPointerCancel={centrar}
        onPointerLeave={centrar}
      >
        <span className="text-[64px] [transform:translateZ(40px)]" aria-hidden="true">🎡</span>
        <span className="text-center text-[17px] font-black text-paper [transform:translateZ(30px)] [-webkit-text-stroke:1px_rgb(43_34_48)]">
          {t({ en: "Ferris wheel", es: "Rueda de la fortuna" })}
        </span>
        <motion.span className="pointer-events-none absolute inset-0" style={{ background: brillo }} aria-hidden="true" />
      </motion.div>
    </div>
  );
}
