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

// --- Descomposición de la tecla siguiente en modificador + tecla física ------
// Reutiliza la misma idea que KeyboardPanel (Shift + letra), para que TopBar
// y BottomBar puedan mostrar "⇧ Shift + t" en vez de solo `"T"`.
const US_SHIFT_MAP = {
  "!": "1", "@": "2", "#": "3", "$": "4", "%": "5", "^": "6", "&": "7",
  "*": "8", "(": "9", ")": "0", "_": "-", "+": "=", "~": "`",
  "{": "[", "}": "]", "|": "\\", ":": ";", '"': "'", "<": ",", ">": ".", "?": "/",
};

function decomposeNextKey({ typedWrong, isOnIndent, nextChar }) {
  if (typedWrong)            return { mod: null,       label: "⌫",      wide: false, kind: "err"  };
  if (isOnIndent)            return { mod: null,       label: "⇥ Tab",  wide: true,  kind: "tab"  };
  if (nextChar === "\n")     return { mod: null,       label: "↵ Enter",wide: true,  kind: "enter"};
  if (nextChar === " ")      return { mod: null,       label: "␣",      wide: false, kind: "space"};
  if (!nextChar)             return { mod: null,       label: "✓",      wide: false, kind: "done" };
  if (/^[A-Z]$/.test(nextChar))
                              return { mod: "⇧ Shift",  label: nextChar.toLowerCase(), wide: false, kind: "char" };
  if (US_SHIFT_MAP[nextChar])
                              return { mod: "⇧ Shift",  label: US_SHIFT_MAP[nextChar], wide: false, kind: "char" };
  return { mod: null, label: nextChar, wide: false, kind: "char" };
}

// --- TopBar (sub-navbar) ------------------------------------------------------
// Contains: back button | translation toggle | breadcrumb | stats capsule | toggles
export function TopBar({
  language, title, cursor, total,
  onBack,
  showComments, onToggleComments,
  errors, accuracy, elapsed,
  nextChar, isOnIndent, typedWrong,
  extraLeft, extraRight,
  onNext, hasNext,
}) {
  const combo = decomposeNextKey({ typedWrong, isOnIndent, nextChar });
  const nextColorVar =
    combo.kind === "err"   ? "var(--hl-red)" :
    combo.kind === "tab"   ? "var(--hl-yellow)" :
    combo.kind === "enter" ? "var(--hl-blue)" :
    combo.kind === "space" ? "var(--tx3)" :
    combo.kind === "done"  ? "var(--hl-green)" : "var(--hl-purple)";

  const accuracyColor = accuracy >= 95 ? "var(--hl-green)" : accuracy >= 80 ? "var(--hl-yellow)" : "var(--hl-red)";

  return (
    <div className="subnav">

      {/* Left: back + translation toggle */}
      <button className="subnav-back" onClick={onBack}>← back</button>
      {extraLeft}

      {/* Center: breadcrumb */}
      <div className="subnav-breadcrumb">
        <span className="subnav-breadcrumb-lang">{language}</span>
        <span className="subnav-breadcrumb-sep">/</span>
        <span className="subnav-breadcrumb-title">{title}</span>
      </div>

      {/* Right: stats capsule + toggles */}
      <div className="subnav-right">

        {/* Stats capsule — one elevated piece */}
        <div className="stats-capsule">
          <div className="stats-capsule__cell">
            <MiniStat label="err"  value={errors ?? 0}      color={errors > 0 ? "var(--hl-red)" : "var(--hl-green)"} className="stat--err" />
          </div>
          <div className="stats-capsule__cell">
            <MiniStat label="acc"  value={`${accuracy ?? 100}%`} color={accuracyColor} className="stat--acc" />
          </div>
          <div className="stats-capsule__cell">
            <MiniStat label="time" value={`${elapsed ?? 0}s`}    color="var(--hl-blue)" className="stat--time" />
          </div>
          <div className="stats-capsule__cell">
            <MiniStat label="next" value={combo.label}           color={nextColorVar} className="stat--next" />
          </div>
        </div>

        {/* Progress counter */}
        <span className="subnav-counter">
          <span className="subnav-counter-cursor">{cursor}</span>
          <span className="subnav-counter-total">/{total}</span>
        </span>

        {/* Next snippet button */}
        {hasNext && onNext && (
          <button onClick={onNext} className="subnav-next-btn" title="Siguiente snippet">
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

function MiniStat({ label, value, color, className }) {
  return (
    <div className={`mini-stat-wrap ${className || ""}`}>
      <span className="mini-stat-label">{label}</span>
      <span className="mini-stat-value" style={{ color }}>{value}</span>
    </div>
  );
}

// --- BottomBar (footer) -------------------------------------------------------
// Kept as secondary info (can be hidden on small screens)
export function BottomBar({ errors, accuracy, elapsed, nextChar, isOnIndent, typedWrong }) {
  const combo = decomposeNextKey({ typedWrong, isOnIndent, nextChar });
  const nextColorVar =
    combo.kind === "err"   ? "var(--hl-red)" :
    combo.kind === "tab"   ? "var(--hl-yellow)" :
    combo.kind === "enter" ? "var(--hl-blue)" :
    combo.kind === "space" ? "var(--tx3)" :
    combo.kind === "done"  ? "var(--hl-green)" : "var(--hl-purple)";

  return (
    <div className="practice-footer">
      <Stat label="errors"   value={errors}          color={errors > 0 ? "var(--hl-red)" : "var(--hl-green)"} modifier="err" />
      <Stat label="accuracy" value={`${accuracy}%`}  color={accuracy >= 95 ? "var(--hl-green)" : accuracy >= 80 ? "var(--hl-yellow)" : "var(--hl-red)"} modifier="acc" />
      <Stat label="time"     value={`${elapsed}s`}   color="var(--hl-blue)" modifier="time" />

      <div className="footer-divider" />

      <div className="footer-next">
        <span className="footer-stat__label">NEXT KEY</span>
        <div className="footer-next-combo">
          {combo.mod && (
            <>
              <span className="next-key next-key--mod">{combo.mod}</span>
              <span className="next-key-plus">+</span>
            </>
          )}
          <span className={`next-key${combo.wide ? " next-key--wide" : ""}`} style={{ color: nextColorVar }}>
            {combo.label}
          </span>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color, modifier }) {
  return (
    <div className={`footer-stat footer-stat--${modifier}`}>
      <span className="footer-stat__label">{label}</span>
      <span className="footer-stat__value" style={{ color }}>{value}</span>
    </div>
  );
}
