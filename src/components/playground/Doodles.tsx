/**
 * The park's decoration: soft colour blobs, a dotted play mat and hand-drawn
 * doodles (squiggles, stars, a sun, zigzags). Purely decorative.
 */
const STROKE = { fill: "none", strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export default function Doodles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* manchas de color */}
      <div className="absolute -top-24 -left-20 size-[26rem] rounded-[46%_54%_60%_40%/50%_42%_58%_50%] bg-pool/25 blur-[2px]" />
      <div className="absolute top-1/3 -right-24 size-[30rem] rounded-[58%_42%_38%_62%/45%_55%_45%_55%] bg-bubble/30" />
      <div className="absolute -bottom-28 left-1/4 size-[28rem] rounded-[40%_60%_55%_45%/60%_40%_60%_40%] bg-sun/35" />
      <div className="absolute top-10 left-[45%] size-48 rounded-full bg-mint/25" />

      {/* alfombra de puntos */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--park-dot)_1.6px,transparent_1.6px)] bg-[size:26px_26px]" />

      <svg className="absolute opacity-50 top-[8%] right-[12%] w-28 text-sun" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="18" fill="currentColor" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          return <path key={i} d={`M${50 + Math.cos(a) * 28} ${50 + Math.sin(a) * 28} L${50 + Math.cos(a) * 42} ${50 + Math.sin(a) * 42}`} stroke="currentColor" {...STROKE} />;
        })}
      </svg>
      <svg className="absolute opacity-50 top-[62%] left-[6%] hidden w-40 text-coral md:block" viewBox="0 0 160 40">
        <path d="M5 20 C20 0 35 40 50 20 S80 0 95 20 S125 40 140 20" stroke="currentColor" {...STROKE} />
      </svg>
      <svg className="absolute opacity-50 top-[16%] left-[58%] w-14 rotate-12 text-grape" viewBox="0 0 50 50">
        <path d="M25 4 L30 19 L46 19 L33 28 L38 44 L25 34 L12 44 L17 28 L4 19 L20 19 Z" fill="currentColor" />
      </svg>
      <svg className="absolute opacity-50 right-[20%] bottom-[14%] hidden w-36 text-pool md:block" viewBox="0 0 140 30">
        <path d="M4 26 L22 4 L40 26 L58 4 L76 26 L94 4 L112 26 L130 4" stroke="currentColor" {...STROKE} />
      </svg>
      <svg className="absolute opacity-50 top-[70%] right-[45%] w-10 -rotate-12 text-bubble" viewBox="0 0 50 50">
        <path d="M25 4 L30 19 L46 19 L33 28 L38 44 L25 34 L12 44 L17 28 L4 19 L20 19 Z" fill="currentColor" />
      </svg>
      <svg className="absolute opacity-50 top-[30%] left-[4%] hidden w-16 text-mint md:block" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="22" stroke="currentColor" {...STROKE} />
        <circle cx="30" cy="30" r="8" fill="currentColor" />
      </svg>
      <svg className="absolute opacity-50 bottom-[6%] left-[52%] hidden w-24 text-grape md:block" viewBox="0 0 100 100">
        <path d="M50 10 C80 10 90 40 70 55 C55 66 35 55 42 42 C47 33 60 38 57 46" stroke="currentColor" {...STROKE} />
      </svg>
    </div>
  );
}
