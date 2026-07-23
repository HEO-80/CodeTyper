// src/data/instructionContent.js
// ── Contenido detallado de cada página /instrucciones/[id] ────────────────────

export const INSTRUCTION_CONTENT = {
  "guia-completa": {
    intro:
      "Esta es la guía de CodeTyper: cómo funciona el editor, qué modos y ajustes tienes disponibles, y la ciencia detrás del método de práctica. Explora cualquier tema desde aquí abajo o desde el panel de la derecha.",
    sections: [
      {
        title: "Empieza por aquí",
        content:
          "Si es tu primera vez, entra en 'Cómo funciona CodeTyper' y 'Estadísticas y progreso' para entender el flujo básico de práctica y cómo se guarda tu avance.",
      },
      {
        title: "Personaliza tu práctica",
        content:
          "El modo audio, los sonidos de teclado mecánico y la música de ambiente te dejan adaptar la experiencia a como mejor te concentres.",
      },
      {
        title: "Por qué funciona",
        content:
          "'Lenguajes y colores' y 'Por qué funciona este método' explican la lógica visual y el método de aprendizaje detrás de CodeTyper.",
      },
    ],
  },

  "como-funciona": {
    intro:
      "CodeTyper convierte la práctica de sintaxis en un flujo simple de cuatro pasos: eliges qué escribir, lo escribes carácter a carácter, y ves al instante cómo de bien lo hiciste.",
    sections: [
      {
        title: "Selecciona un lenguaje",
        content:
          "Primero eliges la categoría: Programación, Idiomas o Mentalidad. Dentro de cada categoría eliges el lenguaje concreto — desde JavaScript o Python hasta francés o japonés — y el snippet que quieres practicar.",
      },
      {
        title: "Elige la dificultad",
        content:
          "En Programación la dificultad va de beginner a advanced; en Idiomas se mide por nivel real, de A1 a C2, además de un modo examen. Cada nivel ajusta la longitud y complejidad del snippet.",
      },
      {
        title: "Escribe el código",
        content:
          "Escribe carácter a carácter tal y como aparece en pantalla. Tab indenta igual que en un editor real y Enter salta de línea. Un error no te deja avanzar hasta que lo corriges, así que la precisión importa tanto como la velocidad.",
        code: "function greet(name) {\n\treturn `Hola, ${name}`;\n}",
        codeLang: "javascript",
      },
      {
        title: "Revisa tus resultados",
        content:
          "Al terminar el snippet ves tu CPM (caracteres por minuto), tu precisión y el tiempo total. Si tienes una cuenta, la sesión se guarda automáticamente y tu progreso avanza por fases.",
      },
      {
        title: "¿Atascado en un carácter? Usa Tab",
        content:
          "Si te quedas parado en un carácter que no encuentras en tu teclado, pulsa Tab: da el carácter por escrito y avanza al siguiente, sin marcarlo como error.",
      },
      {
        title: "Acentos que no están en el teclado español",
        content:
          "En los snippets de Idiomas puede aparecer una letra con un acento que el teclado español no tiene (como ä, ö, ø, ç, ř, š, ș o ß). En esos casos no hace falta cambiar de teclado: escribe la misma letra sin el acento y se acepta igual. Los acentos que sí existen en el teclado español (á, é, í, ó, ú, ü, ñ) siguen pidiéndose tal cual, ya que esos sí puedes escribirlos directamente.",
      },
    ],
  },

  "acentos-y-caracteres-especiales": {
    intro:
      "Al practicar Idiomas te vas a encontrar letras que no existen en el teclado español. CodeTyper tiene dos salidas para que eso nunca sea un obstáculo: saltar el carácter con Tab, o escribirlo tal y como se escribiría de verdad desde tu teclado.",
    sections: [
      {
        title: "¿Atascado? Pulsa Tab",
        content:
          "Si no encuentras un símbolo o acento en tu teclado, pulsa Tab: da el carácter por escrito y pasas al siguiente, sin que se cuente como error. Es la salida rápida para cualquier carácter imposible de teclear.",
      },
      {
        title: "Acentos que no están en el teclado español",
        content:
          "Letras como ä, ö, ø, ç, ř, š o ș no se pueden escribir directamente desde un teclado español ni inglés. No hace falta cambiar de teclado ni memorizar combinaciones: escribe la misma letra sin el acento (a, o, o, c, r, s...) y CodeTyper la acepta igual, porque así es como realmente se escribiría con el teclado que tienes.",
      },
      {
        title: "Los acentos que sí tiene el teclado español",
        content:
          "Á, é, í, ó, ú, ü, ñ, ¿ y ¡ se piden tal cual, con su acento — el teclado español los escribe directamente, así que no hay atajo para ellos.",
      },
      {
        title: "La 'ß' alemana no es una 'B'",
        content:
          "En los snippets de alemán aparece una letra con forma parecida a una 'B' minúscula: es la 'ß' (eszett), una letra propia del alfabeto alemán equivalente a una 's' fuerte, sin ninguna relación con la 'B'. No está en el teclado español ni en el inglés — igual que con el resto de acentos, simplemente escribe una 's' normal y se acepta como correcta.",
      },
    ],
  },

  "modo-audio": {
    intro:
      "El modo audio convierte cada snippet en dictado: escuchas la línea antes de escribirla, en el idioma y acento correctos.",
    sections: [
      {
        title: "Activa la voz",
        content:
          "En el editor hay un botón 🔊 VOZ que activa el dictado. Al activarlo, CodeTyper lee en voz alta cada línea justo antes de que la escribas.",
      },
      {
        title: "Repite cuando lo necesites",
        content:
          "Si te pierdes algo, un botón de repetir vuelve a reproducir la línea actual tantas veces como quieras, sin penalizar tu progreso.",
      },
      {
        title: "Compatibilidad de navegador",
        content:
          "El modo audio funciona mejor en Chrome y Edge, que tienen el soporte más completo de síntesis de voz. En otros navegadores puede sonar distinto o no estar disponible.",
      },
      {
        title: "Idiomas con alfabetos distintos",
        content:
          "Japonés, chino y ruso se leen con su pronunciación romanizada, para que puedas seguir el dictado aunque todavía no leas el alfabeto original.",
      },
    ],
  },

  "estadisticas-y-progreso": {
    intro:
      "Puedes usar CodeTyper sin cuenta, pero si inicias sesión con Google o con email, todas tus sesiones de práctica se guardan automáticamente y tu progreso te sigue de dispositivo en dispositivo.",
    sections: [
      {
        title: "Cómo iniciar sesión",
        content:
          "Arriba a la izquierda del Navbar hay un botón con tu foto (o un icono si no tienes cuenta). Al pulsarlo se abre el panel de usuario, desde donde puedes entrar con Google o con email.",
      },
      {
        title: "Qué se guarda",
        content:
          "De cada sesión de práctica se guarda el lenguaje, el snippet, el CPM, la precisión, los errores y la duración — todo lo necesario para calcular tu evolución real, no solo un número suelto.",
      },
      {
        title: "Historial completo",
        content:
          "Todas tus sesiones quedan guardadas en la nube, así que puedes ver tu historial completo desde cualquier dispositivo en el que inicies sesión.",
      },
    ],
  },

  "lenguajes-y-colores": {
    intro:
      "Cada lenguaje tiene un color de acento fijo que se repite en botones, tarjetas y estadísticas — así lo reconoces de un vistazo sin tener que leer la etiqueta.",
    sections: [
      {
        title: "Lenguajes de programación",
        content:
          "Cada lenguaje de la categoría Programación tiene su propio color de acento, consistente en todo CodeTyper.",
        swatches: [
          { name: "JavaScript", color: "#ffcb6b" },
          { name: "TypeScript", color: "#82aaff" },
          { name: "Python", color: "#4ec994" },
          { name: "SQL", color: "#f78c6c" },
          { name: "Solidity", color: "#c792ea" },
          { name: "Java", color: "#ff5555" },
          { name: "C#", color: "#82aaff" },
          { name: "PowerShell", color: "#5391FE" },
          { name: "Bash", color: "#4ec994" },
          { name: "Cloud", color: "#f78c6c" },
        ],
      },
      {
        title: "Idiomas",
        content:
          "Los idiomas de la categoría Idiomas también tienen su propio color, independiente de los lenguajes de programación.",
        swatches: [
          { name: "Inglés", color: "#4ec994" },
          { name: "Francés", color: "#82aaff" },
          { name: "Alemán", color: "#ffcb6b" },
          { name: "Italiano", color: "#f78c6c" },
          { name: "Portugués", color: "#4ec994" },
          { name: "Rumano", color: "#c792ea" },
          { name: "Japonés", color: "#f78c6c" },
          { name: "Ruso", color: "#82aaff" },
          { name: "Chino", color: "#ff5555" },
          { name: "Griego", color: "#89ddff" },
          { name: "Coreano", color: "#ff5555" },
          { name: "Ucraniano", color: "#ffcb6b" },
        ],
      },
      {
        title: "Por qué colores fijos",
        content:
          "Los colores no son decorativos: representan la identidad visual de cada tecnología (el amarillo de JavaScript, el azul de TypeScript...) para que el cerebro asocie forma y significado más rápido.",
      },
    ],
  },

  "memoria-muscular": {
    intro:
      "Escribir código no es solo teclear — es el ejercicio que convierte sintaxis conocida en reflejo automático.",
    sections: [
      {
        title: "Leer activa el córtex visual",
        content:
          "Ver el código resalta patrones y estructuras, pero por sí solo no construye memoria motora — es el primer paso, no el único.",
      },
      {
        title: "Interpretar activa la comprensión",
        content:
          "Reconocer qué hace cada línea obliga al cerebro a procesar la sintaxis en vez de solo reconocerla visualmente, reforzando la comprensión real del lenguaje.",
      },
      {
        title: "Escribir activa la memoria motora",
        content:
          "Teclear carácter a carácter mueve el aprendizaje del córtex visual a la memoria muscular de los dedos — el mismo mecanismo que usan los músicos al practicar escalas.",
      },
      {
        title: "Repetir consolida",
        content:
          "La repetición espaciada convierte patrones que antes exigían pensar (paréntesis, punto y coma, indentación) en automatismo. El syntax highlighting por color ayuda a distinguir tipos de token de un vistazo, y el dictado añade un canal auditivo extra. Con 15–20 minutos diarios, en pocas semanas se nota la diferencia en velocidad y precisión.",
      },
    ],
  },

  "sonido-teclado": {
    intro:
      "El sonido de un teclado mecánico real, sin comprar un teclado mecánico real: activa el feedback sonoro mientras practicas.",
    sections: [
      {
        title: "Keychron K10 Pro — Hall Effect",
        content:
          "Switches magnéticos Hall Effect: silenciosos y muy precisos, pensados para sesiones largas de práctica sin fatiga auditiva.",
      },
      {
        title: "Gateron Jupiter Banana",
        content:
          "Switches táctiles con un bump suave — el favorito de quienes quieren sentir cada pulsación sin el clic sonoro de un switch clicky.",
      },
      {
        title: "Actívalo desde Settings",
        content:
          "El sonido de teclado se activa y se cambia desde el panel de Settings, disponible en cualquier momento durante la práctica.",
      },
      {
        title: "Cada switch, una personalidad",
        content:
          "Más allá de la estética sonora, cada perfil tiene su propio timbre y cadencia — pruébalos y quédate con el que te ayude a mantener el ritmo.",
      },
    ],
  },

  "musica-y-ambiente": {
    intro:
      "Un fondo sonoro adecuado ayuda a entrar en flujo y mantener la concentración durante sesiones largas de práctica.",
    sections: [
      {
        title: "Lo-fi chill",
        content:
          "Un fondo musical suave, sin letra, pensado para no competir con la concentración que exige escribir código.",
      },
      {
        title: "Lluvia suave",
        content:
          "El sonido de lluvia de fondo, como si estuvieras en una cabaña escribiendo código un día de tormenta.",
      },
      {
        title: "Silencio",
        content:
          "Si prefieres practicar sin ningún sonido ambiente, puedes desactivarlo por completo.",
      },
      {
        title: "Cambia cuando quieras",
        content:
          "La música se controla desde el panel de Settings y se puede cambiar en cualquier momento, incluso a mitad de una sesión. También puedes minimizarla y poner tu propia música por encima mientras usas CodeTyper.",
      },
    ],
  },

  "como-funciona-el-panel": {
    intro:
      "El panel lateral izquierdo muestra un resumen de todo tu progreso en tiempo real, sin necesidad de salir de la pantalla en la que estés.",
    sections: [
      {
        title: "CPM y precisión global",
        content:
          "En la parte superior del panel ves la media de CPM y precisión de todas tus sesiones, sin importar el lenguaje.",
      },
      {
        title: "Tiempo total",
        content:
          "También se muestra el tiempo total que has dedicado a practicar, estimado a partir de todos los caracteres que has escrito.",
      },
      {
        title: "Progreso por lenguaje",
        content:
          "Cada lenguaje avanza por su propia fase: Descubrimiento → Aprendizaje → Consolidación → Dominio → Maestría, según tus sesiones, tu CPM y tu precisión en ese lenguaje concreto.",
      },
      {
        title: "Evolución CPM",
        content:
          "Una pequeña gráfica muestra tus últimas sesiones, para que veas de un vistazo si tu velocidad está mejorando o estancada.",
      },
      {
        title: "Detalle por lenguaje",
        content:
          "Pulsa cualquier lenguaje del panel para expandirlo y ver sus estadísticas detalladas: mejor CPM, CPM medio, consistencia, sesiones totales y una recomendación de cuál es tu siguiente paso para subir de fase.",
      },
    ],
  },

  "navegacion-teclado": {
    intro:
      "CodeTyper está diseñado para que puedas practicar sin tocar el ratón en ningún momento. Todo es accesible desde el teclado.",
    sections: [
      {
        title: "Tab — moverse entre secciones",
        content:
          "Presiona Tab para saltar entre las zonas principales de la página (Navbar, panel izquierdo, categorías, lenguajes, dificultades, snippets).",
      },
      {
        title: "Tab dentro del editor — saltar un carácter",
        content:
          "Mientras estás escribiendo un snippet, Tab cambia de función: en vez de moverte por la página, da por escrito el carácter donde estás atascado y pasa al siguiente, sin contar error. Útil para símbolos o acentos que no encuentras en tu teclado.",
      },
      {
        title: "Flechas — navegar dentro de una sección",
        content:
          "Una vez dentro de una sección, usa las flechas arriba/abajo o izquierda/derecha para moverte entre los botones y opciones.",
      },
      {
        title: "Enter — seleccionar",
        content:
          "Pulsa Enter para activar el botón o elemento enfocado, igual que un click.",
      },
      {
        title: "Escape — cerrar paneles",
        content:
          "Cierra el panel de instrucciones, el de usuario o cualquier overlay abierto.",
      },
      {
        title: "Alt + T — abrir terminal",
        content:
          "Atajo directo para abrir la terminal desde cualquier pantalla sin usar el ratón.",
      },
    ],
  },

  "terminal-integrada": {
    intro:
      "CodeTyper incluye una terminal integrada (Alt + T) desde la que puedes moverte, cambiar de lenguaje y lanzar cualquier snippet escribiendo comandos, sin tocar el ratón.",
    sections: [
      {
        title: "help — ver todos los comandos",
        content:
          "Escribe help en cualquier momento para ver la lista completa de comandos disponibles, con su sintaxis exacta.",
      },
      {
        title: "cd <lenguaje> y difficulty <nivel>",
        content:
          "cd javascript cambia el lenguaje activo; difficulty intermediate cambia el nivel. Usa ls para ver qué lenguajes están disponibles.",
      },
      {
        title: "snippets, run <id> y start",
        content:
          "snippets lista los ejercicios disponibles para el lenguaje y nivel actuales; run <id> lanza uno concreto (por ejemplo run js-beg-001); start lanza directamente el primero de la lista.",
      },
      {
        title: "status, whoami y clear",
        content:
          "status muestra el estado completo de tu sesión (lenguaje, nivel, snippets disponibles); whoami un resumen rápido; clear limpia la pantalla de la terminal.",
      },
    ],
  },

  "comentarios-explicativos": {
    intro:
      "Cada snippet se puede practicar de dos formas: solo el código, o con un comentario explicativo en inglés encima de cada línea. Actívalo o desactívalo con el botón 'English comments' del menú, o desde el propio editor mientras practicas.",
    sections: [
      {
        title: "Dónde activarlo",
        content:
          "El botón está arriba del todo en el menú principal, junto al selector de categoría, y también dentro del editor mientras practicas — puedes cambiarlo en cualquier momento sin perder tu progreso en el snippet.",
      },
      {
        title: "Qué añade cada comentario",
        content:
          "Con los comentarios activados, encima de cada línea de código aparece una breve frase en inglés que explica qué hace esa línea concreta — por ejemplo 'Define a function' antes de una función, o 'Initialize the instance' antes de un constructor.",
      },
      {
        title: "Por qué en inglés",
        content:
          "El comentario está en inglés a propósito: así practicas la sintaxis del lenguaje de programación y, de paso, el inglés técnico que te vas a encontrar en documentación, código real y entrevistas.",
      },
      {
        title: "Cuándo conviene cada modo",
        content:
          "Con comentarios activados entiendes el 'por qué' de cada línea mientras aprendes un snippet nuevo; con comentarios desactivados practicas solo el código puro, ideal cuando ya conoces el patrón y quieres centrarte en velocidad y precisión.",
      },
    ],
  },
};

export function getInstructionContent(id) {
  return INSTRUCTION_CONTENT[id];
}
