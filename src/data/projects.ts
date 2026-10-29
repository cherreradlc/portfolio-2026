/**
 * Every project in the portfolio, in display order. Case-study pages are built
 * from `blocks`, so adding a project is a data change, not a layout change.
 *
 * Figures quoted in the copy come from Consuelo's own deliverables; nothing
 * here is estimated or invented.
 */

export type Accent = "tangerine" | "violet" | "sage" | "wine" | "ink";

/**
 * `maxWidth` caps how wide an image is ever drawn, in CSS pixels, for files
 * whose real detail is lower than their pixel size (e.g. mockups embedded at
 * low resolution inside a larger artboard).
 */
export type Img = { src: string; alt: string; maxWidth?: number };

/**
 * Images are never cropped or enlarged past their real size (see
 * IMAGE_SIZES): a gallery keeps each picture's own proportions, and an
 * optional `feature` image leads it at full width.
 */
export type Block =
  | { type: "text"; eyebrow: string; title: string; body: string[] }
  | { type: "list"; eyebrow: string; title: string; items: { title: string; body: string }[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "gallery"; eyebrow?: string; title?: string; feature?: Img; images: Img[]; columns?: 2 | 3 | 4 }
  | { type: "phones"; eyebrow: string; title: string; body?: string; images: (Img & { caption: string })[] }
  | { type: "quote"; text: string }
  | { type: "video"; eyebrow: string; title: string; body: string[]; src: string; poster: string; alt: string }
  | { type: "manual"; eyebrow: string; title: string; folder: string; pages: number; lowRes?: number[] };

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
  /**
   * Mobile work is shown on phones rather than as a flat picture: `screens`
   * lists the screenshots that go inside the device frames, cover first.
   */
  screens?: string[];
  live?: { href: string; label: string };
  intro: string;
  blocks: Block[];
};

export const PROJECTS: Project[] = [
  {
    slug: "invitacion-verano",
    title: "Invitación de matrimonio de verano",
    short: "Una invitación en acuarela que florece al tocarla, con música, confirmación guiada y un panel para los novios.",
    category: "UX/UI · Producto digital",
    tags: ["UX/UI", "Dirección de arte", "Web"],
    year: "2026",
    role: "Diseño de experiencia, interfaz, ilustración y dirección de arte",
    tools: ["Diseño UI", "Acuarela digital", "Next.js", "Supabase", "Vercel"],
    accent: "wine",
    cover: "/projects/invitacion-verano/portada.jpg",
    coverAlt: "Portada de la invitación rodeada de flores de acuarela",
    screens: ["/projects/invitacion-verano/portada.jpg", "/projects/invitacion-verano/flor.jpg", "/projects/invitacion-verano/resumen.jpg"],
    intro:
      "Una invitación para un matrimonio de verano: llena de flores, con colores vivos, y tan fácil de responder como de abrir.",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "1 toque", label: "para abrir la flor y entrar" },
          { value: "6", label: "alergias comunes para marcar" },
          { value: "100%", label: "pensada para celular" },
        ],
      },
      {
        type: "text",
        eyebrow: "El desafío",
        title: "Una invitación alegre que se responde bien",
        body: [
          "Los novios querían algo colorido y veraniego, con las flores de su tarjeta de referencia. También querían respuestas ordenadas: en otra invitación la gente escribió mal las canciones o las alergias.",
          "Por eso las alergias se marcan con un toque y las canciones se eligen de una lista, con su nombre y su artista.",
        ],
      },
      {
        type: "video",
        eyebrow: "Recorrido",
        title: "Así la usa un invitado",
        body: [
          "Toca la flor y la invitación se abre. Agrega la fecha a su calendario, ve el mapa y la lista de regalos, y confirma con sus alergias y una canción.",
          "Los nombres son de ejemplo y el lugar está difuminado.",
        ],
        src: "/projects/invitacion-verano/recorrido.mp4",
        poster: "/projects/invitacion-verano/recorrido-poster.jpg",
        alt: "Video del recorrido por la invitación de verano en un celular",
      },
      {
        type: "phones",
        eyebrow: "La invitación",
        title: "De la flor cerrada a la confirmación",
        images: [
          { src: "/projects/invitacion-verano/flor.jpg", alt: "Capullo de peonía en acuarela", caption: "Una peonía que florece al tocarla." },
          { src: "/projects/invitacion-verano/portada.jpg", alt: "Portada con los nombres y flores", caption: "Flores de acuarela por todos lados." },
          { src: "/projects/invitacion-verano/fecha.jpg", alt: "Fecha, calendario y cuenta regresiva", caption: "La fecha se agrega al calendario con un toque." },
          { src: "/projects/invitacion-verano/lugar.jpg", alt: "Ceremonia y recepción", caption: "Ilustraciones propias para cada sección." },
          { src: "/projects/invitacion-verano/dresscode.jpg", alt: "Dresscode con colores a evitar", caption: "Dresscode y colores a evitar." },
          { src: "/projects/invitacion-verano/itinerario.jpg", alt: "Itinerario con una rama de hojas", caption: "El itinerario sigue una rama con hojas." },
          { src: "/projects/invitacion-verano/regalos.jpg", alt: "Regalos y noche para adultos", caption: "Textos cercanos, sin sonar a reglas." },
          { src: "/projects/invitacion-verano/alergias.jpg", alt: "Alergias para marcar", caption: "Las alergias se marcan con un toque." },
          { src: "/projects/invitacion-verano/cancion.jpg", alt: "Sugerencias de canciones", caption: "Las canciones se eligen de una lista." },
          { src: "/projects/invitacion-verano/resumen.jpg", alt: "Resumen de la confirmación", caption: "Al final, un resumen de lo respondido." },
        ],
      },
      {
        type: "video",
        eyebrow: "Panel de los novios",
        title: "Las respuestas, filtradas en un toque",
        body: [
          "Los novios ven cuántos confirmaron, quiénes faltan y quiénes no van. Cada cuadro filtra la lista.",
          "Desde ahí agregan o corrigen invitados, y ven lo que respondió cada uno.",
        ],
        src: "/projects/invitacion-verano/panel.mp4",
        poster: "/projects/invitacion-verano/panel-poster.jpg",
        alt: "Video del panel de los novios",
      },
      {
        type: "phones",
        eyebrow: "El panel",
        title: "La lista de invitados, ordenada",
        body: "Aquí los novios saben quién viene y qué pidió cada uno, sin buscar en toda la lista.",
        images: [
          { src: "/projects/invitacion-verano/admin-resumen.jpg", alt: "Resumen de respuestas del panel", caption: "El resumen: cada cuadro es un filtro." },
          { src: "/projects/invitacion-verano/admin-confirmados.jpg", alt: "Lista de confirmados con alergias y canción", caption: "Los confirmados, con sus alergias y su canción." },
          { src: "/projects/invitacion-verano/admin-pendientes.jpg", alt: "Lista de pendientes", caption: "Los que faltan por responder." },
        ],
      },
      {
        type: "list",
        eyebrow: "Decisiones de diseño",
        title: "Cada detalle tiene un porqué",
        items: [
          { title: "Flores reales", body: "Se usaron las acuarelas elegidas por la novia, en alta calidad para que se vean nítidas." },
          { title: "Respuestas ordenadas", body: "Alergias para marcar y canciones de una lista: nada mal escrito." },
          { title: "Fácil de encontrarse", body: "Basta el nombre y un apellido para confirmar." },
          { title: "Música al abrir", body: "Suena al tocar la flor y se puede pausar en cualquier momento." },
        ],
      },
      {
        type: "quote",
        text: "La meta: una invitación que se sienta como el verano y que se responda en un minuto.",
      },
    ],
  },
  {
    slug: "fresco",
    title: "Fresco — app de ventas para un pequeño negocio",
    short: "Una app para el celular que reemplaza el cuaderno de un cliente que vende paltas y huevos: pedidos, cobros, stock y finanzas.",
    category: "UX/UI · Producto digital",
    tags: ["UX/UI", "Producto", "Web app"],
    year: "2026",
    role: "Investigación, arquitectura de información, diseño de interfaz y desarrollo",
    tools: ["Diseño UI", "Arquitectura de información", "Next.js", "Web app instalable"],
    accent: "violet",
    cover: "/projects/fresco/inicio.jpg",
    coverAlt: "Pantalla de inicio de la app con lo que le deben y lo vendido hoy",
    screens: ["/projects/fresco/inicio.jpg", "/projects/fresco/finanzas.jpg", "/projects/fresco/nuevo-pedido.jpg"],
    intro:
      "El cliente vende paltas, huevos y queso de cabra, por mayor y al detalle, y anotaba todo en un cuaderno. Diseñé una app para que venda, cobre y sepa cuánto gana desde el celular.",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "10 seg", label: "para anotar un pedido" },
          { value: "1 toque", label: "para cobrar por WhatsApp" },
          { value: "0", label: "cuadernos" },
        ],
      },
      {
        type: "text",
        eyebrow: "El desafío",
        title: "Un negocio que vive en la calle, no en una oficina",
        body: [
          "El cliente vende mientras reparte. Con el cuaderno se perdían pedidos, los fiados se olvidaban y no sabía cuánto ganaba en el mes.",
        ],
      },
      {
        type: "video",
        eyebrow: "Recorrido",
        title: "Un día de trabajo en la app",
        body: [
          "Anota un pedido mayorista con pago parcial, registra un cobro y revisa cómo va el mes en finanzas.",
          "Los clientes y las cifras son de ejemplo.",
        ],
        src: "/projects/fresco/recorrido.mp4",
        poster: "/projects/fresco/recorrido-poster.jpg",
        alt: "Video del recorrido por la app en un celular",
      },
      {
        type: "phones",
        eyebrow: "Vender y cobrar",
        title: "Lo del día, a un toque",
        body: "Pedidos, cobros y stock: lo que antes estaba repartido en el cuaderno, ahora en una sola app.",
        images: [
          { src: "/projects/fresco/inicio.jpg", alt: "Inicio con deudas, ventas y entregas del día", caption: "Al abrirla: cuánto le deben, lo vendido hoy y qué entregar." },
          { src: "/projects/fresco/nuevo-pedido.jpg", alt: "Nuevo pedido con aviso de precio mayorista", caption: "El precio por mayor se aplica solo, y avisa cuánto falta." },
          { src: "/projects/fresco/pedidos.jpg", alt: "Lista de pedidos con estado de entrega y pago", caption: "Cada pedido dice cómo va la entrega y el pago." },
          { src: "/projects/fresco/cobrar.jpg", alt: "Lista de deudas con botón de WhatsApp", caption: "Quién debe, desde cuándo, y cobro por WhatsApp." },
          { src: "/projects/fresco/cliente.jpg", alt: "Ficha de un cliente con su historial", caption: "La ficha de cada cliente, con su historial." },
          { src: "/projects/fresco/stock.jpg", alt: "Stock de paltas, huevos y queso", caption: "El stock baja solo con cada venta." },
          { src: "/projects/fresco/catalogo.jpg", alt: "Catálogo público con pedido por WhatsApp", caption: "Una página para que sus clientes pidan." },
        ],
      },
      {
        type: "phones",
        eyebrow: "Finanzas",
        title: "Saber cuánto gana, sin ser contador",
        body: "Facturas, resultados y proyecciones en palabras simples. La conexión con el SII está simulada en este prototipo.",
        images: [
          { src: "/projects/fresco/finanzas.jpg", alt: "Resumen de finanzas con sincronización SII", caption: "Facturas por cobrar y por pagar, y la utilidad del mes." },
          { src: "/projects/fresco/facturas.jpg", alt: "Facturas con vencimientos", caption: "Cada factura con su vencimiento." },
          { src: "/projects/fresco/resultados.jpg", alt: "Estado de resultados y productos más vendidos", caption: "Estado de resultados y lo más vendido." },
          { src: "/projects/fresco/proyeccion.jpg", alt: "Gráfico de proyección de ventas", caption: "Cuánto va a vender, para saber cuánto comprar." },
          { src: "/projects/fresco/libros.jpg", alt: "Descarga de libros contables", caption: "Los libros para el contador, en Excel." },
        ],
      },
      {
        type: "list",
        eyebrow: "Decisiones de diseño",
        title: "Pensada para una mano y poco tiempo",
        items: [
          { title: "Botones grandes", body: "Todo se toca con el pulgar, incluso con guantes o apurado." },
          { title: "Estados que se leen solos", body: "Entrega y pago por separado: “Pagó $20.000 · debe $14.500”." },
          { title: "Reglas del negocio adentro", body: "El precio mayorista depende de la cantidad, y la app lo calcula." },
          { title: "Funciona sin señal", body: "Se instala como app y guarda todo en el celular." },
        ],
      },
      {
        type: "quote",
        text: "La meta: que el cuaderno pase a ser un recuerdo.",
      },
    ],
  },
  {
    slug: "invitacion-digital",
    title: "Invitación digital de matrimonio",
    short: "Una invitación que se abre como un sobre real, con confirmación de asistencia y un panel para los novios.",
    category: "UX/UI · Producto digital",
    tags: ["UX/UI", "Dirección de arte", "Web"],
    year: "2026",
    role: "Diseño de experiencia, interfaz, ilustración y dirección de arte",
    tools: ["Diseño UI", "Ilustración vectorial", "Next.js", "Supabase", "Vercel"],
    accent: "sage",
    cover: "/projects/invitacion/tarjeta.jpg",
    coverAlt: "Sobre verde salvia abierto con la tarjeta de la invitación",
    screens: ["/projects/invitacion/tarjeta.jpg", "/projects/invitacion/sobre.jpg", "/projects/invitacion/portada.jpg"],
    intro:
      "Una invitación tan especial como una impresa, que además ordena lo difícil: quién viene, qué no puede comer cada uno y qué canción pide.",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "60", label: "invitados en una sola lista" },
          { value: "3", label: "respuestas posibles: confirma, pendiente, no asiste" },
          { value: "100%", label: "pensada para celular" },
        ],
      },
      {
        type: "text",
        eyebrow: "El desafío",
        title: "Emocionar al abrirla y ordenar las respuestas",
        body: [
          "Las invitaciones digitales suelen ser un PDF que se pierde en el chat, y las respuestas quedan repartidas en mensajes. Esta emociona al abrirla y junta todas las confirmaciones en un solo lugar.",
          "La lista de invitados es privada: nadie la puede ver con el link.",
        ],
      },
      {
        type: "video",
        eyebrow: "Recorrido",
        title: "Así la usa un invitado",
        body: [
          "Abre el sobre, recorre la invitación, ve el mapa y la lista de regalos, y confirma con sus alergias y una canción.",
          "Los nombres son de ejemplo y la foto y los lugares están difuminados.",
        ],
        src: "/projects/invitacion/recorrido.mp4",
        poster: "/projects/invitacion/recorrido-poster.jpg",
        alt: "Video del recorrido por la invitación en un celular",
      },
      {
        type: "phones",
        eyebrow: "La invitación",
        title: "Del sobre cerrado a la confirmación",
        images: [
          { src: "/projects/invitacion/sobre.jpg", alt: "Sobre cerrado con lacre", caption: "Se toca el sello para abrir." },
          { src: "/projects/invitacion/tarjeta.jpg", alt: "Tarjeta saliendo del sobre", caption: "La tarjeta sale del sobre." },
          { src: "/projects/invitacion/portada.jpg", alt: "Portada de la invitación", caption: "Ilustraciones en acuarela hechas a medida." },
          { src: "/projects/invitacion/fecha.jpg", alt: "Fecha y cuenta regresiva", caption: "La fecha y una cuenta regresiva." },
          { src: "/projects/invitacion/itinerario.jpg", alt: "Itinerario del día", caption: "El itinerario de un vistazo." },
          { src: "/projects/invitacion/dresscode.jpg", alt: "Dresscode con colores a evitar", caption: "Dresscode y colores a evitar." },
          { src: "/projects/invitacion/confirmar.jpg", alt: "Formulario de confirmación", caption: "Para confirmar basta escribir el nombre." },
          { src: "/projects/invitacion/confirmar-busqueda.jpg", alt: "Mensaje de nombre no encontrado", caption: "Avisos claros si el nombre no está." },
        ],
      },
      {
        type: "video",
        eyebrow: "Panel de los novios",
        title: "Todas las respuestas en un solo lugar",
        body: [
          "Los novios entran con su correo y ven cuántos confirmaron, quiénes faltan y quiénes no van.",
          "Desde ahí agregan o corrigen invitados, y ven lo que respondió cada uno.",
        ],
        src: "/projects/invitacion/panel.mp4",
        poster: "/projects/invitacion/panel-poster.jpg",
        alt: "Video del panel de los novios",
      },
      {
        type: "phones",
        eyebrow: "El panel",
        title: "La lista de invitados, siempre al día",
        body: "Aquí los novios ven quién viene y qué pidió cada uno, y mantienen la lista ordenada sin planillas.",
        images: [
          { src: "/projects/invitacion/admin-ingreso.jpg", alt: "Ingreso al panel de los novios", caption: "Se entra con correo y contraseña." },
          { src: "/projects/invitacion/admin-resumen.jpg", alt: "Resumen de respuestas y formulario para agregar invitados", caption: "El resumen de respuestas y un campo para agregar invitados." },
          { src: "/projects/invitacion/admin-respuestas.jpg", alt: "Tarjetas de invitados con alergias y canción", caption: "Cada invitado con sus alergias y su canción." },
          { src: "/projects/invitacion/admin-editar.jpg", alt: "Edición del nombre de un invitado", caption: "Los nombres se corrigen ahí mismo." },
        ],
      },
      {
        type: "list",
        eyebrow: "Decisiones de diseño",
        title: "Cada detalle tiene un porqué",
        items: [
          { title: "Búsqueda por nombre", body: "Cada invitado solo se encuentra a sí mismo. Nadie puede ver la lista completa." },
          { title: "Mensajes claros", body: "Si falta un apellido o el nombre no está, la invitación lo dice con amabilidad." },
          { title: "Panel en el celular", body: "Cada invitado es una tarjeta fácil de leer, sin tablas que se salgan de la pantalla." },
          { title: "Ilustración propia", body: "Ramas de eucalipto en acuarela, todas distintas." },
        ],
      },
      {
        type: "quote",
        text: "La meta: que los novios no tuvieran que perseguir confirmaciones por WhatsApp.",
      },
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
      { type: "image", src: "/projects/hila/logo.jpg", alt: "Presentación del logo de Hila" },
      {
        type: "text",
        eyebrow: "Concepto",
        title: "Una fruta que se lee como palabra",
        body: [
          "La rodaja de naranja reemplaza la H y la línea que atraviesa el nombre funciona como un hilo, un guiño al nombre de la marca. El resultado es un isotipo reconocible incluso en tamaños mínimos.",
        ],
      },
      {
        type: "manual",
        eyebrow: "Manual de marca",
        title: "El manual completo, página por página",
        folder: "/projects/hila/manual",
        pages: 37,
        // mockups que vienen a baja resolución dentro del archivo original
        lowRes: [31, 32, 33, 34, 35],
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
    ],
  },
];

export function getProject(slug: string, list: Project[] = PROJECTS) {
  return list.find((p) => p.slug === slug);
}

export function nextProject(slug: string, list: Project[] = PROJECTS) {
  const i = list.findIndex((p) => p.slug === slug);
  return list[(i + 1) % list.length];
}
