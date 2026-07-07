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

// Sonidos de tecla — un clic distinto por cada pulsación, elegido al azar
// del set "virtualizero keyboard-typing-fast" (public/sounds/teclado/...).
const KEYBOARD_SOUND_BASE = "/sounds/teclado/top mechanic/virtualizero keyboard-typing-fast-371229";
const KEYBOARD_SOUND_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 24, 25, 26, 27, 28, 29, 30, 31,
];
export const KEYBOARD_SOUNDS = KEYBOARD_SOUND_NUMBERS.map(n =>
  encodeURI(`${KEYBOARD_SOUND_BASE}/thick${n}.wav`)
);

// Estilos de sonido de teclado — solo "virtualzero-rapido" tiene audio real
// asignado por ahora; el resto queda deshabilitado hasta que tengan su propio set.
export const KEYBOARD_STYLES = [
  { id: "virtualzero-rapido", label: "Virtualzero — Mecánico rápido", enabled: true },
  { id: "membrana",   label: "Membrana estándar", enabled: false },
  { id: "mecanico",   label: "Mecánico rápido", enabled: false },
  { id: "keychron-k10-pro", label: "Keychron K10 Pro (premium)", enabled: false },
  { id: "maquina-escribir", label: "Máquina de escribir", enabled: false },
];
