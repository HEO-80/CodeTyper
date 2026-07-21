// src/hooks/useSpeech.js
import { useCallback, useRef } from "react";

const LANG_VOICES = {
  english:     "en-US",
  spanish:     "es-ES",
  french:      "fr-FR",
  german:      "de-DE",
  italian:     "it-IT",
  portuguese:  "pt-PT",
  romanian:    "ro-RO",
  japan:       "ja-JP",
  czech:       "cs-CZ",
  russian:     "ru-RU",
  chinese:     "zh-CN",
  mindset:     "es-ES",
  shark:       "es-ES",
  flowerPower: "es-ES",
};

// ─── Detección heurística del idioma de un texto libre ─────────────────────────
// Se usa para "personalizado": como el usuario pega cualquier texto, no hay
// categoría que indique el idioma de antemano. Cuenta acentos/diéresis y
// palabras muy comunes de cada idioma; el que más coincidencias tenga gana.
// Si no hay ninguna coincidencia clara, se usa inglés por defecto.
const LANG_HINTS = [
  { key: "spanish",    re: /[ñáéíóúü¿¡]|\b(el|la|los|las|de|que|y|en|un|una|es|por|para|con|no|se|su|del|como|más|pero|le|esto|está|desde|hasta|donde|porque|todo|muy|también|entre|sin|sobre)\b/gi },
  { key: "french",     re: /[àâçéèêëîïôùûü]|\b(le|la|les|de|des|un|une|et|est|que|pour|dans|ce|il|elle|vous|nous|avec|sur|par|au|aux|se|ne|pas|plus|ou|mais|comme|tout|même|leur)\b/gi },
  { key: "german",     re: /[äöüß]|\b(der|die|das|und|ist|nicht|ein|eine|zu|den|mit|für|auf|von|im|dem|des|sich|auch|wie|aber|wenn|wird)\b/gi },
  { key: "italian",    re: /\b(il|lo|gli|di|che|un|una|per|con|non|sono|questo|questa|come|anche|più|ma|se|quando|perché|dove)\b/gi },
  { key: "portuguese", re: /[ãõç]|\b(não|uma|para|com|na|no|por|mais|como|mas|também|já|até|isso|está)\b/gi },
  { key: "english",    re: /\b(the|and|is|are|was|were|for|with|that|this|have|has|not|but|you|your|from|they|will|would|could|should)\b/gi },
];

export function detectSpeechLanguage(text, fallback = "english") {
  if (!text || !text.trim()) return fallback;
  const sample = text.slice(0, 800);
  let best = fallback;
  let bestScore = 0;
  for (const { key, re } of LANG_HINTS) {
    const score = (sample.match(re) || []).length;
    if (score > bestScore) { bestScore = score; best = key; }
  }
  return bestScore > 0 ? best : fallback;
}

export function useSpeech(language) {
  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;
  const langCode = LANG_VOICES[language] || "en-US";
  const restartTimeoutRef = useRef(null);

  // Identidad estable entre renders: si no lo memoizamos, cualquier
  // re-render (p.ej. el tick del cronómetro) recrea speak/stop y hace
  // que los efectos que dependen de ellos se reinicien, cancelando
  // lecturas ya programadas.
  const speak = useCallback((text) => {
    if (!isSupported || !text?.trim()) return;
    const synth = window.speechSynthesis;
    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
    synth.cancel();

    // Chrome puede "tragarse" en silencio un speak() llamado justo después
    // de cancel() en el mismo tick. Un pequeño margen evita el bloqueo.
    restartTimeoutRef.current = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.lang = langCode;
      utterance.rate = 0.85;
      utterance.pitch = 1;

      // Intentar encontrar una voz nativa del idioma
      const voices = synth.getVoices();
      const match = voices.find(v => v.lang.startsWith(langCode.split("-")[0]));
      if (match) utterance.voice = match;

      synth.speak(utterance);
    }, 60);
  }, [isSupported, langCode]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
    window.speechSynthesis.cancel();
  }, [isSupported]);

  return { speak, stop, isSupported };
}
