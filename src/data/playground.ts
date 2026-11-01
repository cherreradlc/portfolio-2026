import type { T } from "@/i18n/lang";

/**
 * Playground: small interactive pieces designed in Figma and built in code.
 * They sit loosely in the park; the "i" next to each one opens its Figma
 * screenshots and a short note on how it was made. The live component for
 * each slug lives in components/playground/items.
 */
export type PlayColor = "sun" | "coral" | "pool" | "mint" | "grape" | "bubble";

export type FigmaShot = {
  /** Image in /public/playground/<slug>/ */
  src: string;
  alt: T;
  caption?: T;
};

export type PlayItem = {
  slug: string;
  title: T;
  /** Short note shown under the Figma images. */
  description: T;
  tools: string[];
  /** Screenshots of the Figma file: frames, variants, prototype wiring. */
  shots: FigmaShot[];
  /** Optional link to the Figma file or prototype. */
  figma?: string;
  color: PlayColor;
  /** Tilt of its hand-written name, in degrees. */
  tilt: number;
  /** Takes the whole width of the park (the mini game). */
  wide?: boolean;
};

const item = (slug: string, title: T, description: T, tools: string[], color: PlayColor, tilt: number): PlayItem => ({
  slug,
  title,
  description,
  tools,
  shots: [],
  color,
  tilt,
});

export const PLAYGROUND: PlayItem[] = [
  {
    ...item("carrera", { en: "Run, Consu, run!", es: "¡Corre, Consu, corre!" }, {
      en: "A mini game where a little runner crosses the park: jump over balls and cones with ↑ and duck under kites with ↓. It speeds up as you go and remembers your best score.",
      es: "Un minijuego donde una pequeña corredora cruza el parque: salta pelotas y conos con ↑ y agáchate bajo los volantines con ↓. Acelera a medida que avanzas y recuerda tu mejor puntaje.",
    }, ["Figma", "Canvas 2D", "Game loop", "React"], "sun", -1),
    wide: true,
  },
  item("me-gusta", { en: "Exploding like", es: "Me gusta que explota" }, {
    en: "Liking something should feel like a tiny celebration: the heart fills and beats, six sparks in the park's colours burst out and the count rolls up.",
    es: "Dar un me gusta debería sentirse como una pequeña celebración: el corazón se llena y late, salen seis chispas con los colores del parque y el número sube rodando.",
  }, ["Figma", "Variants", "Smart Animate", "React", "Motion"], "coral", -3),
  item("magnetico", { en: "Magnetic button", es: "Botón magnético" }, {
    en: "The button leans toward your pointer as if it wanted to be pressed, and springs back to its place when you leave.",
    es: "El botón se inclina hacia tu puntero como si quisiera que lo presionaras, y vuelve a su lugar con un resorte cuando te alejas.",
  }, ["Figma", "React", "Motion springs"], "mint", 2),
  item("dia-noche", { en: "Day / night", es: "Día / noche" }, {
    en: "A switch you can read without words: the sun rolls across and turns into the moon, the clouds leave and the stars come out one by one.",
    es: "Un interruptor que se entiende sin palabras: el sol rueda, se convierte en luna, las nubes se van y las estrellas aparecen una a una.",
  }, ["Figma", "Interactive components", "React", "Motion"], "pool", 3),
  item("estrellas", { en: "Star rating", es: "Calificación con estrellas" }, {
    en: "Hovering previews the score; a click fixes it and the stars pop one after another, so choosing feels rewarding.",
    es: "Al pasar el mouse se previsualiza la nota; al hacer clic queda fija y las estrellas saltan una tras otra, para que elegir se sienta como un premio.",
  }, ["Figma", "Variants", "React", "Motion"], "sun", -2),
  item("gelatina", { en: "Jelly button", es: "Botón gelatina" }, {
    en: "Squash and stretch, the oldest animation principle: the button flattens while you press it and wobbles back like jelly when you let go.",
    es: "Aplastar y estirar, el principio de animación más clásico: el botón se aplasta mientras lo presionas y rebota como gelatina al soltarlo.",
  }, ["Figma", "Spring animation", "React", "Motion"], "sun", -2),
  item("volumen", { en: "Volume with a face", es: "Volumen con cara" }, {
    en: "A slider whose track fills with colour while a little face goes from asleep to starry-eyed. Feedback you can read at a glance.",
    es: "Un deslizador cuya barra se llena de color mientras una carita pasa de dormida a ojos de estrella. Una respuesta que se entiende de un vistazo.",
  }, ["Figma", "Native range input", "React", "Motion"], "bubble", 3),
  item("confeti", { en: "Party button", es: "Botón de fiesta" }, {
    en: "Each press throws a handful of confetti in the park's colours that flies up, spins and falls with a little gravity.",
    es: "Cada vez que lo presionas lanza un puñado de confeti con los colores del parque, que sube, gira y cae con un poco de gravedad.",
  }, ["Figma", "React", "Motion keyframes"], "sun", -3),
  item("tarea", { en: "To-do checkbox", es: "Tarea cumplida" }, {
    en: "The tick draws itself, the box turns green and a coral line crosses the task out: three small rewards for one click.",
    es: "El check se dibuja solo, la casilla se pone verde y una línea coral tacha la tarea: tres pequeños premios por un solo clic.",
  }, ["Figma", "SVG path", "React", "Motion"], "mint", 2),
  item("texto-rueda", { en: "Rolling text", es: "Texto que rueda" }, {
    en: "On hover each letter rolls up a moment after the one before, and a coloured copy rolls in from below, like a slot machine.",
    es: "Al pasar el mouse cada letra sube un instante después de la anterior y una copia de color entra desde abajo, como una tragamonedas.",
  }, ["Figma", "Auto layout", "Clip content", "React", "Motion"], "grape", 2),
  item("voltear", { en: "Flip card", es: "Tarjeta que se voltea" }, {
    en: "A card that turns over in 3D with a soft spring to reveal its back, built with perspective and a hidden back face.",
    es: "Una tarjeta que se da vuelta en 3D con un resorte suave para mostrar su reverso, hecha con perspectiva y la cara trasera oculta.",
  }, ["Figma", "CSS 3D", "React", "Motion"], "pool", -3),
  item("segmentado", { en: "Segmented control", es: "Selector segmentado" }, {
    en: "Three options and one yellow pill that slides to the one you choose, so your eye follows the change.",
    es: "Tres opciones y una píldora amarilla que se desliza hasta la que eliges, para que la vista siga el cambio.",
  }, ["Figma", "Shared layout", "React", "Motion"], "sun", 2),
  item("pelota", { en: "Throwable ball", es: "Pelota para lanzar" }, {
    en: "Grab the ball and throw it: it keeps its momentum and bounces off the edges of its box.",
    es: "Toma la pelota y lánzala: conserva el impulso y rebota contra los bordes de su caja.",
  }, ["Figma", "Drag gestures", "React", "Motion"], "coral", -2),
  item("onda", { en: "Ripple button", es: "Botón con ondas" }, {
    en: "Every click drops a coloured wave from exactly where you touched, a playful take on Material's ripple.",
    es: "Cada clic suelta una ola de color justo desde donde tocaste, una versión juguetona del efecto ripple de Material.",
  }, ["Figma", "React", "Motion"], "grape", 3),
  item("copiar", { en: "Copy button", es: "Botón copiar" }, {
    en: "Copies a line to your clipboard and confirms it right away: the icon becomes a check and the button turns green.",
    es: "Copia una frase al portapapeles y lo confirma de inmediato: el ícono se vuelve un check y el botón se pone verde.",
  }, ["Figma", "Clipboard API", "React", "Motion"], "mint", -2),
  item("tooltip", { en: "Bouncy tooltip", es: "Tooltip con rebote" }, {
    en: "A speech bubble springs up on hover or keyboard focus, and it's linked to its button for screen readers.",
    es: "Una burbuja de diálogo salta al pasar el mouse o al llegar con el teclado, y está conectada a su botón para los lectores de pantalla.",
  }, ["Figma", "ARIA", "React", "Motion"], "coral", 2),
  item("descarga", { en: "Download progress", es: "Descarga con progreso" }, {
    en: "The button itself becomes the progress bar: it fills up, counts to 100 and then says it's done.",
    es: "El mismo botón se convierte en la barra de progreso: se llena, cuenta hasta 100 y después avisa que terminó.",
  }, ["Figma", "React", "Motion values"], "pool", -3),
  item("contador", { en: "Rolling stepper", es: "Contador que rueda" }, {
    en: "Plus and minus make the number roll up or down, so the direction of the change is part of the animation.",
    es: "Más y menos hacen que el número ruede hacia arriba o hacia abajo, así la dirección del cambio es parte de la animación.",
  }, ["Figma", "React", "Motion"], "bubble", 2),
  item("validacion", { en: "Email that checks itself", es: "Correo que se revisa solo" }, {
    en: "If the email is wrong the field shakes and says why in plain words; when it's right it turns green with a check.",
    es: "Si el correo está mal, el campo tiembla y explica por qué en palabras simples; cuando está bien se pone verde con un check.",
  }, ["Figma", "Form validation", "ARIA", "React", "Motion"], "coral", -2),
  item("deslizar", { en: "Swipe cards", es: "Tarjetas para deslizar" }, {
    en: "Drag right for yes, left for no. The card tilts as you pull and a stamp tells you which way it will go.",
    es: "Desliza a la derecha para sí y a la izquierda para no. La tarjeta se inclina al tirarla y un sello avisa hacia dónde se irá.",
  }, ["Figma", "Drag gestures", "React", "Motion"], "pool", 3),
  item("letras-huyen", { en: "Shy letters", es: "Letras que huyen" }, {
    en: "Every letter runs away from the pointer on its own spring, and they all come home when you leave.",
    es: "Cada letra huye del puntero con su propio resorte, y todas vuelven a casa cuando te alejas.",
  }, ["Figma", "React", "Motion springs"], "grape", -3),
  item("tarjeta-3d", { en: "3D tilt card", es: "Tarjeta con inclinación 3D" }, {
    en: "The card leans toward the pointer in 3D, its content floats at different depths and a shine follows your hand.",
    es: "La tarjeta se inclina en 3D hacia el puntero, su contenido flota a distintas profundidades y un brillo sigue tu mano.",
  }, ["Figma", "CSS 3D", "React", "Motion"], "bubble", 2),
  item("contrasena", { en: "Password strength", es: "Contraseña con fuerza" }, {
    en: "An eye shows or hides what you type, and a bar fills from red to green as the password gets stronger.",
    es: "Un ojo muestra u oculta lo que escribes, y una barra se llena de rojo a verde a medida que la contraseña se hace más fuerte.",
  }, ["Figma", "Forms", "React", "Motion"], "mint", -2),
  item("columpio", { en: "Swing", es: "Columpio" }, {
    en: "Push it with your pointer and let go: it swings back and forth with real pendulum physics until it settles.",
    es: "Empújalo con el puntero y suéltalo: se balancea de un lado a otro con física de péndulo hasta quedarse quieto.",
  }, ["Figma", "Pan gestures", "Spring physics", "React", "Motion"], "sun", 3),
  item("maquina", { en: "Typewriter", es: "Máquina de escribir" }, {
    en: "Phrases type themselves letter by letter, wait a moment, erase and move on, with a blinking cursor.",
    es: "Las frases se escriben solas letra a letra, esperan un momento, se borran y pasan a la siguiente, con un cursor que parpadea.",
  }, ["Figma", "React timers", "Motion"], "grape", -2),
  item("gooey", { en: "Melting button", es: "Botón que se derrite" }, {
    en: "The colour drains out of the button and drips to the ground, leaving only its empty outline; touch it again and it fills back up. The drips look liquid thanks to an SVG filter that fuses shapes.",
    es: "El color se escurre del botón y cae goteando, hasta que solo queda su contorno vacío; tócalo otra vez y se vuelve a llenar. Las gotas se ven líquidas gracias a un filtro SVG que une las formas.",
  }, ["Figma", "SVG filters", "React", "Motion"], "coral", 2),
  item("carrito", { en: "Add to cart", es: "Agregar al carro" }, {
    en: "The balloon flies in an arc into the cart and the counter jumps, so you see where your product went.",
    es: "El globo vuela en arco hasta el carro y el contador salta, para que veas a dónde fue tu producto.",
  }, ["Figma", "Motion keyframes", "React"], "pool", -3),
  item("burbujas", { en: "Bubbles", es: "Burbujas" }, {
    en: "Bubbles float gently; tap one and it pops into droplets, then a new one grows in its place.",
    es: "Las burbujas flotan suavemente; toca una y revienta en gotitas, y luego crece una nueva en su lugar.",
  }, ["Figma", "React", "Motion"], "bubble", 2),
  item("estela", { en: "Light painting", es: "Dibuja con luz" }, {
    en: "Moving over the dark pad leaves a glowing trail in the park's colours that fades away.",
    es: "Al moverte sobre la pizarra oscura dejas una estela brillante con los colores del parque que se desvanece.",
  }, ["Figma", "Pointer events", "React", "Motion"], "grape", -2),
  item("morph", { en: "Play / pause morph", es: "Play que se transforma" }, {
    en: "The play triangle melts into the pause bars and back. Both icons are drawn with the same points so one can become the other.",
    es: "El triángulo de play se derrite en las barras de pausa y vuelve. Los dos íconos tienen los mismos puntos para que uno se convierta en el otro.",
  }, ["Figma", "SVG paths", "React", "Motion"], "pool", 3),
  item("refrescar", { en: "Pull to refresh", es: "Tira para actualizar" }, {
    en: "Pull the list down: a yo-yo appears, and past the line it swings while the list reloads.",
    es: "Tira la lista hacia abajo: aparece un yoyó y, pasada la línea, se balancea mientras la lista se actualiza.",
  }, ["Figma", "Drag gestures", "React", "Motion values"], "mint", -2),
  item("reordenar", { en: "Reorder list", es: "Lista para ordenar" }, {
    en: "Drag your favourite games into order; the others step aside smoothly to make room.",
    es: "Arrastra tus juegos favoritos para ordenarlos; los demás se corren suavemente para hacer espacio.",
  }, ["Figma", "Reorder", "React", "Motion"], "sun", 2),
  item("esqueleto", { en: "Skeleton loading", es: "Carga con esqueleto" }, {
    en: "While content loads, grey shapes with a passing shine keep its place, so the page doesn't jump when it arrives.",
    es: "Mientras carga el contenido, formas grises con un brillo que pasa guardan su lugar, así la página no salta cuando llega.",
  }, ["Figma", "CSS animation", "React", "Motion"], "coral", -3),
  item("texto-scroll", { en: "Scroll reveal", es: "Texto que despierta" }, {
    en: "Each word lights up as the paragraph scrolls into view, tied to the scroll position instead of a timer.",
    es: "Cada palabra se ilumina a medida que el párrafo entra en pantalla, ligada a la posición del scroll y no a un temporizador.",
  }, ["Figma", "Scroll-linked animation", "React", "Motion"], "pool", 2),
  item("balancin", { en: "Seesaw loader", es: "Balancín que carga" }, {
    en: "A loading indicator that plays: the seesaw rocks and the ball rolls from end to end.",
    es: "Un indicador de carga que juega: el balancín sube y baja y la pelota rueda de un extremo al otro.",
  }, ["Figma", "Motion loops", "React"], "sun", -2),
  item("toast", { en: "Swipeable toasts", es: "Avisos deslizables" }, {
    en: "Notices slide in, stack, leave on their own after a few seconds, and can be swiped away early.",
    es: "Los avisos entran deslizándose, se apilan, se van solos a los pocos segundos y se pueden descartar deslizándolos.",
  }, ["Figma", "Drag gestures", "Layout animation", "React", "Motion"], "mint", 3),
  item("menu",{ en: "Pop-out menu", es: "Menú que se despliega" }, {
    en: "The burger turns into an ✕ and the options pop out one after another, tilted like stickers, then tuck back in reverse order.",
    es: "El ícono ☰ se convierte en ✕ y las opciones aparecen una tras otra, inclinadas como stickers, y se guardan en orden inverso.",
  }, ["Figma", "After delay", "Smart Animate", "React", "Motion"], "bubble", -3),
  item("acordeon", { en: "Accordion", es: "Acordeón" }, {
    en: "The answer slides open with a spring and the plus turns into a minus, so it's clear it can be closed again.",
    es: "La respuesta se abre con un resorte y el más se convierte en menos, para que quede claro que se puede volver a cerrar.",
  }, ["Figma", "React", "Motion"], "sun", 3),
  item("buscar", { en: "Expanding search", es: "Buscador que se estira" }, {
    en: "A round magnifier that stretches into a search field and shrinks back when you leave it empty.",
    es: "Una lupa redonda que se estira hasta convertirse en un buscador y se encoge de nuevo si lo dejas vacío.",
  }, ["Figma", "React", "Motion"], "pool", -2),
];
