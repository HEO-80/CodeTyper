"use client";

const DIFF_COLORS = {
  beginner:     { bg: "#1a3a2a", color: "#4ec994" },
  intermediate: { bg: "#2a2a1a", color: "#ffcb6b" },
  advanced:     { bg: "#2a1a1a", color: "#ff5555" },
  b1:           { bg: "#1a2a3a", color: "#82aaff" },
  b2:           { bg: "#1a1a3a", color: "#c792ea" },
  c1:           { bg: "#2a1a2a", color: "#f78c6c" },
};

export default function SnippetCard({ snippet, language, onClick }) {
  const diffStyle = DIFF_COLORS[snippet.difficulty] || DIFF_COLORS.beginner;
  const lineCount = snippet.code.split("\n").length;
  const preview = snippet.code.split("\n")[0];

  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.title}>{snippet.title}</div>
      {snippet.description && (
        <div style={styles.description}>{snippet.description}</div>
      )}
      <div style={styles.meta}>
        <span style={{ ...styles.badge, background: diffStyle.bg, color: diffStyle.color }}>
          {snippet.difficulty}
        </span>
        <span style={styles.lines}>{lineCount} líneas</span>
      </div>
      <div style={styles.preview}>{preview}</div>
      <div style={styles.hint}>→ click para empezar</div>
    </div>
  );
}

const styles = {
  card: {
    background: "#0d1117",
    border: "1px solid #21262d",
    borderRadius: "8px",
    padding: "16px",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "'JetBrains Mono', monospace",
  },
  title: { fontSize: "13px", color: "#c9d1d9", fontWeight: "500", marginBottom: "4px" },
  description: { fontSize: "11px", color: "#546e7a", marginBottom: "8px" },
  meta: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" },
  badge: { padding: "2px 8px", borderRadius: "3px", fontSize: "10px", letterSpacing: "0.04em" },
  lines: { color: "#30363d", fontSize: "11px" },
  preview: {
    fontSize: "11px",
    color: "#546e7a",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginBottom: "8px",
    fontFamily: "'JetBrains Mono', monospace",
  },
  hint: { fontSize: "10px", color: "#21262d" },
};
