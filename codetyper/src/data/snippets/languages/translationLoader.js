// src/data/snippets/languages/translationLoader.js
// Carga bajo demanda las traducciones de los snippets de idiomas.
// Convenio de nombres: [snippet-file].[idioma-ui].js, junto al archivo
// original (p.ej. "english/a1/greetings.js" -> "english/a1/greetings.es.js").
// Cada archivo de traducción exporta un objeto { [snippetId]: { title, lines } }.

// Categorías bajo "languages" — el panel de traducción solo tiene sentido aquí.
export const LANGUAGE_CATEGORIES = [
  "english", "french", "german", "italian",
  "portuguese", "romanian", "japanese", "russian", "chinese",
];

// Topics con archivo de traducción disponible, por idioma/dificultad.
// Al añadir un nuevo <topic>.<uiLang>.js, añade su nombre aquí.
const TRANSLATION_TOPICS = {
  english: {
    a1: ["greetings"],
    a2: ["daily"],
    b1: ["conversations"],
    b2: ["business", "expressions"],
    c1: ["technical"],
    exam: ["full"],
  },
  french: {
    a1: ["salutations"],
    a2: ["quotidien"],
    b1: ["conversations"],
    b2: ["professionnel"],
    c1: ["technique"],
    c2: ["litteraire"],
    exam: ["index"],
  },
};

// Importa dinámicamente `[langFile].[uiLang].js` (langFile relativo a esta
// carpeta, sin extensión, p.ej. "english/a1/greetings") y devuelve la
// traducción de `snippetId`, o null si el archivo o el id no existen.
export async function getTranslation(snippetId, langFile, uiLang = "es") {
  if (!snippetId || !langFile) return null;
  try {
    const mod = await import(`./${langFile}.${uiLang}.js`);
    const dict = mod.default || mod;
    return dict?.[snippetId] || null;
  } catch {
    return null;
  }
}

// Punto de entrada para la UI: dado un snippet + su idioma, prueba los
// topics conocidos para esa dificultad hasta encontrar su traducción.
export async function findTranslation(snippet, language, uiLang = "es") {
  if (!snippet?.id || !LANGUAGE_CATEGORIES.includes(language)) return null;
  const topics = TRANSLATION_TOPICS[language]?.[snippet.difficulty] || [];
  for (const topic of topics) {
    const result = await getTranslation(snippet.id, `${language}/${snippet.difficulty}/${topic}`, uiLang);
    if (result) return result;
  }
  return null;
}
