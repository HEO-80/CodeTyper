// src/hooks/useSpeech.js
import { useCallback, useRef } from "react";

const LANG_VOICES = {
  english:     "en-US",
  french:      "fr-FR",
  german:      "de-DE",
  italian:     "it-IT",
  portuguese:  "pt-PT",
  romanian:    "ro-RO",
  japan:       "ja-JP",
  russian:     "ru-RU",
  chinese:     "zh-CN",
  mindset:     "es-ES",
  shark:       "es-ES",
  flowerPower: "es-ES",
};

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
