import type { T } from "@/i18n/lang";

/** Personal details in one place, so links can be filled in later without hunting. */
export const SITE = {
  name: "Consuelo Herrera De La Calle",
  shortName: "Consuelo Herrera",
  role: "Graphic & UX/UI Designer",
  location: "Chile",
  timezone: "America/Santiago",
  email: "contact.consudesign@gmail.com",
  availability: {
    en: "Available · on-site or remote · full-time or freelance",
    es: "Disponible · presencial o remoto · full-time o freelance",
  } satisfies T,
  // PDF dentro del propio sitio (public/), así no depende de un enlace externo.
  // El CV es bilingüe: inglés en la página 1 y español en la página 2.
  cv: "/cv-consuelo-herrera.pdf",
  linkedin: "https://www.linkedin.com/in/consuelo-herrera-de-la-calle-43452b19b/",
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
    title: { en: "Branding", es: "Branding" },
    body: {
      en: "Visual identities with a concept: logo, color, typography and brand guidelines ready to use.",
      es: "Identidades visuales con concepto: logo, color, tipografía y manuales de marca listos para aplicar.",
    },
    tags: [
      { en: "Logo", es: "Logo" },
      { en: "Brand guidelines", es: "Manual de marca" },
      { en: "Stationery", es: "Papelería" },
    ],
  },
  {
    title: { en: "Graphic Design", es: "Diseño gráfico" },
    body: {
      en: "Pieces for campaigns, packaging and editorial that communicate fast and look right in any format.",
      es: "Piezas para campañas, packaging y editorial que comunican rápido y se ven bien en cualquier formato.",
    },
    tags: [
      { en: "Campaigns", es: "Campañas" },
      { en: "Packaging", es: "Packaging" },
      { en: "Editorial", es: "Editorial" },
      { en: "Social media", es: "Redes" },
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

export const SOFTWARE = ["Figma", "Illustrator", "Photoshop", "InDesign"];

export const SKILLS: T[] = [
  { en: "UX Research", es: "UX Research" },
  { en: "Prototyping", es: "Prototipado" },
  { en: "Design Thinking", es: "Design Thinking" },
  { en: "Accessibility", es: "Accesibilidad" },
  { en: "Branding", es: "Branding" },
  { en: "HTML & CSS", es: "HTML & CSS" },
];
