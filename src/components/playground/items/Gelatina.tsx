"use client";

import { useAnimate } from "motion/react";
import { useLang } from "@/i18n/lang";

/** Jelly button: squashes while pressed, wobbles back when released. */
export default function Gelatina() {
  const { t } = useLang();
  const [scope, animate] = useAnimate();

  const aplastar = () => animate(scope.current, { scaleX: 1.22, scaleY: 0.78 }, { duration: 0.12, ease: "easeOut" });
  const rebotar = () =>
    animate(
      scope.current,
      { scaleX: [1.22, 0.86, 1.1, 0.96, 1.02, 1], scaleY: [0.78, 1.16, 0.92, 1.04, 0.99, 1] },
      { duration: 0.7, ease: "easeOut" },
    );

  return (
    <button
      ref={scope}
      type="button"
      onPointerDown={aplastar}
      onPointerUp={rebotar}
      onPointerLeave={(e) => e.buttons && rebotar()}
      onKeyDown={(e) => (e.key === " " || e.key === "Enter") && !e.repeat && aplastar()}
      onKeyUp={(e) => (e.key === " " || e.key === "Enter") && rebotar()}
      className="origin-bottom rounded-[28px] border-[3px] border-ink bg-sun px-10 py-5 text-[20px] font-bold shadow-[5px_5px_0_rgb(43_34_48)] select-none"
    >
      {t({ en: "Squish me", es: "Apriétame" })}
    </button>
  );
}
