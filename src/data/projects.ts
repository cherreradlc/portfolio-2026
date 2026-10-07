/**
 * Every project in the portfolio, in display order. Case-study pages are built
 * from `blocks`, so adding a project is a data change, not a layout change.
 *
 * Figures quoted in the copy come from Consuelo's own deliverables; nothing
 * here is estimated or invented.
 */

export type Accent = "tangerine" | "violet" | "sage" | "wine" | "ink";

export type Block =
  | { type: "text"; eyebrow: string; title: string; body: string[] }
  | { type: "list"; eyebrow: string; title: string; items: { title: string; body: string }[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "image"; src: string; alt: string; caption?: string; tone?: "light" | "dark" }
  | { type: "grid"; images: { src: string; alt: string }[]; columns?: 2 | 3 }
  | { type: "phones"; eyebrow: string; title: string; images: { src: string; alt: string; caption: string }[] }
  | { type: "quote"; text: string };

export type Project = {
  slug: string;
  title: string;
  short: string;
  category: string;
  tags: string[];
  year: string;
  role: string;
  tools: string[];
  accent: Accent;
  cover: string;
  coverAlt: string;
  /** Phone-shaped covers get a device frame on the home grid. */
  coverKind?: "image" | "phone";
  live?: { href: string; label: string };
  intro: string;
  blocks: Block[];
};

export const PROJECTS: Project[] = [
  {
    slug: "invitacion-digital",
    title: "Invitación digital Javiera & Diego",
    short: "Una invitación de matrimonio que se abre como un sobre real y deja a los novios gestionar a sus invitados desde el celular.",
    category: "UX/UI · Producto digital",
    tags: ["UX/UI", "Dirección de arte", "Web"],
    year: "2026",
    role: "Diseño de experiencia, interfaz, ilustración y dirección de arte",
    tools: ["Diseño UI", "Ilustración vectorial", "Next.js", "Supabase", "Vercel"],
    accent: "sage",
    cover: "/projects/invitacion/tarjeta.jpg",
    coverAlt: "Sobre verde salvia abierto con la tarjeta Javiera & Diego",
    coverKind: "phone",
    live: { href: "https://matjavieraydiego.vercel.app", label: "Ver invitación en vivo" },
    intro:
      "Los novios querían una invitación que se sintiera tan especial como una impresa, pero que además resolviera lo más tedioso: saber quién viene, qué no puede comer cada invitado y qué canción no puede faltar.",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "60", label: "invitados gestionados en una sola lista" },
          { value: "3", label: "estados de respuesta: confirmado, pendiente, no asiste" },
          { value: "100%", label: "pensada primero para celular" },
        ],
      },
      {
        type: "text",
        eyebrow: "El desafío",
        title: "Emocionar al abrirla y ordenar todo lo que viene después",
        body: [
          "Una invitación digital suele ser un PDF que se pierde en el chat, y las confirmaciones terminan dispersas entre mensajes y planillas. El reto fue diseñar una experiencia que emocionara en el primer segundo y que, al mismo tiempo, centralizara las respuestas sin pedirle nada difícil a ningún invitado.",
          "También había que cuidar la privacidad: la lista de invitados no podía quedar expuesta a quien tuviera el link.",
        ],
      },
      {
        type: "phones",
        eyebrow: "La experiencia",
        title: "Del sobre cerrado a la confirmación, sin fricción",
        images: [
          { src: "/projects/invitacion/sobre.jpg", alt: "Sobre cerrado con lacre", caption: "Un sobre con monograma en bajorrelieve y lacre que se toca para abrir." },
          { src: "/projects/invitacion/tarjeta.jpg", alt: "Tarjeta saliendo del sobre", caption: "La solapa se levanta y la tarjeta sube: la emoción de abrir una carta." },
          { src: "/projects/invitacion/portada.jpg", alt: "Portada de la invitación", caption: "Ilustraciones en acuarela de eucalipto y rosas, hechas a medida." },
          { src: "/projects/invitacion/fecha.jpg", alt: "Fecha y cuenta regresiva", caption: "Fecha protagonista y una cuenta regresiva en vivo." },
          { src: "/projects/invitacion/itinerario.jpg", alt: "Itinerario del día", caption: "Un itinerario en zigzag que se lee de un vistazo." },
          { src: "/projects/invitacion/dresscode.jpg", alt: "Dresscode con colores a evitar", caption: "Dresscode con ilustración propia y colores a evitar." },
          { src: "/projects/invitacion/confirmar.jpg", alt: "Formulario de confirmación", caption: "Confirmar es escribir el nombre: nada de cuentas ni contraseñas." },
          { src: "/projects/invitacion/confirmar-busqueda.jpg", alt: "Mensaje de nombre no encontrado", caption: "Mensajes claros cuando falta un apellido o el nombre no está." },
        ],
      },
      {
        type: "list",
        eyebrow: "Decisiones de diseño",
        title: "Cada detalle responde a una necesidad",
        items: [
          { title: "Búsqueda por nombre exacto", body: "El invitado solo se encuentra a sí mismo escribiendo su nombre completo. Nadie puede recorrer la lista adivinando letras." },
          { title: "Mensajes que orientan", body: "Si falta un apellido, la interfaz lo pide; si el nombre no existe, lo dice sin culpar a nadie." },
          { title: "Panel para los novios", body: "Resumen de confirmados y pendientes, restricciones alimentarias y canciones por invitado. En el celular cada invitado es una tarjeta: nada de tablas que se salen de la pantalla." },
          { title: "Ilustración con identidad", body: "Hojas de eucalipto generadas una por una, con formas distintas, en acuarela y con flores, para que ninguna rama se repita." },
        ],
      },
      {
        type: "quote",
        text: "La meta nunca fue solo un sobre animado: era que los novios no tuvieran que perseguir confirmaciones por WhatsApp.",
      },
    ],
  },
  {
    slug: "ux4all",
    title: "UX4ALL — Plataforma educativa accesible",
    short: "Una plataforma de aprendizaje online diseñada desde la accesibilidad, para estudiantes con dislexia, baja visión o que retoman sus estudios.",
    category: "UX Research · Diseño de producto",
    tags: ["UX Research", "Accesibilidad", "Prototipado"],
    year: "2026",
    role: "Investigación UX, arquitectura de información, prototipado y evaluación",
    tools: ["Entrevistas", "Personas", "Journey map", "Benchmarking", "Heurísticas de Nielsen"],
    accent: "violet",
    cover: "/projects/ux4all/wireframe-dashboard.jpg",
    coverAlt: "Boceto del dashboard de UX4ALL",
    intro:
      "Las plataformas educativas más usadas resuelven la gestión de cursos, pero dejan la accesibilidad escondida. UX4ALL parte al revés: primero quién estudia y con qué capacidades, después la interfaz.",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "3", label: "entrevistas con usuarios reales" },
          { value: "2", label: "personas construidas desde la investigación" },
          { value: "< 25 s", label: "para encontrar una tarea en el test del prototipo" },
        ],
      },
      {
        type: "text",
        eyebrow: "El problema",
        title: "Navegar una plataforma educativa no debería ser la parte difícil de estudiar",
        body: [
          "Entrevisté a una estudiante universitaria con dislexia, a un estudiante con baja visión y a una adulta que retoma sus estudios online. Los tres describieron lo mismo: navegación confusa, exceso de información en pantalla y opciones de accesibilidad difíciles de encontrar.",
          "Un benchmarking de Moodle, Google Classroom y Canvas confirmó la brecha: plataformas robustas, pero sobrecargadas y con una curva de aprendizaje alta para quien llega por primera vez.",
        ],
      },
      {
        type: "list",
        eyebrow: "Investigación",
        title: "Lo que aprendí de las personas usuarias",
        items: [
          { title: "Camila, 21 · dislexia", body: "Necesita contenido escaneable, tipografía legible e instrucciones sin ambigüedad. Le frustran los textos largos sin jerarquía." },
          { title: "Luis, 38 · baja visión", body: "Necesita alto contraste, botones grandes y control del tamaño de texto. Le frustran los flujos con demasiados pasos." },
          { title: "Journey: acceder a una tarea", body: "De la expectativa al ingreso, a la confusión al buscar el curso y la sobrecarga al leer instrucciones. El alivio solo llega al enviar." },
          { title: "Oportunidad", body: "Un dashboard claro, breadcrumbs, un modo accesible siempre visible e indicadores de progreso en cada paso." },
        ],
      },
      {
        type: "grid",
        columns: 2,
        images: [
          { src: "/projects/ux4all/wireframe-login.jpg", alt: "Boceto de inicio de sesión con botón de modo accesible" },
          { src: "/projects/ux4all/wireframe-dashboard.jpg", alt: "Boceto del dashboard con cursos y tareas pendientes" },
          { src: "/projects/ux4all/wireframe-curso.jpg", alt: "Boceto de la vista de curso" },
          { src: "/projects/ux4all/wireframe-tarea.jpg", alt: "Boceto de la vista de tarea" },
        ],
      },
      {
        type: "text",
        eyebrow: "Prototipo y validación",
        title: "Probar temprano para equivocarse barato",
        body: [
          "Diseñé wireframes de baja fidelidad para las cuatro vistas clave: inicio de sesión con modo accesible visible, dashboard, curso y tarea. Etiquetas siempre visibles, campos grandes y un menú lateral fijo.",
          "En pruebas con tres usuarios, todos encontraron su tarea en menos de 25 segundos y valoraron el menú fijo. También detectaron que la ayuda era poco visible y que buscaban el buscador arriba: ambos ajustes se incorporaron.",
        ],
      },
      {
        type: "list",
        eyebrow: "Evaluación heurística",
        title: "Las 10 heurísticas de Nielsen como checklist",
        items: [
          { title: "Visibilidad del estado · media", body: "Confirmación de envío más destacada: ícono de éxito, mensaje persistente y cambio de estado del botón." },
          { title: "Flexibilidad y eficiencia · media", body: "Atajos de teclado, navegación por tab optimizada y compatibilidad con lector de pantalla." },
          { title: "Ayuda y documentación · baja", body: "Botón de ayuda fijo, tooltips contextuales y un centro de ayuda accesible." },
        ],
      },
      { type: "image", src: "/projects/ux4all/prototipo.jpg", alt: "Flujo del prototipo de alta fidelidad de la app de aprendizaje", caption: "Flujo de alta fidelidad: inscripción a un curso de punta a punta." },
    ],
  },
  {
    slug: "hila",
    title: "Hila — Sistema de marca",
    short: "Identidad visual y manual de marca para una marca de fruta deshidratada: logo, tipografías, color y aplicaciones.",
    category: "Branding · Identidad visual",
    tags: ["Branding", "Manual de marca", "Packaging"],
    year: "2026",
    role: "Diseño de logo, sistema visual y manual de marca",
    tools: ["Illustrator", "Photoshop", "Mockups"],
    accent: "tangerine",
    cover: "/projects/hila/portada.jpg",
    coverAlt: "Portada del manual de marca de Hila con frutas deshidratadas",
    intro:
      "Hila necesitaba una identidad que transmitiera lo natural y artesanal del producto sin perder frescura. El logo nace de un gajo de naranja deshidratada que se convierte en letra.",
    blocks: [
      { type: "image", src: "/projects/hila/logo.jpg", alt: "Presentación del logo de Hila", tone: "light" },
      {
        type: "text",
        eyebrow: "Concepto",
        title: "Una fruta que se lee como palabra",
        body: [
          "La rodaja de naranja reemplaza la H y la línea que atraviesa el nombre funciona como un hilo, un guiño al nombre de la marca. El resultado es un isotipo reconocible incluso en tamaños mínimos.",
        ],
      },
      {
        type: "grid",
        columns: 2,
        images: [
          { src: "/projects/hila/construccion.jpg", alt: "Normas de construcción del logo" },
          { src: "/projects/hila/tipografia.jpg", alt: "Tipografía corporativa Nunito Sans" },
          { src: "/projects/hila/colores.jpg", alt: "Paleta de colores corporativos" },
          { src: "/projects/hila/negativo-calido.jpg", alt: "Versiones del logo en negativo sobre colores de marca" },
        ],
      },
      {
        type: "list",
        eyebrow: "Sistema",
        title: "Un manual para que la marca se use bien en cualquier lugar",
        items: [
          { title: "Construcción y márgenes", body: "Retícula de construcción, áreas de seguridad y tamaños mínimos para impresión y pantalla." },
          { title: "Tipografía", body: "Nunito Sans como fuente principal y Rubik para medios digitales." },
          { title: "Color", body: "Paletas para impresión y pantalla, variaciones a un color, negativos y escala de grises." },
          { title: "Usos correctos e incorrectos", body: "Ejemplos claros de qué hacer y qué evitar al aplicar el logo sobre fotografía." },
        ],
      },
      {
        type: "grid",
        columns: 3,
        images: [
          { src: "/projects/hila/tarjetas.jpg", alt: "Mockup de tarjetas de presentación" },
          { src: "/projects/hila/hoja-carta.jpg", alt: "Mockup de hoja carta" },
          { src: "/projects/hila/pendon.jpg", alt: "Mockup de pendón" },
          { src: "/projects/hila/letrero.jpg", alt: "Mockup de letrero" },
          { src: "/projects/hila/furgon.jpg", alt: "Mockup de furgón rotulado" },
          { src: "/projects/hila/cierre.jpg", alt: "Contraportada del manual de marca" },
        ],
      },
    ],
  },
  {
    slug: "etiquetas-de-vino",
    title: "Etiquetas de vino de edición especial",
    short: "Etiquetas personalizadas para celebrar momentos: un Gran Reserva que se convierte en regalo con mensaje propio.",
    category: "Packaging · Diseño editorial",
    tags: ["Packaging", "Editorial", "Ilustración"],
    year: "2026",
    role: "Diseño de etiqueta frontal y contraetiqueta",
    tools: ["Illustrator", "Photoshop"],
    accent: "wine",
    cover: "/projects/vino/frente.jpg",
    coverAlt: "Etiqueta de vino Guillermo Gran Reserva edición 60 años",
    intro:
      "Un vino se transforma en un regalo único cuando la etiqueta cuenta una historia. Diseñé etiquetas de edición especial que mantienen el lenguaje clásico del vino chileno y suman un mensaje personal en la contraetiqueta.",
    blocks: [
      { type: "image", src: "/projects/vino/etiquetas.jpg", alt: "Etiqueta frontal y contraetiqueta", tone: "light" },
      {
        type: "list",
        eyebrow: "Decisiones",
        title: "Clásico por fuera, personal por dentro",
        items: [
          { title: "Lenguaje de bodega", body: "Escudo, serifas clásicas y ornamentos finos para que la botella se sienta auténtica en la mesa." },
          { title: "La historia en la contraetiqueta", body: "Un mensaje de cumpleaños escrito como nota de cata: el sol, la calidez y el nombre como notas del vino." },
          { title: "Paisaje del Valle del Elqui", body: "La ilustración del viñedo ancla el regalo a un lugar real y querido." },
        ],
      },
      {
        type: "grid",
        columns: 2,
        images: [
          { src: "/projects/vino/frente.jpg", alt: "Etiqueta frontal" },
          { src: "/projects/vino/reverso.jpg", alt: "Contraetiqueta con mensaje de cumpleaños" },
        ],
      },
    ],
  },
  {
    slug: "campanas-electorales",
    title: "Desarrollo visual para campañas electorales",
    short: "Piezas de comunicación para candidaturas regionales en Chile, con sistemas visuales consistentes y orientados a resultados.",
    category: "Diseño gráfico · Comunicación",
    tags: ["Campañas", "Gráfica", "Comunicación"],
    year: "2025",
    role: "Diseño de piezas gráficas para campaña",
    tools: ["Photoshop", "Illustrator"],
    accent: "ink",
    cover: "/projects/campana/pieza.jpg",
    coverAlt: "Pieza de campaña electoral regional",
    intro:
      "En una campaña la gráfica tiene segundos para funcionar: el nombre, el número y la propuesta tienen que leerse en la calle, en redes y en impresos sin perder coherencia.",
    blocks: [
      { type: "image", src: "/projects/campana/pieza.jpg", alt: "Pieza gráfica de campaña con candidatos y números de votación" },
      {
        type: "list",
        eyebrow: "Enfoque",
        title: "Jerarquía antes que todo",
        items: [
          { title: "Lectura en segundos", body: "El número de votación y el nombre dominan la composición; el resto acompaña." },
          { title: "Sistema, no piezas sueltas", body: "Colores, tipografías y fotografía consistentes entre candidaturas de un mismo pacto." },
          { title: "Multiformato", body: "Piezas pensadas para adaptarse a redes sociales, impresos y vía pública." },
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}
