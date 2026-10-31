"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Block } from "@/data/projects";
import { FadeUp, SplitWords } from "../Reveal";
import { useLang } from "@/i18n/lang";

type CodeBlock = Extract<Block, { type: "code" }>;

// colores del editor, sobre fondo oscuro
const TOKENS: [RegExp, string][] = [
  [/\/\*[\s\S]*?\*\/|\/\/[^\n]*/y, "text-[#9a8f9c] italic"],
  [/"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`/y, "text-[#a8dbb0]"],
  [/\b(?:export|const|let|function|return|if|else|for|of|continue|new|import|from|type)\b/y, "text-[#f59ac0]"],
  [/\b\d+(?:\.\d+)?\b/y, "text-[#f5c27a]"],
  [/[A-Za-z_$][\w$]*(?=\()/y, "text-[#a9c7ff]"],
  [/\b[A-Z][\w$]*\b/y, "text-[#d7b4f0]"],
];

/** Colorea TypeScript lo justo para leerlo: comentarios, textos, palabras clave, números y funciones. */
function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let plain = "";
  let i = 0;
  while (i < code.length) {
    let hit: [string, string] | null = null;
    for (const [re, cls] of TOKENS) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m && m[0]) {
        hit = [m[0], cls];
        break;
      }
    }
    if (!hit) {
      // avanza una palabra completa para no colorear la mitad de un nombre
      const word = /[\w$]+|[^\w$]/y;
      word.lastIndex = i;
      const w = word.exec(code)![0];
      plain += w;
      i += w.length;
      continue;
    }
    if (plain) out.push(plain), (plain = "");
    out.push(
      <span key={i} className={hit[1]}>
        {hit[0]}
      </span>,
    );
    i += hit[0].length;
  }
  if (plain) out.push(plain);
  return out;
}

/**
 * "Hecho con código": a short explanation, the stack, and a dark editor
 * window with real excerpts from the project's source, one tab per file.
 * Each tab has a plain-words caption so non-developers know what they see.
 */
export default function CodeWindow({ block: b }: { block: CodeBlock }) {
  const { t } = useLang();
  const [tab, setTab] = useState(0);
  const file = b.files[tab];
  const lines = file.code.split("\n").length;

  return (
    <section>
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
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
          <FadeUp delay={0.2}>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label={t({ en: "Technologies", es: "Tecnologías" })}>
              {b.stack.map((s) => (
                <li key={s} className="rounded-full border border-ink/20 px-3.5 py-1.5 font-mono text-[12.5px]">
                  {s}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>

      <FadeUp delay={0.1}>
        <figure className="mt-14 overflow-hidden rounded-[16px] bg-[#211a26] text-[#ece4ee] shadow-[0_40px_80px_-40px_rgb(43_34_48/0.6)]">
          {/* barra del editor con una pestaña por archivo */}
          <div className="flex items-center gap-4 border-b border-white/10 px-4 pt-3 sm:px-5">
            <span className="flex shrink-0 gap-1.5 pb-3" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#f2777a]" />
              <span className="h-3 w-3 rounded-full bg-[#f5c27a]" />
              <span className="h-3 w-3 rounded-full bg-[#8fd6a0]" />
            </span>
            <div role="tablist" aria-label={t({ en: "Files", es: "Archivos" })} className="-mb-px flex min-w-0 gap-1 overflow-x-auto">
              {b.files.map((f, i) => (
                <button
                  key={f.label}
                  type="button"
                  role="tab"
                  aria-selected={i === tab}
                  onClick={() => setTab(i)}
                  className={`shrink-0 rounded-t-[8px] border-b-2 px-3 pt-1.5 pb-2.5 font-mono text-[12.5px] transition-colors duration-300 ${
                    i === tab ? "border-sky bg-white/[0.06] text-white" : "border-transparent text-white/50 hover:text-white/80"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              role="tabpanel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <p className="px-4 pt-4 font-mono text-[11.5px] text-white/40 sm:px-5">{file.name}</p>
              <div className="flex overflow-x-auto px-4 pt-3 pb-6 font-mono text-[12.5px] leading-[1.75] sm:px-5 sm:text-[13.5px]">
                <pre className="pr-5 text-right text-white/25 select-none" aria-hidden="true">
                  {Array.from({ length: lines }, (_, i) => i + 1).join("\n")}
                </pre>
                <pre className="min-w-0">
                  <code>{highlight(file.code)}</code>
                </pre>
              </div>
              <figcaption className="border-t border-white/10 bg-white/[0.03] px-4 py-4 text-[15px] leading-relaxed text-white/80 sm:px-5">
                {file.caption}
              </figcaption>
            </motion.div>
          </AnimatePresence>
        </figure>
      </FadeUp>
    </section>
  );
}
