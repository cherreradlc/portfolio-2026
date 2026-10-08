import type { Project } from "./projects";

/**
 * English edition of PROJECTS. Same slugs, order, images and figures; only
 * the copy differs. Keep both files in step when a project changes.
 */
export const PROJECTS_EN: Project[] = [
  {
    slug: "invitacion-digital",
    title: "Digital wedding invitation",
    short: "A wedding invitation that opens like a real envelope and lets the couple manage their guests from their phone.",
    category: "UX/UI · Digital product",
    tags: ["UX/UI", "Art direction", "Web"],
    year: "2026",
    role: "Experience design, interface, illustration and art direction",
    tools: ["UI design", "Vector illustration", "Next.js", "Supabase", "Vercel"],
    accent: "sage",
    cover: "/projects/invitacion/tarjeta.jpg",
    coverAlt: "Sage-green envelope opened with the invitation card",
    screens: ["/projects/invitacion/tarjeta.jpg", "/projects/invitacion/sobre.jpg", "/projects/invitacion/portada.jpg"],
    live: { href: "https://matjavieraydiego.vercel.app", label: "See the live invitation" },
    intro:
      "The couple wanted an invitation that felt as special as a printed one, but that also solved the tedious part: knowing who is coming, what each guest can't eat and which song can't be missed.",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "60", label: "guests managed in a single list" },
          { value: "3", label: "RSVP states: attending, pending, not attending" },
          { value: "100%", label: "designed mobile-first" },
        ],
      },
      {
        type: "text",
        eyebrow: "The challenge",
        title: "Delight on opening, and bring order to everything after",
        body: [
          "A digital invitation is usually a PDF that gets lost in a chat, and RSVPs end up scattered across messages and spreadsheets. The challenge was to design an experience that moved people in the first second while centralizing replies, without asking any guest to do anything difficult.",
          "Privacy mattered too: the guest list could not be exposed to anyone who had the link.",
        ],
      },
      {
        type: "phones",
        eyebrow: "The experience",
        title: "From sealed envelope to RSVP, without friction",
        images: [
          { src: "/projects/invitacion/sobre.jpg", alt: "Sealed envelope with wax seal", caption: "An envelope with an embossed monogram and a wax seal you tap to open." },
          { src: "/projects/invitacion/tarjeta.jpg", alt: "Card rising out of the envelope", caption: "The flap lifts and the card rises: the thrill of opening a letter." },
          { src: "/projects/invitacion/portada.jpg", alt: "Invitation cover", caption: "Custom watercolor illustrations of eucalyptus and roses." },
          { src: "/projects/invitacion/fecha.jpg", alt: "Date and countdown", caption: "The date takes center stage, with a live countdown." },
          { src: "/projects/invitacion/itinerario.jpg", alt: "Schedule of the day", caption: "A zigzag schedule that reads at a glance." },
          { src: "/projects/invitacion/dresscode.jpg", alt: "Dress code with colors to avoid", caption: "Dress code with its own illustration and colors to avoid." },
          { src: "/projects/invitacion/confirmar.jpg", alt: "RSVP form", caption: "RSVPing is just typing your name: no accounts, no passwords." },
          { src: "/projects/invitacion/confirmar-busqueda.jpg", alt: "Name not found message", caption: "Clear messages when a surname is missing or the name isn't on the list." },
        ],
      },
      {
        type: "list",
        eyebrow: "Design decisions",
        title: "Every detail answers a need",
        items: [
          { title: "Exact-name search", body: "Guests can only find themselves by typing their full name. Nobody can browse the list by guessing letters." },
          { title: "Messages that guide", body: "If a surname is missing, the interface asks for it; if the name doesn't exist, it says so without blaming anyone." },
          { title: "A dashboard for the couple", body: "A summary of who's attending and pending, dietary restrictions and song requests per guest. On mobile each guest is a card: no tables spilling off the screen." },
          { title: "Illustration with identity", body: "Eucalyptus leaves generated one by one, each with its own shape, in watercolor with flowers, so no branch repeats." },
        ],
      },
      {
        type: "quote",
        text: "The goal was never just an animated envelope: it was sparing the couple from chasing RSVPs on WhatsApp.",
      },
    ],
  },
  {
    slug: "ux4all",
    title: "UX4ALL — Accessible learning platform",
    short: "An online learning platform designed around accessibility, for students with dyslexia, low vision or returning to their studies.",
    category: "UX Research · Product design",
    tags: ["UX Research", "Accessibility", "Prototyping"],
    year: "2026",
    role: "UX research, information architecture, prototyping and evaluation",
    tools: ["Interviews", "Personas", "Journey map", "Benchmarking", "Nielsen heuristics"],
    accent: "violet",
    cover: "/projects/ux4all/pantalla-inicio.jpg",
    coverAlt: "App home screen with featured courses",
    screens: ["/projects/ux4all/pantalla-inicio.jpg", "/projects/ux4all/pantalla-curso.jpg", "/projects/ux4all/pantalla-inscripcion.jpg"],
    intro:
      "The most widely used learning platforms handle course management well but leave accessibility hidden. UX4ALL starts the other way round: first who is studying and with what abilities, then the interface.",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "3", label: "interviews with real users" },
          { value: "2", label: "personas built from the research" },
          { value: "< 25 s", label: "to find a task in the prototype test" },
        ],
      },
      {
        type: "text",
        eyebrow: "The problem",
        title: "Navigating a learning platform shouldn't be the hard part of studying",
        body: [
          "I interviewed a university student with dyslexia, a student with low vision and an adult returning to study online. All three described the same thing: confusing navigation, too much information on screen and accessibility options that were hard to find.",
          "A benchmark of Moodle, Google Classroom and Canvas confirmed the gap: robust platforms, but overloaded and with a steep learning curve for first-time users.",
        ],
      },
      {
        type: "list",
        eyebrow: "Research",
        title: "What I learned from the users",
        items: [
          { title: "Camila, 21 · dyslexia", body: "Needs scannable content, legible type and unambiguous instructions. Long, unstructured text frustrates her." },
          { title: "Luis, 38 · low vision", body: "Needs high contrast, large buttons and control over text size. Flows with too many steps frustrate him." },
          { title: "Journey: reaching a task", body: "From anticipation at login, to confusion finding the course and overload reading the instructions. Relief only comes on submitting." },
          { title: "Opportunity", body: "A clear dashboard, breadcrumbs, an always-visible accessible mode and progress indicators at every step." },
        ],
      },
      {
        type: "gallery",
        eyebrow: "Sketches",
        title: "Paper first: structure before style",
        columns: 4,
        images: [
          { src: "/projects/ux4all/wireframe-login.jpg", alt: "Sketch of the login screen with an accessible-mode button" },
          { src: "/projects/ux4all/wireframe-dashboard.jpg", alt: "Sketch of the dashboard with courses and pending tasks" },
          { src: "/projects/ux4all/wireframe-curso.jpg", alt: "Sketch of the course view" },
          { src: "/projects/ux4all/wireframe-tarea.jpg", alt: "Sketch of the task view" },
        ],
      },
      {
        type: "text",
        eyebrow: "Prototype and validation",
        title: "Test early so mistakes stay cheap",
        body: [
          "I designed low-fidelity wireframes for the four key views: login with a visible accessible mode, dashboard, course and task. Always-visible labels, large fields and a fixed side menu.",
          "In tests with three users, all of them found their task in under 25 seconds and valued the fixed menu. They also showed that help was hard to spot and that they looked for search at the top: both changes were made.",
        ],
      },
      {
        type: "phones",
        eyebrow: "The final interface",
        title: "From sketch to high-fidelity prototype",
        images: [
          { src: "/projects/ux4all/pantalla-inicio.jpg", alt: "Home screen", caption: "Home: search always visible, categories and courses with duration and level." },
          { src: "/projects/ux4all/pantalla-curso.jpg", alt: "Course detail", caption: "Course detail in short, scannable blocks with a single primary button." },
          { src: "/projects/ux4all/pantalla-inscripcion.jpg", alt: "Enrollment confirmation", caption: "Enrollment with a clear message and a large, easy-to-tap action." },
        ],
      },
      {
        type: "image",
        src: "/projects/ux4all/prototipo-flujo.jpg",
        alt: "Full prototype flow with its connections in Figma",
        caption: "Clickable prototype in Figma: home, detail, enrollment and course start.",
      },
      {
        type: "list",
        eyebrow: "Heuristic evaluation",
        title: "Nielsen's 10 heuristics as a checklist",
        items: [
          { title: "Visibility of system status · medium", body: "A more prominent submission confirmation: success icon, persistent message and a change in button state." },
          { title: "Flexibility and efficiency · medium", body: "Keyboard shortcuts, optimized tab navigation and screen-reader support." },
          { title: "Help and documentation · low", body: "A fixed help button, contextual tooltips and an accessible help center." },
        ],
      },
    ],
  },
  {
    slug: "hila",
    title: "Hila — Brand system",
    short: "Visual identity and brand guidelines for a dried-fruit brand: logo, typefaces, color and applications.",
    category: "Branding · Visual identity",
    tags: ["Branding", "Brand guidelines", "Packaging"],
    year: "2026",
    role: "Logo design, visual system and brand guidelines",
    tools: ["Illustrator", "Photoshop", "Mockups"],
    accent: "tangerine",
    cover: "/projects/hila/portada.jpg",
    coverAlt: "Cover of the Hila brand manual with dried fruit",
    intro:
      "Hila needed an identity that conveyed how natural and handmade the product is without losing freshness. The logo grows out of a slice of dried orange that turns into a letter.",
    blocks: [
      { type: "image", src: "/projects/hila/logo.jpg", alt: "Hila logo presentation" },
      {
        type: "text",
        eyebrow: "Concept",
        title: "A fruit that reads as a word",
        body: [
          "The orange slice replaces the H, and the line running through the name works as a thread — a nod to the brand's name (\"hilo\" means thread in Spanish). The result is a symbol that stays recognizable even at the smallest sizes.",
        ],
      },
      {
        type: "manual",
        eyebrow: "Brand manual",
        title: "The full manual, page by page",
        folder: "/projects/hila/manual",
        pages: 37,
        lowRes: [31, 32, 33, 34, 35],
      },
      {
        type: "list",
        eyebrow: "System",
        title: "A manual so the brand is used well anywhere",
        items: [
          { title: "Construction and clear space", body: "Construction grid, safety areas and minimum sizes for print and screen." },
          { title: "Typography", body: "Nunito Sans as the primary typeface and Rubik for digital media." },
          { title: "Color", body: "Palettes for print and screen, one-color versions, negatives and grayscale." },
          { title: "Correct and incorrect use", body: "Clear examples of what to do and what to avoid when placing the logo over photography." },
        ],
      },
    ],
  },
  {
    slug: "campanas-electorales",
    title: "Visual design for election campaigns",
    short: "Communication materials for regional candidates in Chile, built on consistent, results-driven visual systems.",
    category: "Graphic design · Communication",
    tags: ["Campaigns", "Graphics", "Communication"],
    year: "2024",
    role: "Graphic design for campaign materials",
    tools: ["Photoshop", "Illustrator"],
    accent: "ink",
    cover: "/projects/campana/historia.jpg",
    coverAlt: "Social media story announcing a candidate's radio interview",
    intro:
      "In a campaign, graphics have seconds to work: the name, the ballot number and the message must read on the street, on social media and in print without losing consistency.",
    blocks: [
      {
        type: "gallery",
        columns: 2,
        images: [
          { src: "/projects/campana/historia.jpg", alt: "Vertical social media story with date, outlets and ballot number", maxWidth: 420 },
          { src: "/projects/campana/pieza.jpg", alt: "Horizontal piece with candidates from the same coalition" },
        ],
      },
      {
        type: "list",
        eyebrow: "Approach",
        title: "Hierarchy above all",
        items: [
          { title: "Read in seconds", body: "The ballot number and the name lead the composition; everything else supports them." },
          { title: "A system, not one-off pieces", body: "Consistent colors, typefaces and photography across candidates of the same coalition." },
          { title: "Multi-format", body: "Pieces designed to adapt to social media, print and outdoor." },
        ],
      },
    ],
  },
];
