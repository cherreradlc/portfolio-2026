import type { CSSProperties } from "react";
import type { PlayColor } from "@/data/playground";

/**
 * Day ink and paper, set on the toy pieces so they keep their look when the
 * page switches to night (html[data-noche] redefines these variables).
 */
export const DAY_INK = { "--color-ink": "#2b2230", "--color-paper": "#f8f5f2" } as CSSProperties;

// Clases completas (no armadas con strings) para que Tailwind las encuentre.
export const BG: Record<PlayColor, string> = {
  sun: "bg-sun",
  coral: "bg-coral",
  pool: "bg-pool",
  mint: "bg-mint",
  grape: "bg-grape text-paper",
  bubble: "bg-bubble",
};
