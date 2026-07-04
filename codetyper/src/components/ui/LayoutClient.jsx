"use client";

import { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext } from "react";
import { useSession }  from "next-auth/react";
import Navbar          from "@/components/ui/Navbar";
import AuthPanel       from "@/components/ui/AuthPanel";
import GlobalTerminal  from "@/components/ui/GlobalTerminal";
import SettingsScreen from "@/components/screens/SettingsScreen";

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

export default function LayoutClient({ children }) {
  const { data: session } = useSession();
  const [authOpen,     setAuthOpen]     = useState(false);
  const [stats,        setStats]        = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [hasBack,      setHasBack]      = useState(false);
  const [isDark,       setIsDark]       = useState(true);
  const backRef = useRef(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('codetyper-theme');
      if (saved === 'light') {
        setIsDark(false);
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch(e) {}
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
    <StatsRefreshContext.Provider value={fetchStats}>
      <NavContext.Provider value={navCtx}>
      <TerminalContext.Provider value={terminalCtx}>
 <Navbar
  onToggleAuth={() => setAuthOpen(v => !v)}
  authOpen={authOpen}
  onOpenSettings={() => setSettingsOpen(true)}
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
        <GlobalTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      </TerminalContext.Provider>
      </NavContext.Provider>
    </StatsRefreshContext.Provider>
    {settingsOpen && (
  <SettingsScreen onClose={() => setSettingsOpen(false)} />
)}
    </ThemeContext.Provider>
  );
}
