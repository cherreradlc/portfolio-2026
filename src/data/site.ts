import type { T } from "@/i18n/lang";

/** Personal details in one place, so links can be filled in later without hunting. */
export const SITE = {
  name: "Consuelo Herrera De La Calle",
  shortName: "Consuelo Herrera",
  role: "UX/UI Designer who builds with AI",
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
    title: { en: "Front-end with AI", es: "Front-end con IA" },
    body: {
      en: "I turn my designs into working, responsive web apps, built with AI (Claude Code) on React, Next.js and Supabase. I decide what gets built and how it behaves, then review and test it until it works as designed.",
      es: "Llevo mis diseños a aplicaciones web que funcionan, construidas con IA (Claude Code) sobre React, Next.js y Supabase. Yo decido qué se construye y cómo se comporta, y lo reviso y pruebo hasta que funciona como lo diseñé.",
    },
    tags: [
      { en: "Claude Code", es: "Claude Code" },
      { en: "React · Next.js", es: "React · Next.js" },
      { en: "Supabase", es: "Supabase" },
      { en: "Testing", es: "Pruebas" },
    ],
  },
];

export const DESIGN_TOOLS = ["Figma", "Illustrator", "Photoshop", "InDesign"];

export const CODE_TOOLS = ["Claude Code", "React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Git", "Vercel"];

export const SKILLS: T[] = [
  { en: "Prototyping", es: "Prototipado" },
  { en: "Usability testing", es: "Pruebas de usabilidad" },
  { en: "Design Thinking", es: "Design Thinking" },
  { en: "Accessibility", es: "Accesibilidad" },
  { en: "Branding", es: "Branding" },
];
