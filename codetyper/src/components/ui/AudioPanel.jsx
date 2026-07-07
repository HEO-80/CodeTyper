"use client";

import { useAudio } from "@/components/ui/LayoutClient";
import { MUSIC_TRACKS, AMBIENT_TRACKS, KEYBOARD_STYLES } from "@/data/audioTracks";
import "@/components/screens/SettingsScreen.css";
import "./AudioPanel.css";

export default function AudioPanel({ onClose }) {
  const audio = useAudio();

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="settings-header">
          <div className="settings-title">
            <span className="settings-title-accent">🎧</span>
            Audio
          </div>
          <button className="settings-close" onClick={onClose}>✕</button>
        </div>

        <div className="settings-body">

          {/* ── Música ── */}
          <section className="settings-section">
            <div className="settings-section-label">// música</div>

            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Música de fondo</span>
                <span className="settings-row-desc">Suena en bucle mientras practicas</span>
              </div>
              <div className="settings-options">
                <button
                  className={`settings-opt-btn${audio.musicEnabled ? " active" : ""}`}
                  data-variant="on"
                  onClick={() => audio.update({ musicEnabled: true })}
                >ON</button>
                <button
                  className={`settings-opt-btn${!audio.musicEnabled ? " active" : ""}`}
                  data-variant="off"
                  onClick={() => audio.update({ musicEnabled: false })}
                >OFF</button>
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Pista</span>
                <span className="settings-row-desc">Elige qué suena de fondo</span>
              </div>
            </div>
            <div className="audio-track-grid">
              {MUSIC_TRACKS.map(t => (
                <button
                  key={t.id}
                  className={`settings-opt-btn audio-track-btn${audio.musicTrack === t.id ? " active" : ""}`}
                  onClick={() => audio.update({ musicTrack: t.id, musicEnabled: true })}
                >{t.label}</button>
              ))}
            </div>

            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Volumen</span>
                <span className="settings-row-desc">De fondo, sin tapar el resto — 50% recomendado</span>
              </div>
              <div className="audio-volume">
                <input
                  type="range" min="0" max="100"
                  value={audio.musicVolume}
                  onChange={e => audio.update({ musicVolume: Number(e.target.value) })}
                  className="audio-slider"
                />
                <span className="audio-volume-value">{audio.musicVolume}%</span>
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Aleatorio</span>
                <span className="settings-row-desc">Cambia a otra pista de música al azar</span>
              </div>
              <div className="settings-options">
                <button
                  className="settings-reset-btn"
                  onClick={() => audio.randomize("music")}
                >🔀 Aleatorio</button>
              </div>
            </div>
          </section>

          {/* ── Ambiente ── */}
          <section className="settings-section">
            <div className="settings-section-label">// ambiente</div>

            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Sonido ambiente</span>
                <span className="settings-row-desc">Sonidos de la naturaleza para relajarte</span>
              </div>
              <div className="settings-options">
                <button
                  className={`settings-opt-btn${audio.ambientEnabled ? " active" : ""}`}
                  data-variant="on"
                  onClick={() => audio.update({ ambientEnabled: true })}
                >ON</button>
                <button
                  className={`settings-opt-btn${!audio.ambientEnabled ? " active" : ""}`}
                  data-variant="off"
                  onClick={() => audio.update({ ambientEnabled: false })}
                >OFF</button>
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Pista</span>
                <span className="settings-row-desc">Iremos añadiendo más sonidos de naturaleza</span>
              </div>
            </div>
            <div className="audio-track-grid">
              {AMBIENT_TRACKS.map(t => (
                <button
                  key={t.id}
                  className={`settings-opt-btn audio-track-btn${audio.ambientTrack === t.id ? " active" : ""}`}
                  onClick={() => audio.update({ ambientTrack: t.id, ambientEnabled: true })}
                >{t.label}</button>
              ))}
            </div>

            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Volumen</span>
                <span className="settings-row-desc">Un poco más presente que la música — 65% recomendado</span>
              </div>
              <div className="audio-volume">
                <input
                  type="range" min="0" max="100"
                  value={audio.ambientVolume}
                  onChange={e => audio.update({ ambientVolume: Number(e.target.value) })}
                  className="audio-slider"
                />
                <span className="audio-volume-value">{audio.ambientVolume}%</span>
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Aleatorio</span>
                <span className="settings-row-desc">Cambia a otro sonido ambiente al azar</span>
              </div>
              <div className="settings-options">
                <button
                  className="settings-reset-btn"
                  onClick={() => audio.randomize("ambient")}
                >🔀 Aleatorio</button>
              </div>
            </div>
          </section>

          {/* ── Teclado ── */}
          <section className="settings-section">
            <div className="settings-section-label">// teclado</div>

            <div className="settings-row">
              <div className="settings-row-info">
                <span className="settings-row-title">Estilo de teclado</span>
                <span className="settings-row-desc">Próximamente sonará en cada tecla — de momento solo puedes elegir el estilo</span>
              </div>
            </div>
            <div className="audio-track-grid">
              {KEYBOARD_STYLES.map(k => (
                <button
                  key={k.id}
                  className={`settings-opt-btn audio-track-btn${audio.keyboardStyle === k.id ? " active" : ""}`}
                  onClick={() => audio.update({ keyboardStyle: k.id })}
                >{k.label}</button>
              ))}
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="settings-footer">
          <span className="audio-footer-hint">El audio sigue sonando aunque cierres este panel</span>
        </div>

      </div>
    </div>
  );
}
