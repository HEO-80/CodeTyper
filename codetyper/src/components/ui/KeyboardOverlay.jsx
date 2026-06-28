"use client";

import { useState } from "react";
import "./KeyboardOverlay.css";

// Full keyboard layout with ES/EN symbols
// Each key: { main, shift, alt?, altShift?, label? }
const ROWS = {
  en: [
    // Row 0 — numbers
    [
      { main: "`", shift: "~" },
      { main: "1", shift: "!" },
      { main: "2", shift: "@" },
      { main: "3", shift: "#" },
      { main: "4", shift: "$" },
      { main: "5", shift: "%" },
      { main: "6", shift: "^" },
      { main: "7", shift: "&" },
      { main: "8", shift: "*" },
      { main: "9", shift: "(" },
      { main: "0", shift: ")" },
      { main: "-", shift: "_" },
      { main: "=", shift: "+" },
      { main: "⌫", shift: "", label: "Backspace", wide: true },
    ],
    // Row 1 — QWERTY
    [
      { main: "Tab", shift: "", label: "Tab", wide: true },
      { main: "q", shift: "Q" }, { main: "w", shift: "W" },
      { main: "e", shift: "E" }, { main: "r", shift: "R" },
      { main: "t", shift: "T" }, { main: "y", shift: "Y" },
      { main: "u", shift: "U" }, { main: "i", shift: "I" },
      { main: "o", shift: "O" }, { main: "p", shift: "P" },
      { main: "[", shift: "{" },
      { main: "]", shift: "}" },
      { main: "\\", shift: "|" },
    ],
    // Row 2 — ASDF
    [
      { main: "Caps", shift: "", label: "Caps", wide: true },
      { main: "a", shift: "A" }, { main: "s", shift: "S" },
      { main: "d", shift: "D" }, { main: "f", shift: "F" },
      { main: "g", shift: "G" }, { main: "h", shift: "H" },
      { main: "j", shift: "J" }, { main: "k", shift: "K" },
      { main: "l", shift: "L" },
      { main: ";", shift: ":" },
      { main: "'", shift: '"' },
      { main: "↵", shift: "", label: "Enter", wide: true },
    ],
    // Row 3 — ZXCV
    [
      { main: "⇧", shift: "", label: "Shift", wide: true },
      { main: "z", shift: "Z" }, { main: "x", shift: "X" },
      { main: "c", shift: "C" }, { main: "v", shift: "V" },
      { main: "b", shift: "B" }, { main: "n", shift: "N" },
      { main: "m", shift: "M" },
      { main: ",", shift: "<" },
      { main: ".", shift: ">" },
      { main: "/", shift: "?" },
      { main: "⇧", shift: "", label: "Shift", wide: true },
    ],
    // Row 4 — Space
    [
      { main: "Ctrl", shift: "", label: "Ctrl" },
      { main: "Alt", shift: "", label: "Alt" },
      { main: " ", shift: "", label: "Space", space: true },
      { main: "Alt", shift: "", label: "AltGr" },
      { main: "Ctrl", shift: "", label: "Ctrl" },
    ],
  ],
  es: [
    // Row 0
    [
      { main: "º", shift: "ª" },
      { main: "1", shift: "!" },
      { main: "2", shift: '"', alt: "@" },
      { main: "3", shift: "·", alt: "#" },
      { main: "4", shift: "$", alt: "~" },
      { main: "5", shift: "%", alt: "½" },
      { main: "6", shift: "&", alt: "¬" },
      { main: "7", shift: "/" },
      { main: "8", shift: "(" },
      { main: "9", shift: ")" },
      { main: "0", shift: "=" },
      { main: "'", shift: "?" },
      { main: "¡", shift: "¿" },
      { main: "⌫", shift: "", label: "Backspace", wide: true },
    ],
    // Row 1
    [
      { main: "Tab", shift: "", label: "Tab", wide: true },
      { main: "q", shift: "Q" }, { main: "w", shift: "W" },
      { main: "e", shift: "E" }, { main: "r", shift: "R" },
      { main: "t", shift: "T" }, { main: "y", shift: "Y" },
      { main: "u", shift: "U" }, { main: "i", shift: "I" },
      { main: "o", shift: "O" }, { main: "p", shift: "P" },
      { main: "`", shift: "^", alt: "[" },
      { main: "+", shift: "*", alt: "]" },
      { main: "ç", shift: "Ç", alt: "}" },
    ],
    // Row 2
    [
      { main: "Caps", shift: "", label: "Caps", wide: true },
      { main: "a", shift: "A" }, { main: "s", shift: "S" },
      { main: "d", shift: "D" }, { main: "f", shift: "F" },
      { main: "g", shift: "G" }, { main: "h", shift: "H" },
      { main: "j", shift: "J" }, { main: "k", shift: "K" },
      { main: "l", shift: "L" },
      { main: "ñ", shift: "Ñ" },
      { main: "´", shift: "¨", alt: "{" },
      { main: "↵", shift: "", label: "Enter", wide: true },
    ],
    // Row 3
    [
      { main: "⇧", shift: "", label: "Shift", wide: true },
      { main: "<", shift: ">" },
      { main: "z", shift: "Z" }, { main: "x", shift: "X" },
      { main: "c", shift: "C" }, { main: "v", shift: "V" },
      { main: "b", shift: "B" }, { main: "n", shift: "N" },
      { main: "m", shift: "M" },
      { main: ",", shift: ";" },
      { main: ".", shift: ":" },
      { main: "-", shift: "_" },
      { main: "⇧", shift: "", label: "Shift", wide: true },
    ],
    // Row 4
    [
      { main: "Ctrl", shift: "", label: "Ctrl" },
      { main: "Alt", shift: "", label: "Alt" },
      { main: " ", shift: "", label: "Space", space: true },
      { main: "Alt", shift: "", label: "AltGr" },
      { main: "Ctrl", shift: "", label: "Ctrl" },
    ],
  ],
};

// Highlight keys useful for programming
const PROG_SYMBOLS = new Set([
  "{", "}", "[", "]", "(", ")", "<", ">",
  ";", ":", "'", '"', "`", "~",
  "!", "@", "#", "$", "%", "^", "&", "*",
  "-", "_", "=", "+", "/", "\\", "|",
  ".", ",", "?",
]);

function Key({ keyData, showShift }) {
  const display = showShift && keyData.shift ? keyData.shift : keyData.main;
  const isLabel = keyData.label && keyData.label !== keyData.main;
  const isSpecial = isLabel || keyData.wide || keyData.space;
  const isProg = PROG_SYMBOLS.has(keyData.main) || PROG_SYMBOLS.has(keyData.shift);

  return (
    <div
      className={[
        "kb-key",
        keyData.space ? "kb-space" : "",
        keyData.wide  ? "kb-wide"  : "",
        isProg && !isSpecial ? "kb-prog" : "",
        isSpecial ? "kb-special" : "",
      ].filter(Boolean).join(" ")}
    >
      {!isSpecial && keyData.shift && (
        <span className="kb-shift">{keyData.shift}</span>
      )}
      {keyData.alt && (
        <span className="kb-alt">{keyData.alt}</span>
      )}
      <span className="kb-main">
        {keyData.label || display}
      </span>
    </div>
  );
}

export default function KeyboardOverlay() {
  const [open, setOpen]       = useState(false);
  const [lang, setLang]       = useState("en");
  const [showShift, setShift] = useState(false);

  const rows = ROWS[lang];

  return (
    <>
      {/* Floating trigger button */}
      <button
        className="kb-trigger"
        onClick={() => setOpen(true)}
        title="Show keyboard layout"
        aria-label="Show keyboard layout"
      >
        <KbDotGrid />
        <span className="kb-trigger-label">kbd</span>
      </button>

      {/* Overlay */}
      {open && (
        <div className="kb-overlay" onClick={() => setOpen(false)}>
          <div className="kb-panel" onClick={(e) => e.stopPropagation()}>

            {/* Panel header */}
            <div className="kb-header">
              <div className="kb-header-left">
                <span className="kb-title">Keyboard Layout</span>
                <span className="kb-subtitle">
                  {lang === "en" ? "English (US)" : "Spanish (ES)"}
                </span>
              </div>
              <div className="kb-header-right">
                <button
                  className={`kb-ctrl-btn${showShift ? " active" : ""}`}
                  onClick={() => setShift((s) => !s)}
                >
                  ⇧ Shift
                </button>
                <button
                  className={`kb-ctrl-btn${lang === "en" ? " active" : ""}`}
                  onClick={() => setLang("en")}
                >EN</button>
                <button
                  className={`kb-ctrl-btn${lang === "es" ? " active" : ""}`}
                  onClick={() => setLang("es")}
                >ES</button>
                <button className="kb-close" onClick={() => setOpen(false)}>✕</button>
              </div>
            </div>

            {/* Legend */}
            <div className="kb-legend">
              <span className="kb-legend-item">
                <span className="kb-legend-dot prog" />
                Programming symbols
              </span>
              <span className="kb-legend-item">
                <span className="kb-legend-dot special" />
                Special keys
              </span>
              <span className="kb-legend-note">
                Top-right of key = Shift · Bottom-right = AltGr
              </span>
            </div>

            {/* Keyboard rows */}
            <div className="kb-keyboard">
              {rows.map((row, rowIdx) => (
                <div key={rowIdx} className="kb-row">
                  {row.map((key, keyIdx) => (
                    <Key key={keyIdx} keyData={key} showShift={showShift} />
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}

// ── Compact keyboard for embedding inside the right panel ─────────────────────

// Finds which key (and modifier) produces the given character in the layout
function findKeyCombo(rows, char, isOnIndent) {
  if (!char && !isOnIndent) return null;
  // When on an indentation space, highlight Tab
  if (isOnIndent && char === " ") {
    for (let r = 0; r < rows.length; r++) {
      for (let k = 0; k < rows[r].length; k++) {
        if (rows[r][k].label === "Tab") return { rowIdx: r, keyIdx: k, modifier: null };
      }
    }
  }
  if (!char) return null;
  for (let r = 0; r < rows.length; r++) {
    for (let k = 0; k < rows[r].length; k++) {
      const key = rows[r][k];
      const matchMain = key.main === char
        || (char === "\n" && key.label === "Enter")
        || (char === "\t" && key.label === "Tab");
      if (matchMain) return { rowIdx: r, keyIdx: k, modifier: null };
      if (key.shift && key.shift === char) return { rowIdx: r, keyIdx: k, modifier: "Shift" };
      if (key.alt   && key.alt   === char) return { rowIdx: r, keyIdx: k, modifier: "AltGr" };
    }
  }
  return null;
}

function PanelKey({ keyData, showShift, isMainActive, isModifierActive }) {
  const display   = showShift && keyData.shift ? keyData.shift : keyData.main;
  const isLabel   = keyData.label && keyData.label !== keyData.main;
  const isSpecial = isLabel || keyData.wide || keyData.space;
  const isProg    = PROG_SYMBOLS.has(keyData.main) || PROG_SYMBOLS.has(keyData.shift);

  // Base visual state
  let bg      = isSpecial ? "#1a1a2a" : isProg ? "#0d1f2d" : "#161b22";
  let border  = `1px solid ${isProg && !isSpecial ? "#1a3a5c" : isSpecial ? "#2a2a3a" : "#21262d"}`;
  let shadow  = "none";
  let txtColor = isSpecial ? "#546e7a" : isProg && !isSpecial ? "#82aaff" : "#8b949e";

  // Active states override
  if (isMainActive) {
    bg       = "#2a2000";
    border   = "1px solid #ffcb6b";
    shadow   = "0 0 10px rgba(255,203,107,0.65)";
    txtColor = "#ffcb6b";
  } else if (isModifierActive) {
    bg       = "#0d1520";
    border   = "1px solid #82aaff";
    shadow   = "0 0 8px rgba(130,170,255,0.45)";
    txtColor = "#82aaff";
  }

  return (
    <div style={{
      position: "relative",
      flex: keyData.space ? 5 : keyData.wide ? 1.7 : 1,
      height: "24px",
      background: bg, border, boxShadow: shadow,
      borderRadius: "4px",
      display: "flex", alignItems: "flex-end", justifyContent: "flex-start",
      padding: "2px 3px",
      cursor: "default", overflow: "hidden", minWidth: 0,
      transition: "background 0.1s, border-color 0.1s, box-shadow 0.1s",
    }}>
      {!isSpecial && keyData.shift && (
        <span style={{
          position: "absolute", top: "1px", right: "2px",
          fontSize: "7px",
          color: isMainActive ? "#ffcb6b" : "#ffcb6b60",
          lineHeight: 1, userSelect: "none",
        }}>
          {keyData.shift}
        </span>
      )}
      {keyData.alt && (
        <span style={{
          position: "absolute", bottom: "2px", right: "2px",
          fontSize: "6px", color: "#4ec99460", lineHeight: 1, userSelect: "none",
        }}>
          {keyData.alt}
        </span>
      )}
      <span style={{
        fontSize: isSpecial ? "7px" : "9px",
        color: txtColor,
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: isMainActive || isModifierActive ? "700" : isProg && !isSpecial ? "500" : "300",
        lineHeight: 1, userSelect: "none",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>
        {keyData.label || display}
      </span>
    </div>
  );
}

export function KeyboardPanel({ accentColor = "#82aaff", nextChar, isOnIndent }) {
  const [lang, setLang]       = useState("en");
  const [showShift, setShift] = useState(false);
  const rows = ROWS[lang];

  const combo = findKeyCombo(rows, nextChar, isOnIndent);

  // Build combo display label
  let comboDisplay = null;
  if (combo) {
    const key = rows[combo.rowIdx][combo.keyIdx];
    const keyName =
      key.label === "Enter"     ? "↵ Enter"
      : key.label === "Space"   ? "⎵ Space"
      : key.label === "Tab"     ? "⇥ Tab"
      : key.label === "Backspace" ? "⌫ Back"
      : key.label === "Shift"   ? "Shift"
      : key.label === "Caps"    ? "Caps"
      : key.label === "Ctrl"    ? "Ctrl"
      : key.label === "AltGr"   ? "AltGr"
      : key.label === "Alt"     ? "Alt"
      : isOnIndent && nextChar === " " ? "⇥ Tab"
      : nextChar === "\n"       ? "↵ Enter"
      : (key.main || nextChar || "");
    comboDisplay = { keyName, modifier: combo.modifier };
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 12px 8px",
        borderBottom: "1px solid #161b22",
        flexShrink: 0,
      }}>
        <span style={{ color: accentColor, fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em" }}>
          ⌨ KEYBOARD
        </span>
        <div style={{ display: "flex", gap: "4px" }}>
          <button
            className={`kb-ctrl-btn${showShift ? " active" : ""}`}
            style={{ padding: "2px 7px", fontSize: "9px" }}
            onClick={() => setShift((s) => !s)}
          >⇧</button>
          <button
            className={`kb-ctrl-btn${lang === "en" ? " active" : ""}`}
            style={{ padding: "2px 7px", fontSize: "9px" }}
            onClick={() => setLang("en")}
          >EN</button>
          <button
            className={`kb-ctrl-btn${lang === "es" ? " active" : ""}`}
            style={{ padding: "2px 7px", fontSize: "9px" }}
            onClick={() => setLang("es")}
          >ES</button>
        </div>
      </div>

      {/* Compact keyboard rows */}
      <div style={{
        flex: 1, overflowY: "auto", overflowX: "hidden",
        padding: "10px 8px",
        display: "flex", flexDirection: "column", gap: "4px",
      }}>
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} style={{ display: "flex", gap: "3px", alignItems: "stretch" }}>
            {row.map((key, keyIdx) => {
              const isMainActive = combo?.rowIdx === rowIdx && combo?.keyIdx === keyIdx;
              const isModifierActive =
                (combo?.modifier === "Shift"  && key.label === "Shift") ||
                (combo?.modifier === "AltGr"  && key.label === "AltGr");
              return (
                <PanelKey
                  key={keyIdx}
                  keyData={key}
                  showShift={showShift}
                  isMainActive={isMainActive}
                  isModifierActive={isModifierActive}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Combo display — what to press right now */}
      <div style={{
        padding: "8px 10px",
        borderTop: "1px solid #161b22",
        flexShrink: 0,
        minHeight: "38px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
      }}>
        {comboDisplay ? (
          <>
            {comboDisplay.modifier && (
              <>
                <span style={sPill.modifier}>{comboDisplay.modifier}</span>
                <span style={{ color: "#546e7a", fontSize: "13px", lineHeight: 1 }}>+</span>
              </>
            )}
            <span style={sPill.key}>{comboDisplay.keyName}</span>
          </>
        ) : (
          <span style={{ color: "#21262d", fontSize: "10px", letterSpacing: "0.06em" }}>
            — empieza a escribir —
          </span>
        )}
      </div>

      {/* Legend */}
      <div style={{
        padding: "5px 10px",
        borderTop: "1px solid #161b22",
        flexShrink: 0,
        display: "flex", gap: "10px", alignItems: "center",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "9px", color: "#546e7a" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "2px", background: "#0d1f2d", border: "1px solid #82aaff", display: "inline-block", flexShrink: 0 }} />
          prog
        </span>
        <span style={{ fontSize: "9px", color: "#30363d", marginLeft: "auto" }}>↑ shift · ↘ AltGr</span>
      </div>
    </div>
  );
}

const sPill = {
  modifier: {
    padding: "4px 10px",
    background: "#0d1520",
    border: "1px solid #82aaff",
    borderRadius: "5px",
    color: "#82aaff",
    fontSize: "11px",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: "600",
    letterSpacing: "0.04em",
  },
  key: {
    padding: "4px 10px",
    background: "#2a2000",
    border: "1px solid #ffcb6b",
    borderRadius: "5px",
    color: "#ffcb6b",
    fontSize: "11px",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: "600",
    letterSpacing: "0.04em",
  },
};

// Dot grid SVG icon — inspired by the image
function KbDotGrid() {
  const colors = ["#82aaff", "#4ec994", "#c792ea", "#ffcb6b", "#f78c6c", "#00F0FF"];
  const dots = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      dots.push({ x: 6 + c * 9, y: 5 + r * 9, color: colors[(r * 4 + c) % colors.length] });
    }
  }
  return (
    <svg width="42" height="30" viewBox="0 0 42 30" fill="none">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="2.8" fill={d.color} opacity="0.9" />
      ))}
    </svg>
  );
}
