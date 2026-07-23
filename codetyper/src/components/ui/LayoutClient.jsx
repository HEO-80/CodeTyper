"use client";

import { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext } from "react";
import { useSession }  from "next-auth/react";
import Navbar          from "@/components/ui/Navbar";
import AuthPanel       from "@/components/ui/AuthPanel";
import InstructionsPanel from "@/components/ui/InstructionsPanel";
import GlobalTerminal  from "@/components/ui/GlobalTerminal";
import SettingsScreen from "@/components/screens/SettingsScreen";
import AudioPanel      from "@/components/ui/AudioPanel";
import { MUSIC_TRACKS, AMBIENT_TRACKS, KEYBOARD_SOUNDS } from "@/data/audioTracks";
import { DEFAULT_SETTINGS, loadSettings, applyVisualSettings } from "@/data/editorSettings";

// ── Context para refrescar stats desde cualquier pantalla ─────────────────────
export const StatsRefreshContext = createContext(() => {});
export const useStatsRefresh = () => useContext(StatsRefreshContext);

// ── Context para controlar la terminal global ─────────────────────────────────
export const TerminalContext = createContext({ open: false, openTerminal: () => {}, closeTerminal: () => {} });
export const useTerminal = () => useContext(TerminalContext);

// ── Context para el botón Back del Navbar ────────────────────────────────────
export const NavContext = createContext({ hasBack: false, setBackAction: () => {}, triggerBack: () => {} });
export const useNav = () => useContext(NavContext);

// ── Context para el tema claro/oscuro ────────────────────────────────────────
export const ThemeContext = createContext({ isDark: true, toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

// ── Context para el audio de fondo (música / ambiente) ────────────────────────
export const AudioContext = createContext(null);
export const useAudio = () => useContext(AudioContext);

const DEFAULT_AUDIO_STATE = {
  musicEnabled: false,   musicTrack: MUSIC_TRACKS[0]?.id ?? null,     musicVolume: 50,
  musicShuffle: false,
  ambientEnabled: false, ambientTrack: AMBIENT_TRACKS[0]?.id ?? null, ambientVolume: 65,
  ambientShuffle: false,
  keyboardEnabled: false, keyboardVolume: 60,
  keyboardStyle: "virtualzero-rapido",
};

export default function LayoutClient({ children }) {
  const { data: session } = useSession();
  const [authOpen,     setAuthOpen]     = useState(false);
  const [stats,        setStats]        = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [hasBack,      setHasBack]      = useState(false);
  const [isDark,       setIsDark]       = useState(true);
  const backRef = useRef(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [audioState, setAudioState] = useState(DEFAULT_AUDIO_STATE);
  const musicRef = useRef(null);
  const ambientRef = useRef(null);
  const audioStateRef = useRef(audioState);
  audioStateRef.current = audioState;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("codetyper-audio") || "null");
      if (saved) setAudioState(prev => ({ ...prev, ...saved }));
    } catch (e) {}
  }, []);

  // Los navegadores bloquean el autoplay sin gesto del usuario: si music/ambient
  // quedaron activados de una sesión anterior, el <audio>.play() del efecto de
  // abajo será rechazado en silencio. Con el primer clic/tecla/touch del usuario
  // reintentamos reproducir lo que deba sonar según el estado restaurado (se lee
  // por ref porque el listener se registra una sola vez, antes de que termine
  // de cargar el estado guardado).
  useEffect(() => {
    const resumeOnGesture = () => {
      if (audioStateRef.current.musicEnabled) musicRef.current?.play().catch(() => {});
      if (audioStateRef.current.ambientEnabled) ambientRef.current?.play().catch(() => {});
    };
    window.addEventListener("pointerdown", resumeOnGesture, { once: true });
    window.addEventListener("keydown", resumeOnGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resumeOnGesture);
      window.removeEventListener("keydown", resumeOnGesture);
    };
  }, []);

  const updateAudio = useCallback((patch) => {
    setAudioState(prev => {
      const next = { ...prev, ...patch };
      try { localStorage.setItem("codetyper-audio", JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, []);

  const randomizeAudio = useCallback((kind) => {
    const list = kind === "music" ? MUSIC_TRACKS : AMBIENT_TRACKS;
    if (!list.length) return;
    const currentId = kind === "music" ? audioState.musicTrack : audioState.ambientTrack;
    const pool = list.filter(t => t.id !== currentId);
    const pick = (pool.length ? pool : list)[Math.floor(Math.random() * (pool.length ? pool.length : list.length))];
    updateAudio(kind === "music"
      ? { musicTrack: pick.id, musicEnabled: true }
      : { ambientTrack: pick.id, ambientEnabled: true });
  }, [audioState.musicTrack, audioState.ambientTrack, updateAudio]);

  // Sonido de tecla — uno nuevo por pulsación (no reutiliza un <audio> único
  // porque al escribir rápido se solapan varias pulsaciones antes de que
  // termine el clic anterior).
  const playKeyClick = useCallback(() => {
    if (!audioState.keyboardEnabled || !KEYBOARD_SOUNDS.length) return;
    const file = KEYBOARD_SOUNDS[Math.floor(Math.random() * KEYBOARD_SOUNDS.length)];
    const click = new Audio(file);
    click.volume = audioState.keyboardVolume / 100;
    click.play().catch(() => {});
  }, [audioState.keyboardEnabled, audioState.keyboardVolume]);

  // Volumen en vivo
  useEffect(() => { if (musicRef.current) musicRef.current.volume = audioState.musicVolume / 100; }, [audioState.musicVolume]);
  useEffect(() => { if (ambientRef.current) ambientRef.current.volume = audioState.ambientVolume / 100; }, [audioState.ambientVolume]);

  // Play/pause — sigue sonando aunque se cierre el panel, porque los <audio>
  // viven aquí (LayoutClient), no dentro de AudioPanel.
  useEffect(() => {
    const el = musicRef.current;
    if (!el) return;
    if (audioState.musicEnabled && audioState.musicTrack) el.play().catch(() => {});
    else el.pause();
  }, [audioState.musicEnabled, audioState.musicTrack]);
  useEffect(() => {
    const el = ambientRef.current;
    if (!el) return;
    if (audioState.ambientEnabled && audioState.ambientTrack) el.play().catch(() => {});
    else el.pause();
  }, [audioState.ambientEnabled, audioState.ambientTrack]);

  // Modo aleatorio — con "loop" desactivado, el navegador sí dispara "ended"
  // al terminar la pista, y ahí encadenamos otra al azar en vez de repetirla.
  useEffect(() => {
    const el = musicRef.current;
    if (!el) return;
    const handleEnded = () => {
      if (audioStateRef.current.musicShuffle) randomizeAudio("music");
    };
    el.addEventListener("ended", handleEnded);
    return () => el.removeEventListener("ended", handleEnded);
  }, [randomizeAudio]);
  useEffect(() => {
    const el = ambientRef.current;
    if (!el) return;
    const handleEnded = () => {
      if (audioStateRef.current.ambientShuffle) randomizeAudio("ambient");
    };
    el.addEventListener("ended", handleEnded);
    return () => el.removeEventListener("ended", handleEnded);
  }, [randomizeAudio]);

  const musicSrc   = MUSIC_TRACKS.find(t => t.id === audioState.musicTrack)?.file;
  const ambientSrc = AMBIENT_TRACKS.find(t => t.id === audioState.ambientTrack)?.file;

  const audioCtx = useMemo(
    () => ({ ...audioState, update: updateAudio, randomize: randomizeAudio, playKeyClick }),
    [audioState, updateAudio, randomizeAudio, playKeyClick]
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem('codetyper-theme');
      if (saved === 'light') {
        setIsDark(false);
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch(e) {}
  }, []);

  // Aplica fuente/tamaño/acento guardados en Settings desde el primer render,
  // sin esperar a que el usuario abra ese panel.
  useEffect(() => {
    applyVisualSettings({ ...DEFAULT_SETTINGS, ...loadSettings() });
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(d => {
      const next = !d;
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
      try { localStorage.setItem('codetyper-theme', next ? 'dark' : 'light'); } catch(e) {}
      return next;
    });
  }, []);

  const setBackAction = useCallback((fn) => {
    backRef.current = fn || null;
    setHasBack(!!fn);
  }, []);

  const triggerBack = useCallback(() => {
    backRef.current?.();
  }, []);

  const navCtx = useMemo(
    () => ({ hasBack, setBackAction, triggerBack }),
    [hasBack, setBackAction, triggerBack]
  );

  const fetchStats = useCallback(async () => {
    if (!session?.user?.id) { setStats(null); return; }
    try {
      const res = await fetch("/api/stats");
      if (res.ok) setStats(await res.json());
    } catch (err) {
      console.error("Stats fetch error:", err);
    }
  }, [session?.user?.id]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  // Atajo de teclado Alt+T para abrir/cerrar la terminal
  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const terminalCtx = {
    open:          terminalOpen,
    openTerminal:  () => setTerminalOpen(true),
    closeTerminal: () => setTerminalOpen(false),
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
    <AudioContext.Provider value={audioCtx}>
    <StatsRefreshContext.Provider value={fetchStats}>
      <NavContext.Provider value={navCtx}>
      <TerminalContext.Provider value={terminalCtx}>
 <Navbar
  onToggleAuth={() => setAuthOpen(v => !v)}
  authOpen={authOpen}
  onOpenSettings={() => setSettingsOpen(true)}
  onOpenAudio={() => setAudioOpen(true)}
  onToggleInstructions={() => setInstructionsOpen(v => !v)}
  instructionsOpen={instructionsOpen}
/>
        <div style={{ flex: 1, overflow: "hidden", display: "flex", width: "100%" }}>
          {children}
        </div>

        <AuthPanel
          session={session}
          stats={stats}
          open={authOpen}
          onClose={() => setAuthOpen(false)}
        />
        <InstructionsPanel
          open={instructionsOpen}
          onClose={() => setInstructionsOpen(false)}
        />
        <GlobalTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />

        {/* Reproductores persistentes: viven aquí para seguir sonando aunque
            se cierre el panel de Audio o se navegue entre pantallas. */}
        <audio ref={musicRef}   src={musicSrc}   loop={!audioState.musicShuffle}   preload="none" />
        <audio ref={ambientRef} src={ambientSrc} loop={!audioState.ambientShuffle} preload="none" />
      </TerminalContext.Provider>
      </NavContext.Provider>
    </StatsRefreshContext.Provider>
    {settingsOpen && (
  <SettingsScreen onClose={() => setSettingsOpen(false)} />
)}
    {audioOpen && (
  <AudioPanel onClose={() => setAudioOpen(false)} />
)}
    </AudioContext.Provider>
    </ThemeContext.Provider>
  );
}
