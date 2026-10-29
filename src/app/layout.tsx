import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Inter_Tight, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
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
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.shortName}`,
  },
  description:
    "Portfolio of Consuelo Herrera De La Calle, graphic and UX/UI designer based in Chile. Branding, UX research and clear, accessible interfaces.",
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
        <Cursor />
        <Nav />
        <SideTab />
        {children}
      </body>
    </html>
  );
}
