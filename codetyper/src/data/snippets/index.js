// ─── SNIPPETS INDEX — exporta todo de forma centralizada ─────────────────────
// Para añadir un nuevo lenguaje: importarlo aquí y añadirlo al objeto SNIPPETS

import javascript from "./programming/javascript";
import sql from "./programming/sql";
import solidity from "./programming/solidity";
import mindsetSpanish from "./mindset/spanish";
import typescript from "./programming/typescript";
import python from "./programming/python";
import java from "./programming/java";
import csharp from "./programming/csharp";
import bash      from "./programming/bash";
import powershell from "./programming/powershell";
import cloud from "./programming/cloud";

import english from "./languages/english";
import french from "./languages/french";
import german from "./languages/german";

// 🚧 Próximamente:
// import typescript from "./programming/typescript";
// import python from "./programming/python";
// import java from "./programming/java";
// import csharp from "./programming/csharp";

// ─── MAPA PRINCIPAL ───────────────────────────────────────────────────────────
// export const SNIPPETS = {
//   // Lenguajes de programación
//   javascript,
//   typescript,
//   python,
//   sql,
//   solidity,
//   java,
//   csharp,
//   // Idiomas
//   english,
//   // Mentalidad
//   mindset: mindsetSpanish,
// };

export const SNIPPETS = {
  javascript,
  sql,
  solidity,
  english,
  french,
  german,
  typescript,
  python,
  java,
  csharp,
  bash,
  powershell,
  cloud,
  mindset: mindsetSpanish,
};

// ─── CATEGORÍAS PARA EL MENÚ ──────────────────────────────────────────────────
export const CATEGORIES = {
  programming: {
    label: "💻 Programación",
    languages: ["javascript", "typescript", "python", "sql", "solidity", "java", "csharp","powershell","bash", "cloud"],
  },
  languages: {
    label: "🌍 Idiomas",
    languages: ["english", "french", "german"],
  },
  mindset: {
    label: "🧠 Mentalidad",
    languages: ["mindset", "shark", "flowerPower"],
  },
};

// ─── HELPER: obtener snippets por lenguaje y dificultad ──────────────────────
export function getSnippets(language, difficulty) {
  const lang = SNIPPETS[language];
  if (!lang) return [];
  if (difficulty) return lang[difficulty] || [];
  // Si no se especifica dificultad, devuelve todos
  return Object.values(lang).flat();
}

// ─── HELPER: obtener snippet por id ──────────────────────────────────────────
export function getSnippetById(id) {
  for (const lang of Object.values(SNIPPETS)) {
    for (const level of Object.values(lang)) {
      const found = level.find(s => s.id === id);
      if (found) return found;
    }
  }
  return null;
}
