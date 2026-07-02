"use client";

import "./SnippetCard.css";

const DIFF_COLORS = {
  beginner:     { bg: "rgba(78,201,148,0.15)",  color: "#4ec994" },
  intermediate: { bg: "rgba(255,203,107,0.15)", color: "#ffcb6b" },
  advanced:     { bg: "rgba(255,85,85,0.15)",   color: "#ff5555" },
  a1:           { bg: "rgba(78,201,148,0.15)",  color: "#4ec994" },
  a2:           { bg: "rgba(58,217,160,0.15)",  color: "#3ad9a0" },
  b1:           { bg: "rgba(130,170,255,0.15)", color: "#82aaff" },
  b2:           { bg: "rgba(199,146,234,0.15)", color: "#c792ea" },
  c1:           { bg: "rgba(247,140,108,0.15)", color: "#f78c6c" },
  c2:           { bg: "rgba(86,182,194,0.15)",  color: "#56b6c2" },
  exam:         { bg: "rgba(255,203,107,0.15)", color: "#ffcb6b" },
};

export default function SnippetCard({ snippet, onClick }) {
  const d = DIFF_COLORS[snippet.difficulty] || DIFF_COLORS.beginner;
  const lineCount = snippet.code.split("\n").length;
  const preview = snippet.code.split("\n")[0];

  return (
    <div
      className={`snippet-card ${snippet.difficulty}`}
      onClick={onClick}
    >
      <div className="snip-title" style={s.title}>{snippet.title}</div>
      {snippet.description && (
        <div style={s.desc}>{snippet.description}</div>
      )}
      <div style={s.meta}>
        <span style={{ ...s.badge, background: d.bg, color: d.color }}>
          {snippet.difficulty}
        </span>
        <span style={s.lines}>— {lineCount} líneas</span>
      </div>
      <div style={s.preview}>{preview}</div>
      <div style={{ ...s.hint, color: d.color }}>→ click para empezar</div>
    </div>
  );
}

const s = {
  title:   { fontSize: "14px", color: "var(--tx)", fontWeight: "500", marginBottom: "4px" },
  desc:    { fontSize: "12px", color: "var(--tx3)", marginBottom: "8px" },
  meta:    { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" },
  badge:   { padding: "2px 8px", borderRadius: "3px", fontSize: "11px", letterSpacing: "0.04em" },
  lines:   { color: "var(--tx4)", fontSize: "12px" },
  preview: { fontSize: "12px", color: "var(--tx3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "8px" },
  hint:    { fontSize: "11px", opacity: 0.5 },
};
