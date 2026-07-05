"use client";

import { useRef, useState } from "react";
import { CATEGORIES, getSnippets } from "@/data/snippets";
import { DIFFICULTIES } from "@/lib/constants";
import LanguageSelector from "@/components/ui/LanguageSelector";
import SnippetCard      from "@/components/ui/SnippetCard";
import "./MenuScreen.css";
import "../ui/TerminalTrigger.css";

// ─── Navegación con flechas ───────────────────────────────────────────────────
// Izquierda/derecha se mueven dentro de la fila actual (categoría, idioma,
// dificultad o snippets) usando la posición real en pantalla, así que
// funciona igual de bien si la fila envuelve en varias líneas.
// Arriba/abajo cambian de sección siguiendo el orden visual de la pantalla
// (categoría → idioma → dificultad → snippets), salvo dentro de la rejilla
// de snippets, donde arriba/abajo se mueven entre filas de la propia rejilla
// y solo "suben" de sección al llegar a la fila superior.
const GROUP_ORDER = ["category", "language", "difficulty", "snippet"];

function findClosestInDirection(current, candidates, direction) {
  const rect = current.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  let best = null;
  let bestScore = Infinity;
  for (const el of candidates) {
    if (el === current) continue;
    const r = el.getBoundingClientRect();
    const ex = r.left + r.width / 2;
    const ey = r.top + r.height / 2;
    const dx = ex - cx;
    const dy = ey - cy;
    let primary, secondary;
    if (direction === "ArrowRight") { if (dx <= 1) continue; primary = dx; secondary = Math.abs(dy); }
    else if (direction === "ArrowLeft") { if (dx >= -1) continue; primary = -dx; secondary = Math.abs(dy); }
    else if (direction === "ArrowDown") { if (dy <= 1) continue; primary = dy; secondary = Math.abs(dx); }
    else if (direction === "ArrowUp") { if (dy >= -1) continue; primary = -dy; secondary = Math.abs(dx); }
    else continue;
    const score = primary + secondary * 2; // penaliza el desalineado diagonal
    if (score < bestScore) { bestScore = score; best = el; }
  }
  return best;
}

// Al saltar a otra sección, entra por la fila de arriba (si venimos de subir)
// o la de abajo (si venimos de bajar), alineado por posición horizontal.
function pickGroupEntry(items, activeRect, direction) {
  const tops = items.map((el) => el.getBoundingClientRect().top);
  const edgeTop = direction === "ArrowDown" ? Math.min(...tops) : Math.max(...tops);
  const rowItems = items.filter((el) => Math.abs(el.getBoundingClientRect().top - edgeTop) < 4);
  const cx = activeRect.left + activeRect.width / 2;
  let best = rowItems[0];
  let bestDist = Infinity;
  for (const el of rowItems) {
    const r = el.getBoundingClientRect();
    const dist = Math.abs(r.left + r.width / 2 - cx);
    if (dist < bestDist) { bestDist = dist; best = el; }
  }
  return best;
}

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
  const rootRef = useRef(null);

  const currentCategory = CATEGORIES[selectedCategory];
  const difficulties = selectedCategory === "languages"
  ? ["a1", "a2", "b1", "b2", "c1", "c2", "exam"]
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

  // Flechas: solo actúa si el foco ya está en uno de estos elementos (no le
  // roba las flechas a otras partes de la página, como el scroll o la navbar).
  const handleArrowNav = (e) => {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const active = document.activeElement;
    if (!active?.hasAttribute("data-nav-item")) return;
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll("[data-nav-item]"));
    const group = active.getAttribute("data-nav-group");
    const groupItems = items.filter((el) => el.getAttribute("data-nav-group") === group);

    // Izquierda/derecha: moverse dentro de la fila/rejilla actual.
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const next = findClosestInDirection(active, groupItems, e.key);
      if (next) { e.preventDefault(); next.focus(); }
      return;
    }

    // Dentro de la rejilla de snippets, arriba/abajo navegan primero por filas
    // de la propia rejilla; solo cambian de sección si no hay fila en esa dirección.
    if (group === "snippet") {
      const next = findClosestInDirection(active, groupItems, e.key);
      if (next) { e.preventDefault(); next.focus(); return; }
      if (e.key !== "ArrowUp") return; // no hay sección después de snippets
    }

    // Cambiar de sección (categoría ⇄ idioma ⇄ dificultad ⇄ snippets).
    const idx = GROUP_ORDER.indexOf(group);
    const targetGroup = e.key === "ArrowDown" ? GROUP_ORDER[idx + 1] : GROUP_ORDER[idx - 1];
    if (!targetGroup) return;
    const targetItems = items.filter((el) => el.getAttribute("data-nav-group") === targetGroup);
    if (targetItems.length === 0) return;
    const entry = pickGroupEntry(targetItems, active.getBoundingClientRect(), e.key);
    if (entry) { e.preventDefault(); entry.focus(); }
  };

  return (
    <div style={s.root} ref={rootRef} onKeyDown={handleArrowNav}>

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
      <div className="menu-section" style={s.section}>
        <div style={s.label}>// category</div>
        <div style={s.row}>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              className={`cat-btn${selectedCategory === key ? " active" : ""}`}
              onClick={() => handleCategoryChange(key)}
              data-nav-item
              data-nav-group="category"
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
      <div className="menu-section" style={s.section}>
        <div style={s.label}>// difficulty</div>
        <div style={s.row}>
          {difficulties.map((diff) => (
            <button
              key={diff}
              className={`diff-btn${selectedDifficulty === diff ? " active" : ""}`}
              onClick={() => setSelectedDifficulty(diff)}
              data-nav-item
              data-nav-group="difficulty"
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Snippets */}
      <div className="menu-section" style={s.section}>
        <div style={s.label}>
          // choose a snippet{" "}
          <span style={{ color: "var(--tx4)" }}>({snippets.length} available)</span>
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
        <span style={{ color: "var(--tx3)" }}>
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
  logoAccent:  { color: "var(--hl-blue)", marginRight: "8px" },
  logoText:    { color: "var(--tx)" },
  tagline:     { color: "var(--tx3)", fontSize: "14px", letterSpacing: "0.05em" },
  topRow:      { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "32px", flexWrap: "wrap" },
  toggleRow:   { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "var(--bg)", border: "1px solid var(--bd)", borderRadius: "8px", flexWrap: "wrap", flex: 1 },
  toggleLabel: { color: "var(--tx2)", fontSize: "13px" },
  toggleHint:  { color: "var(--tx4)", fontSize: "12px", fontStyle: "italic" },
  section:     { marginBottom: "28px" },
  label:       { color: "var(--tx3)", fontSize: "13px", marginBottom: "10px", letterSpacing: "0.05em" },
  row:         { display: "flex", gap: "8px", flexWrap: "wrap" },
  grid:        { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "12px" },
  empty:       { color: "var(--tx4)", fontSize: "14px", padding: "32px", textAlign: "center", border: "1px dashed var(--bd)", borderRadius: "8px" },
  footer:      { marginTop: "32px", textAlign: "center", fontSize: "13px" },
};
