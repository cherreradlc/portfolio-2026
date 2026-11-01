import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Playground from "@/components/playground/Playground";

export const metadata: Metadata = {
  title: "Playground",
  description: "Interactive buttons and animations designed in Figma and built in code, with notes on how each one was made.",
};

export default function PlaygroundPage() {
  return (
    <main className="px-4 pt-32 pb-8 sm:px-9 md:pt-40">
      <Playground />
      <div className="mx-auto mt-28 max-w-7xl md:mt-36">
        <Footer />
      </div>
    </main>
  );
}
