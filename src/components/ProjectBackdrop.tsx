import Image from "next/image";
import type { ReactNode } from "react";

/**
 * A faint, themed background for each project card on the home page, behind
 * the phones: produce for Fresco, the bride's watercolour flowers for the
 * summer invitation. Kept at low opacity so the project stays the hero.
 */

type Spot = { x: number; y: number; r: number; s: number; icon: string };

// Íconos de línea en una caja de 48 × 48.
const ICONS: Record<string, ReactNode> = {
  palta: (
    <>
      <path d="M24 5c-7 0-10 9-13 17-3 9 2 20 13 20s16-11 13-20C34 14 31 5 24 5z" />
      <circle cx="24" cy="29" r="7" />
    </>
  ),
  huevo: <path d="M24 6c-8 0-14 13-14 22a14 14 0 0 0 28 0c0-9-6-22-14-22z" />,
  queso: (
    <>
      <path d="M6 34 30 12l12 8v14z" />
      <path d="M6 34h36" />
      <circle cx="30" cy="27" r="2.5" />
      <circle cx="20" cy="30" r="1.8" />
    </>
  ),
  moneda: (
    <>
      <circle cx="24" cy="24" r="15" />
      <path d="M28 18c-1-2-3-3-5-3-3 0-5 2-5 4 0 6 11 3 11 9 0 2-2 4-5 4-3 0-5-1-6-3M24 13v22" />
    </>
  ),
};

// Posiciones sueltas alrededor de los celulares (en % de la tarjeta).
const LAYOUT: Omit<Spot, "icon">[] = [
  { x: 6, y: 8, r: -14, s: 1 },
  { x: 82, y: 6, r: 12, s: 0.9 },
  { x: 4, y: 58, r: 10, s: 0.85 },
  { x: 86, y: 52, r: -8, s: 1.05 },
  { x: 18, y: 86, r: -6, s: 0.8 },
  { x: 74, y: 84, r: 16, s: 0.85 },
  { x: 44, y: 2, r: 4, s: 0.7 },
  { x: 48, y: 90, r: -12, s: 0.7 },
];

const SETS: Record<string, { icons: string[]; color: string; opacity: number }> = {
  fresco: { icons: ["palta", "huevo", "queso", "moneda", "huevo", "palta", "moneda", "queso"], color: "#3e7d3a", opacity: 0.3 },
};

const FLORES = [
  { src: "ramo-coral", x: -8, y: -10, w: 38, r: -18 },
  { src: "rama-verde", x: 82, y: -8, w: 22, r: 24 },
  { src: "peonia", x: 84, y: 60, w: 26, r: 8 },
  { src: "ranunculo", x: -6, y: 66, w: 24, r: -10 },
  { src: "hoja-lima", x: 40, y: 84, w: 16, r: 140 },
  { src: "rama-celeste", x: 30, y: -14, w: 12, r: -60 },
];

export default function ProjectBackdrop({ slug }: { slug: string }) {
  if (slug === "invitacion-verano") {
    return (
      <span className="pointer-events-none absolute inset-0 opacity-[0.38]" aria-hidden="true">
        {FLORES.map((f) => (
          <span key={f.src} className="absolute" style={{ left: `${f.x}%`, top: `${f.y}%`, width: `${f.w}%`, rotate: `${f.r}deg` }}>
            <Image src={`/projects/invitacion-verano/deco/${f.src}.webp`} alt="" width={320} height={320} sizes="140px" className="h-auto w-full" />
          </span>
        ))}
      </span>
    );
  }

  const set = SETS[slug];
  if (!set) return null;
  return (
    <span className="pointer-events-none absolute inset-0" style={{ opacity: set.opacity, color: set.color }} aria-hidden="true">
      {LAYOUT.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 48 48"
          className="absolute w-[13%]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, rotate: `${p.r}deg`, scale: p.s }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ICONS[set.icons[i % set.icons.length]]}
        </svg>
      ))}
    </span>
  );
}
