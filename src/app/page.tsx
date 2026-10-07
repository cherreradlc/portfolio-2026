import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProjectStack from "@/components/ProjectStack";
import Process from "@/components/Process";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { PROJECTS } from "@/data/projects";

const BAND = ["UX Research", "Diseño UI", "Branding", "Accesibilidad", "Prototipado", "Diseño gráfico", "Packaging", "Design systems"];

export default function Home() {
  return (
    <main>
      <Hero />

      <section aria-label="Especialidades" className="border-y border-line py-3.5">
        <Marquee items={BAND} className="text-[clamp(1rem,1.8vw,1.4rem)] font-medium tracking-[-0.01em]" />
      </section>

      <section id="proyectos" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-28 sm:px-6 md:pt-40">
        <SectionHeader
          index="01"
          eyebrow="Trabajo seleccionado"
          title="Proyectos que cuentan su proceso"
          aside="Casos de UX/UI, branding y diseño gráfico. Cada uno muestra el problema, las decisiones y el resultado."
        />
        <ProjectStack projects={PROJECTS} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 md:pt-40">
        <SectionHeader
          index="02"
          eyebrow="Cómo trabajo"
          title="Diseñar es entender, probar y volver a probar"
        />
        <Process />
      </section>

      <section id="sobre-mi" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-28 sm:px-6 md:pt-40">
        <SectionHeader index="03" eyebrow="Sobre mí" title="Entre la gráfica y lo digital" />
        <About />
      </section>

      <section id="servicios" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-28 pb-28 sm:px-6 md:pt-40 md:pb-40">
        <SectionHeader
          index="04"
          eyebrow="Servicios"
          title="En qué te puedo ayudar"
          aside="Para equipos que buscan una diseñadora en planta, presencial o remota, y para proyectos freelance."
        />
        <Services />
      </section>

      <section
        id="contacto"
        className="scroll-mt-0 rounded-t-[36px] bg-brand-deep px-4 pt-24 pb-8 text-paper sm:px-6 md:rounded-t-[56px] md:pt-36"
      >
        <div className="mx-auto max-w-7xl">
          <Contact />
          <div className="mt-24 md:mt-36">
            <Footer />
          </div>
        </div>
      </section>
    </main>
  );
}
