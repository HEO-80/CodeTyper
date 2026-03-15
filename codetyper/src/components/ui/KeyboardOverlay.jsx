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
                {/* Shift toggle */}
                <button
                  className={`kb-ctrl-btn${showShift ? " active" : ""}`}
                  onClick={() => setShift((s) => !s)}
                >
                  ⇧ Shift
                </button>
                {/* Lang toggle */}
                <button
                  className={`kb-ctrl-btn${lang === "en" ? " active" : ""}`}
                  onClick={() => setLang("en")}
                >EN</button>
                <button
                  className={`kb-ctrl-btn${lang === "es" ? " active" : ""}`}
                  onClick={() => setLang("es")}
                >ES</button>
                {/* Close */}
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
