import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectsDock from "@/components/ProjectsDock";
import Process from "@/components/Process";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import PlaygroundTeaser from "@/components/playground/PlaygroundTeaser";

export default function Home() {
  return (
    <main>
      <Hero />

      <section id="proyectos" className="scroll-mt-20 px-4 pt-20 pb-28 sm:px-9 md:pt-28 md:pb-36">
        <SectionHeader
          index="01"
          eyebrow={{ en: "Some of my latest work", es: "Algunos de mis trabajos recientes" }}
          meta="2024 — 2026"
        />
        <ProjectGrid />
      </section>

      <section id="jugar" className="scroll-mt-20 px-4 pb-24 sm:px-9 md:pb-32">
        <PlaygroundTeaser />
      </section>


      <section id="sobre-mi" className="scroll-mt-20 px-4 pt-28 pb-24 sm:px-9 md:pt-40 md:pb-36">
        <About />
      </section>

      <section id="servicios" className="scroll-mt-0">
        <Services />
      </section>

      <section className="px-4 pt-28 pb-10 sm:px-9 md:pt-40">
        <SectionHeader index="02" eyebrow={{ en: "How I work", es: "Cómo trabajo" }} meta="Research → Validate" />
        <Process />
      </section>

      <section id="contacto" className="scroll-mt-20 px-4 pt-28 pb-8 sm:px-9 md:pt-40">
        <Contact />
        <div className="mt-24 md:mt-36">
          <Footer />
        </div>
      </section>

      <ProjectsDock />
    </main>
  );
}
