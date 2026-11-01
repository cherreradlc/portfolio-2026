import type { T } from "@/i18n/lang";

/** Personal details in one place, so links can be filled in later without hunting. */
export const SITE = {
  name: "Consuelo Herrera De La Calle",
  shortName: "Consuelo Herrera",
  role: "UX/UI Designer & Front-end Developer",
  location: "Coquimbo, Chile",
  timezone: "America/Santiago",
  email: "contact.consudesign@gmail.com",
  availability: {
    en: "Open to remote roles · freelance or contractor",
    es: "Disponible en remoto · freelance o contractor",
  } satisfies T,
  // PDF dentro del propio sitio (public/), uno por idioma. El antiguo
  // /cv-consuelo-herrera.pdf queda como copia del inglés, por enlaces viejos.
  cv: { en: "/cv-consuelo-herrera-en.pdf", es: "/cv-consuelo-herrera-es.pdf" } satisfies T,
  linkedin: "https://www.linkedin.com/in/consueloherreradesign/",
};

export const SERVICES: { title: T; body: T; tags: T[] }[] = [
  {
    title: { en: "UX Research", es: "UX Research" },
    body: {
      en: "Interviews, personas, journey maps, benchmarking and heuristic evaluation to understand before designing.",
      es: "Entrevistas, personas, journey maps, benchmarking y evaluación heurística para entender antes de diseñar.",
    },
    tags: [
      { en: "Interviews", es: "Entrevistas" },
      { en: "Personas", es: "Personas" },
      { en: "Journey maps", es: "Journey map" },
      { en: "Heuristics", es: "Heurísticas" },
    ],
  },
  {
    title: { en: "UI Design", es: "Diseño UI" },
    body: {
      en: "Clear, accessible interfaces, from wireframes to high fidelity, built on consistent component systems.",
      es: "Interfaces claras y accesibles, de wireframes a alta fidelidad, con sistemas de componentes consistentes.",
    },
    tags: [
      { en: "Wireframes", es: "Wireframes" },
      { en: "Prototypes", es: "Prototipos" },
      { en: "Design systems", es: "Design systems" },
      { en: "Accessibility", es: "Accesibilidad" },
    ],
  },
  {
    title: { en: "Front-end", es: "Front-end" },
    body: {
      en: "Responsive web apps built with React, Next.js and TypeScript, connected to real data and ready to use.",
      es: "Aplicaciones web responsivas con React, Next.js y TypeScript, conectadas a datos reales y listas para usar.",
    },
    tags: [
      { en: "React", es: "React" },
      { en: "Next.js", es: "Next.js" },
      { en: "TypeScript", es: "TypeScript" },
      { en: "Supabase", es: "Supabase" },
    ],
  },
  {
    title: { en: "Branding", es: "Branding" },
    body: {
      en: "Visual identities with a concept: logo, color, typography and brand guidelines ready to use.",
      es: "Identidades visuales con concepto: logo, color, tipografía y manuales de marca listos para aplicar.",
    },
    tags: [
      { en: "Logo", es: "Logo" },
      { en: "Brand guidelines", es: "Manual de marca" },
      { en: "Packaging", es: "Packaging" },
    ],
  },
];

export const PROCESS: { n: string; title: T; body: T }[] = [
  {
    n: "01",
    title: { en: "Research", es: "Investigar" },
    body: {
      en: "I listen to users and study the context: what they need, what frustrates them, what already exists.",
      es: "Escucho a las personas usuarias y reviso el contexto: qué necesitan, qué les frustra, qué ya existe.",
    },
  },
  {
    n: "02",
    title: { en: "Define", es: "Definir" },
    body: {
      en: "I turn findings into personas, journeys and concrete problems worth solving.",
      es: "Ordeno los hallazgos en personas, journeys y problemas concretos que vale la pena resolver.",
    },
  },
  {
    n: "03",
    title: { en: "Design", es: "Diseñar" },
    body: {
      en: "Sketches, wireframes and prototypes that grow in fidelity as decisions are validated.",
      es: "Bocetos, wireframes y prototipos que crecen en fidelidad a medida que las decisiones se validan.",
    },
  },
  {
    n: "04",
    title: { en: "Validate", es: "Validar" },
    body: {
      en: "I test with users and heuristics, measure, adjust and test again. Design is iteration.",
      es: "Pruebo con usuarios y heurísticas, mido, ajusto y vuelvo a probar. Diseñar es iterar.",
    },
  },
];

export const DESIGN_TOOLS = ["Figma", "Illustrator", "Photoshop", "InDesign"];

export const CODE_TOOLS = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Git", "Vercel"];

export const SKILLS: T[] = [
  { en: "UX Research", es: "UX Research" },
  { en: "Prototyping", es: "Prototipado" },
  { en: "Usability testing", es: "Pruebas de usabilidad" },
  { en: "Design Thinking", es: "Design Thinking" },
  { en: "Accessibility", es: "Accesibilidad" },
  { en: "Branding", es: "Branding" },
];
