import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import { SITE } from "@/data/site";
import "./globals.css";

// Texto: grotesca neutra y legible.
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

// Titulares: serif de alto contraste, la voz editorial del sitio.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
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
    <html lang="es" className={`${hanken.variable} ${bodoni.variable} antialiased`}>
      <body className="min-h-dvh bg-paper text-ink">
        <SmoothScroll />
        <Nav />
        {children}
      </body>
    </html>
  );
}
