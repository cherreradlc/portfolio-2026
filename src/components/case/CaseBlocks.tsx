"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { Block, Img } from "@/data/projects";
import { IMAGE_SIZES } from "@/data/image-sizes";
import { FadeUp, SplitWords } from "../Reveal";
import SizedImage, { isSmall, maxCssWidth } from "../SizedImage";
import ManualViewer from "./ManualViewer";
import CodeWindow from "./CodeWindow";
import { useLang } from "@/i18n/lang";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Renders a case study's blocks in order; images open in a shared lightbox. */
export default function CaseBlocks({ blocks }: { blocks: Block[] }) {
  const { t } = useLang();
  const [zoom, setZoom] = useState<Img | null>(null);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  return (
    <>
      <div className="flex flex-col gap-28 md:gap-40">
        {blocks.map((b, i) => (
          <BlockView key={i} block={b} onZoom={setZoom} flip={blocks.slice(0, i).filter((x) => x.type === "video").length % 2 === 1} />
        ))}
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[65] flex cursor-zoom-out items-center justify-center bg-ink/85 p-4 backdrop-blur-md sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
            role="dialog"
            aria-label={zoom.alt}
          >
            <motion.div
              layoutId={zoom.src}
              className="relative flex h-full w-full items-center justify-center"
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* Ampliada, pero nunca más allá de su tamaño real. */}
              <Image
                src={zoom.src}
                alt={zoom.alt}
                width={IMAGE_SIZES[zoom.src]?.w ?? 1600}
                height={IMAGE_SIZES[zoom.src]?.h ?? 1000}
                sizes="100vw"
                unoptimized={isSmall(zoom.src)}
                style={{ maxWidth: `min(100%, ${maxCssWidth(zoom.src, { density: 1, maxWidth: zoom.maxWidth ? zoom.maxWidth * 1.5 : undefined })}px)` }}
                className="h-auto max-h-full w-auto rounded-[10px] object-contain"
              />
            </motion.div>
            <button
              type="button"
              className="absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-[20px] text-ink"
              aria-label={t({ en: "Close", es: "Cerrar" })}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BlockView({ block: b, onZoom, flip = false }: { block: Block; onZoom: (img: Img) => void; flip?: boolean }) {
  switch (b.type) {
    case "text":
      return (
        <section className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <FadeUp>
            <p className="text-[13px] tracking-[0.22em] text-muted">{b.eyebrow.toUpperCase()}</p>
          </FadeUp>
          <div>
            <SplitWords
              as="h2"
              text={b.title}
              stagger={0.035}
              className="text-[clamp(2rem,4.4vw,3.6rem)] leading-[1] font-medium tracking-[-0.035em]"
            />
            {b.body.map((p, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.08}>
                <p className="mt-6 max-w-2xl text-[17.5px] leading-[1.7] text-ink-soft">{p}</p>
              </FadeUp>
            ))}
          </div>
        </section>
      );

    case "list":
      return (
        <section>
          <FadeUp>
            <p className="text-[13px] tracking-[0.22em] text-muted">{b.eyebrow.toUpperCase()}</p>
          </FadeUp>
          <SplitWords
            as="h2"
            text={b.title}
            stagger={0.035}
            className="mt-5 max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)] leading-[1] font-medium tracking-[-0.035em]"
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {b.items.map((it, i) => (
              <FadeUp key={it.title} delay={i * 0.07}>
                <li className="group h-full rounded-[22px] border border-line bg-paper-2/50 p-7 transition-all duration-500 ease-[var(--ease-fluid)] hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-paper">
                  <span className="text-[13px] text-muted transition-colors group-hover:text-paper/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[22px] leading-tight font-medium tracking-tight">{it.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-muted transition-colors group-hover:text-paper/70">
                    {it.body}
                  </p>
                </li>
              </FadeUp>
            ))}
          </ul>
        </section>
      );

    case "stats":
      return (
        <section className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-3">
          {b.items.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08} className="bg-paper p-8">
              <p className="font-serif text-[clamp(3.4rem,7vw,5.5rem)] leading-none italic">{s.value}</p>
              <p className="mt-4 max-w-[16rem] text-[15px] leading-snug text-muted">{s.label}</p>
            </FadeUp>
          ))}
        </section>
      );

    case "quote":
      return (
        <section className="mx-auto max-w-4xl text-center">
          <span className="font-serif text-[90px] leading-none text-tangerine" aria-hidden="true">“</span>
          <SplitWords
            as="p"
            text={b.text}
            stagger={0.03}
            className="-mt-6 font-serif text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.15] italic"
          />
          {b.author && (
            <FadeUp>
              <p className="mt-6 text-[13px] tracking-[0.22em] text-muted">— {b.author.toUpperCase()}</p>
            </FadeUp>
          )}
        </section>
      );

    case "image":
      return (
        <FadeUp>
          <figure className="flex flex-col items-center">
            <ZoomImage img={b} onZoom={onZoom} />
            {b.caption && <figcaption className="mt-4 self-start text-[14px] text-muted">{b.caption}</figcaption>}
          </figure>
        </FadeUp>
      );

    case "gallery": {
      const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "grid-cols-2 lg:grid-cols-4" }[b.columns ?? 2];
      return (
        <section>
          {b.eyebrow && (
            <FadeUp>
              <p className="text-[13px] tracking-[0.22em] text-muted">{b.eyebrow.toUpperCase()}</p>
            </FadeUp>
          )}
          {b.title && (
            <SplitWords
              as="h2"
              text={b.title}
              stagger={0.035}
              className="mt-5 mb-12 max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)] leading-[1] font-medium tracking-[-0.035em]"
            />
          )}
          {b.feature && (
            <FadeUp className="mb-4 flex justify-center">
              <ZoomImage img={b.feature} onZoom={onZoom} />
            </FadeUp>
          )}
          <div className={`grid items-start gap-4 ${cols}`}>
            {b.images.map((img, i) => (
              <FadeUp key={img.src} delay={(i % 4) * 0.07} className="flex justify-center">
                <ZoomImage
                  img={img}
                  onZoom={onZoom}
                  sizes={b.columns === 4 ? "(max-width: 1024px) 50vw, 320px" : "(max-width: 640px) 100vw, 640px"}
                />
              </FadeUp>
            ))}
          </div>
        </section>
      );
    }

    case "phones":
      return <PhoneRail block={b} onZoom={onZoom} />;

    case "code":
      return <CodeWindow block={b} />;

    case "manual":
      return <ManualViewer {...b} />;

    case "video":
      return (
        // los videos se alternan de lado, para que dos seguidos no se vean iguales
        <section className={`grid items-center gap-12 md:gap-20 ${flip ? "md:grid-cols-[auto_1fr]" : "md:grid-cols-[1fr_auto]"}`}>
          <div className={flip ? "md:order-2" : ""}>
            <FadeUp>
              <p className="text-[13px] tracking-[0.22em] text-muted">{b.eyebrow.toUpperCase()}</p>
            </FadeUp>
            <SplitWords
              as="h2"
              text={b.title}
              stagger={0.035}
              className="mt-6 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1] font-medium tracking-[-0.035em]"
            />
            {b.body.map((p, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.08}>
                <p className="mt-6 max-w-xl text-[17.5px] leading-[1.7] text-ink-soft">{p}</p>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.15}>
            <VideoPhone src={b.src} poster={b.poster} alt={b.alt} />
          </FadeUp>
        </section>
      );
  }
}

/**
 * A screen recording inside a phone. It plays muted and on loop once it is on
 * screen, pauses when scrolled away, and a tap pauses or resumes it. With
 * reduced motion it waits for a tap.
 */
function VideoPhone({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const { t } = useLang();
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !still) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const v = video.current;
        if (!v) return;
        if (v.paused) v.play().catch(() => {});
        else v.pause();
      }}
      aria-label={`${paused ? t({ en: "Play", es: "Reproducir" }) : t({ en: "Pause", es: "Pausar" })}: ${alt}`}
      className="relative mx-auto block aspect-[720/1226] w-[min(78vw,340px)] overflow-hidden rounded-[clamp(22px,3vw,36px)] border-[clamp(5px,0.6vw,8px)] border-ink bg-ink shadow-[0_40px_80px_-30px_rgb(43_34_48/0.55)]"
    >
      <video
        ref={video}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        className="h-full w-full object-cover"
      />
      {paused && (
        <span className="absolute inset-0 flex items-center justify-center bg-ink/15">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <svg viewBox="0 0 24 24" width={26} height={26} aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
          </span>
        </span>
      )}
    </button>
  );
}

/** An image at its real proportions that opens in the lightbox. */
function ZoomImage({ img, onZoom, sizes }: { img: Img; onZoom: (img: Img) => void; sizes?: string }) {
  const { t } = useLang();
  return (
    <motion.button
      type="button"
      layoutId={img.src}
      onClick={() => onZoom(img)}
      className="group block w-full cursor-zoom-in overflow-hidden rounded-[18px] border border-line bg-white"
      style={{ maxWidth: maxCssWidth(img.src, { maxWidth: img.maxWidth, maxHeight: 860 }) }}
      aria-label={`${t({ en: "Zoom", es: "Ampliar" })}: ${img.alt}`}
    >
      <SizedImage
        src={img.src}
        alt={img.alt}
        sizes={sizes}
        maxWidth={img.maxWidth}
        maxHeight={860}
        className="!max-w-none transition-transform duration-[1.2s] ease-[var(--ease-fluid)] group-hover:scale-[1.02]"
      />
    </motion.button>
  );
}

/**
 * A row of phone screens that slides sideways, on every screen size: swipe on
 * a phone, drag with the mouse or a trackpad on a computer, or use the arrows.
 * Vertical scrolling just moves past it, never through it.
 */
function PhoneRail({
  block: b,
  onZoom,
}: {
  block: Extract<Block, { type: "phones" }>;
  onZoom: (img: Img) => void;
}) {
  const { t } = useLang();
  const rail = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  // un arrastre no debe abrir la pantalla en grande al soltar
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  useEffect(() => {
    const r = rail.current;
    if (!r) return;
    const sync = () =>
      setEdge({ start: r.scrollLeft < 8, end: r.scrollLeft + r.clientWidth >= r.scrollWidth - 8 });
    sync();
    r.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(r);
    return () => {
      r.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const r = rail.current;
    if (!r) return;
    const phone = r.querySelector("figure");
    const w = phone ? phone.getBoundingClientRect().width + 32 : r.clientWidth * 0.8;
    r.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  const arrow = (dir: 1 | -1, off: boolean) => (
    <button
      type="button"
      onClick={() => step(dir)}
      disabled={off}
      aria-label={dir < 0 ? t({ en: "Previous screens", es: "Pantallas anteriores" }) : t({ en: "Next screens", es: "Pantallas siguientes" })}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-30"
    >
      <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );

  return (
    <section className="-mx-4 sm:-mx-6">
      <div className="mb-10 flex items-end justify-between gap-6 px-4 sm:px-6">
        <div>
          <p className="text-[13px] tracking-[0.22em] text-muted">{b.eyebrow.toUpperCase()}</p>
          <SplitWords
            as="h2"
            text={b.title}
            stagger={0.035}
            className="mt-5 max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)] leading-[1] font-medium tracking-[-0.035em]"
          />
          {b.body && (
            <FadeUp delay={0.1}>
              <p className="mt-6 max-w-2xl text-[17.5px] leading-[1.7] text-ink-soft">{b.body}</p>
            </FadeUp>
          )}
        </div>
        <div className="hidden shrink-0 gap-3 md:flex">
          {arrow(-1, edge.start)}
          {arrow(1, edge.end)}
        </div>
      </div>

      <div
        ref={rail}
        className="flex cursor-grab select-none snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] active:cursor-grabbing sm:px-6 md:gap-8 [&::-webkit-scrollbar]:hidden"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return; // en pantallas táctiles desliza el propio navegador
          e.preventDefault(); // que arrastrar no seleccione texto
          const r = rail.current!;
          drag.current = { down: true, x: e.clientX, left: r.scrollLeft, moved: false };
          r.style.scrollSnapType = "none";
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d.down) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 5) d.moved = true;
          rail.current!.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => {
          drag.current.down = false;
          if (rail.current) rail.current.style.scrollSnapType = "";
        }}
        onPointerLeave={() => {
          drag.current.down = false;
          if (rail.current) rail.current.style.scrollSnapType = "";
        }}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
      >
        {b.images.map((img) => (
          <figure key={img.src} className="w-[66vw] shrink-0 snap-start md:w-[min(280px,calc((100svh-340px)*0.462))]">
            <button
              type="button"
              onClick={() => onZoom(img)}
              className="relative block aspect-[390/844] w-full cursor-zoom-in overflow-hidden rounded-[30px] border-[6px] border-ink bg-ink shadow-[0_30px_60px_-30px_rgb(43_34_48/0.55)] transition-transform duration-700 ease-[var(--ease-fluid)] hover:-translate-y-2"
              aria-label={`${t({ en: "Zoom", es: "Ampliar" })}: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                draggable={false}
                sizes="(max-width: 768px) 70vw, 360px"
                unoptimized={isSmall(img.src)}
                className="pointer-events-none rounded-[24px] object-cover object-top"
              />
            </button>
            <figcaption className="mt-4 text-[14.5px] leading-snug text-muted">{img.caption}</figcaption>
          </figure>
        ))}
        {/* margen al final para que la última pantalla no quede pegada al borde */}
        <span aria-hidden="true" className="w-1 shrink-0 sm:w-2" />
      </div>
    </section>
  );
}
