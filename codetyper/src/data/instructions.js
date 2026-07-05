// src/data/instructions.js
// ── Contenido del panel de instrucciones ───────────────────────────────────────

export const INSTRUCTIONS = [
  {
    slug: "como-funciona",
    title: "Cómo funciona",
    description: "El bucle básico: elige un snippet, escríbelo carácter a carácter.",
    color: "blue",
    content: [
      "CodeTyper valida cada pulsación en tiempo real contra el código del snippet. Un carácter correcto avanza el cursor; uno incorrecto se marca como error sin dejarte avanzar hasta corregirlo.",
      "Al terminar un snippet ves tus resultados: CPM (caracteres por minuto), precisión y errores totales. Si estás logueado, la sesión se guarda automáticamente en tu progreso.",
      "Elige categoría (Programación, Idiomas, Mentalidad), lenguaje y dificultad desde el menú principal antes de empezar.",
    ],
  },
  {
    slug: "modo-audio",
    title: "Modo audio",
    description: "Escucha el código o el texto antes de escribirlo, con voz nativa.",
    color: "green",
    content: [
      "El modo audio usa la síntesis de voz del navegador para leer en voz alta el contenido del snippet, con el acento correcto para cada idioma (inglés, alemán, francés, italiano, portugués, rumano, japonés).",
      "Es especialmente útil en la categoría Idiomas: escuchas la pronunciación real mientras practicas la escritura, reforzando oído y dedos a la vez.",
      "Actívalo desde el botón de audio de la pantalla de práctica; puedes repetir la reproducción tantas veces como quieras antes de empezar a escribir.",
    ],
  },
  {
    slug: "atajos-teclado",
    title: "Atajos de teclado",
    description: "Navega todo el menú sin soltar el teclado.",
    color: "purple",
    content: [
      "Las flechas del teclado mueven la selección entre categoría, lenguaje, dificultad y snippets, siguiendo el orden visual de la pantalla.",
      "Alt + T abre y cierra la terminal overlay desde cualquier pantalla, sin perder tu progreso actual.",
      "Enter o Espacio confirman la tarjeta o botón seleccionado, igual que un click.",
    ],
  },
  {
    slug: "progreso-niveles",
    title: "Progreso y niveles",
    description: "Cada lenguaje avanza por fases según tu velocidad y precisión.",
    color: "yellow",
    content: [
      "Tu dominio de cada lenguaje se mide en fases: Descubrimiento, Aprendizaje, Consolidación, Dominio y Maestría. Cada fase requiere más sesiones, más CPM promedio y más precisión que la anterior.",
      "El panel de usuario (arriba a la izquierda) muestra tu fase actual por lenguaje, la evolución de tu CPM y cuánto te falta para subir de fase.",
      "Necesitas una cuenta para que tu progreso se guarde entre sesiones — puedes registrarte con email o con Google.",
    ],
  },
  {
    slug: "modo-terminal",
    title: "Modo terminal",
    description: "Practica en una interfaz que simula una sesión de terminal real.",
    color: "orange",
    content: [
      "El modo terminal reproduce la estética de una consola: mismo selector de lenguaje y dificultad, pero la práctica ocurre dentro de un prompt tipo shell.",
      "Es la misma lógica de validación carácter a carácter que el editor normal — solo cambia la piel visual, para quienes prefieren esa estética.",
      "Se accede desde el botón TERMINAL del menú principal o con el atajo Alt + T.",
    ],
  },
  {
    slug: "idiomas",
    title: "Aprender idiomas",
    description: "Vocabulario y frases reales en varios idiomas, tecleando en vez de solo leyendo.",
    color: "teal",
    content: [
      "La categoría Idiomas incluye inglés, francés, alemán, portugués, rumano, italiano y japonés, organizados por nivel (A1 a C2 y exámenes).",
      "Escribir refuerza la memoria muscular y ortográfica de un idioma de forma distinta a solo leerlo — combínalo con el modo audio para reforzar también la pronunciación.",
      "El progreso por idioma se mide igual que en programación: fases basadas en sesiones, velocidad y precisión.",
    ],
  },
];

export function getInstruction(slug) {
  return INSTRUCTIONS.find((i) => i.slug === slug);
}
