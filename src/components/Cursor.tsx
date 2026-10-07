"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

/**
 * A tangerine drop that trails the pointer on a spring and stretches along
 * its direction of travel, like liquid. Over links and buttons it swells into
 * a translucent lens; anything with `data-cursor="Texto"` turns it into a
 * label pill. Only mounted for fine pointers (mouse, trackpad).
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  // La gota va pegada al puntero; lo líquido es el estiramiento, que sí
  // tiene resorte, así nunca queda atrasada respecto del mouse.
  const sx = useMotionValue(-100);
  const sy = useMotionValue(-100);
  const x = sx;
  const y = sy;

  // Estiramiento según la velocidad: más rápido, más alargada la gota.
  const vx = useVelocity(sx);
  const vy = useVelocity(sy);
  const speed = useTransform(() => Math.min(Math.hypot(vx.get(), vy.get()) / 1600, 0.6));
  const angle = useTransform(() => (Math.atan2(vy.get(), vx.get()) * 180) / Math.PI);
  const stretchX = useSpring(useTransform(speed, (s) => 1 + s), { stiffness: 400, damping: 30 });
  const stretchY = useSpring(useTransform(speed, (s) => 1 - s * 0.45), { stiffness: 400, damping: 30 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const inspect = (target: Element | null) => {
      const el = target?.closest<HTMLElement>("[data-cursor], a, button");
      setLabel(el?.dataset.cursor ?? null);
      setHovering(Boolean(el));
    };
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      inspect(e.target as Element);
    };
    // Al hacer scroll sin mover el mouse, lo que queda debajo cambia.
    const scroll = () => inspect(document.elementFromPoint(x.get(), y.get()));
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 78 : hovering ? 54 : 16;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
      {/* la gota: solo se estira cuando no muestra texto */}
      <motion.div
        className="absolute top-0 left-0"
        style={{
          x: sx,
          y: sy,
          rotate: label ? 0 : angle,
          scaleX: label ? 1 : stretchX,
          scaleY: label ? 1 : stretchY,
        }}
      >
        {/* centrada con márgenes que siguen al tamaño, no con translate en %:
            así el centro no se corre mientras la gota crece o se encoge */}
        <motion.div
          className="rounded-full"
          animate={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            opacity: visible ? 1 : 0,
            scale: pressed ? 0.8 : 1,
            // La etiqueta va en tinta: así se lee también sobre botones mandarina.
            backgroundColor: label
              ? "rgb(43 65 98 / 1)"
              : hovering
                ? "rgb(176 141 87 / 0.14)"
                : "rgb(176 141 87 / 1)",
            borderWidth: hovering && !label ? 1.5 : 0,
          }}
          style={{ borderColor: "rgb(176 141 87 / 0.9)", borderStyle: "solid" }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
        />
      </motion.div>

      <AnimatePresence>
        {label && (
          <motion.span
            key={label}
            className="absolute top-0 left-0 text-[12.5px] font-medium tracking-wide whitespace-nowrap text-paper"
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
