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
          { name: "English", color: "#4ec994" },
          { name: "Français", color: "#82aaff" },
          { name: "Deutsch", color: "#ffcb6b" },
          { name: "Italiano", color: "#f78c6c" },
          { name: "Português", color: "#4ec994" },
          { name: "Română", color: "#c792ea" },
          { name: "日本語", color: "#f78c6c" },
          { name: "Русский", color: "#82aaff" },
          { name: "中文", color: "#ff5555" },
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
};

export function getInstructionContent(id) {
  return INSTRUCTION_CONTENT[id];
}
