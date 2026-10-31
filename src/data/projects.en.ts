import { FRESCO_CODE, FRESCO_LINEAS } from "./code/fresco";
import { INVITACION_CODE, INVITACION_LINEAS } from "./code/invitacion";
import { DIGITAL_CODE, DIGITAL_LINEAS } from "./code/invitacion-digital";
import type { Project } from "./projects";

/**
 * English edition of PROJECTS. Same slugs, order, images and figures; only
 * the copy differs. Keep both files in step when a project changes.
 */
export const PROJECTS_EN: Project[] = [
  {
    slug: "invitacion-verano",
    kind: "frontend",
    title: "Summer wedding invitation",
    short: "A watercolour invitation that blooms when tapped, with music, guided RSVPs and a dashboard for the couple.",
    category: "UX/UI · Digital product",
    tags: ["UX/UI", "Art direction", "Web"],
    year: "2026",
    role: "Experience design, interface, illustration and art direction",
    tools: ["UI design", "Digital watercolour", "Next.js", "Supabase", "Vercel"],
    accent: "wine",
    cover: "/projects/invitacion-verano/portada.jpg",
    coverAlt: "Invitation cover surrounded by watercolour flowers",
    screens: ["/projects/invitacion-verano/portada.jpg", "/projects/invitacion-verano/flor.jpg", "/projects/invitacion-verano/resumen.jpg"],
    intro:
      "An invitation for a summer wedding: full of flowers, bright colours, and as easy to answer as it is to open.",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "1 tap", label: "to open the flower and step in" },
          { value: "6", label: "common allergies to tick" },
          { value: "100%", label: "designed for phones" },
        ],
      },
      {
        type: "text",
        eyebrow: "The challenge",
        title: "A cheerful invitation that gets good answers",
        body: [
          "The couple wanted something colourful and summery, with the flowers from their reference card. They also wanted tidy answers: on another invitation people misspelled songs and allergies.",
          "So allergies are ticked with a tap, and songs are picked from a list, with title and artist.",
        ],
      },
      {
        type: "video",
        eyebrow: "Walkthrough",
        title: "How a guest uses it",
        body: [
          "They tap the flower and the invitation opens. They add the date to their calendar, check the map and gift list, and RSVP with their allergies and a song.",
          "Names are examples and the venue is blurred.",
        ],
        src: "/projects/invitacion-verano/recorrido.mp4",
        poster: "/projects/invitacion-verano/recorrido-poster.jpg",
        alt: "Video walkthrough of the summer invitation on a phone",
      },
      {
        type: "phones",
        eyebrow: "The invitation",
        title: "From closed bud to RSVP",
        images: [
          { src: "/projects/invitacion-verano/flor.jpg", alt: "Watercolour peony bud", caption: "A peony that blooms when tapped." },
          { src: "/projects/invitacion-verano/portada.jpg", alt: "Cover with names and flowers", caption: "Watercolour flowers everywhere." },
          { src: "/projects/invitacion-verano/fecha.jpg", alt: "Date, calendar and countdown", caption: "One tap adds the date to the calendar." },
          { src: "/projects/invitacion-verano/lugar.jpg", alt: "Ceremony and reception", caption: "Original illustrations for each section." },
          { src: "/projects/invitacion-verano/dresscode.jpg", alt: "Dress code with colours to avoid", caption: "Dress code and colours to avoid." },
          { src: "/projects/invitacion-verano/itinerario.jpg", alt: "Schedule along a leafy branch", caption: "The schedule follows a leafy branch." },
          { src: "/projects/invitacion-verano/regalos.jpg", alt: "Gifts and an adults-only night", caption: "Warm wording, not rules." },
          { src: "/projects/invitacion-verano/alergias.jpg", alt: "Allergies to tick", caption: "Allergies are ticked with a tap." },
          { src: "/projects/invitacion-verano/cancion.jpg", alt: "Song suggestions", caption: "Songs are picked from a list." },
          { src: "/projects/invitacion-verano/resumen.jpg", alt: "RSVP summary", caption: "A summary of the answers at the end." },
        ],
      },
      {
        type: "video",
        eyebrow: "The couple's dashboard",
        title: "Answers, filtered in one tap",
        body: [
          "The couple see who confirmed, who is pending and who can't come. Each box filters the list.",
          "From there they add or fix guests and see what each one answered.",
        ],
        src: "/projects/invitacion-verano/panel.mp4",
        poster: "/projects/invitacion-verano/panel-poster.jpg",
        alt: "Video of the couple's dashboard",
      },
      {
        type: "phones",
        eyebrow: "The dashboard",
        title: "The guest list, in order",
        body: "Here the couple know who is coming and what each guest asked for, without scanning the whole list.",
        images: [
          { src: "/projects/invitacion-verano/admin-resumen.jpg", alt: "Dashboard answer summary", caption: "The summary: each box is a filter." },
          { src: "/projects/invitacion-verano/admin-confirmados.jpg", alt: "Confirmed guests with allergies and song", caption: "Confirmed guests, with allergies and song." },
          { src: "/projects/invitacion-verano/admin-pendientes.jpg", alt: "Pending guests", caption: "Those still to answer." },
        ],
      },
      {
        type: "code",
        eyebrow: "Built with code",
        title: "Designed and built by me",
        body: [
          "The invitation is a real website: guests RSVP from their phone and the couple sees the answers in their dashboard. I built it with Next.js and Supabase, a cloud database.",
          "Behind the watercolours there’s code that looks after the guests: their list can’t be downloaded, the music plays well on iPhone and songs come from a real catalogue. These are real excerpts.",
        ],
        stack: ["Next.js 16", "React 19", "TypeScript", "Supabase (PostgreSQL)", "Tailwind CSS 4", "SVG illustrations", `${INVITACION_LINEAS.toLocaleString("en-US")} lines of code`],
        files: [
          { label: "find_guest_by_name()", name: "supabase/migrations/0006_name_and_first_surname.sql", lang: "sql", code: INVITACION_CODE.buscar, caption: "Finds a guest by first name and first surname, ignoring accents and capitals. It requires the exact start of the name, so nobody can pull the list by typing one letter." },
          { label: "GET /api/canciones", name: "src/app/api/canciones/route.ts", code: INVITACION_CODE.canciones, caption: "As the guest types, it suggests songs from the Apple Music catalogue, without duplicate versions or “(feat. …)”, so the DJ’s list stays clean." },
          { label: "play()", name: "src/components/Musica.tsx", code: INVITACION_CODE.musica, caption: "The music fades in over a second and its volume goes through a compressor, so it also works on iPhone, where the regular volume can’t be changed." },
          { label: "RamaItinerario", name: "src/components/Acuarelas.tsx", code: INVITACION_CODE.rama, caption: "Draws the itinerary branch with curves: it crosses the centre at every heart and grows alternating leaves, larger in the middle of each bend." },
        ],
      },
      {
        type: "list",
        eyebrow: "Design decisions",
        title: "Every detail has a reason",
        items: [
          { title: "Real flowers", body: "The bride's chosen watercolours, in high resolution so they stay sharp." },
          { title: "Tidy answers", body: "Tick-box allergies and songs from a list: nothing misspelled." },
          { title: "Easy to find yourself", body: "A first name and one surname are enough to RSVP." },
          { title: "Music on opening", body: "It plays when the flower is tapped and can be paused any time." },
        ],
      },
      {
        type: "quote",
        text: "The goal: an invitation that feels like summer and is answered in a minute.",
      },
    ],
  },
  {
    slug: "fresco",
    kind: "frontend",
    title: "Fresco — sales app for a small business",
    short: "A phone app that replaces an avocado and egg seller's notebook: orders, payments, stock and finances.",
    category: "UX/UI · Digital product",
    tags: ["UX/UI", "Product", "Web app"],
    year: "2026",
    live: { href: "https://fresco-demo-five.vercel.app", label: "Try the app" },
    role: "Research, information architecture, interface design and development",
    tools: ["UI design", "Information architecture", "Next.js", "Installable web app"],
    accent: "violet",
    cover: "/projects/fresco/inicio.jpg",
    coverAlt: "App home screen with money owed and today's sales",
    screens: ["/projects/fresco/inicio.jpg", "/projects/fresco/finanzas.jpg", "/projects/fresco/nuevo-pedido.jpg"],
    intro:
      "The client sells avocados, eggs and goat cheese, wholesale and retail, and kept everything in a notebook. I designed an app so he can sell, collect and know what he earns from his phone.",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "10 sec", label: "to log an order" },
          { value: "1 tap", label: "to collect on WhatsApp" },
          { value: "0", label: "notebooks" },
        ],
      },
      {
        type: "text",
        eyebrow: "The challenge",
        title: "A business that lives on the street, not in an office",
        body: [
          "The client sells while delivering. With the notebook, orders got lost, credit was forgotten and he didn't know what he earned each month.",
        ],
      },
      {
        type: "video",
        eyebrow: "Walkthrough",
        title: "A working day in the app",
        body: [
          "He logs a wholesale order with partial payment, records a payment and checks how the month is going in finances.",
          "Clients and figures are examples.",
        ],
        src: "/projects/fresco/recorrido.mp4",
        poster: "/projects/fresco/recorrido-poster.jpg",
        alt: "Video walkthrough of the app on a phone",
      },
      {
        type: "phones",
        eyebrow: "Selling and collecting",
        title: "The day's work, one tap away",
        body: "Orders, payments and stock: what was scattered in the notebook, now in one app.",
        images: [
          { src: "/projects/fresco/inicio.jpg", alt: "Home with debts, sales and today's deliveries", caption: "On opening: what he's owed, today's sales and what to deliver." },
          { src: "/projects/fresco/nuevo-pedido.jpg", alt: "New order with wholesale price hint", caption: "Wholesale pricing applies itself, and shows what's missing." },
          { src: "/projects/fresco/pedidos.jpg", alt: "Orders with delivery and payment status", caption: "Each order shows delivery and payment." },
          { src: "/projects/fresco/cobrar.jpg", alt: "Debts list with WhatsApp button", caption: "Who owes, since when, and WhatsApp reminders." },
          { src: "/projects/fresco/cliente.jpg", alt: "Client profile with history", caption: "Each client's profile and history." },
          { src: "/projects/fresco/stock.jpg", alt: "Stock of avocados, eggs and cheese", caption: "Stock goes down with every sale." },
          { src: "/projects/fresco/catalogo.jpg", alt: "Public catalog with WhatsApp ordering", caption: "A page for his clients to order." },
        ],
      },
      {
        type: "phones",
        eyebrow: "Finances",
        title: "Knowing what he earns, without being an accountant",
        body: "Invoices, results and projections in plain words. The SII (tax office) sync is simulated in this prototype.",
        images: [
          { src: "/projects/fresco/finanzas.jpg", alt: "Finance summary with tax office sync", caption: "Invoices to collect and to pay, and the month's profit." },
          { src: "/projects/fresco/facturas.jpg", alt: "Invoices with due dates", caption: "Every invoice with its due date." },
          { src: "/projects/fresco/resultados.jpg", alt: "Income statement and best sellers", caption: "Income statement and best sellers." },
          { src: "/projects/fresco/proyeccion.jpg", alt: "Sales projection chart", caption: "Expected sales, to know how much to buy." },
          { src: "/projects/fresco/libros.jpg", alt: "Accounting books download", caption: "Books for the accountant, in Excel." },
        ],
      },
      {
        type: "code",
        eyebrow: "Built with code",
        title: "Designed and built by me",
        body: [
          "Fresco isn’t a Figma prototype: it’s a working app. I built it with Next.js, React and TypeScript, and it installs on the phone like any other app.",
          "The business rules live in the code: wholesale pricing, who owes and since when, the sales projection and the accountant’s books. These are real excerpts.",
        ],
        stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Installable app (PWA)", `${FRESCO_LINEAS.toLocaleString("en-US")} lines of code`],
        files: [
          { label: "precioPara()", name: "src/lib/tipos.ts", code: FRESCO_CODE.precios, caption: "Wholesale pricing applies only when the client is a wholesaler and reaches the minimum quantity. It also writes units properly: “1 tray”, “3 trays”." },
          { label: "deudores()", name: "src/lib/calculos.ts", code: FRESCO_CODE.deudas, caption: "Adds up what each client owes across delivered orders and sorts them by age, so the oldest debt gets collected first." },
          { label: "proyeccion()", name: "src/lib/finanzas.ts", code: FRESCO_CODE.proyeccion, caption: "Estimates how the month will close at the current pace and projects the next 3 months with a trend line." },
          { label: "libroDiario()", name: "src/lib/finanzas.ts", code: FRESCO_CODE.libro, caption: "Builds the journal for the accountant: every invoice becomes an entry with debit and credit, VAT kept apart." },
        ],
      },
      {
        type: "list",
        eyebrow: "Design decisions",
        title: "Made for one hand and little time",
        items: [
          { title: "Big buttons", body: "Everything works with a thumb, even in a hurry." },
          { title: "Self-explaining status", body: "Delivery and payment shown apart: “Paid $20,000 · owes $14,500”." },
          { title: "Business rules built in", body: "Wholesale price depends on quantity, and the app works it out." },
          { title: "Works offline", body: "Installs like an app and keeps everything on the phone." },
        ],
      },
      {
        type: "quote",
        text: "The goal: the notebook becomes a memory.",
      },
    ],
  },
  {
    slug: "invitacion-digital",
    kind: "frontend",
    title: "Digital wedding invitation",
    short: "An invitation that opens like a real envelope, with RSVPs and a dashboard for the couple.",
    category: "UX/UI · Digital product",
    tags: ["UX/UI", "Art direction", "Web"],
    year: "2026",
    role: "Experience design, interface, illustration and art direction",
    tools: ["UI design", "Vector illustration", "Next.js", "Supabase", "Vercel"],
    accent: "sage",
    cover: "/projects/invitacion/tarjeta.jpg",
    coverAlt: "Sage green envelope open with the invitation card",
    screens: ["/projects/invitacion/tarjeta.jpg", "/projects/invitacion/sobre.jpg", "/projects/invitacion/portada.jpg"],
    intro:
      "An invitation as special as a printed one, that also sorts out the hard part: who's coming, what each guest can't eat and which song they want.",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "60", label: "guests in a single list" },
          { value: "3", label: "possible answers: yes, pending, can't come" },
          { value: "100%", label: "designed for phones" },
        ],
      },
      {
        type: "text",
        eyebrow: "The challenge",
        title: "Delight on opening, order in the answers",
        body: [
          "Digital invitations are often a PDF lost in a chat, with answers scattered across messages. This one delights when opened and keeps every RSVP in one place.",
          "The guest list is private: nobody can see it from the link.",
        ],
      },
      {
        type: "video",
        eyebrow: "Walkthrough",
        title: "How a guest uses it",
        body: [
          "They open the envelope, browse the invitation, check the map and the gift list, and RSVP with their allergies and a song.",
          "Names are examples, and the photo and venues are blurred.",
        ],
        src: "/projects/invitacion/recorrido.mp4",
        poster: "/projects/invitacion/recorrido-poster.jpg",
        alt: "Video walkthrough of the invitation on a phone",
      },
      {
        type: "phones",
        eyebrow: "The invitation",
        title: "From sealed envelope to RSVP",
        images: [
          { src: "/projects/invitacion/sobre.jpg", alt: "Sealed envelope with wax seal", caption: "Tap the seal to open." },
          { src: "/projects/invitacion/tarjeta.jpg", alt: "Card sliding out of the envelope", caption: "The card slides out." },
          { src: "/projects/invitacion/portada.jpg", alt: "Invitation cover", caption: "Custom watercolour illustrations." },
          { src: "/projects/invitacion/fecha.jpg", alt: "Date and countdown", caption: "The date and a countdown." },
          { src: "/projects/invitacion/itinerario.jpg", alt: "Schedule of the day", caption: "The schedule at a glance." },
          { src: "/projects/invitacion/dresscode.jpg", alt: "Dress code with colours to avoid", caption: "Dress code and colours to avoid." },
          { src: "/projects/invitacion/confirmar.jpg", alt: "RSVP form", caption: "Typing your name is all it takes." },
          { src: "/projects/invitacion/confirmar-busqueda.jpg", alt: "Name not found message", caption: "Clear messages when a name isn't found." },
        ],
      },
      {
        type: "video",
        eyebrow: "The couple's dashboard",
        title: "Every answer in one place",
        body: [
          "The couple sign in with their email and see who confirmed, who is pending and who can't come.",
          "From there they add or fix guests and see what each one answered.",
        ],
        src: "/projects/invitacion/panel.mp4",
        poster: "/projects/invitacion/panel-poster.jpg",
        alt: "Video of the couple's dashboard",
      },
      {
        type: "phones",
        eyebrow: "The dashboard",
        title: "The guest list, always up to date",
        body: "Here the couple see who is coming and what each guest asked for, and keep the list tidy without spreadsheets.",
        images: [
          { src: "/projects/invitacion/admin-ingreso.jpg", alt: "Sign-in to the couple's dashboard", caption: "Sign in with email and password." },
          { src: "/projects/invitacion/admin-resumen.jpg", alt: "Answer summary and add-guest field", caption: "A summary of answers and a field to add guests." },
          { src: "/projects/invitacion/admin-respuestas.jpg", alt: "Guest cards with allergies and song", caption: "Each guest with their allergies and song." },
          { src: "/projects/invitacion/admin-editar.jpg", alt: "Editing a guest's name", caption: "Names are fixed right there." },
        ],
      },
      {
        type: "code",
        eyebrow: "Built with code",
        title: "Designed and built by me",
        body: [
          "Behind the opening envelope there’s a complete application: guests RSVP and the couple manages the list from a password-protected dashboard.",
          "I built it to work with two different databases, Supabase in the cloud or MySQL on its own server, without changing the rest of the code. These are real excerpts.",
        ],
        stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "MySQL", "Tailwind CSS 4", `${DIGITAL_LINEAS.toLocaleString("en-US")} lines of code`],
        files: [
          { label: "Opening envelope", name: "src/components/EnvelopeCover.tsx", code: DIGITAL_CODE.sobre, caption: "The timing of the envelope animation: the seal, the flap, the card rising and the fade. The flap and pocket shapes are cut with polygons." },
          { label: "GuestsRepository", name: "src/lib/db/types.ts", code: DIGITAL_CODE.repo, caption: "A single list of database actions: find, respond, add, edit and remove guests. That way the invitation works the same on Supabase or MySQL." },
          { label: "proxy()", name: "src/proxy.ts", code: DIGITAL_CODE.proxy, caption: "Guards the couple’s dashboard: anyone who arrives without signing in is sent to the login screen." },
          { label: "localSignIn()", name: "src/lib/auth/local-auth.ts", code: DIGITAL_CODE.login, caption: "The couple’s sign-in: the password is compared hashed (never stored as is) and the session lives in a secure cookie for 7 days." },
        ],
      },
      {
        type: "list",
        eyebrow: "Design decisions",
        title: "Every detail has a reason",
        items: [
          { title: "Search by name", body: "Each guest can only find themselves. Nobody can see the whole list." },
          { title: "Clear messages", body: "If a surname is missing or the name isn't there, the invitation says so kindly." },
          { title: "Dashboard on the phone", body: "Each guest is an easy-to-read card, with no tables spilling off the screen." },
          { title: "Original illustration", body: "Watercolour eucalyptus branches, each one different." },
        ],
      },
      {
        type: "quote",
        text: "The goal: the couple never had to chase RSVPs on WhatsApp.",
      },
    ],
  },
  {
    slug: "hila",
    kind: "diseno",
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
];
