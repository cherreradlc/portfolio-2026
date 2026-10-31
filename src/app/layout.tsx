import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Inter_Tight, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import SideTab from "@/components/SideTab";
import { SITE } from "@/data/site";
import { HtmlLang } from "@/i18n/lang";
import "./globals.css";

const inter = Inter_Tight({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// Solo para el nombre en la portada: serif de carácter, redonda y cursiva.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// Monoespaciada para textos de apoyo, etiquetas y metadatos.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // las imágenes para compartir (opengraph-image.png) necesitan la dirección completa
  metadataBase: new URL("https://consueloherreradesign.vercel.app"),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.shortName}`,
  },
  description:
    "Portfolio of Consuelo Herrera De La Calle, UX/UI designer and front-end developer based in Chile. User research, clear interfaces and working web apps built with React and Next.js.",
};

export const viewport: Viewport = {
  themeColor: "#f8f5f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable} ${fraunces.variable} ${plexMono.variable} antialiased`}>
      <body className="grain min-h-dvh overflow-x-clip bg-paper text-ink">
        <HtmlLang />
        <SmoothScroll />
        <Nav />
        <SideTab />
        {children}
      </body>
    </html>
  );
}
