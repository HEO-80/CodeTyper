"use client";

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import "./AuthPanel.css";

const LEVEL_COLORS = { master: "#FCEE0A", advanced: "#c792ea", intermediate: "#82aaff", beginner: "#4ec994" };
const LEVEL_LABELS = { master: "◆ Master", advanced: "▲ Advanced", intermediate: "● Intermediate", beginner: "○ Beginner" };

export default function AuthPanel({ session, stats, open, onClose }) {
  const [mode,    setMode]    = useState("login");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [form,    setForm]    = useState({ name: "", email: "", password: "" });

  if (!open) return null;

  const handleCredentials = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    if (mode === "register") {
      const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name, email: form.email, password: form.password }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
    }
    const result = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    setLoading(false);
    if (result?.error) setError("Invalid email or password");
  };

  return (
    <>
      <div className="auth-backdrop" onClick={onClose} />
      <div className="auth-panel">
        {session?.user ? (
          <>
            <div className="auth-user-row">
              {session.user.image
                ? <img src={session.user.image} alt="" className="auth-avatar" />
                : <div className="auth-avatar-placeholder">{session.user.name?.[0]?.toUpperCase() || "U"}</div>
              }
              <div style={{ overflow: "hidden" }}>
                <div className="auth-username">{session.user.name}</div>
                <div className="auth-useremail">{session.user.email}</div>
              </div>
            </div>
            {stats && <>
              <div className="auth-stats-row">
                <Stat label="sessions" value={stats.totalSessions} />
                <Stat label="best CPM" value={stats.bestCpm} color="#82aaff" />
                <Stat label="chars"    value={stats.totalChars} />
              </div>
              {Object.keys(stats.langProgress || {}).length > 0 && (
                <div className="auth-lang-section">
                  <div className="auth-section-label">// progress</div>
                  {Object.entries(stats.langProgress).map(([lang, data]) => <LangRow key={lang} lang={lang} data={data} />)}
                </div>
              )}
            </>}
            <button className="auth-signout" onClick={() => signOut({ redirect: false })}>← sign out</button>
          </>
        ) : (
          <>
            <div className="auth-title"><span style={{ color: "#82aaff" }}>◉</span> CodeTyper</div>
            <button className="auth-google-btn" onClick={() => signIn("google", { redirect: false })}>
              <GoogleIcon /> Continue with Google
            </button>
            <div className="auth-divider">
              <span className="auth-divider-line" /><span className="auth-divider-text">or</span><span className="auth-divider-line" />
            </div>
            <form onSubmit={handleCredentials} className="auth-form">
              {mode === "register" && <input className="auth-input" type="text" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />}
              <input className="auth-input" type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              <input className="auth-input" type="password" placeholder="Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
              {error && <div className="auth-error">{error}</div>}
              <button className="auth-submit" type="submit" disabled={loading}>{loading ? "..." : mode === "login" ? "Sign in" : "Create account"}</button>
            </form>
            <div className="auth-toggle-row">
              <span className="auth-toggle-text">{mode === "login" ? "No account?" : "Already registered?"}</span>
              <button className="auth-toggle-btn" onClick={() => { setMode(m => m === "login" ? "register" : "login"); setError(""); }}>{mode === "login" ? "Register" : "Sign in"}</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function Stat({ label, value, color = "#c9d1d9" }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ color, fontSize: "16px", fontWeight: "700" }}>{value ?? 0}</div>
      <div style={{ color: "#3d5266", fontSize: "9px", letterSpacing: "0.06em" }}>{label}</div>
    </div>
  );
}

function LangRow({ lang, data }) {
  const color = LEVEL_COLORS[data.level] || "#4ec994";
  const pct   = Math.min(100, Math.round((data.sessionsCompleted / 30) * 100));
  return (
    <div style={{ marginBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
        <span style={{ color: "#8b949e", fontSize: "11px" }}>{lang}</span>
        <span style={{ color, fontSize: "10px" }}>{LEVEL_LABELS[data.level]}</span>
      </div>
      <div style={{ height: "2px", background: "#21262d", borderRadius: "1px" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: "1px", transition: "width 0.3s" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2px" }}>
        <span style={{ color: "#3d5266", fontSize: "10px" }}>{data.sessionsCompleted} sessions</span>
        <span style={{ color: "#3d5266", fontSize: "10px" }}>{data.bestCpm} CPM</span>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
