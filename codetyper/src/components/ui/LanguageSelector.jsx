"use client";

import "./LanguageSelector.css";

const LANG_LABELS = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python:     "Python",
  sql:        "SQL",
  solidity:   "Solidity",
  java:       "Java",
  csharp:     "C#",
  powershell: "PowerShell",
  bash:       "Bash",
  cloud:      "Cloud",
  english:    "English",
  french:     "Français",
  mindset:    "Mindset",
};

export default function LanguageSelector({ languages, selected, onChange }) {
  return (
    <div style={s.section}>
      <div style={s.label}>// selecciona lenguaje</div>
      <div style={s.row}>
        {languages.map((lang) => (
          <button
            key={lang}
            className={`lang-btn ${lang}${selected === lang ? " active" : ""}`}
            onClick={() => onChange(lang)}
          >
            {LANG_LABELS[lang] || lang}
          </button>
        ))}
      </div>
    </div>
  );
}

const s = {
  section: { marginBottom: "28px" },
  label:   { color: "#546e7a", fontSize: "12px", marginBottom: "10px", letterSpacing: "0.05em" },
  row:     { display: "flex", gap: "8px", flexWrap: "wrap" },
};
