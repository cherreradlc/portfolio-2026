import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
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

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.shortName}`,
  },
  description:
    "Portfolio of Consuelo Herrera De La Calle, graphic and UX/UI designer based in Chile. Branding, UX research and clear, accessible interfaces.",
};

export const viewport: Viewport = {
  themeColor: "#fbf4ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable} ${fraunces.variable} antialiased`}>
      <body className="grain min-h-dvh bg-paper text-ink">
        <HtmlLang />
        <SmoothScroll />
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
