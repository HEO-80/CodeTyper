// src/data/snippets/languages/translationLoader.js
// Carga bajo demanda las traducciones de los snippets de idiomas.
// Convenio de nombres: [snippet-file].[idioma-ui].js, junto al archivo
// original (p.ej. "english/a1/greetings.js" -> "english/a1/greetings.es.js").
// Cada archivo de traducción exporta un objeto { [snippetId]: { title, lines } }.

// Categorías bajo "languages" — el panel de traducción solo tiene sentido aquí.
export const LANGUAGE_CATEGORIES = [
  "english", "french", "german", "italian",
  "portuguese", "romanian", "japan", "russian", "chinese", "czech",
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
  german: {
    a1: ["begruessung"],
    a2: ["alltag"],
    b1: ["gespraeche"],
    b2: ["beruflich"],
    c1: ["technik"],
    c2: ["literarisch"],
    exam: ["index"],
  },
  portuguese: {
    a1: ["saudacoes"],
    a2: ["cotidiano"],
    b1: ["conversas"],
    b2: ["profissional"],
    c1: ["tecnico"],
    c2: ["literario"],
    exam: ["index"],
  },
  italian: {
    a1: ["saluti"],
    a2: ["quotidiano"],
    b1: ["conversazioni"],
    b2: ["professionale"],
    c1: ["tecnico"],
    c2: ["letterario"],
    exam: ["index"],
  },
  japan: {
    a1: ["aisatsu"],
    a2: ["nichijou"],
    b1: ["kaiwa"],
    b2: ["bijinesu"],
    c1: ["gijutsu"],
    c2: ["bungaku"],
    exam: ["index"],
  },
  czech: {
    a1: ["pozdravy"],
    a2: ["kazdy_den"],
    b1: ["cestovani"],
    b2: ["spolecnost"],
    c1: ["mysleni"],
    c2: ["literatura"],
    exam: ["index"],
  },
  romanian: {
    a1: ["salutari"],
    a2: ["zilnic"],
    b1: ["conversatii"],
    b2: ["profesional"],
    c1: ["tehnic"],
    c2: ["literar"],
    exam: ["index"],
  },
  chinese: {
    a1: ["wenhao"],
    a2: ["richang"],
    b1: ["duihua"],
    b2: ["shangwu"],
    c1: ["jishu"],
    c2: ["wenxue"],
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
