"use client";

import "./SharedComponents.css";

// --- ProgressBar -------------------------------------------------------------
export function ProgressBar({ value, max }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="progress-bar-track">
      <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

// --- TopBar ------------------------------------------------------------------
// Contains: back button | breadcrumb | live stats | toggles
export function TopBar({
  language, title, cursor, total,
  onBack,
  showComments, onToggleComments,
  errors, accuracy, elapsed,
  nextChar, isOnIndent, typedWrong,
  extraRight,
  onNext, hasNext,
}) {

  // Next key hint
  let nextLabel, nextColor;
  if (typedWrong) {
    nextLabel = "⌫";        nextColor = "#ff5555";
  } else if (isOnIndent) {
    nextLabel = "⇥ Tab";    nextColor = "#ffcb6b";
  } else if (nextChar === "\n") {
    nextLabel = "↵ Enter";  nextColor = "#82aaff";
  } else if (nextChar === " ") {
    nextLabel = "·";        nextColor = "#546e7a";
  } else if (nextChar) {
    nextLabel = `"${nextChar}"`;  nextColor = "#c792ea";
  } else {
    nextLabel = "✓";        nextColor = "#4ec994";
  }

  const accuracyColor = accuracy >= 95 ? "#4ec994" : accuracy >= 80 ? "#ffcb6b" : "#ff5555";

  return (
    <div style={s.bar}>

      {/* Left: back */}
      <button style={s.back} onClick={onBack}>← back</button>

      {/* Center: breadcrumb */}
      <div style={s.breadcrumb}>
        <span style={{ color: "#546e7a" }}>{language}</span>
        <span style={{ color: "#30363d", margin: "0 6px" }}>/</span>
        <span style={{ color: "#8b949e" }}>{title}</span>
      </div>

      {/* Right: live stats + toggles */}
      <div style={s.right}>

        {/* Live stats */}
        <div style={s.statsRow}>
          <MiniStat label="err"  value={errors ?? 0}      color={errors > 0 ? "#ff5555" : "#4ec994"} />
          <div style={s.divider} />
          <MiniStat label="acc"  value={`${accuracy ?? 100}%`} color={accuracyColor} />
          <div style={s.divider} />
          <MiniStat label="time" value={`${elapsed ?? 0}s`}    color="#82aaff" />
          <div style={s.divider} />
          <MiniStat label="next" value={nextLabel}              color={nextColor} />
        </div>

        {/* Progress counter */}
        <span style={s.counter}>
          <span style={{ color: "#4ec994" }}>{cursor}</span>
          <span style={{ color: "#30363d" }}>/{total}</span>
        </span>

        {/* Next snippet button */}
        {hasNext && onNext && (
          <button
            onClick={onNext}
            style={s.nextBtn}
            title="Siguiente snippet"
          >
            siguiente →
          </button>
        )}

        {/* Comments toggle */}
        {onToggleComments && (
          <button
            className={`topbar-toggle${showComments ? " active" : " inactive"}`}
            onClick={onToggleComments}
            title="Toggle English comments"
          >
            {showComments ? "// ON" : "// OFF"}
          </button>
        )}

        {/* Extra right slot — e.g. ContextPanel toggle button */}
        {extraRight}
      </div>
    </div>
  );
}

function MiniStat({ label, value, color }) {
  return (
    <div style={ms.wrap}>
      <span style={ms.label}>{label}</span>
      <span style={{ ...ms.value, color }}>{value}</span>
    </div>
  );
}

const ms = {
  wrap:  { display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" },
  label: { color: "#30363d", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase" },
  value: { fontSize: "13px", fontWeight: "500", lineHeight: 1 },
};

const s = {
  bar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 20px",
    borderBottom: "1px solid #21262d",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "12px",
    gap: "12px",
    flexWrap: "nowrap",
    position: "sticky",
    top: 0,
    background: "#0d1117",
    zIndex: 100,
  },
  back: {
    background: "none", border: "none", color: "#546e7a",
    cursor: "pointer", fontSize: "11px",
    fontFamily: "'JetBrains Mono', monospace",
    whiteSpace: "nowrap", padding: "4px 0",
    transition: "color 0.15s",
  },
  breadcrumb: {
    fontSize: "11px", flex: 1, textAlign: "center",
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
    minWidth: 0,
  },
  right: {
    display: "flex", alignItems: "center",
    gap: "12px", whiteSpace: "nowrap", flexShrink: 0,
  },
  statsRow: {
    display: "flex", alignItems: "center",
    gap: "10px",
    background: "#161b22",
    border: "1px solid #21262d",
    borderRadius: "6px",
    padding: "5px 12px",
  },
  divider: { width: "1px", height: "20px", background: "#21262d" },
  counter: { fontSize: "11px" },
  nextBtn: {
    padding: "4px 12px",
    background: "transparent",
    border: "1px solid #4ec994",
    borderRadius: "4px",
    color: "#4ec994",
    cursor: "pointer",
    fontSize: "10px",
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    transition: "all 0.15s",
  },
  toggleBtn: {
    padding: "3px 10px", borderRadius: "4px", cursor: "pointer",
    fontSize: "10px", fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "0.04em", transition: "all 0.15s",
  },
};

// --- BottomBar ---------------------------------------------------------------
// Kept as secondary info (can be hidden on small screens)
export function BottomBar({ errors, accuracy, elapsed, nextChar, isOnIndent, typedWrong }) {

  let nextLabel, nextColor;
  if (typedWrong) {
    nextLabel = "⌫ backspace"; nextColor = "#ff5555";
  } else if (isOnIndent) {
    nextLabel = "⇥ Tab";       nextColor = "#ffcb6b";
  } else if (nextChar === "\n") {
    nextLabel = "↵ Enter";     nextColor = "#82aaff";
  } else if (nextChar === " ") {
    nextLabel = "· space";     nextColor = "#546e7a";
  } else if (nextChar) {
    nextLabel = `"${nextChar}"`; nextColor = "#c792ea";
  } else {
    nextLabel = "✓ done";      nextColor = "#4ec994";
  }

  return (
    <div style={bs.bar}>
      <Stat label="errors"    value={errors}           color={errors > 0 ? "#ff5555" : "#4ec994"} />
      <Stat label="accuracy"  value={`${accuracy}%`}  color={accuracy >= 95 ? "#4ec994" : accuracy >= 80 ? "#ffcb6b" : "#ff5555"} />
      <Stat label="time"      value={`${elapsed}s`}   color="#82aaff" />
      <Stat label="next"      value={nextLabel}        color={nextColor} />
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={bs.item}>
      <span style={bs.label}>{label}</span>
      <span style={{ ...bs.value, color }}>{value}</span>
    </div>
  );
}

const bs = {
  bar: {
    display: "flex", gap: "32px", padding: "14px 24px",
    borderTop: "1px solid #21262d", justifyContent: "center",
    fontFamily: "'JetBrains Mono', monospace", flexWrap: "wrap",
  },
  item:  { display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" },
  label: { color: "#546e7a", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" },
  value: { fontSize: "16px", fontWeight: "500" },
};
