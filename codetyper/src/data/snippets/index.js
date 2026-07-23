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
import portuguese from "./languages/portuguese";
import romanian from "./languages/romanian";
import italian from "./languages/italian";
import japan from "./languages/japan";
import czech from "./languages/czech";
import chinese from "./languages/chinese";
import russian from "./languages/russian";
import greek from "./languages/greek";
import korean from "./languages/korean";
import ukrainian from "./languages/ukrainian";


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
  portuguese,
  romanian,
  italian,
  japan,
  czech,
  chinese,
  russian,
  greek,
  korean,
  ukrainian,
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
    languages: ["english", "french", "german", "portuguese", "romanian", "italian", "japan", "czech", "chinese", "russian", "greek", "korean", "ukrainian"],
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

// ─── HELPER: obtener siguiente snippet en el mismo idioma ─────────────────────
// Recorre los niveles en orden, dentro del mismo nivel avanza al siguiente snippet.
// Si el nivel se agota, salta al primer snippet del nivel siguiente.
// Devuelve { snippet, difficulty } o null si es el último de todos.
export function getNextSnippet(language, currentSnippetId, currentDifficulty) {
  const lang = SNIPPETS[language];
  if (!lang) return null;

  const levels = Object.keys(lang); // orden definido en el index.js
  const levelIdx = levels.indexOf(currentDifficulty);
  if (levelIdx === -1) return null;

  // Buscar dentro del nivel actual
  const currentLevel = lang[currentDifficulty] || [];
  const snippetIdx = currentLevel.findIndex(s => s.id === currentSnippetId);
  const nextInLevel = snippetIdx !== -1 ? currentLevel[snippetIdx + 1] : null;

  if (nextInLevel) {
    return { snippet: nextInLevel, difficulty: currentDifficulty };
  }

  // Avanzar al siguiente nivel no vacío
  for (let i = levelIdx + 1; i < levels.length; i++) {
    const nextLevel = lang[levels[i]] || [];
    if (nextLevel.length > 0) {
      return { snippet: nextLevel[0], difficulty: levels[i] };
    }
  }

  return null; // completado todo el idioma/lenguaje
}
