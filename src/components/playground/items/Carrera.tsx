"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/lang";

/**
 * Mini game: a little runner crosses the park. ↑ (or Space) jumps over balls
 * and cones on the ground, ↓ ducks under the kites flying at head height.
 * Speed creeps up; the best score is remembered in this browser. Drawn on a
 * canvas so it stays smooth.
 */

const H = 240; // alto lógico del canvas
const SUELO = 196;
// la corredora se dibuja a escala ESC; su caja de choque: de pie 68, agachada 38
const ESC = 1.35;
const PJ = { x: 70, w: 46, h: 68, hAgachada: 38 };
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

/**
 * The runner, drawn from her feet up: ponytail, round head with a blush,
 * plum T-shirt and mint shorts. `fase` moves arms and legs while running,
 * `agachada` (0–1) folds her down, `aire` tucks her legs mid-jump.
 */
function dibujarCorredora(ctx: CanvasRenderingContext2D, x: number, pie: number, fase: number, agachada: number, aire: boolean) {
  const ink = "#2b2230";
  const c = agachada;
  const cx = x + 16 + c * 5; // se inclina hacia adelante al agacharse
  const cabezaY = pie - lerp(39, 15, c);
  const hombro = pie - lerp(27, 17, c);
  const hx = cx + c * 9; // la cabeza va adelante, como agachándose para pasar
  const cadera = pie - lerp(14, 6, c);
  const pierna = lerp(14, 7, c);
  const paso = aire ? 0 : Math.sin(fase);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // piernas: se alternan al correr y se recogen en el aire
  const piernas = aire ? [0.9, -0.5] : [paso * 0.7, -paso * 0.7];
  ctx.strokeStyle = ink;
  ctx.lineWidth = 5;
  for (const a of piernas) {
    ctx.beginPath();
    ctx.moveTo(cx, cadera);
    ctx.lineTo(cx + Math.sin(a) * pierna, cadera + Math.cos(a) * pierna);
    ctx.stroke();
  }

  // brazo de atrás
  const brazo = aire ? -2.4 : -paso * 0.9;
  const dibujarBrazo = (a: number) => {
    ctx.beginPath();
    ctx.moveTo(cx, hombro + 2);
    ctx.lineTo(cx + Math.sin(a) * 11, hombro + 2 + Math.cos(a) * 11);
    ctx.stroke();
  };
  ctx.lineWidth = 4;
  dibujarBrazo(brazo);

  // short y polera
  ctx.lineWidth = 3;
  ctx.fillStyle = "#34c79a";
  ctx.beginPath();
  ctx.roundRect(cx - 8, cadera - 4, 16, 7, 3);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#8c3b72";
  ctx.beginPath();
  ctx.roundRect(cx - 9 - c * 4, hombro, 18 + c * 8, cadera - hombro, 6);
  ctx.fill();
  ctx.stroke();

  // brazo de adelante
  ctx.lineWidth = 4;
  dibujarBrazo(aire ? -2.1 : paso * 0.9);

  // cola de caballo: rebota con el paso
  const rebote = Math.sin(fase * 2) * 3;
  ctx.lineWidth = 3;
  ctx.fillStyle = "#3a2418";
  ctx.beginPath();
  ctx.ellipse(hx - 13, cabezaY - 3 + rebote, 6, 8, -0.6 + rebote * 0.06, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // cabeza, pelo, ojo y mejilla
  ctx.fillStyle = "#f6c8a8";
  ctx.beginPath();
  ctx.arc(hx, cabezaY, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#3a2418";
  ctx.beginPath();
  ctx.arc(hx, cabezaY, 11, Math.PI * 0.95, Math.PI * 1.9);
  ctx.quadraticCurveTo(hx + 2, cabezaY - 3, hx - 10.5, cabezaY + 1);
  ctx.fill();
  ctx.fillStyle = "#ffc83d";
  ctx.beginPath();
  ctx.arc(hx - 8, cabezaY - 7, 2.6, 0, Math.PI * 2); // pinche del pelo
  ctx.fill();
  ctx.fillStyle = ink;
  ctx.beginPath();
  ctx.arc(hx + 5, cabezaY + 1, 1.7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,107,87,0.55)";
  ctx.beginPath();
  ctx.arc(hx + 6, cabezaY + 5.5, 2.6, 0, Math.PI * 2);
  ctx.fill();
}
const GRAVEDAD = 2600;
const SALTO = 780;
const INK = "#2b2230";

type Obstaculo = { x: number; tipo: "pelota" | "cono" | "volantin"; w: number; h: number; y: number; giro: number };
type Estado = "inicio" | "jugando" | "fin";

export default function Carrera() {
  const { t } = useLang();
  const canvas = useRef<HTMLCanvasElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  const [estado, setEstado] = useState<Estado>("inicio");
  // puntaje y récord se escriben directo en pantalla: cambian demasiado seguido para pasar por React
  const puntosEl = useRef<HTMLSpanElement>(null);
  const recordEl = useRef<HTMLSpanElement>(null);
  const record = useRef(0);
  const fmt = (n: number) => String(n).padStart(5, "0");

  // estado del juego fuera de React: cambia 60 veces por segundo
  const juego = useRef({
    y: 0, vy: 0, agachado: false, obstaculos: [] as Obstaculo[], vel: 330, dist: 0,
    proximo: 0, suelo: 0, nubes: [] as { x: number; y: number; s: number }[], ancho: 720,
  });
  const estadoRef = useRef<Estado>("inicio");

  useEffect(() => {
    try {
      record.current = Number(localStorage.getItem("playground-carrera") ?? 0);
    } catch {}
    if (recordEl.current) recordEl.current.textContent = fmt(record.current);
  }, []);

  const empezar = useCallback(() => {
    const g = juego.current;
    Object.assign(g, { y: 0, vy: 0, agachado: false, obstaculos: [], vel: 330, dist: 0, proximo: 0.9 });
    estadoRef.current = "jugando";
    setEstado("jugando");
    if (puntosEl.current) puntosEl.current.textContent = fmt(0);
    caja.current?.focus({ preventScroll: true });
  }, []);

  const saltar = useCallback(() => {
    if (estadoRef.current !== "jugando") return empezar();
    const g = juego.current;
    if (g.y === 0) g.vy = -SALTO;
  }, [empezar]);

  const agachar = useCallback((on: boolean) => {
    const g = juego.current;
    g.agachado = on;
    if (on && g.y < 0) g.vy = Math.max(g.vy, 900); // en el aire, baja rápido
  }, []);

  // teclado: solo cuando el juego tiene el foco, para no robar el scroll de la página
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === " " || e.key === "w") { e.preventDefault(); saltar(); }
    if (e.key === "ArrowDown" || e.key === "s") { e.preventDefault(); if (estadoRef.current === "jugando") agachar(true); }
  };
  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "s") agachar(false);
  };

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const g = juego.current;
    let agachada = 0; // 0 de pie, 1 agachada: se suaviza entre una pose y otra
    g.nubes = Array.from({ length: 4 }, (_, i) => ({ x: i * 220 + 60, y: 30 + (i % 2) * 34, s: 0.8 + (i % 3) * 0.2 }));

    const medir = () => {
      const dpr = window.devicePixelRatio || 1;
      g.ancho = c.clientWidth;
      c.width = c.clientWidth * dpr;
      c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(c);

    const nuevo = (): Obstaculo => {
      const volar = g.dist > 1600 && Math.random() < 0.35;
      if (volar) return { x: g.ancho + 30, tipo: "volantin", w: 44, h: 30, y: SUELO - 76, giro: 0 };
      return Math.random() < 0.5
        ? { x: g.ancho + 30, tipo: "pelota", w: 30, h: 30, y: SUELO - 30, giro: 0 }
        : { x: g.ancho + 30, tipo: "cono", w: 26, h: 38, y: SUELO - 38, giro: 0 };
    };

    const dibujarObstaculo = (o: Obstaculo) => {
      ctx.lineWidth = 3;
      ctx.strokeStyle = INK;
      if (o.tipo === "pelota") {
        const cx = o.x + o.w / 2, cy = o.y + o.h / 2;
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(o.giro);
        ctx.beginPath(); ctx.arc(0, 0, o.w / 2, 0, Math.PI * 2); ctx.fillStyle = "#ff6b57"; ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-o.w / 2, 0); ctx.lineTo(o.w / 2, 0); ctx.moveTo(0, -o.w / 2); ctx.lineTo(0, o.w / 2); ctx.stroke();
        ctx.restore();
      } else if (o.tipo === "cono") {
        ctx.beginPath(); ctx.moveTo(o.x + o.w / 2, o.y); ctx.lineTo(o.x + o.w, o.y + o.h); ctx.lineTo(o.x, o.y + o.h); ctx.closePath();
        ctx.fillStyle = "#ffc83d"; ctx.fill(); ctx.stroke();
        ctx.fillStyle = INK; ctx.fillRect(o.x + 6, o.y + o.h * 0.55, o.w - 12, 5);
      } else {
        const cx = o.x + o.w / 2, cy = o.y + o.h / 2 + Math.sin(o.giro) * 4;
        ctx.beginPath(); ctx.moveTo(cx, cy - 16); ctx.lineTo(cx + 22, cy); ctx.lineTo(cx, cy + 16); ctx.lineTo(cx - 22, cy); ctx.closePath();
        ctx.fillStyle = "#7b4dff"; ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx + 22, cy); ctx.quadraticCurveTo(cx + 40, cy + 10, cx + 52, cy + 2); ctx.stroke();
      }
    };

    const dibujar = (corriendo: boolean) => {
      const W = g.ancho;
      ctx.clearRect(0, 0, W, H);
      // nubes
      ctx.fillStyle = "rgba(63,169,245,0.18)";
      for (const n of g.nubes) {
        ctx.beginPath(); ctx.ellipse(n.x, n.y, 34 * n.s, 12 * n.s, 0, 0, Math.PI * 2); ctx.ellipse(n.x + 22 * n.s, n.y - 8 * n.s, 20 * n.s, 12 * n.s, 0, 0, Math.PI * 2); ctx.fill();
      }
      // suelo con rayas que avanzan
      ctx.strokeStyle = INK; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(0, SUELO); ctx.lineTo(W, SUELO); ctx.stroke();
      ctx.lineWidth = 2; ctx.strokeStyle = "rgba(43,34,48,0.35)";
      for (let x = -(g.suelo % 40); x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, SUELO + 12); ctx.lineTo(x + 14, SUELO + 12); ctx.stroke(); }

      for (const o of g.obstaculos) dibujarObstaculo(o);

      // la corredora: da pasos al correr, se recoge en el aire y se dobla al agacharse
      agachada += ((g.agachado ? 1 : 0) - agachada) * 0.35;
      const bote = g.y === 0 && corriendo ? Math.abs(Math.sin(g.dist / 18)) * 2.5 : 0;
      ctx.save();
      ctx.translate(PJ.x, SUELO + g.y - bote);
      ctx.scale(ESC, ESC);
      dibujarCorredora(ctx, 0, 0, corriendo ? g.dist / 18 : 0, agachada, g.y < 0);
      ctx.restore();
    };

    let prev = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      const corriendo = estadoRef.current === "jugando";
      if (corriendo) {
        g.vel = Math.min(760, g.vel + dt * 9);
        const dx = g.vel * dt;
        g.dist += dx;
        g.suelo += dx;
        for (const n of g.nubes) { n.x -= dx * 0.25; if (n.x < -80) n.x = g.ancho + 60; }
        // física del salto
        g.vy += GRAVEDAD * dt;
        g.y = Math.min(0, g.y + g.vy * dt);
        if (g.y === 0) g.vy = 0;
        // obstáculos
        g.proximo -= dt;
        if (g.proximo <= 0) {
          g.obstaculos.push(nuevo());
          g.proximo = 0.75 + Math.random() * 0.9 - Math.min(0.35, g.dist / 20000);
        }
        for (const o of g.obstaculos) { o.x -= dx; o.giro += o.tipo === "pelota" ? -dx / 15 : dt * 6; }
        g.obstaculos = g.obstaculos.filter((o) => o.x > -80);
        // choque (cajas un poco más chicas que los dibujos, para ser justos)
        const alto = g.agachado ? PJ.hAgachada : PJ.h;
        const pj = { x: PJ.x + 6, y: SUELO + g.y - alto + 4, w: PJ.w - 10, h: alto - 4 };
        const choca = g.obstaculos.some((o) => pj.x < o.x + o.w - 5 && pj.x + pj.w > o.x + 5 && pj.y < o.y + o.h - 4 && pj.y + pj.h > o.y + 4);
        const p = Math.floor(g.dist / 10);
        if (puntosEl.current) puntosEl.current.textContent = fmt(p);
        if (choca) {
          estadoRef.current = "fin";
          setEstado("fin");
          if (p > record.current) {
            record.current = p;
            if (recordEl.current) recordEl.current.textContent = fmt(p);
            try { localStorage.setItem("playground-carrera", String(p)); } catch {}
          }
        }
      }
      dibujar(corriendo);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const tecla = "inline-flex min-w-7 items-center justify-center rounded-[6px] border-2 border-ink bg-paper px-1 font-mono text-[12px]";
  const control = "flex h-14 flex-1 items-center justify-center rounded-[16px] border-[3px] border-ink text-[22px] font-bold shadow-[4px_4px_0_rgb(43_34_48)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none select-none touch-none";

  return (
    <div className="w-[min(86vw,760px)]">
      <div
        ref={caja}
        tabIndex={0}
        role="application"
        aria-label={t({ en: "Running game. Up arrow to jump, down arrow to duck.", es: "Juego de carrera. Flecha arriba para saltar, flecha abajo para agacharse." })}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={() => agachar(false)}
        onPointerDown={(e) => { if (e.pointerType !== "mouse" || estadoRef.current !== "jugando") saltar(); }}
        className="relative overflow-hidden rounded-[24px] border-[3px] border-ink bg-[linear-gradient(#e9f6ff,#fff8ea)] shadow-[6px_6px_0_rgb(43_34_48)] outline-none focus-visible:ring-4 focus-visible:ring-pool"
      >
        <canvas ref={canvas} className="block h-[240px] w-full" />

        <div className="pointer-events-none absolute top-3 right-4 flex gap-4 font-mono text-[13px] font-semibold tabular-nums">
          <span>{t({ en: "BEST", es: "RÉCORD" })} <span ref={recordEl}>00000</span></span>
          <span ref={puntosEl}>00000</span>
        </div>

        {estado !== "jugando" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-paper/60 text-center backdrop-blur-[2px]">
            <p className="text-[24px] font-black">
              {estado === "fin" ? t({ en: "Oops! You crashed", es: "¡Uy! Chocaste" }) : t({ en: "Run, Consu, run!", es: "¡Corre, Consu, corre!" })}
            </p>
            <button type="button" onClick={empezar} className="rounded-full border-[3px] border-ink bg-sun px-6 py-2.5 text-[16px] font-bold shadow-[4px_4px_0_rgb(43_34_48)]">
              {estado === "fin" ? t({ en: "Play again", es: "Jugar otra vez" }) : t({ en: "Play", es: "Jugar" })}
            </button>
            <p className="hidden items-center gap-2 text-[13px] md:flex">
              <span className={tecla}>↑</span> {t({ en: "jump", es: "saltar" })}
              <span className={`${tecla} ml-3`}>↓</span> {t({ en: "duck", es: "agacharse" })}
            </p>
          </div>
        )}
      </div>

      {/* controles táctiles para celular: agacharse a la izquierda, saltar a la derecha */}
      <div className="mt-4 flex gap-3 md:hidden">
        <button
          type="button"
          aria-label={t({ en: "Duck", es: "Agacharse" })}
          className={`${control} bg-bubble`}
          onPointerDown={(e) => { e.preventDefault(); if (estadoRef.current === "jugando") agachar(true); }}
          onPointerUp={() => agachar(false)}
          onPointerLeave={() => agachar(false)}
          onPointerCancel={() => agachar(false)}
        >
          ↓
        </button>
        <button type="button" aria-label={t({ en: "Jump", es: "Saltar" })} className={`${control} bg-mint`} onPointerDown={(e) => { e.preventDefault(); saltar(); }}>↑</button>
      </div>
    </div>
  );
}
