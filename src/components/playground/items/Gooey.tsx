"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const ANCHO = 192; // ancho del botón
const VACIAR = 1.8; // segundos que tarda en vaciarse
type Gota = { id: number; x: number; s: number };

/**
 * Melting button: the colour drains out of it and drips to the ground,
 * leaving only the empty outline. Tap (or hover) again and it fills back up.
 * The drips are liquid thanks to an SVG "goo" filter that fuses nearby shapes.
 */
export default function Gooey() {
  const { t } = useLang();
  const [vacio, setVacio] = useState(false);
  const [gotas, setGotas] = useState<Gota[]>([]);
  const n = useRef(0);
  const id = useId().replace(/:/g, "");
  // en el celular el "hover" se simula al tocar: ahí solo cuenta el toque
  const conHover = () => matchMedia("(hover: hover)").matches;

  // mientras se vacía, caen gotas desde el borde de abajo
  useEffect(() => {
    if (!vacio) return;
    const inicio = performance.now();
    const timer = window.setInterval(() => {
      if (performance.now() - inicio > VACIAR * 1000) return window.clearInterval(timer);
      n.current += 1;
      const s = 10 + Math.random() * 10;
      setGotas((g) => [...g.slice(-24), { id: n.current, x: 22 + Math.random() * (ANCHO - 44 - s), s }]);
    }, 110);
    return () => window.clearInterval(timer);
  }, [vacio]);

  return (
    <div className="relative flex h-56 w-60 flex-col items-center">
      <svg className="absolute size-0" aria-hidden="true">
        <filter id={`goo-${id}`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
          <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" />
        </filter>
      </svg>

      {/* las gotas, detrás del botón, salen por su borde de abajo */}
      <div className="pointer-events-none absolute top-[52px] h-40" style={{ width: ANCHO, filter: `url(#goo-${id})` }} aria-hidden="true">
        <motion.span
          className="absolute top-0 left-1/2 h-4 -translate-x-1/2 rounded-full bg-coral"
          initial={false}
          animate={{ width: vacio ? [ANCHO - 30, ANCHO - 50, 0] : 0 }}
          transition={{ duration: VACIAR + 0.3, times: [0, 0.7, 1] }}
        />
        <AnimatePresence>
          {gotas.map((g) => (
            <motion.span
              key={g.id}
              className="absolute top-0 rounded-full bg-coral"
              style={{ left: g.x, width: g.s, height: g.s }}
              initial={{ y: 0, scaleY: 0.6 }}
              animate={{ y: [0, 14, 150], scaleY: [0.6, 1.9, 1.2], opacity: [1, 1, 0] }}
              transition={{ duration: 1, times: [0, 0.35, 1], ease: "easeIn" }}
              onAnimationComplete={() => setGotas((list) => list.filter((x) => x.id !== g.id))}
            />
          ))}
        </AnimatePresence>
      </div>

      <button
        type="button"
        aria-pressed={vacio}
        onMouseEnter={() => conHover() && setVacio(true)}
        onMouseLeave={() => conHover() && setVacio(false)}
        onClick={(e) => { if (e.detail === 0 || !conHover()) setVacio((v) => !v); }}
        className="relative mt-1 h-16 overflow-hidden rounded-full border-[3px] border-ink bg-paper shadow-[5px_5px_0_rgb(43_34_48)]"
        style={{ width: ANCHO }}
      >
        {/* el líquido: baja como si el botón se vaciara, con la superficie ondulando */}
        <motion.span
          className="absolute inset-x-0 bottom-0 bg-coral"
          initial={false}
          animate={{ height: vacio ? "0%" : "100%" }}
          transition={vacio ? { duration: VACIAR, ease: [0.4, 0, 0.6, 1] } : { type: "spring", stiffness: 120, damping: 14 }}
        >
          <motion.svg viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -top-[9px] left-0 h-3 w-[200%] fill-coral" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }} aria-hidden="true">
            <path d="M0 12 V6 Q25 0 50 6 T100 6 T150 6 T200 6 V12 Z" />
          </motion.svg>
        </motion.span>
        <span className="relative text-[18px] font-black text-ink">
          {vacio ? t({ en: "Fill me up", es: "Lléname" }) : t({ en: "Melt me", es: "Derríteme" })}
        </span>
      </button>
    </div>
  );
}
