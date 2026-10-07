import type { Accent } from "./projects";

/** Background tint and label style for each project, all within plum & pink. */
export const ACCENT_STYLES: Record<Accent, { card: string; chip: string; dark?: boolean }> = {
  tangerine: { card: "bg-[#f7ddd3]", chip: "bg-brand text-paper" },
  violet: { card: "bg-[#e9def2]", chip: "bg-brand text-paper" },
  sage: { card: "bg-blush", chip: "bg-brand text-paper" },
  wine: { card: "bg-[#f1d7dc]", chip: "bg-brand text-paper" },
  ink: { card: "bg-brand-deep text-paper", chip: "bg-pink text-ink", dark: true },
};
