// ─── LanguageSelector.jsx ─────────────────────────────────────────────────────
"use client";
import { LANGUAGE_LABELS, LANGUAGE_COLORS } from "@/lib/constants";

export default function LanguageSelector({ languages, selected, onChange }) {
  return (
    <div style={styles.section}>
      <div style={styles.label}>// selecciona lenguaje</div>
      <div style={styles.row}>
        {languages.map((lang) => {
          const colors = LANGUAGE_COLORS[lang] || {
            border: "#82aaff", color: "#82aaff", bg: "#0a1020",
          };
          const isActive = selected === lang;
          return (
            <button
              key={lang}
              style={{
                ...styles.btn,
                borderColor: isActive ? colors.border : "#21262d",
                color: isActive ? colors.color : "#546e7a",
                background: isActive ? colors.bg : "#0d1117",
              }}
              onClick={() => onChange(lang)}
            >
              {LANGUAGE_LABELS[lang] || lang}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  section: { marginBottom: "28px" },
  label: { color: "#546e7a", fontSize: "12px", marginBottom: "10px", letterSpacing: "0.05em" },
  row: { display: "flex", gap: "8px", flexWrap: "wrap" },
  btn: {
    padding: "6px 16px",
    border: "1px solid",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "'JetBrains Mono', monospace",
    transition: "all 0.12s",
    letterSpacing: "0.03em",
  },
};
