import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProjectStack from "@/components/ProjectStack";
import Process from "@/components/Process";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";

const BAND = [
  { en: "UX Research", es: "UX Research" },
  { en: "UI Design", es: "Diseño UI" },
  { en: "Branding", es: "Branding" },
  { en: "Accessibility", es: "Accesibilidad" },
  { en: "Prototyping", es: "Prototipado" },
  { en: "Graphic Design", es: "Diseño gráfico" },
  { en: "Packaging", es: "Packaging" },
  { en: "Design systems", es: "Design systems" },
];

export default function Home() {
  return (
    <main>
      <Hero />

      <section aria-label="Specialties" className="border-y border-line py-3.5">
        <Marquee items={BAND} className="text-[clamp(1rem,1.8vw,1.4rem)] font-medium tracking-[-0.01em]" />
      </section>

      <section id="proyectos" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-28 sm:px-6 md:pt-40">
        <SectionHeader
          index="01"
          eyebrow={{ en: "Selected work", es: "Trabajo seleccionado" }}
          title={{ en: "Projects that show their process", es: "Proyectos que cuentan su proceso" }}
          aside={{
            en: "UX/UI, branding and graphic design cases. Each one shows the problem, the decisions and the outcome.",
            es: "Casos de UX/UI, branding y diseño gráfico. Cada uno muestra el problema, las decisiones y el resultado.",
          }}
        />
        <ProjectStack />
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 md:pt-40">
        <SectionHeader
          index="02"
          eyebrow={{ en: "How I work", es: "Cómo trabajo" }}
          title={{ en: "Design is understanding, testing and testing again", es: "Diseñar es entender, probar y volver a probar" }}
        />
        <Process />
      </section>

      <section id="sobre-mi" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-28 sm:px-6 md:pt-40">
        <SectionHeader
          index="03"
          eyebrow={{ en: "About me", es: "Sobre mí" }}
          title={{ en: "Between graphic and digital", es: "Entre la gráfica y lo digital" }}
        />
        <About />
      </section>

      <section id="servicios" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-28 pb-28 sm:px-6 md:pt-40 md:pb-40">
        <SectionHeader
          index="04"
          eyebrow={{ en: "Services", es: "Servicios" }}
          title={{ en: "How I can help", es: "En qué te puedo ayudar" }}
          aside={{
            en: "For teams looking for an in-house designer, on-site or remote, and for freelance projects.",
            es: "Para equipos que buscan una diseñadora en planta, presencial o remota, y para proyectos freelance.",
          }}
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
