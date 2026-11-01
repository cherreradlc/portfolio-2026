"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/i18n/lang";

const FRASES = [
  { en: "Hi, I'm Consu", es: "Hola, soy Consu" },
  { en: "I design it", es: "Lo diseño" },
  { en: "and I build it", es: "y lo programo" },
  { en: "Let's play!", es: "¡A jugar!" },
];

/** Typewriter: phrases type themselves, pause, erase and move on. */
export default function Maquina() {
  const { lang } = useLang();
  // al cambiar de idioma vuelve a empezar desde la primera frase
  return <Escribe key={lang} />;
}

function Escribe() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [borrando, setBorrando] = useState(false);
  const frase = t(FRASES[i]);

  useEffect(() => {
    const listo = !borrando && n === frase.length;
    const vacio = borrando && n === 0;
    const id = window.setTimeout(
      () => {
        if (listo) setBorrando(true);
        else if (vacio) {
          setBorrando(false);
          setI((v) => (v + 1) % FRASES.length);
        } else setN((v) => v + (borrando ? -1 : 1));
      },
      listo ? 1300 : vacio ? 300 : borrando ? 40 : 85,
    );
    return () => window.clearTimeout(id);
  }, [n, borrando, frase.length]);

  return (
    <p className="flex h-14 min-w-64 items-center justify-center rounded-[14px] border-[3px] border-ink bg-ink px-5 font-mono text-[18px] text-sun shadow-[5px_5px_0_rgb(43_34_48)]" aria-label={frase}>
      <span aria-hidden="true">{frase.slice(0, n)}</span>
      <motion.span className="ml-0.5 inline-block h-6 w-[3px] bg-sun" animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6, repeatType: "reverse" }} aria-hidden="true" />
    </p>
  );
}
