"use client";

import { useEffect, useState } from "react";

const EVENT = "playground-plays";
const PAUSA = 2500; // ms: tocar la misma pieza muy seguido cuenta como una sola jugada
const ENVIO = 2000; // ms: las jugadas se juntan y se envían en un solo paquete

const ultima = new Map<string, number>();
let pendientes = 0;
let actual: number | null = null;
let timer = 0;

function avisar(plays: number) {
  actual = plays;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: plays }));
}

async function enviar() {
  timer = 0;
  const n = pendientes;
  pendientes = 0;
  if (!n) return;
  try {
    const res = await fetch("/api/plays", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ n }), keepalive: true });
    const { plays } = (await res.json()) as { plays: number | null };
    if (plays != null) avisar(plays);
  } catch {}
}

/**
 * Counts a play: every time someone plays with a piece. Touching the same
 * piece again within a couple of seconds is the same play, and plays are
 * sent together every few seconds instead of one request per touch. The
 * number on screen goes up right away.
 */
export function markPlay(slug: string) {
  const ahora = Date.now();
  if (ahora - (ultima.get(slug) ?? 0) < PAUSA) return;
  ultima.set(slug, ahora);
  pendientes += 1;
  if (actual != null) avisar(actual + 1);
  if (!timer) timer = window.setTimeout(enviar, ENVIO);
}

/** The current count, or null while loading or if the counter is unreachable. */
export function usePlays() {
  const [plays, setPlays] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/plays")
      .then((r) => r.json())
      .then((d: { plays: number | null }) => {
        if (!alive || d.plays == null) return;
        actual = d.plays + pendientes;
        setPlays(actual);
      })
      .catch(() => {});
    const on = (e: Event) => setPlays((e as CustomEvent<number>).detail);
    window.addEventListener(EVENT, on);
    // al salir de la página se envían las jugadas que quedaban
    const salir = () => void enviar();
    window.addEventListener("pagehide", salir);
    return () => {
      alive = false;
      window.removeEventListener(EVENT, on);
      window.removeEventListener("pagehide", salir);
      void enviar();
    };
  }, []);

  return plays;
}
