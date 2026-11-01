"use client";

import { useState } from "react";
import { Reorder } from "motion/react";
import { useLang } from "@/i18n/lang";

const JUEGOS = [
  { id: "columpio", emoji: "🪀", en: "Swing", es: "Columpio", bg: "bg-sun" },
  { id: "tobogan", emoji: "🛝", en: "Slide", es: "Tobogán", bg: "bg-pool" },
  { id: "carrusel", emoji: "🎠", en: "Carousel", es: "Carrusel", bg: "bg-bubble" },
  { id: "arenero", emoji: "🏖️", en: "Sandbox", es: "Arenero", bg: "bg-mint" },
];

/** Reorder list: drag your favourite games into order; the rest make room. */
export default function Reordenar() {
  const { t } = useLang();
  const [orden, setOrden] = useState(JUEGOS);

  return (
    <div className="flex w-56 flex-col gap-2">
      <p className="font-mono text-[12px] tracking-wide uppercase">{t({ en: "My favourites", es: "Mis favoritos" })}</p>
      <Reorder.Group axis="y" values={orden} onReorder={setOrden} className="flex flex-col gap-2">
        {orden.map((j, i) => (
          <Reorder.Item
            key={j.id}
            value={j}
            whileDrag={{ scale: 1.06, rotate: -2, boxShadow: "6px 8px 0 rgb(43 34 48)" }}
            className={`flex cursor-grab touch-none items-center gap-3 rounded-[14px] border-[3px] border-ink px-3 py-2 text-[15px] font-semibold shadow-[3px_3px_0_rgb(43_34_48)] active:cursor-grabbing ${j.bg}`}
          >
            <span className="w-4 font-mono text-[13px]">{i + 1}</span>
            <span aria-hidden="true">{j.emoji}</span>
            {t(j)}
            <span className="ml-auto text-ink/50" aria-hidden="true">⋮⋮</span>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
