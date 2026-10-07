"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import type { Block, Img } from "@/data/projects";
import { IMAGE_SIZES } from "@/data/image-sizes";
import { FadeUp, SplitWords } from "../Reveal";
import SizedImage, { isSmall, maxCssWidth } from "../SizedImage";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Renders a case study's blocks in order; images open in a shared lightbox. */
export default function CaseBlocks({ blocks }: { blocks: Block[] }) {
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
          <BlockView key={i} block={b} onZoom={setZoom} />
        ))}
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[65] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-md sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
            data-cursor="Cerrar"
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
              aria-label="Cerrar"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BlockView({ block: b, onZoom }: { block: Block; onZoom: (img: Img) => void }) {
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
                <li className="group h-full rounded-[22px] border border-line bg-paper-2/50 p-7 transition-all duration-500 ease-[var(--ease-fluid)] hover:-translate-y-1 hover:border-ink hover:bg-ink hover:text-paper">
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
  }
}

/** An image at its real proportions that opens in the lightbox. */
function ZoomImage({ img, onZoom, sizes }: { img: Img; onZoom: (img: Img) => void; sizes?: string }) {
  return (
    <motion.button
      type="button"
      layoutId={img.src}
      onClick={() => onZoom(img)}
      data-cursor="Ampliar"
      className="group block w-full overflow-hidden rounded-[18px] border border-line bg-white"
      style={{ maxWidth: maxCssWidth(img.src, { maxWidth: img.maxWidth, maxHeight: 860 }) }}
      aria-label={`Ampliar: ${img.alt}`}
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
 * A row of phone screens. On wide screens the section pins and vertical
 * scrolling slides the row sideways; on phones it is a native swipe rail.
 */
function PhoneRail({
  block: b,
  onZoom,
}: {
  block: Extract<Block, { type: "phones" }>;
  onZoom: (img: Img) => void;
}) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [wide, setWide] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // La pista solo existe en la versión ancha: se mide después de montarla y
  // cada vez que cambia su tamaño.
  useLayoutEffect(() => {
    const t = track.current;
    if (!wide || !t?.parentElement) return;
    const parent = t.parentElement;
    // + el relleno derecho, que scrollWidth no siempre cuenta
    const measure = () => setDistance(Math.max(0, t.scrollWidth - parent.clientWidth + 48));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [wide]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  const header = (
    <div className="mb-10 px-4 sm:px-6">
      <p className="text-[13px] tracking-[0.22em] text-muted">{b.eyebrow.toUpperCase()}</p>
      <SplitWords
        as="h2"
        text={b.title}
        stagger={0.035}
        className="mt-5 max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)] leading-[1] font-medium tracking-[-0.035em]"
      />
    </div>
  );

  const phones = b.images.map((img) => (
    // En pantallas anchas el ancho sale del alto disponible, para que el
    // teléfono y su leyenda siempre quepan bajo el título.
    <figure key={img.src} className="w-[66vw] shrink-0 snap-center md:w-[min(280px,calc((100svh-340px)*0.462))]">
      <button
        type="button"
        onClick={() => onZoom(img)}
        data-cursor="Ampliar"
        className="relative block aspect-[390/844] w-full overflow-hidden rounded-[30px] border-[6px] border-ink bg-ink shadow-[0_30px_60px_-30px_rgb(31_42_34/0.55)] transition-transform duration-700 ease-[var(--ease-fluid)] hover:-translate-y-2"
        aria-label={`Ampliar: ${img.alt}`}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 768px) 70vw, 360px"
          unoptimized={isSmall(img.src)}
          className="rounded-[24px] object-cover object-top"
        />
      </button>
      <figcaption className="mt-4 text-[14.5px] leading-snug text-muted">{img.caption}</figcaption>
    </figure>
  ));

  if (!wide) {
    return (
      // El ref va también aquí: useScroll lo sigue aunque en celular no se use.
      <section ref={section} className="-mx-4 sm:-mx-6">
        {header}
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-6">
          {phones}
        </div>
      </section>
    );
  }

  return (
    <section ref={section} className="relative -mx-6" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {header}
        <motion.div ref={track} style={{ x }} className="flex gap-8 px-6">
          {phones}
        </motion.div>
      </div>
    </section>
  );
}
