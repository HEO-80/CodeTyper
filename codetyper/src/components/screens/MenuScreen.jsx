"use client";

import { useState } from "react";
import { CATEGORIES, getSnippets } from "../../data/snippets";
import { DIFFICULTIES } from "../../lib/constants";
import LanguageSelector from "../ui/LanguageSelector";
import SnippetCard from "../ui/SnippetCard";

export default function MenuScreen({ onStart, showComments, onToggleComments }) {
  const [selectedCategory, setSelectedCategory] = useState("programming");
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner");

  const currentCategory = CATEGORIES[selectedCategory];

  const difficulties =
    selectedCategory === "languages"
      ? ["b1", "b2", "c1"]
      : DIFFICULTIES;

  const snippets = getSnippets(selectedLang, selectedDifficulty);

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    setSelectedDifficulty(difficulties[0]);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const firstLang = CATEGORIES[cat].languages[0];
    setSelectedLang(firstLang);
    setSelectedDifficulty(cat === "languages" ? "b1" : "beginner");
  };

  return (
    <div style={styles.root}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoAccent}>&gt;_</span>
          <span style={styles.logoText}>CodeTyper</span>
        </div>
        <p style={styles.tagline}>
          Aprende sintaxis con los dedos, no solo con los ojos
        </p>
      </div>

      {/* Comments toggle */}
      <div style={styles.toggleRow}>
        <span style={styles.toggleLabel}>Comentarios en inglés</span>
        <button
          style={{
            ...styles.toggleBtn,
            background: showComments ? "#1a2a1a" : "transparent",
            borderColor: showComments ? "#4ec994" : "#30363d",
            color: showComments ? "#4ec994" : "#546e7a",
          }}
          onClick={onToggleComments}
          title="Añade comentarios explicativos en inglés sobre cada bloque"
        >
          {showComments ? "// ON — los escribo" : "// OFF — sin comentarios"}
        </button>
        <span style={styles.toggleHint}>
          {showComments
            ? "practicarás también los comentarios"
            : "solo el código puro"}
        </span>
      </div>

      {/* Category tabs */}
      <div style={styles.section}>
        <div style={styles.sectionLabel}>// categoría</div>
        <div style={styles.tabRow}>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              style={{
                ...styles.tab,
                ...(selectedCategory === key ? styles.tabActive : {}),
              }}
              onClick={() => handleCategoryChange(key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Language selector */}
      <LanguageSelector
        languages={currentCategory.languages}
        selected={selectedLang}
        onChange={handleLangChange}
      />

      {/* Difficulty */}
      <div style={styles.section}>
        <div style={styles.sectionLabel}>// dificultad</div>
        <div style={styles.diffRow}>
          {difficulties.map((diff) => (
            <button
              key={diff}
              style={{
                ...styles.diffBtn,
                ...(selectedDifficulty === diff ? styles.diffBtnActive : {}),
              }}
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Snippets */}
      <div style={styles.section}>
        <div style={styles.sectionLabel}>
          // elige un snippet{" "}
          <span style={{ color: "#30363d" }}>({snippets.length} disponibles)</span>
        </div>
        {snippets.length === 0 ? (
          <div style={styles.empty}>
            🚧 Snippets para este nivel próximamente...
          </div>
        ) : (
          <div style={styles.grid}>
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

      <div style={styles.footer}>
        <span style={{ color: "#546e7a" }}>
          Usa el teclado · Tab = indentación automática · Enter para nueva línea
        </span>
      </div>
    </div>
  );
}

const styles = {
  root: {
    width: "100%",
    maxWidth: "820px",
    margin: "0 auto",
    padding: "48px 24px",
    fontFamily: "'JetBrains Mono', monospace",
  },
  header: { marginBottom: "36px", textAlign: "center" },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "10px",
    letterSpacing: "-0.02em",
  },
  logoAccent: { color: "#82aaff", marginRight: "8px" },
  logoText: { color: "#c9d1d9" },
  tagline: { color: "#546e7a", fontSize: "13px", letterSpacing: "0.05em" },
  toggleRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "32px",
    padding: "12px 16px",
    background: "#0d1117",
    border: "1px solid #21262d",
    borderRadius: "8px",
    flexWrap: "wrap",
  },
  toggleLabel: { color: "#8b949e", fontSize: "12px" },
  toggleBtn: {
    padding: "5px 14px",
    border: "1px solid",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "11px",
    fontFamily: "'JetBrains Mono', monospace",
    transition: "all 0.15s",
    letterSpacing: "0.04em",
  },
  toggleHint: { color: "#30363d", fontSize: "11px", fontStyle: "italic" },
  section: { marginBottom: "28px" },
  sectionLabel: {
    color: "#546e7a",
    fontSize: "12px",
    marginBottom: "10px",
    letterSpacing: "0.05em",
  },
  tabRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
  tab: {
    padding: "8px 18px",
    background: "#0d1117",
    border: "1px solid #21262d",
    borderRadius: "6px",
    color: "#8b949e",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "'JetBrains Mono', monospace",
    transition: "all 0.12s",
  },
  tabActive: {
    background: "#1c2333",
    borderColor: "#82aaff",
    color: "#82aaff",
  },
  diffRow: { display: "flex", gap: "8px" },
  diffBtn: {
    padding: "5px 16px",
    background: "#0d1117",
    border: "1px solid #21262d",
    borderRadius: "4px",
    color: "#546e7a",
    cursor: "pointer",
    fontSize: "11px",
    fontFamily: "'JetBrains Mono', monospace",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    transition: "all 0.12s",
  },
  diffBtnActive: {
    background: "#1a2333",
    borderColor: "#ffcb6b",
    color: "#ffcb6b",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "12px",
  },
  empty: {
    color: "#30363d",
    fontSize: "13px",
    padding: "32px",
    textAlign: "center",
    border: "1px dashed #21262d",
    borderRadius: "8px",
  },
  footer: { marginTop: "32px", textAlign: "center", fontSize: "12px" },
};
