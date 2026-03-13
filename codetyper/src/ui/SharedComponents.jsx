// ─── ProgressBar.jsx ──────────────────────────────────────────────────────────
"use client";
export function ProgressBar({ value, max }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ width: "100%", height: "2px", background: "#21262d" }}>
      <div style={{
        height: "100%",
        width: `${pct}%`,
        background: "linear-gradient(90deg, #82aaff, #c792ea)",
        transition: "width 0.1s ease",
      }} />
    </div>
  );
}

// ─── TopBar.jsx ───────────────────────────────────────────────────────────────
export function TopBar({ language, title, cursor, total, onBack }) {
  return (
    <div style={topStyles.bar}>
      <button style={topStyles.back} onClick={onBack}>← volver</button>
      <div style={topStyles.center}>
        <span style={{ color: "#546e7a" }}>{language}</span>
        <span style={{ color: "#30363d", margin: "0 8px" }}>/</span>
        <span style={{ color: "#c9d1d9" }}>{title}</span>
      </div>
      <div style={topStyles.right}>
        <span style={{ color: "#4ec994" }}>{cursor}</span>
        <span style={{ color: "#546e7a" }}>/{total}</span>
      </div>
    </div>
  );
}

const topStyles = {
  bar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    borderBottom: "1px solid #21262d",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "12px",
  },
  back: {
    background: "none",
    border: "none",
    color: "#546e7a",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "'JetBrains Mono', monospace",
    padding: "4px 0",
  },
  center: { fontSize: "12px" },
  right: { fontSize: "12px" },
};

// ─── BottomBar.jsx ────────────────────────────────────────────────────────────
export function BottomBar({ errors, accuracy, elapsed, nextChar }) {
  const nextLabel =
    nextChar === "\n" ? "↵ Enter" :
    nextChar === " "  ? "· space" :
    nextChar ? `"${nextChar}"` : "✓ done";

  return (
    <div style={bottomStyles.bar}>
      <Stat label="errores" value={errors} color={errors > 0 ? "#ff5555" : "#4ec994"} />
      <Stat label="precisión" value={`${accuracy}%`} color="#ffcb6b" />
      <Stat label="tiempo" value={`${elapsed}s`} color="#82aaff" />
      <Stat label="próximo" value={nextLabel} color="#c792ea" />
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={bottomStyles.item}>
      <span style={bottomStyles.label}>{label}</span>
      <span style={{ ...bottomStyles.value, color }}>{value}</span>
    </div>
  );
}

const bottomStyles = {
  bar: {
    display: "flex",
    gap: "32px",
    padding: "16px 24px",
    borderTop: "1px solid #21262d",
    justifyContent: "center",
    fontFamily: "'JetBrains Mono', monospace",
  },
  item: { display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" },
  label: {
    color: "#546e7a",
    fontSize: "10px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  value: { fontSize: "18px", fontWeight: "500" },
};
