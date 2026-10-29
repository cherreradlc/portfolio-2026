"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
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
  // A baja velocidad no hay estiramiento ni giro: la dirección de un
  // movimiento lento cambia de un cuadro a otro y hacía temblar la gota.
  const vx = useVelocity(sx);
  const vy = useVelocity(sy);
  const speed = useTransform(() => {
    const v = Math.hypot(vx.get(), vy.get());
    return v < 450 ? 0 : Math.min((v - 450) / 1600, 0.5);
  });
  const angle = useMotionValue(0);
  useMotionValueEvent(speed, "change", (s) => {
    // el ángulo solo se actualiza cuando el movimiento es claro, y se queda
    // quieto mientras tanto
    if (s > 0.05) angle.set((Math.atan2(vy.get(), vx.get()) * 180) / Math.PI);
  });
  const stretchX = useSpring(useTransform(speed, (s) => 1 + s), { stiffness: 260, damping: 32 });
  const stretchY = useSpring(useTransform(speed, (s) => 1 - s * 0.4), { stiffness: 260, damping: 32 });

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

    // Entrar a un botón es inmediato; salir espera un instante. Los botones
    // magnéticos se mueven bajo el puntero y, en su borde, el cursor entraba
    // y salía muchas veces por segundo, creciendo y encogiéndose.
    let leaveTimer = 0;
    const inspect = (target: Element | null) => {
      const el = target?.closest<HTMLElement>("[data-cursor], a, button");
      if (el) {
        window.clearTimeout(leaveTimer);
        leaveTimer = 0;
        setLabel(el.dataset.cursor ?? null);
        setHovering(true);
      } else if (!leaveTimer) {
        leaveTimer = window.setTimeout(() => {
          leaveTimer = 0;
          setLabel(null);
          setHovering(false);
        }, 120);
      }
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
      window.clearTimeout(leaveTimer);
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
          // sobre un botón la gota es un círculo quieto: sin giro ni estiramiento
          rotate: hovering ? 0 : angle,
          scaleX: hovering ? 1 : stretchX,
          scaleY: hovering ? 1 : stretchY,
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
              ? "rgb(94 33 80 / 1)"
              : hovering
                ? "rgb(224 110 160 / 0.16)"
                : "rgb(224 110 160 / 1)",
            borderWidth: hovering && !label ? 1.5 : 0,
          }}
          style={{ borderColor: "rgb(224 110 160 / 0.9)", borderStyle: "solid" }}
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
