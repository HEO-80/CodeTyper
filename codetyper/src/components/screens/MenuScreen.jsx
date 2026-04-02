"use client";

import { useState } from "react";
import { CATEGORIES, getSnippets } from "@/data/snippets";
import { DIFFICULTIES } from "@/lib/constants";
import LanguageSelector from "@/components/ui/LanguageSelector";
import SnippetCard      from "@/components/ui/SnippetCard";
import "./MenuScreen.css";
import "../ui/TerminalTrigger.css";

export default function MenuScreen({
  onStart,
  showComments,
  onToggleComments,
  onOpenTerminal,
  terminalOpen,
}) {
  const [selectedCategory,   setSelectedCategory]   = useState("programming");
  const [selectedLang,       setSelectedLang]       = useState("javascript");
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner");

  const currentCategory = CATEGORIES[selectedCategory];
  const difficulties = selectedCategory === "languages"
  ? ["a1", "a2", "b1", "b2", "c1", "exam"]
  : DIFFICULTIES;
  const snippets        = getSnippets(selectedLang, selectedDifficulty);

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    setSelectedDifficulty(difficulties[0]);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSelectedLang(CATEGORIES[cat].languages[0]);
    setSelectedDifficulty(cat === "languages" ? "a1" : "beginner");
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

      {/* Top row: comments toggle + terminal button */}
      <div style={s.topRow}>
        {/* Comments toggle */}
        <div style={s.toggleRow}>
          <span style={s.toggleLabel}>English comments</span>
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

        {/* Terminal trigger */}
        <button
          className={`tt-btn${terminalOpen ? " tt-active" : ""}`}
          onClick={onOpenTerminal}
          title="Open CodeTyper Terminal"
        >
          <TerminalSVGIcon />
          <span className="tt-btn-label">TERMINAL</span>
          {terminalOpen && <span className="tt-pulse" />}
        </button>
      </div>

      {/* Category */}
      <div style={s.section}>
        <div style={s.label}>// category</div>
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
        <div style={s.label}>// difficulty</div>
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
          // choose a snippet{" "}
          <span style={{ color: "#30363d" }}>({snippets.length} available)</span>
        </div>
        {snippets.length === 0 ? (
          <div style={s.empty}>🚧 Snippets coming soon for this level...</div>
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
          Keyboard · Tab = auto-indent · Enter = new line
        </span>
      </div>
    </div>
  );
}

// Terminal icon SVG
function TerminalSVGIcon() {
  return (
    <svg
      className="tt-btn-icon"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
    >
      <rect x="0.5" y="0.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1" />
      <polyline
        points="3,4 7,7 3,10"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="9" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

const s = {
  root:        { width: "100%", maxWidth: "820px", margin: "0 auto", padding: "48px 24px", fontFamily: "'JetBrains Mono', monospace" },
  header:      { marginBottom: "36px", textAlign: "center" },
  logo:        { fontFamily: "'Syne', sans-serif", fontSize: "36px", fontWeight: "800", marginBottom: "10px", letterSpacing: "-0.02em" },
  logoAccent:  { color: "#82aaff", marginRight: "8px" },
  logoText:    { color: "#c9d1d9" },
  tagline:     { color: "#546e7a", fontSize: "13px", letterSpacing: "0.05em" },
  topRow:      { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "32px", flexWrap: "wrap" },
  toggleRow:   { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "#0d1117", border: "1px solid #21262d", borderRadius: "8px", flexWrap: "wrap", flex: 1 },
  toggleLabel: { color: "#8b949e", fontSize: "12px" },
  toggleHint:  { color: "#30363d", fontSize: "11px", fontStyle: "italic" },
  section:     { marginBottom: "28px" },
  label:       { color: "#546e7a", fontSize: "12px", marginBottom: "10px", letterSpacing: "0.05em" },
  row:         { display: "flex", gap: "8px", flexWrap: "wrap" },
  grid:        { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "12px" },
  empty:       { color: "#30363d", fontSize: "13px", padding: "32px", textAlign: "center", border: "1px dashed #21262d", borderRadius: "8px" },
  footer:      { marginTop: "32px", textAlign: "center", fontSize: "12px" },
};
