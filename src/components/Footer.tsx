"use client";

import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import { scrollToTarget } from "./SmoothScroll";
import { SITE } from "@/data/site";
import { useLang } from "@/i18n/lang";

/** Footer with a live Santiago clock, so remote teams see her working hours. */
export default function Footer() {
  const { t, lang } = useLang();
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(lang === "es" ? "es-CL" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: SITE.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [lang]);

  return (
    <footer className="flex flex-col gap-6 border-t border-paper/15 pt-8 text-[13px] text-paper/55 sm:flex-row sm:items-center sm:justify-between">
      <p>© 2026 {SITE.name}</p>
      <p className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-online [animation:pulse-dot_1.6s_ease-out_infinite]" />
        Santiago, Chile {time && `· ${time}`}
      </p>
      <Magnetic>
        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          className="group flex items-center gap-2 text-paper transition-colors hover:text-sky"
        >
          {t({ en: "Back to top", es: "Volver arriba" })}
          <span className="transition-transform duration-500 group-hover:-translate-y-1">↑</span>
        </button>
      </Magnetic>
    </footer>
  );
}
