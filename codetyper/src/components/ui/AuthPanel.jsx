"use client";

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import "./AuthPanel.css";

// ── Fase colors & icons ───────────────────────────────────────────────────────
const PHASE_COLORS = {
  1: "var(--tx3)",
  2: "var(--hl-green)",
  3: "var(--hl-blue)",
  4: "var(--hl-purple)",
  5: "var(--hl-yellow)",
};
const PHASE_ICONS = { 1: "○", 2: "◔", 3: "◑", 4: "◕", 5: "●" };
const PHASE_DESCRIPTIONS = {
  1: "Familiarizándote con la sintaxis",
  2: "El patrón empieza a ser reconocible",
  3: "Ya no necesitas pensar cada carácter",
  4: "Escritura automática, muscle memory activa",
  5: "El lenguaje forma parte de tu memoria muscular",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTime(seconds) {
  if (!seconds || seconds < 60) return `${seconds || 0}s`;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

// ── Sparkline SVG ─────────────────────────────────────────────────────────────
function Sparkline({ values = [], color = "var(--hl-blue)", width = 180, height = 32 }) {
  if (values.length < 2) return (
    <div style={{ height, display: "flex", alignItems: "center" }}>
      <span style={{ color: "var(--tx8)", fontSize: "10px" }}>pocas sesiones aún</span>
    </div>
  );

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pad = 3;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const points = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * w;
    const y = pad + h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");

  const lastX = pad + w;
  const lastY = pad + h - ((values[values.length - 1] - min) / range) * h;

  return (
    <svg width={width} height={height} style={{ display: "block", overflow: "visible" }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
    </svg>
  );
}

export default function AuthPanel({ session, stats, open }) {
  const [mode,     setMode]     = useState("login");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [form,     setForm]     = useState({ name: "", email: "", password: "" });
  // Estado de expand separado — NO depende de stats, no se resetea al refrescar
  const [expanded, setExpanded] = useState(null);

  const handleCredentials = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (mode === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
    }
    const result = await signIn("credentials", {
      email: form.email, password: form.password, redirect: false,
    });
    setLoading(false);
    if (result?.error) setError("Email o contraseña incorrectos");
  };

  const handleGoogle = () => signIn("google", { redirect: false });

  // ── Stats derivadas ───────────────────────────────────────────────────────
  const globalAvgAccuracy = stats?.langProgress
    ? (() => {
        const entries = Object.values(stats.langProgress);
        if (!entries.length) return null;
        return Math.round(
          entries.reduce((acc, d) => acc + (d.avgAccuracy || 0), 0) / entries.length
        );
      })()
    : null;

  // Tiempo estimado: totalChars / 5 chars por segundo (≈300 CPM)
  const estimatedSeconds = stats?.totalChars ? Math.round(stats.totalChars / 5) : null;

  // Sparkline global: últimas sesiones recientes (vienen del GET /api/stats)
  const globalCpmHistory = stats?.recentSessions
  ? [...stats.recentSessions].reverse().map(s => s.cpm).filter(v => typeof v === "number" && !isNaN(v))
  : [];

  
  // const globalCpmHistory = stats?.recentSessions
  //   ? [...stats.recentSessions].reverse().map(s => s.cpm).filter(Boolean)
  //   : [];

  // ── Logged in ─────────────────────────────────────────────────────────────
  if (session?.user) {
    return (
      // ⚠️ SIN auth-backdrop — el panel ya NO se cierra al hacer clic en la página
      <div className={`auth-panel${open ? " auth-panel--open" : ""}`}>

        {/* User row */}
        <div className="auth-user-row">
          {session.user.image
            ? <img src={session.user.image} alt="" className="auth-avatar" />
            : <div className="auth-avatar-placeholder">{session.user.name?.[0]?.toUpperCase()}</div>
          }
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div className="auth-username">{session.user.name}</div>
            <div className="auth-useremail">{session.user.email}</div>
          </div>
        </div>

        {/* Stats fila principal */}
        {stats && (
          <div className="auth-stats-row">
            <Stat label="sessions" value={stats.totalSessions} />
            <Stat label="best CPM" value={stats.bestCpm} color="var(--hl-blue)" />
            <Stat label="chars"
              value={stats.totalChars > 9999
                ? `${(stats.totalChars / 1000).toFixed(1)}k`
                : stats.totalChars}
            />
          </div>
        )}

        {/* Stats extra: precisión + tiempo */}
        {stats && (
          <div className="auth-extra-stats">
            <div className="auth-extra-stat">
              <span className="auth-extra-label">// precisión global</span>
              <span className="auth-extra-value" style={{ color: "var(--hl-green)" }}>
                {globalAvgAccuracy != null ? `${globalAvgAccuracy}%` : "—"}
              </span>
            </div>
            <div className="auth-extra-stat">
              <span className="auth-extra-label">// tiempo total</span>
              <span className="auth-extra-value" style={{ color: "var(--hl-yellow)" }}>
                {estimatedSeconds != null ? formatTime(estimatedSeconds) : "—"}
              </span>
            </div>
          </div>
        )}

        {/* Sparkline CPM global */}
        {globalCpmHistory.length >= 2 && (
          <div className="auth-sparkline-section">
            <div className="auth-section-label">// CPM últimas sesiones</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkline values={globalCpmHistory} color="var(--hl-blue)" width={155} height={30} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1px" }}>
                <span style={{ color: "var(--hl-blue)", fontSize: "11px", fontWeight: 700 }}>
                  {globalCpmHistory[globalCpmHistory.length - 1]}
                </span>
                <span style={{ color: "var(--tx8)", fontSize: "10px" }}>último</span>
              </div>
            </div>
          </div>
        )}

        {/* Lang progress */}
        {stats && Object.keys(stats.langProgress || {}).length > 0 && (
          <div className="auth-lang-section">
            
            <div className="auth-section-label">// progreso por lenguaje</div>
            {Object.entries(stats.langProgress).map(([lang, data]) => (
              <LangCard
                key={lang}
                lang={lang}
                data={data}
                expanded={expanded === lang}
                onToggle={() => setExpanded(prev => prev === lang ? null : lang)}
              />
            ))}
          </div>
        )}

        <button className="auth-signout" onClick={() => signOut({ redirect: false })}>
          ← sign out
        </button>
      </div>
    );
  }

  // ── Login / Register ──────────────────────────────────────────────────────
  return (
    // SIN backdrop aquí tampoco
    <div className={`auth-panel${open ? " auth-panel--open" : ""}`}>
      <div className="auth-title">
        <span style={{ color: "var(--hl-blue)" }}>◉</span> CodeTyper
      </div>

      <button className="auth-google-btn" onClick={handleGoogle}>
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="auth-divider">
        <span className="auth-divider-line" />
        <span className="auth-divider-text">or</span>
        <span className="auth-divider-line" />
      </div>

      <form onSubmit={handleCredentials} className="auth-form">
        {mode === "register" && (
          <input className="auth-input" type="text" placeholder="Name"
            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        )}
        <input className="auth-input" type="email" placeholder="Email"
          value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
        <input className="auth-input" type="password" placeholder="Password"
          value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-submit" type="submit" disabled={loading}>
          {loading ? "..." : mode === "login" ? "Sign in" : "Create account"}
        </button>
      </form>

      <div className="auth-toggle-row">
        <span className="auth-toggle-text">
          {mode === "login" ? "No account?" : "Already registered?"}
        </span>
        <button className="auth-toggle-btn"
          onClick={() => { setMode(m => m === "login" ? "register" : "login"); setError(""); }}>
          {mode === "login" ? "Register" : "Sign in"}
        </button>
      </div>
    </div>
  );
}

// ── LangCard ──────────────────────────────────────────────────────────────────
function LangCard({ lang, data, expanded, onToggle }) {
  const phaseColor = PHASE_COLORS[data.phase] || "var(--tx3)";
  const phaseIcon  = PHASE_ICONS[data.phase]  || "○";
  const next       = data.nextPhase;
  const langHistory = (data.lastTenCpm || data.lastFiveCpm || []).filter(v => typeof v === "number" && !isNaN(v));

  return (
    <div className={`lang-card${expanded ? " expanded" : ""}`} data-lang={lang}>
      <div className="lang-card-header" onClick={onToggle}>
        <span style={{ color: phaseColor, fontSize: "12px" }}>{phaseIcon}</span>
        <span className="lang-card-name">{lang}</span>
        <span style={{ color: phaseColor, fontSize: "10px" }}>{data.phaseLabel || "Fase 1"}</span>
        <span className="lang-card-chevron">{expanded ? "▲" : "▼"}</span>
      </div>

      <div className="lang-card-bar-bg">
        <div className="lang-card-bar-fill" style={{
          width: `${next?.pct || 0}%`,
          background: phaseColor,
        }} />
      </div>

      <div className="lang-card-meta">
        <span>{data.sessionsCompleted} sesiones</span>
        <span>{data.avgCpm || data.bestCpm} CPM avg</span>
      </div>

      {expanded && (
        <div className="lang-card-detail">
          <div className="lang-card-phase-title" style={{ color: phaseColor }}>
            {phaseIcon} FASE {data.phase} — {data.phaseLabel}
          </div>
          <div className="lang-card-phase-desc">{PHASE_DESCRIPTIONS[data.phase]}</div>

          <div className="lang-card-grid">
            <MiniStat label="Mejor CPM"    value={data.bestCpm}           color="var(--hl-blue)" />
            <MiniStat label="Avg CPM"      value={data.avgCpm}            color="var(--hl-blue)" />
            <MiniStat label="Precisión"    value={`${data.avgAccuracy}%`} color="var(--hl-green)" />
            <MiniStat label="Consistencia" value={`${data.consistency}%`} color="var(--hl-yellow)" />
          </div>

          {/* Sparkline por lenguaje */}
          {langHistory.length >= 2 && (
            <div style={{ marginBottom: "8px" }}>
              <div style={{ color: "var(--tx8)", fontSize: "10px", marginBottom: "4px" }}>evolución CPM</div>
              <Sparkline values={langHistory} color={phaseColor} width={168} height={26} />
            </div>
          )}

          {data.improvementPct !== 0 && (
            <div className="lang-card-improvement">
              <span>Mejora desde inicio: </span>
              <span style={{ color: data.improvementPct > 0 ? "var(--hl-green)" : "var(--hl-red)", fontWeight: "600" }}>
                {data.improvementPct > 0 ? "+" : ""}{data.improvementPct}%
              </span>
            </div>
          )}

          {next && next.pct < 100 && (
            <div className="lang-card-next">
              <div>→ Siguiente: {next.nextPhase}</div>
              {next.sessionsNeeded > 0 && <div>• {next.sessionsNeeded} sesiones más</div>}
              {next.cpmNeeded      > 0 && <div>• +{next.cpmNeeded} CPM promedio</div>}
              {next.accuracyNeeded > 0 && <div>• +{next.accuracyNeeded}% precisión</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value, color = "var(--tx)" }) {
  return (
    <div className="mini-stat">
      <div style={{ color, fontSize: "13px", fontWeight: "600" }}>{value ?? 0}</div>
      <div className="mini-stat-label">{label}</div>
    </div>
  );
}

function Stat({ label, value, color = "var(--tx)" }) {
  return (
    <div className="stat">
      <div style={{ color, fontSize: "17px", fontWeight: "700" }}>{value ?? 0}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
