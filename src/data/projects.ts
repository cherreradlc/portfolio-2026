import { FRESCO_CODE, FRESCO_LINEAS } from "./code/fresco";
import { INVITACION_CODE, INVITACION_LINEAS } from "./code/invitacion";
import { DIGITAL_CODE, DIGITAL_LINEAS } from "./code/invitacion-digital";

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
    short: "Propuesta para un negocio real: una app para el celular que reemplaza el cuaderno de un vendedor de paltas y huevos.",
    category: "UX/UI · Producto digital",
    tags: ["UX/UI", "Producto", "Web app"],
    year: "2026",
    live: { href: "https://fresco-demo-five.vercel.app", label: "Probar la app" },
    role: "Investigación, arquitectura de información, diseño de interfaz y desarrollo",
    tools: ["Diseño UI", "Arquitectura de información", "Next.js", "Web app instalable"],
    accent: "violet",
    cover: "/projects/fresco/inicio.jpg",
    coverAlt: "Pantalla de inicio de la app con lo que le deben y lo vendido hoy",
    screens: ["/projects/fresco/inicio.jpg", "/projects/fresco/ingresar.jpg", "/projects/fresco/nuevo-pedido.jpg"],
    intro:
      "Propuesta para un negocio real: un vendedor de paltas, huevos y queso de cabra, por mayor y al detalle, que anota todo en un cuaderno. Diseñé y programé un prototipo funcional para que venda, cobre y sepa cuánto gana desde el celular.",
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
        eyebrow: "Hecho con código",
        title: "Diseñada y programada por mí",
        body: [
          "Fresco no es un prototipo en Figma: es una app que funciona. La programé con Next.js, React y TypeScript, y se instala en el celular como cualquier app.",
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
        type: "code",
        eyebrow: "Hecho con código",
        title: "Diseñada y programada por mí",
        body: [
          "La invitación es un sitio real: los invitados confirman desde el celular y los novios ven las respuestas en su panel. La programé con Next.js y Supabase, una base de datos en la nube.",
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
          { title: "Respuestas ordenadas", body: "Alergias para marcar y canciones de una lista: nada mal escrito." },
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
    slug: "ux4all",
    kind: "diseno",
    title: "UX4ALL — Plataforma educativa accesible",
    short: "Una plataforma de aprendizaje online diseñada desde la accesibilidad, para estudiantes con dislexia, baja visión o que retoman sus estudios.",
    category: "UX Research · Diseño de producto",
    tags: ["UX Research", "Accesibilidad", "Prototipado"],
    year: "2026",
    role: "Investigación UX, arquitectura de información, prototipado y evaluación",
    tools: ["Entrevistas", "Personas", "Journey map", "Benchmarking", "Heurísticas de Nielsen"],
    accent: "violet",
    cover: "/projects/ux4all/pantalla-inicio.jpg",
    coverAlt: "Pantalla de inicio de la app con cursos destacados",
    screens: ["/projects/ux4all/pantalla-inicio.jpg", "/projects/ux4all/pantalla-curso.jpg", "/projects/ux4all/pantalla-inscripcion.jpg"],
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
        type: "gallery",
        eyebrow: "Bocetos",
        title: "Primero en papel: estructura antes que estilo",
        columns: 4,
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
        type: "phones",
        eyebrow: "La interfaz final",
        title: "Del boceto al prototipo de alta fidelidad",
        images: [
          { src: "/projects/ux4all/pantalla-inicio.jpg", alt: "Pantalla de inicio", caption: "Inicio: búsqueda siempre visible, categorías y cursos con duración y nivel." },
          { src: "/projects/ux4all/pantalla-curso.jpg", alt: "Detalle de curso", caption: "Detalle del curso en bloques cortos y escaneables, con un solo botón principal." },
          { src: "/projects/ux4all/pantalla-inscripcion.jpg", alt: "Confirmación de inscripción", caption: "Inscripción con un mensaje claro y una acción grande, fácil de tocar." },
        ],
      },
      {
        type: "image",
        src: "/projects/ux4all/prototipo-flujo.jpg",
        alt: "Flujo completo del prototipo con sus conexiones en Figma",
        caption: "Prototipo navegable en Figma: inicio, detalle, inscripción y comienzo del curso.",
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
    ],
  },
  {
    slug: "invitacion-digital",
    kind: "frontend",
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
        type: "code",
        eyebrow: "Hecho con código",
        title: "Diseñada y programada por mí",
        body: [
          "Detrás del sobre que se abre hay una aplicación completa: los invitados confirman su asistencia y los novios administran la lista desde un panel con contraseña.",
          "La programé para que funcione con dos bases de datos distintas, Supabase en la nube o MySQL en un servidor propio, sin cambiar el resto del código. Estos son fragmentos reales.",
        ],
        stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "MySQL", "Tailwind CSS 4", `${DIGITAL_LINEAS.toLocaleString("es-CL")} líneas de código`],
        files: [
          { label: "Sobre que se abre", name: "src/components/EnvelopeCover.tsx", code: DIGITAL_CODE.sobre, caption: "Los tiempos de la animación del sobre: el sello, la solapa, la tarjeta que sube y el fundido. Las formas de la solapa y el bolsillo se recortan con polígonos." },
          { label: "GuestsRepository", name: "src/lib/db/types.ts", code: DIGITAL_CODE.repo, caption: "Una sola lista de acciones para la base de datos: buscar, responder, agregar, editar y borrar invitados. Así la invitación funciona igual con Supabase o con MySQL." },
          { label: "proxy()", name: "src/proxy.ts", code: DIGITAL_CODE.proxy, caption: "Protege el panel de los novios: si alguien entra sin haber iniciado sesión, lo manda a la pantalla de ingreso." },
          { label: "localSignIn()", name: "src/lib/auth/local-auth.ts", code: DIGITAL_CODE.login, caption: "El ingreso de los novios: la contraseña se compara cifrada (nunca se guarda tal cual) y la sesión queda en una cookie segura por 7 días." },
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
      {
        type: "quote",
        text: "Quedó genial, está muy lindo el diseño. Es justo lo que necesitaba.",
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
