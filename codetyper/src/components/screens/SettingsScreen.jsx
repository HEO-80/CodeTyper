"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/ui/LayoutClient";
import "./SettingsScreen.css";

const FONTS = [
  { id: "jetbrains", label: "JetBrains Mono", value: "'JetBrains Mono', monospace" },
  { id: "fira",      label: "Fira Code",       value: "'Fira Code', monospace" },
  { id: "cascadia",  label: "Cascadia Code",   value: "'Cascadia Code', monospace" },
  { id: "ibm",       label: "IBM Plex Mono",   value: "'IBM Plex Mono', monospace" },
];

const FONT_SIZES = [
  { id: "sm",  label: "Small",  value: "14px" },
  { id: "md",  label: "Medium", value: "16px" },
  { id: "lg",  label: "Large",  value: "18px" },
  { id: "xl",  label: "XL",     value: "20px" },
];

const CURSOR_STYLES = [
  { id: "blink",  label: "Parpadeante", icon: "▌" },
  { id: "solid",  label: "Sólido",      icon: "█" },
  { id: "line",   label: "Línea",       icon: "│" },
];

const ACCENT_COLORS = [
  { id: "blue",   label: "Azul",    value: "var(--hl-blue)" },
  { id: "green",  label: "Verde",   value: "var(--hl-green)" },
  { id: "purple", label: "Morado",  value: "var(--hl-purple)" },
  { id: "yellow", label: "Amarillo",value: "var(--hl-yellow)" },
  { id: "orange", label: "Naranja", value: "var(--hl-orange)" },
  { id: "red",    label: "Rojo",    value: "var(--hl-red)" },
];

function loadSettings() {
  try {
    const saved = localStorage.getItem("codetyper-settings");
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
}

function saveSettings(settings) {
  try {
    localStorage.setItem("codetyper-settings", JSON.stringify(settings));
  } catch {}
}

export default function SettingsScreen({ onClose }) {
  const { isDark, toggleTheme } = useTheme();

  const [settings, setSettings] = useState(() => ({
    font:         "jetbrains",
    fontSize:     "md",
    cursorStyle:  "blink",
    accentColor:  "blue",
    soundEnabled: false,
    showLineNumbers: true,
    smoothScroll: true,
    ...loadSettings(),
  }));

  const [saved, setSaved] = useState(false);

  const update = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    saveSettings(settings);
    // Aplicar fuente
    const font = FONTS.find(f => f.id === settings.font);
    if (font) document.documentElement.style.setProperty("--font-code", font.value);
    // Aplicar tamaño
    const size = FONT_SIZES.find(f => f.id === settings.fontSize);
    if (size) document.documentElement.style.setProperty("--font-size-code", size.value);
    // Aplicar color de acento
    const accent = ACCENT_COLORS.find(c => c.id === settings.accentColor);
    if (accent) document.documentElement.style.setProperty("--accent", accent.value);

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaults = {
      font: "jetbrains", fontSize: "md", cursorStyle: "blink",
      accentColor: "blue", soundEnabled: false,
      showLineNumbers: true, smoothScroll: true,
    };
    setSettings(defaults);
    saveSettings(defaults);
    setSaved(false);
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="settings-header">
          <div className="settings-title">
            <span className="settings-title-accent">⚙</span>
            Settings
          </div>
          <button className="settings-close" onClick={onClose}>✕</button>
        </div>

        <div className="settings-body">

          {/* ── Apariencia ── */}
          <section className="settings-section">
            <div className="settings-section-label">// apariencia</div>

            {/* Tema */}
            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Tema</span>
                <span className="settings-row-desc">Modo oscuro o claro</span>
              </div>
              <div className="settings-options">
                <button
                  className={`settings-opt-btn${isDark ? " active" : ""}`}
                  onClick={() => !isDark && toggleTheme()}
                >🌙 Oscuro</button>
                <button
                  className={`settings-opt-btn${!isDark ? " active" : ""}`}
                  onClick={() => isDark && toggleTheme()}
                >☀️ Claro</button>
              </div>
            </div>

            {/* Color de acento */}
            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Color de acento</span>
                <span className="settings-row-desc">Color principal de la interfaz</span>
              </div>
              <div className="settings-options">
                {ACCENT_COLORS.map(c => (
                  <button
                    key={c.id}
                    className={`settings-color-btn${settings.accentColor === c.id ? " active" : ""}`}
                    style={{ "--c": c.value }}
                    onClick={() => update("accentColor", c.id)}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

          </section>

          {/* ── Editor ── */}
          <section className="settings-section">
            <div className="settings-section-label">// editor</div>

            {/* Fuente */}
            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Fuente</span>
                <span className="settings-row-desc">Tipografía del editor de código</span>
              </div>
              <div className="settings-options settings-options-col">
                {FONTS.map(f => (
                  <button
                    key={f.id}
                    className={`settings-opt-btn settings-font-btn${settings.font === f.id ? " active" : ""}`}
                    style={{ fontFamily: f.value }}
                    onClick={() => update("font", f.id)}
                  >{f.label}</button>
                ))}
              </div>
            </div>

            {/* Tamaño de fuente */}
            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Tamaño de fuente</span>
                <span className="settings-row-desc">Tamaño del texto en el editor</span>
              </div>
              <div className="settings-options">
                {FONT_SIZES.map(f => (
                  <button
                    key={f.id}
                    className={`settings-opt-btn${settings.fontSize === f.id ? " active" : ""}`}
                    onClick={() => update("fontSize", f.id)}
                  >{f.label}</button>
                ))}
              </div>
            </div>

            {/* Cursor */}
            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Cursor</span>
                <span className="settings-row-desc">Estilo del cursor en el editor</span>
              </div>
              <div className="settings-options">
                {CURSOR_STYLES.map(c => (
                  <button
                    key={c.id}
                    className={`settings-opt-btn${settings.cursorStyle === c.id ? " active" : ""}`}
                    onClick={() => update("cursorStyle", c.id)}
                  >
                    <span style={{ marginRight: "6px", fontFamily: "monospace" }}>{c.icon}</span>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Números de línea */}
            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Números de línea</span>
                <span className="settings-row-desc">Mostrar numeración en el editor</span>
              </div>
              <div className="settings-options">
                <button
                  className={`settings-opt-btn${settings.showLineNumbers ? " active" : ""}`}
                  onClick={() => update("showLineNumbers", true)}
                >ON</button>
                <button
                  className={`settings-opt-btn${!settings.showLineNumbers ? " active" : ""}`}
                  onClick={() => update("showLineNumbers", false)}
                >OFF</button>
              </div>
            </div>

          </section>

          {/* ── Comportamiento ── */}
          <section className="settings-section">
            <div className="settings-section-label">// comportamiento</div>

            {/* Scroll suave */}
            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Scroll suave</span>
                <span className="settings-row-desc">Animación al centrar el cursor</span>
              </div>
              <div className="settings-options">
                <button
                  className={`settings-opt-btn${settings.smoothScroll ? " active" : ""}`}
                  onClick={() => update("smoothScroll", true)}
                >ON</button>
                <button
                  className={`settings-opt-btn${!settings.smoothScroll ? " active" : ""}`}
                  onClick={() => update("smoothScroll", false)}
                >OFF</button>
              </div>
            </div>

            {/* Sonido */}
            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Sonido de teclas</span>
                <span className="settings-row-desc">Click al pulsar cada tecla</span>
              </div>
              <div className="settings-options">
                <button
                  className={`settings-opt-btn${settings.soundEnabled ? " active" : ""}`}
                  onClick={() => update("soundEnabled", true)}
                >ON</button>
                <button
                  className={`settings-opt-btn${!settings.soundEnabled ? " active" : ""}`}
                  onClick={() => update("soundEnabled", false)}
                >OFF</button>
              </div>
            </div>

          </section>

          {/* ── Info ── */}
          <section className="settings-section">
            <div className="settings-section-label">// info</div>
            <div className="settings-info-row">
              <span className="settings-info-label">Versión</span>
              <span className="settings-info-value">CodeTyper v1.0.0</span>
            </div>
            <div className="settings-info-row">
              <span className="settings-info-label">Stack</span>
              <span className="settings-info-value">Next.js · MongoDB · NextAuth</span>
            </div>
            <div className="settings-info-row">
              <span className="settings-info-label">GitHub</span>
              <a
                href="https://github.com/HEO-80/CodeTyper"
                target="_blank"
                rel="noopener noreferrer"
                className="settings-info-link"
              >HEO-80/CodeTyper</a>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="settings-footer">
          <button className="settings-reset-btn" onClick={handleReset}>
            Restablecer valores
          </button>
          <button
            className={`settings-save-btn${saved ? " saved" : ""}`}
            onClick={handleSave}
          >
            {saved ? "✓ Guardado" : "Guardar cambios"}
          </button>
        </div>

      </div>
    </div>
  );
}
