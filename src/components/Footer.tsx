"use client";

import { useEffect, useState } from "react";
import { scrollToTarget } from "./SmoothScroll";
import { SITE } from "@/data/site";

/** Footer with a live Santiago clock, so remote teams see her working hours. */
export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-CL", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: SITE.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="label flex flex-col gap-4 border-t border-paper/25 pt-6 text-paper/60 sm:flex-row sm:items-center sm:justify-between">
      <p>© 2026 {SITE.name}</p>
      <p>Hora en Chile {time && `· ${time}`}</p>
      <button type="button" onClick={() => scrollToTarget(0)} className="text-left text-paper transition-colors hover:text-pink">
        Volver arriba ↑
      </button>
    </footer>
  );
}
