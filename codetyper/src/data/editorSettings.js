// ─── Opciones del panel de Settings, compartidas con LayoutClient ────────────
// (LayoutClient las necesita para aplicar la fuente/tamaño/acento guardados
// en cuanto arranca la app, sin esperar a que se abra el panel de Settings).

export const FONTS = [
  { id: "jetbrains", label: "JetBrains Mono", value: "'JetBrains Mono', monospace" },
  { id: "fira",      label: "Fira Code",       value: "'Fira Code', monospace" },
  { id: "cascadia",  label: "Cascadia Code",   value: "'Cascadia Code', monospace" },
  { id: "ibm",       label: "IBM Plex Mono",   value: "'IBM Plex Mono', monospace" },
];

export const FONT_SIZES = [
  { id: "sm",  label: "Small",  value: "14px" },
  { id: "md",  label: "Medium", value: "16px" },
  { id: "lg",  label: "Large",  value: "18px" },
  { id: "xl",  label: "XL",     value: "20px" },
];

export const CURSOR_STYLES = [
  { id: "blink",  label: "Parpadeante", icon: "▌" },
  { id: "solid",  label: "Sólido",      icon: "█" },
  { id: "line",   label: "Línea",       icon: "│" },
];

export const ACCENT_COLORS = [
  { id: "blue",   label: "Azul",    value: "var(--hl-blue)" },
  { id: "green",  label: "Verde",   value: "var(--hl-green)" },
  { id: "purple", label: "Morado",  value: "var(--hl-purple)" },
  { id: "yellow", label: "Amarillo",value: "var(--hl-yellow)" },
  { id: "orange", label: "Naranja", value: "var(--hl-orange)" },
  { id: "red",    label: "Rojo",    value: "var(--hl-red)" },
];

export const DEFAULT_SETTINGS = {
  font:         "jetbrains",
  fontSize:     "md",
  cursorStyle:  "blink",
  accentColor:  "blue",
  soundEnabled: false,
  showLineNumbers: true,
  smoothScroll: true,
};

export function loadSettings() {
  try {
    const saved = localStorage.getItem("codetyper-settings");
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem("codetyper-settings", JSON.stringify(settings));
  } catch {}
}

// ─── Aplica fuente / tamaño / acento como variables CSS en :root ─────────────
export function applyVisualSettings(settings) {
  const font = FONTS.find(f => f.id === settings.font);
  if (font) document.documentElement.style.setProperty("--font-code", font.value);
  const size = FONT_SIZES.find(f => f.id === settings.fontSize);
  if (size) document.documentElement.style.setProperty("--font-size-code", size.value);
  const accent = ACCENT_COLORS.find(c => c.id === settings.accentColor);
  if (accent) document.documentElement.style.setProperty("--accent", accent.value);
}
