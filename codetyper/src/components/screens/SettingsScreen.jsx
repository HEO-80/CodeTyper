"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/ui/LayoutClient";
import {
  FONTS, FONT_SIZES, CURSOR_STYLES, ACCENT_COLORS,
  DEFAULT_SETTINGS, loadSettings, saveSettings, applyVisualSettings,
} from "@/data/editorSettings";
import "./SettingsScreen.css";

export default function SettingsScreen({ onClose }) {
  const { isDark, toggleTheme } = useTheme();

  const [settings, setSettings] = useState(() => ({
    ...DEFAULT_SETTINGS,
    ...loadSettings(),
  }));

  const [saved, setSaved] = useState(false);

  // Cada cambio se guarda y se aplica al momento — no hace falta pulsar
  // "Guardar cambios" para que sobreviva a cerrar el panel o recargar.
  useEffect(() => {
    saveSettings(settings);
    applyVisualSettings(settings);
  }, [settings]);

  const update = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings({ ...DEFAULT_SETTINGS });
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
                  data-variant="theme"
                  onClick={() => !isDark && toggleTheme()}
                >🌙 Oscuro</button>
                <button
                  className={`settings-opt-btn${!isDark ? " active" : ""}`}
                  data-variant="theme"
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
                  data-variant="on"
                  onClick={() => update("showLineNumbers", true)}
                >ON</button>
                <button
                  className={`settings-opt-btn${!settings.showLineNumbers ? " active" : ""}`}
                  data-variant="off"
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
                  data-variant="on"
                  onClick={() => update("smoothScroll", true)}
                >ON</button>
                <button
                  className={`settings-opt-btn${!settings.smoothScroll ? " active" : ""}`}
                  data-variant="off"
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
                  data-variant="on"
                  onClick={() => update("soundEnabled", true)}
                >ON</button>
                <button
                  className={`settings-opt-btn${!settings.soundEnabled ? " active" : ""}`}
                  data-variant="off"
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
