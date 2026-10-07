import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import { SITE } from "@/data/site";
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

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.shortName}`,
  },
  description:
    "Portafolio de Consuelo Herrera De La Calle, diseñadora gráfica y UX/UI en Chile. Branding, investigación UX e interfaces claras y accesibles.",
};

export const viewport: Viewport = {
  themeColor: "#fbf4ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} ${instrument.variable} ${fraunces.variable} antialiased`}>
      <body className="grain min-h-dvh bg-paper text-ink">
        <SmoothScroll />
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
