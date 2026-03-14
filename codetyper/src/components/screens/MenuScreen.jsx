"use client";

import { useState } from "react";
import { CATEGORIES, getSnippets } from "@/data/snippets";
import { DIFFICULTIES } from "@/lib/constants";
import LanguageSelector from "@/components/ui/LanguageSelector";
import SnippetCard from "@/components/ui/SnippetCard";
import "./MenuScreen.css";

export default function MenuScreen({ onStart, showComments, onToggleComments }) {
  const [selectedCategory, setSelectedCategory] = useState("programming");
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner");

  const currentCategory = CATEGORIES[selectedCategory];
  const difficulties = selectedCategory === "languages" ? ["b1", "b2", "c1"] : DIFFICULTIES;
  const snippets = getSnippets(selectedLang, selectedDifficulty);

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    setSelectedDifficulty(difficulties[0]);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSelectedLang(CATEGORIES[cat].languages[0]);
    setSelectedDifficulty(cat === "languages" ? "b1" : "beginner");
  };

  return (
    <div style={s.root}>

      {/* Header */}
      <div style={s.header}>
        <div style={s.logo}>
          <span style={s.logoAccent}>&gt;_</span>
          <span style={s.logoText}>CodeTyper</span>
        </div>
        <p style={s.tagline}>Aprende sintaxis con los dedos, no solo con los ojos</p>
      </div>

      {/* Comments toggle */}
      <div style={s.toggleRow}>
        <span style={s.toggleLabel}>Comentarios en inglés</span>
        <button
          className={`toggle-comments-btn${showComments ? " active" : ""}`}
          onClick={onToggleComments}
        >
          {showComments ? "// ON — los escribo" : "// OFF — sin comentarios"}
        </button>
        <span style={s.toggleHint}>
          {showComments ? "practicarás también los comentarios" : "solo el código puro"}
        </span>
      </div>

      {/* Category */}
      <div style={s.section}>
        <div style={s.label}>// categoría</div>
        <div style={s.row}>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              className={`cat-btn${selectedCategory === key ? " active" : ""}`}
              onClick={() => handleCategoryChange(key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <LanguageSelector
        languages={currentCategory.languages}
        selected={selectedLang}
        onChange={handleLangChange}
      />

      {/* Difficulty */}
      <div style={s.section}>
        <div style={s.label}>// dificultad</div>
        <div style={s.row}>
          {difficulties.map((diff) => (
            <button
              key={diff}
              className={`diff-btn${selectedDifficulty === diff ? " active" : ""}`}
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Snippets */}
      <div style={s.section}>
        <div style={s.label}>
          // elige un snippet{" "}
          <span style={{ color: "#30363d" }}>({snippets.length} disponibles)</span>
        </div>
        {snippets.length === 0 ? (
          <div style={s.empty}>🚧 Snippets para este nivel próximamente...</div>
        ) : (
          <div style={s.grid}>
            {snippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                language={selectedLang}
                onClick={() => onStart(snippet, selectedLang, selectedDifficulty)}
              />
            ))}
          </div>
        )}
      </div>

      <div style={s.footer}>
        <span style={{ color: "#546e7a" }}>
          Usa el teclado · Tab = indentación automática · Enter para nueva línea
        </span>
      </div>
    </div>
  );
}

const s = {
  root:       { width: "100%", maxWidth: "820px", margin: "0 auto", padding: "48px 24px", fontFamily: "'JetBrains Mono', monospace" },
  header:     { marginBottom: "36px", textAlign: "center" },
  logo:       { fontFamily: "'Syne', sans-serif", fontSize: "36px", fontWeight: "800", marginBottom: "10px", letterSpacing: "-0.02em" },
  logoAccent: { color: "#82aaff", marginRight: "8px" },
  logoText:   { color: "#c9d1d9" },
  tagline:    { color: "#546e7a", fontSize: "13px", letterSpacing: "0.05em" },
  toggleRow:  { display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", padding: "12px 16px", background: "#0d1117", border: "1px solid #21262d", borderRadius: "8px", flexWrap: "wrap" },
  toggleLabel:{ color: "#8b949e", fontSize: "12px" },
  toggleHint: { color: "#30363d", fontSize: "11px", fontStyle: "italic" },
  section:    { marginBottom: "28px" },
  label:      { color: "#546e7a", fontSize: "12px", marginBottom: "10px", letterSpacing: "0.05em" },
  row:        { display: "flex", gap: "8px", flexWrap: "wrap" },
  grid:       { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "12px" },
  empty:      { color: "#30363d", fontSize: "13px", padding: "32px", textAlign: "center", border: "1px dashed #21262d", borderRadius: "8px" },
  footer:     { marginTop: "32px", textAlign: "center", fontSize: "12px" },
};
