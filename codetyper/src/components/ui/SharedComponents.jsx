"use client";

import "./SharedComponents.css";

// ─── ProgressBar ──────────────────────────────────────────────────────────────
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

// ─── TopBar ───────────────────────────────────────────────────────────────────
export function TopBar({
  language,
  title,
  cursor,
  total,
  onBack,
  showComments,
  onToggleComments,
}) {
  return (
    <div style={topStyles.bar}>
      {/* Left: back */}
      <button style={topStyles.back} onClick={onBack}>
        ← volver
      </button>

      {/* Center: breadcrumb */}
      <div style={topStyles.center}>
        <span style={{ color: "#546e7a" }}>{language}</span>
        <span style={{ color: "#30363d", margin: "0 8px" }}>/</span>
        <span style={{ color: "#c9d1d9" }}>{title}</span>
      </div>

      {/* Right: comments toggle + counter */}
      <div style={topStyles.right}>
        {onToggleComments && (
          <button
            style={{
              ...topStyles.toggleBtn,
              background: showComments ? "#1a2a1a" : "transparent",
              borderColor: showComments ? "#4ec994" : "#30363d",
              color: showComments ? "#4ec994" : "#546e7a",
            }}
            onClick={onToggleComments}
            title="Activar/desactivar comentarios en inglés"
          >
            {showComments ? "// comments ON" : "// comments OFF"}
          </button>
        )}
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
    padding: "10px 24px",
    borderBottom: "1px solid #21262d",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "12px",
    gap: "12px",
    flexWrap: "wrap",
  },
  back: {
    background: "none",
    border: "none",
    color: "#546e7a",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "'JetBrains Mono', monospace",
    padding: "4px 0",
    whiteSpace: "nowrap",
  },
  center: {
    fontSize: "12px",
    flex: 1,
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    whiteSpace: "nowrap",
  },
  toggleBtn: {
    padding: "4px 10px",
    border: "1px solid",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "10px",
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "0.04em",
    transition: "all 0.15s",
  },
};

// ─── BottomBar ────────────────────────────────────────────────────────────────
export function BottomBar({ errors, accuracy, elapsed, nextChar, isOnIndent }) {

  // Hint inteligente del siguiente carácter
  let nextLabel;
  if (isOnIndent) {
    nextLabel = "⇥ Tab";
  } else if (nextChar === "\n") {
    nextLabel = "↵ Enter";
  } else if (nextChar === " ") {
    nextLabel = "· space";
  } else if (nextChar) {
    nextLabel = `"${nextChar}"`;
  } else {
    nextLabel = "✓ done";
  }

  const nextColor = isOnIndent ? "#ffcb6b" : "#c792ea";

  return (
    <div style={bottomStyles.bar}>
      <Stat
        label="errores"
        value={errors}
        color={errors > 0 ? "#ff5555" : "#4ec994"}
      />
      <Stat
        label="precisión"
        value={`${accuracy}%`}
        color={accuracy >= 95 ? "#4ec994" : accuracy >= 80 ? "#ffcb6b" : "#ff5555"}
      />
      <Stat
        label="tiempo"
        value={`${elapsed}s`}
        color="#82aaff"
      />
      <Stat
        label="próximo"
        value={nextLabel}
        color={nextColor}
      />
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
    flexWrap: "wrap",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
  },
  label: {
    color: "#546e7a",
    fontSize: "10px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  value: {
    fontSize: "18px",
    fontWeight: "500",
  },
};
