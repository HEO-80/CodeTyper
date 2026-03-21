"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { useSession }  from "next-auth/react";
import Navbar          from "@/components/ui/Navbar";
import AuthPanel       from "@/components/ui/AuthPanel";
import GlobalTerminal  from "@/components/ui/GlobalTerminal";

// ── Context para refrescar stats desde cualquier pantalla ─────────────────────
export const StatsRefreshContext = createContext(() => {});
export const useStatsRefresh = () => useContext(StatsRefreshContext);

export default function LayoutClient({ children }) {
  const { data: session } = useSession();
  const [authOpen, setAuthOpen] = useState(false);
  const [stats,    setStats]    = useState(null);

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

  return (
    <StatsRefreshContext.Provider value={fetchStats}>
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
      <GlobalTerminal />
    </StatsRefreshContext.Provider>
  );
}
