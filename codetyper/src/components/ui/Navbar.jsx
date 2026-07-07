"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useNav, useTheme, useAudio } from "@/components/ui/LayoutClient";
import "./Navbar.css";

function SunIcon() {
  return (
    <svg className="navbar-theme-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="navbar-theme-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar({ onToggleAuth, authOpen, onOpenSettings, onOpenAudio, onToggleInstructions, instructionsOpen }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { hasBack, triggerBack } = useNav();
  const { isDark, toggleTheme } = useTheme();
  const audio = useAudio();


  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* User toggle button — left side */}
        <button
          className={`navbar-user-btn${authOpen ? " active" : ""}`}
          onClick={onToggleAuth}
          title="Toggle user panel"
        >
          {session?.user?.image ? (
            <img src={session.user.image} alt="" className="navbar-user-avatar" />
          ) : (
            <span className="navbar-user-icon">
              {session?.user ? session.user.name?.[0]?.toUpperCase() || "U" : "◉"}
            </span>
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <span className="navbar-logo-accent">&gt;_</span>
          <span className="navbar-logo-text">CodeTyper</span>
        </Link>

        {/* Links */}
        <div className="navbar-links">

          {/* Back button — visible when a back action is registered */}
          {hasBack && (
            <button className="navbar-back-btn" onClick={triggerBack} title="Volver">
              <span className="navbar-back-arrow">←</span>
              back
            </button>
          )}

          <Link href="/" className={`navbar-link${pathname === "/" && !hasBack ? " active" : ""}`}>
            <span className="navbar-link-icon">⌨</span>
            editor
          </Link>


   <button
            className="navbar-link navbar-settings-btn"
            onClick={onOpenSettings}
            title="Settings"
          >
            <span className="navbar-link-icon">⚙</span>
            settings
          </button>

          <button
            className="navbar-link navbar-audio-btn"
            onClick={onOpenAudio}
            title="Audio"
          >
            <span className="navbar-link-icon">🎧</span>
            audio
          </button>

        </div>

        {/* Instructions toggle */}
        <button
          className={`navbar-link navbar-instructions-btn${instructionsOpen ? " active" : ""}`}
          onClick={onToggleInstructions}
          title="Instrucciones"
        >
          <span className="navbar-link-icon">?</span>
          instrucciones
        </button>

        {/* Mini reproductor de música — play/pause, siguiente, volumen */}
        <div className="navbar-audio-mini">
          <span className="navbar-audio-mini-label">música</span>
          <button
            className="navbar-audio-mini-btn"
            onClick={() => audio.update({ musicEnabled: !audio.musicEnabled })}
            title={audio.musicEnabled ? "Pausar música" : "Reproducir música"}
          >{audio.musicEnabled ? "⏸" : "▶"}</button>
          <button
            className="navbar-audio-mini-btn"
            onClick={() => audio.randomize("music")}
            title="Siguiente pista"
          >⏭</button>
          <input
            type="range" min="0" max="100"
            value={audio.musicVolume}
            onChange={e => audio.update({ musicVolume: Number(e.target.value) })}
            className="navbar-audio-mini-slider"
            title="Volumen de la música"
          />
        </div>

        {/* Mini reproductor de ambiente — play/stop, volumen */}
        <div className="navbar-audio-mini">
          <span className="navbar-audio-mini-label">ambient</span>
          <button
            className="navbar-audio-mini-btn"
            onClick={() => audio.update({ ambientEnabled: !audio.ambientEnabled })}
            title={audio.ambientEnabled ? "Detener ambiente" : "Reproducir ambiente"}
          >{audio.ambientEnabled ? "⏹" : "▶"}</button>
          <input
            type="range" min="0" max="100"
            value={audio.ambientVolume}
            onChange={e => audio.update({ ambientVolume: Number(e.target.value) })}
            className="navbar-audio-mini-slider"
            title="Volumen del ambiente"
          />
        </div>

        {/* Theme toggle */}
        <button
          className="navbar-theme-btn"
          onClick={toggleTheme}
          title={isDark ? "Modo claro" : "Modo oscuro"}
        >
          {isDark
            ? <SunIcon key="sun" />
            : <MoonIcon key="moon" />
          }
        </button>

        {/* Alt+T hint */}
        <div className="navbar-hint">
          <kbd>alt</kbd><span>+</span><kbd>T</kbd>
          <span className="navbar-hint-label">terminal overlay</span>
        </div>

      </div>
    </nav>
  );
}
