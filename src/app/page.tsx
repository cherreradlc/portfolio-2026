import Hero from "@/components/Hero";
import ProjectIndex from "@/components/ProjectIndex";
import Process from "@/components/Process";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { PROJECTS } from "@/data/projects";

export default function Home() {
  return (
    <main>
      <Hero />

      <section id="proyectos" className="scroll-mt-20 px-4 pt-28 sm:px-8 md:pt-40">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeader
            index="01"
            eyebrow="Proyectos"
            title="Trabajo seleccionado"
            aside="Casos de UX/UI, branding y diseño gráfico. Cada uno cuenta el problema, las decisiones y el resultado."
          />
          <ProjectIndex projects={PROJECTS} />
        </div>
      </section>

      <section id="sobre-mi" className="scroll-mt-20 px-4 pt-28 sm:px-8 md:pt-40">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeader index="02" eyebrow="Sobre mí" title="Entre la gráfica y lo digital" />
          <About />
        </div>
      </section>

      <section className="px-4 pt-28 pb-28 sm:px-8 md:pt-40 md:pb-40">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeader index="03" eyebrow="Proceso" title="Cómo trabajo" />
          <Process />
        </div>
      </section>

      <section id="servicios" className="scroll-mt-0 bg-brand px-4 py-24 text-paper sm:px-8 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeader
            dark
            index="04"
            eyebrow="Servicios"
            title="En qué puedo aportar"
            aside="Para equipos que buscan una diseñadora en planta, presencial o remota, y para proyectos freelance."
          />
          <Services />
        </div>
      </section>

      <section id="contacto" className="scroll-mt-0 bg-brand-deep px-4 pt-24 pb-8 text-paper sm:px-8 md:pt-36">
        <div className="mx-auto max-w-[1400px]">
          <Contact />
          <div className="mt-24 md:mt-36">
            <Footer />
          </div>
        </div>
      </section>
    </main>
  );
}
