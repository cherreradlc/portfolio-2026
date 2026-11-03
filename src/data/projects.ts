import { FRESCO_CODE, FRESCO_LINEAS } from "./code/fresco";
import { INVITACION_CODE, INVITACION_LINEAS } from "./code/invitacion";

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
  | { type: "quote"; text: string; author?: string }
  | {
      type: "code";
      eyebrow: string;
      title: string;
      body: string[];
      stack: string[];
      files: { label: string; name: string; code: string; caption: string; lang?: "sql" }[];
    }
  | { type: "video"; eyebrow: string; title: string; body: string[]; src: string; poster: string; alt: string }
  | { type: "manual"; eyebrow: string; title: string; folder: string; pages: number; lowRes?: number[] };

export type Project = {
  slug: string;
  /** Para el filtro del inicio: diseño (marca, gráfica) o front-end (diseñado y programado). */
  kind: "diseno" | "frontend";
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
    slug: "fresco",
    kind: "frontend",
    title: "Fresco — app de ventas para un pequeño negocio",
    short: "Para un negocio real, que ya aceptó el proyecto: una app para el celular que reemplaza el cuaderno de un vendedor de paltas y huevos.",
    category: "UX/UI · Producto digital",
    tags: ["UX/UI", "Producto", "Web app"],
    year: "2026",
    live: { href: "https://fresco-demo-five.vercel.app", label: "Probar la app" },
    role: "Arquitectura de información, diseño de interfaz y desarrollo con IA",
    tools: ["Diseño UI", "Arquitectura de información", "Next.js", "Web app instalable"],
    accent: "violet",
    cover: "/projects/fresco/inicio.jpg",
    coverAlt: "Pantalla de inicio de la app con lo que le deben y lo vendido hoy",
    screens: ["/projects/fresco/inicio.jpg", "/projects/fresco/ingresar.jpg", "/projects/fresco/nuevo-pedido.jpg"],
    intro:
      "Para un negocio real: un vendedor de paltas, huevos y queso de cabra, por mayor y al detalle, que anota todo en un cuaderno. Diseñé un prototipo funcional, construido con IA, para que venda, cobre y sepa cuánto gana desde el celular. El cliente lo aceptó y ahora lo estamos llevando a su negocio.",
    blocks: [
      {
        type: "stats",
        items: [
          { value: "12", label: "pantallas funcionando" },
          { value: "1 toque", label: "para cobrar por WhatsApp" },
          { value: "< 10 s", label: "meta para anotar un pedido" },
        ],
      },
      {
        type: "text",
        eyebrow: "El desafío",
        title: "Un negocio que vive en la calle, no en una oficina",
        body: [
          "Vende mientras reparte. Con el cuaderno se pierden pedidos, los fiados se olvidan y no sabe cuánto gana en el mes.",
        ],
      },
      {
        type: "video",
        eyebrow: "Recorrido",
        title: "Un día de trabajo en la app",
        body: [
          "Entra a la app, anota un pedido mayorista con pago parcial, registra un cobro y revisa cómo va el mes en finanzas.",
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
          { src: "/projects/fresco/ingresar.jpg", alt: "Pantalla de bienvenida con el logo de Fresco y el inicio de sesión", caption: "La bienvenida: el logo, un huevo partido mitad palta, y el ingreso." },
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
        type: "code",
        eyebrow: "Diseño + IA",
        title: "Diseñada por mí, construida con IA",
        body: [
          "Fresco no es un prototipo en Figma: es una app que funciona y se instala en el celular. Yo la diseñé y definí cómo debía comportarse; el código lo construí con IA (Claude Code), revisando y probando cada pantalla hasta que funcionara como la diseñé.",
          "Las reglas del negocio viven en el código: el precio por mayor, quién debe y desde cuándo, la proyección de ventas y los libros para el contador. Estos son fragmentos reales.",
        ],
        stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "App instalable (PWA)", `${FRESCO_LINEAS.toLocaleString("es-CL")} líneas de código`],
        files: [
          { label: "precioPara()", name: "src/lib/tipos.ts", code: FRESCO_CODE.precios, caption: "El precio por mayor se aplica solo si el cliente es mayorista y llega a la cantidad mínima. También escribe bien las unidades: “1 bandeja”, “3 bandejas”." },
          { label: "deudores()", name: "src/lib/calculos.ts", code: FRESCO_CODE.deudas, caption: "Suma lo que debe cada cliente en sus pedidos entregados y los ordena por antigüedad, para cobrar primero la deuda más vieja." },
          { label: "proyeccion()", name: "src/lib/finanzas.ts", code: FRESCO_CODE.proyeccion, caption: "Estima cómo cierra el mes según el ritmo de ventas y proyecta los próximos 3 meses con una línea de tendencia." },
          { label: "libroDiario()", name: "src/lib/finanzas.ts", code: FRESCO_CODE.libro, caption: "Arma el libro diario para el contador: cada factura se convierte en un asiento con debe y haber, con el IVA separado." },
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
    slug: "invitacion-verano",
    kind: "frontend",
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
          { value: "123", label: "invitados con su propia confirmación" },
          { value: "2 días", label: "del primer diseño a publicada" },
          { value: "≈12", label: "respuestas mal escritas en mi invitación anterior: aquí se eligen de una lista" },
        ],
      },
      {
        type: "text",
        eyebrow: "El desafío",
        title: "Una invitación alegre que se responde bien",
        body: [
          "Los novios querían algo colorido y veraniego, con las flores de su tarjeta de referencia. También querían respuestas ordenadas: en una invitación anterior que diseñé, cerca de 12 respuestas llegaron con canciones o alergias mal escritas.",
          "Por eso las alergias se marcan con un toque y las canciones se eligen de una lista, con su nombre y su artista.",
          "A noviembre de 2026, 36 de los 123 invitados ya confirmaron, y los novios ven cada respuesta ordenada en su panel.",
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
        type: "code",
        eyebrow: "Diseño + IA",
        title: "Diseñada por mí, construida con IA",
        body: [
          "La invitación es un sitio real: los invitados confirman desde el celular y los novios ven las respuestas en su panel. Yo diseñé la experiencia y las ilustraciones; el código lo construí con IA (Claude Code) sobre Next.js y Supabase, revisando cada detalle antes de publicarlo.",
          "Detrás de las acuarelas hay código que cuida a los invitados: su lista no se puede descargar, la música suena bien en iPhone y las canciones se eligen de un catálogo real. Estos son fragmentos reales.",
        ],
        stack: ["Next.js 16", "React 19", "TypeScript", "Supabase (PostgreSQL)", "Tailwind CSS 4", "Ilustraciones en SVG", `${INVITACION_LINEAS.toLocaleString("es-CL")} líneas de código`],
        files: [
          { label: "find_guest_by_name()", name: "supabase/migrations/0006_name_and_first_surname.sql", lang: "sql", code: INVITACION_CODE.buscar, caption: "Busca al invitado por su nombre y primer apellido, sin importar tildes ni mayúsculas. Pide el comienzo exacto del nombre, así nadie puede sacar la lista escribiendo una letra." },
          { label: "GET /api/canciones", name: "src/app/api/canciones/route.ts", code: INVITACION_CODE.canciones, caption: "Mientras el invitado escribe, sugiere canciones del catálogo de Apple Music, sin versiones repetidas ni “(feat. …)”, para que la lista del DJ quede limpia." },
          { label: "play()", name: "src/components/Musica.tsx", code: INVITACION_CODE.musica, caption: "La música entra suave, en un segundo, y su volumen se baja con un compresor: así funciona también en iPhone, donde el volumen normal no se puede cambiar." },
          { label: "RamaItinerario", name: "src/components/Acuarelas.tsx", code: INVITACION_CODE.rama, caption: "Dibuja la rama del itinerario con curvas: cruza el centro en cada corazón y le salen hojas alternadas, más grandes en la mitad de cada curva." },
        ],
      },
      {
        type: "list",
        eyebrow: "Decisiones de diseño",
        title: "Cada detalle tiene un porqué",
        items: [
          { title: "Flores reales", body: "Se usaron las acuarelas elegidas por la novia, en alta calidad para que se vean nítidas." },
          { title: "Respuestas ordenadas", body: "Alergias para marcar y canciones de una lista: casi nada se puede escribir mal." },
          { title: "Fácil de encontrarse", body: "Basta el nombre y un apellido para confirmar." },
          { title: "Música al abrir", body: "Suena al tocar la flor y se puede pausar en cualquier momento." },
        ],
      },
      {
        type: "quote",
        text: "La meta: una invitación que se sienta como el verano y que se responda en un minuto.",
      },
      {
        type: "quote",
        text: "Entendiste perfectamente lo que quería. La plataforma es súper fácil de usar. 100% recomendada.",
        author: "Novia",
      },
    ],
  },
  {
    slug: "hila",
    kind: "diseno",
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
