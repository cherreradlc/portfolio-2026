import Image from "next/image";
import { IMAGE_SIZES } from "@/data/image-sizes";

/**
 * Files narrower than this are served as-is: they are already compressed
 * JPEGs, and letting the optimizer pick a smaller variant only loses detail.
 */
const SMALL = 2000;

/** The widest an image may be drawn, in CSS pixels, without going soft. */
export function maxCssWidth(src: string, opts: { density?: number; maxWidth?: number; maxHeight?: number } = {}) {
  const size = IMAGE_SIZES[src] ?? { w: 1600, h: 1000 };
  const limits = [size.w / (opts.density ?? 1.25)];
  if (opts.maxWidth) limits.push(opts.maxWidth);
  if (opts.maxHeight) limits.push((opts.maxHeight * size.w) / size.h);
  return Math.round(Math.min(...limits));
}

/**
 * An image at its own proportions that never grows past its real resolution:
 * it fills the available width only up to `maxCssWidth`, so small files stay
 * sharp instead of being stretched soft.
 */
export default function SizedImage({
  src,
  alt,
  className = "",
  sizes,
  density = 1.25,
  maxWidth,
  maxHeight,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  density?: number;
  maxWidth?: number;
  maxHeight?: number;
  priority?: boolean;
}) {
  const size = IMAGE_SIZES[src] ?? { w: 1600, h: 1000 };
  const max = maxCssWidth(src, { density, maxWidth, maxHeight });
  return (
    <Image
      src={src}
      alt={alt}
      width={size.w}
      height={size.h}
      // Si el navegador no sabe el ancho real en pantalla, baja una copia
      // más chica y la estira: por defecto se le dice el máximo exacto.
      sizes={sizes ?? `(max-width: ${max}px) 100vw, ${max}px`}
      unoptimized={size.w < SMALL}
      priority={priority}
      className={`h-auto w-full ${className}`}
      style={{ maxWidth: max }}
    />
  );
}

export function naturalWidth(src: string) {
  return IMAGE_SIZES[src]?.w ?? 0;
}

export function isSmall(src: string) {
  return naturalWidth(src) < SMALL;
}
