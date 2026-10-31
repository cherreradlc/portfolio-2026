/**
 * Consuelo's CH monogram: a C and an H cut out of a hexagon, with softened
 * corners. Drawn in the current text colour, so it follows the theme.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-4 -4 258 298" className={className} aria-hidden="true">
      <path fill="currentColor" d="M117.25 4.57Q125 0 132.75 4.57L142.25 10.18Q150 14.75 150 23.75L150 121.5Q150 130.5 142.25 125.93L107.75 105.57Q100 101 100 92L100 52.75Q100 43.75 92.25 48.32L57.75 68.68Q50 73.25 50 82.25L50 207.75Q50 216.75 57.75 221.32L92.25 241.68Q100 246.25 100 237.25L100 167Q100 158 107.75 162.57L142.25 182.93Q150 187.5 150 196.5L150 266.25Q150 275.25 142.25 279.82L132.75 285.43Q125 290 117.25 285.43L7.75 220.82Q0 216.25 0 207.25L0 82.75Q0 73.75 7.75 69.18ZM200 53.25Q200 44.25 207.75 48.82L242.25 69.18Q250 73.75 250 82.75L250 207.25Q250 216.25 242.25 220.82L207.75 241.18Q200 245.75 200 236.75Z" />
    </svg>
  );
}
