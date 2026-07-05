// src/data/instructions.js
// ── Contenido del panel de instrucciones ───────────────────────────────────────

export const INSTRUCTION_CARDS = [
  {
    id: "guia-completa",
    title: "Guía completa de CodeTyper",
    description: "Un resumen general de la app y acceso directo a todas las guías",
    color: "#89ddff",
    icon: "🧭",
    isIndex: true,
  },
  {
    id: "como-funciona",
    title: "Cómo funciona CodeTyper",
    description: "Aprende a usar el editor, navegar por niveles y guardar tu progreso",
    color: "#82aaff",
    icon: "⌨",
    content: [
      "CodeTyper valida cada pulsación en tiempo real contra el código del snippet. Un carácter correcto avanza el cursor; uno incorrecto se marca como error sin dejarte avanzar hasta corregirlo.",
      "Elige categoría (Programación, Idiomas, Mentalidad), lenguaje y dificultad desde el menú principal antes de empezar.",
      "Al terminar un snippet ves tus resultados: CPM, precisión y errores. Si estás logueado, la sesión se guarda automáticamente y tu progreso avanza por niveles.",
    ],
  },
  {
    id: "modo-audio",
    title: "Modo audio y dictado",
    description: "Activa la voz para que te lea cada línea antes de escribirla. Incluye botón de repetir",
    color: "#4ec994",
    icon: "🔊",
    content: [
      "El modo audio usa la síntesis de voz del navegador para leer en voz alta el contenido del snippet, con el acento correcto para cada idioma.",
      "Es especialmente útil en la categoría Idiomas: escuchas la pronunciación real mientras practicas la escritura, reforzando oído y dedos a la vez.",
      "Usa el botón de repetir para volver a escuchar la línea tantas veces como necesites antes de escribirla.",
    ],
  },
  {
    id: "estadisticas-y-progreso",
    title: "Estadísticas y progreso",
    description: "Inicia sesión para guardar tu progreso. El panel izquierdo muestra tu evolución por lenguaje",
    color: "#ffcb6b",
    icon: "📊",
  },
  {
    id: "lenguajes-y-colores",
    title: "Lenguajes y colores",
    description: "Qué significa cada color y qué lenguajes de programación e idiomas puedes practicar",
    color: "#ffcb6b",
    icon: "🎨",
    content: [
      "Cada lenguaje tiene un color de acento propio que se repite en botones, tarjetas y estadísticas, para que lo identifiques de un vistazo.",
      "En Programación: JavaScript, TypeScript, Python, SQL, Solidity, Java, C#, PowerShell, Bash y Cloud.",
      "En Idiomas: inglés, francés, alemán, portugués, rumano, italiano y japonés, organizados por nivel de A1 a C2 y exámenes.",
    ],
  },
  {
    id: "memoria-muscular",
    title: "Por qué funciona este método",
    description: "Leer, interpretar, escribir y repetir. Así es como el cerebro aprende sintaxis de verdad",
    color: "#c792ea",
    icon: "🧠",
    content: [
      "Leer código no es lo mismo que poder escribirlo de memoria. Teclear carácter a carácter obliga al cerebro a procesar la sintaxis, no solo reconocerla.",
      "La repetición espaciada convierte patrones que antes requerían pensar (paréntesis, punto y coma, indentación) en memoria muscular automática.",
      "Por eso el progreso se mide en fases: cada fase representa un nivel real de automatización, no solo de sesiones completadas.",
    ],
  },
  {
    id: "sonido-teclado",
    title: "Sonidos de teclado mecánico",
    description: "Switches Hall Effect, Keychron, Gateron Jupiter Banana. Activa el sonido que más te guste",
    color: "#f78c6c",
    icon: "🎹",
    content: [
      "Cada pulsación puede reproducir el sonido de un switch mecánico real, para que teclear en CodeTyper se sienta como en tu teclado favorito.",
      "Elige entre varios perfiles de switch, incluidos Hall Effect, Keychron y Gateron Jupiter Banana, desde los ajustes de sonido.",
      "Puedes desactivarlo en cualquier momento si prefieres practicar en silencio.",
    ],
  },
  {
    id: "musica-y-ambiente",
    title: "Música y sonido ambiente",
    description: "Música de fondo, lluvia, ambiente. Pon la tuya o elige entre las disponibles",
    color: "#ff5555",
    icon: "🎵",
    content: [
      "Practicar con un fondo sonoro ayuda a mantener el ritmo y la concentración durante sesiones largas.",
      "Elige entre las pistas de ambiente disponibles (lluvia, música de fondo) o activa tu propia música mientras escribes.",
      "El volumen de la música es independiente del de los sonidos de teclado, así que puedes ajustar cada uno a tu gusto.",
    ],
  },
  {
    id: "como-funciona-el-panel",
    title: "Panel de estadísticas",
    description: "CPM, precisión, fases de aprendizaje y evolución. Pulsa cada lenguaje para ver el detalle",
    color: "#82aaff",
    icon: "📈",
  },
  {
    id: "navegacion-teclado",
    title: "Navegación por teclado",
    description: "Toda la app se puede manejar sin ratón. Tab para moverte, flechas para navegar, Enter para seleccionar",
    color: "#c792ea",
    icon: "⌨",
  },
  {
    id: "terminal-integrada",
    title: "Terminal integrada",
    description: "Accede directamente a cualquier snippet escribiendo el lenguaje, nivel y nombre. Escribe help para ver los comandos",
    color: "#4ec994",
    icon: "$",
  },
];

export function getInstructionCard(id) {
  return INSTRUCTION_CARDS.find((c) => c.id === id);
}
