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
  english:    "Inglés",
  french:     "Francés",
  mindset:    "Mindset",
  german:     "Alemán",
  italian:    "Italiano",
  portuguese: "Portugués",
  romanian:   "Rumano",
  japan:      "Japonés",
  czech:      "Checo",
  chinese:    "Chino",
  russian:    "Ruso",
  greek:      "Griego",
  korean:     "Coreano",
  ukrainian:  "Ucraniano",
};

export default function LanguageSelector({ languages, selected, onChange }) {
  return (
    <div className="menu-lang-card" style={s.section}>
      <div className="section-label" style={s.label}>// selecciona lenguaje</div>
      <div style={s.row}>
        {languages.map((lang) => (
          <button
            key={lang}
            className={`lang-btn ${lang}${selected === lang ? " active" : ""}`}
            onClick={() => onChange(lang)}
            data-nav-item
            data-nav-group="language"
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
  label:   { color: "var(--tx3)", fontSize: "13px", marginBottom: "10px", letterSpacing: "0.05em" },
  row:     { display: "flex", gap: "8px", flexWrap: "wrap" },
};
