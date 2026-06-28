"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { useSession }  from "next-auth/react";
import Navbar          from "@/components/ui/Navbar";
import AuthPanel       from "@/components/ui/AuthPanel";
import GlobalTerminal  from "@/components/ui/GlobalTerminal";

// ── Context para refrescar stats desde cualquier pantalla ─────────────────────
export const StatsRefreshContext = createContext(() => {});
export const useStatsRefresh = () => useContext(StatsRefreshContext);

// ── Context para controlar la terminal global ─────────────────────────────────
export const TerminalContext = createContext({ open: false, openTerminal: () => {}, closeTerminal: () => {} });
export const useTerminal = () => useContext(TerminalContext);

export default function LayoutClient({ children }) {
  const { data: session } = useSession();
  const [authOpen,     setAuthOpen]     = useState(false);
  const [stats,        setStats]        = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);

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
    <StatsRefreshContext.Provider value={fetchStats}>
      <TerminalContext.Provider value={terminalCtx}>
        <Navbar onToggleAuth={() => setAuthOpen(v => !v)} authOpen={authOpen} />

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
    </StatsRefreshContext.Provider>
  );
}
