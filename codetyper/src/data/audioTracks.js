// Pistas disponibles para el panel de Audio (public/sounds/**).

export const MUSIC_TRACKS = [
  { id: "zephyr-jazz",      label: "Zephyr — Ambient Cinematic Jazz",   file: "/sounds/music/9jackjack8-zephyr-ambient-cinematic-jazz-550246.mp3" },
  { id: "sensual",          label: "Sensual",                            file: "/sounds/music/jourinhannah-sensual-236807.mp3" },
  { id: "gritty-noir",      label: "Gritty Noir (ASMR Jazz)",           file: "/sounds/music/konstantinpazuzustudio-gritty-noir-asmr-noir-jazz-520243.mp3" },
  { id: "missing-person",   label: "Missing Person (ASMR Jazz)",        file: "/sounds/music/konstantinpazuzustudio-missing-person-asmr-noir-jazz-520238.mp3" },
  { id: "noche-saxofon",    label: "Noche de Saxofón y Lágrimas",       file: "/sounds/music/susan-lu4esm-noche-de-saxofon-y-lagrimas-482251.mp3" },
  { id: "love-supernovas",  label: "Love in the Age of Supernovas",     file: "/sounds/music/tokyorifft-love-in-the-age-of-supernovas-483515.mp3" },
];

export const AMBIENT_TRACKS = [
  { id: "lluvia-1", label: "Lluvia 1", file: "/sounds/ambient/dragon-studio-gentle-rain-01-437305.mp3" },
  { id: "lluvia-2", label: "Lluvia 2", file: "/sounds/ambient/dragon-studio-gentle-rain-07-437321.mp3" },
];

// Estilos de sonido de teclado — de momento solo selección visual, sin
// disparo real por tecla (eso llega en una siguiente iteración).
export const KEYBOARD_STYLES = [
  { id: "membrana",   label: "Membrana estándar" },
  { id: "mecanico",   label: "Mecánico rápido" },
  { id: "keychron-k10-pro", label: "Keychron K10 Pro (premium)" },
  { id: "maquina-escribir", label: "Máquina de escribir" },
];
