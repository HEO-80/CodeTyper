// src/hooks/useSpeech.js

const LANG_VOICES = {
  english:    "en-US",
  french:     "fr-FR",
  german:     "de-DE",
  italian:    "it-IT",
  portuguese: "pt-PT",
  romanian:   "ro-RO",
  japanese:   "ja-JP",
  russian:    "ru-RU",
  chinese:    "zh-CN",
};

export function useSpeech(language) {
  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;
  const langCode = LANG_VOICES[language] || "en-US";

  function speak(text) {
    if (!isSupported || !text?.trim()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.lang = langCode;
    utterance.rate = 0.85;
    utterance.pitch = 1;

    // Intentar encontrar una voz nativa del idioma
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang.startsWith(langCode.split("-")[0]));
    if (match) utterance.voice = match;

    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
  }

  return { speak, stop, isSupported };
}
