/**
 * The "ch" monogram, drawn rather than typeset: an open c whose mouth wraps
 * around the stem of the h, both in one heavy rounded stroke, with a
 * tangerine dot as the spark. On hover (via the parent's `group`) the c spins
 * a full turn around its own centre and the dot hops.
 */
export default function Logo({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="20" className="fill-ink" />
      <g fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" className="text-paper">
        {/* c: arco abierto hacia la derecha, que gira con el hover */}
        <path
          d="M19.5 17.2 A6.2 6.2 0 1 0 19.5 26.8"
          className="origin-[15.6px_22px] transition-transform duration-700 ease-[var(--ease-fluid)] group-hover:rotate-[360deg]"
        />
        {/* h: asta alta y hombro que baja */}
        <path d="M22.4 10.5 V29.5" />
        <path d="M22.4 21.5 C22.4 17.6 30 17.2 30 21.8 V29.5" />
      </g>
      <circle
        cx="30"
        cy="11.2"
        r="2.3"
        className="fill-tangerine transition-transform duration-500 group-hover:-translate-y-[2px]"
      />
    </svg>
  );
}
