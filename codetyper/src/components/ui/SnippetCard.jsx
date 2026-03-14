"use client";

import "./SnippetCard.css";

const DIFF_COLORS = {
  beginner:     { bg: "#1a3a2a", color: "#4ec994" },
  intermediate: { bg: "#2a2a1a", color: "#ffcb6b" },
  advanced:     { bg: "#2a1a1a", color: "#ff5555" },
  b1:           { bg: "#1a2a3a", color: "#82aaff" },
  b2:           { bg: "#1a1a3a", color: "#c792ea" },
  c1:           { bg: "#2a1a2a", color: "#f78c6c" },
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
  title:   { fontSize: "13px", color: "#c9d1d9", fontWeight: "500", marginBottom: "4px" },
  desc:    { fontSize: "11px", color: "#546e7a", marginBottom: "8px" },
  meta:    { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" },
  badge:   { padding: "2px 8px", borderRadius: "3px", fontSize: "10px", letterSpacing: "0.04em" },
  lines:   { color: "#30363d", fontSize: "11px" },
  preview: { fontSize: "11px", color: "#546e7a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "8px" },
  hint:    { fontSize: "10px", opacity: 0.5 },
};
