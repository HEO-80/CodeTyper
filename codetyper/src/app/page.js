"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── SNIPPETS DATA ────────────────────────────────────────────────────────────
const SNIPPETS = {
  javascript: [
    {
      id: "js-001",
      title: "Clase con constructor",
      difficulty: "beginner",
      code: `class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hablar() {
    console.log(\`Hola, soy \${this.nombre}\`);
  }
}`,
    },
    {
      id: "js-002",
      title: "Async / Await con fetch",
      difficulty: "intermediate",
      code: `async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}`,
    },
    {
      id: "js-003",
      title: "Array methods",
      difficulty: "beginner",
      code: `const numeros = [1, 2, 3, 4, 5];

const pares = numeros.filter(n => n % 2 === 0);
const dobles = numeros.map(n => n * 2);
const suma = numeros.reduce((acc, n) => acc + n, 0);`,
    },
  ],
  python: [
    {
      id: "py-001",
      title: "Clase con herencia",
      difficulty: "beginner",
      code: `class Animal:
    def __init__(self, nombre):
        self.nombre = nombre

    def hablar(self):
        return f"Soy {self.nombre}"

class Perro(Animal):
    def hablar(self):
        return "Guau!"`,
    },
    {
      id: "py-002",
      title: "List comprehension",
      difficulty: "beginner",
      code: `numeros = [1, 2, 3, 4, 5]

pares = [n for n in numeros if n % 2 == 0]
cuadrados = [n ** 2 for n in numeros]
mapa = {n: n ** 2 for n in numeros}`,
    },
  ],
  typescript: [
    {
      id: "ts-001",
      title: "Interface y Generic",
      difficulty: "intermediate",
      code: `interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

function obtener<T>(lista: T[], id: number): T {
  return lista.find((_, i) => i === id)!;
}`,
    },
  ],
  sql: [
    {
      id: "sql-001",
      title: "SELECT con JOIN",
      difficulty: "beginner",
      code: `SELECT u.nombre, p.titulo, p.fecha
FROM usuarios u
INNER JOIN publicaciones p
  ON u.id = p.usuario_id
WHERE p.activo = true
ORDER BY p.fecha DESC
LIMIT 10;`,
    },
  ],
};

// ─── TOKENIZER ────────────────────────────────────────────────────────────────
const KEYWORDS = {
  javascript: ["class","constructor","function","async","await","return","const","let","var","if","else","for","while","try","catch","new","this","of","in","typeof","import","export","default","extends","super","null","undefined","true","false","throw","from"],
  python: ["class","def","return","if","else","elif","for","while","try","except","import","from","as","with","in","not","and","or","True","False","None","self","super","raise","pass","break","continue","lambda","yield"],
  typescript: ["class","constructor","function","async","await","return","const","let","var","if","else","for","while","try","catch","new","this","interface","type","enum","extends","implements","import","export","default","null","undefined","true","false","number","string","boolean","void","any","never"],
  sql: ["SELECT","FROM","WHERE","JOIN","INNER","LEFT","RIGHT","ON","AND","OR","NOT","IN","LIKE","ORDER","BY","GROUP","HAVING","LIMIT","OFFSET","INSERT","INTO","VALUES","UPDATE","SET","DELETE","CREATE","TABLE","INDEX","DESC","ASC","DISTINCT","AS","NULL","TRUE","FALSE","true","false"],
};

function tokenize(code, language) {
  const tokens = [];
  let i = 0;
  const kws = KEYWORDS[language] || [];

  while (i < code.length) {
    const ch = code[i];

    // Newline
    if (ch === "\n") {
      tokens.push({ char: "\n", type: "newline" });
      i++;
      continue;
    }

    // String (double or single quote)
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let str = ch;
      i++;
      while (i < code.length && code[i] !== quote && code[i] !== "\n") {
        str += code[i]; i++;
      }
      if (i < code.length) { str += code[i]; i++; }
      for (const c of str) tokens.push({ char: c, type: "string" });
      continue;
    }

    // Template literal
    if (ch === "`") {
      let str = ch; i++;
      while (i < code.length && code[i] !== "`") {
        str += code[i]; i++;
      }
      if (i < code.length) { str += code[i]; i++; }
      for (const c of str) tokens.push({ char: c, type: "string" });
      continue;
    }

    // Comment //
    if (ch === "/" && code[i + 1] === "/") {
      let comment = "";
      while (i < code.length && code[i] !== "\n") {
        comment += code[i]; i++;
      }
      for (const c of comment) tokens.push({ char: c, type: "comment" });
      continue;
    }

    // Comment #
    if (ch === "#") {
      let comment = "";
      while (i < code.length && code[i] !== "\n") {
        comment += code[i]; i++;
      }
      for (const c of comment) tokens.push({ char: c, type: "comment" });
      continue;
    }

    // Number
    if (/[0-9]/.test(ch)) {
      let num = "";
      while (i < code.length && /[0-9.]/.test(code[i])) {
        num += code[i]; i++;
      }
      for (const c of num) tokens.push({ char: c, type: "number" });
      continue;
    }

    // Word: keyword, type, function call, or identifier
    if (/[a-zA-Z_$]/.test(ch)) {
      let word = "";
      const start = i;
      while (i < code.length && /[a-zA-Z0-9_$]/.test(code[i])) {
        word += code[i]; i++;
      }
      let type = "identifier";
      if (kws.includes(word)) {
        type = "keyword";
      } else if (/^[A-Z]/.test(word)) {
        type = "class-name";
      } else if (code[i] === "(") {
        type = "function";
      } else if (["number","string","boolean","void","any","never","null","undefined"].includes(word)) {
        type = "type";
      }
      for (const c of word) tokens.push({ char: c, type });
      continue;
    }

    // Operator
    if (/[+\-*/%=<>!&|^~?]/.test(ch)) {
      tokens.push({ char: ch, type: "operator" });
      i++; continue;
    }

    // Punctuation
    if (/[{}()[\].,;:]/.test(ch)) {
      tokens.push({ char: ch, type: "punctuation" });
      i++; continue;
    }

    // Space / other
    tokens.push({ char: ch, type: "space" });
    i++;
  }

  return tokens;
}

// ─── TOKEN COLORS ─────────────────────────────────────────────────────────────
const TOKEN_COLORS = {
  keyword:     "#c792ea",
  string:      "#f78c6c",
  number:      "#f78c6c",
  comment:     "#546e7a",
  identifier:  "#82aaff",
  "class-name":"#ffcb6b",
  function:    "#82aaff",
  type:        "#89ddff",
  operator:    "#89ddff",
  punctuation: "#89ddff",
  space:       "#607b96",
  newline:     "#607b96",
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CodeTyper() {
  const [screen, setScreen] = useState("menu"); // menu | practice | results
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [errors, setErrors] = useState(new Set());
  const [errorFlash, setErrorFlash] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalErrors, setTotalErrors] = useState(0);
  const [currentInput, setCurrentInput] = useState(""); // for wrong char display
  const containerRef = useRef(null);

  const languages = Object.keys(SNIPPETS);

  const startPractice = (snippet) => {
    const t = tokenize(snippet.code, selectedLang);
    setTokens(t);
    setCursor(0);
    setErrors(new Set());
    setTotalErrors(0);
    setStartTime(null);
    setEndTime(null);
    setCurrentInput("");
    setSelectedSnippet(snippet);
    setScreen("practice");
    setTimeout(() => containerRef.current?.focus(), 50);
  };

  const handleKeyDown = useCallback((e) => {
    if (screen !== "practice") return;
    if (e.key === "Tab") { e.preventDefault(); }

    // Ignore modifier-only keys
    if (["Shift","Control","Alt","Meta","CapsLock","Escape"].includes(e.key)) return;

    const expected = tokens[cursor];
    if (!expected) return;

    if (!startTime) setStartTime(Date.now());

    let typedChar = e.key;
    // Normalize Enter
    if (typedChar === "Enter") typedChar = "\n";

    if (typedChar === expected.char) {
      setCurrentInput("");
      setCursor(prev => {
        const next = prev + 1;
        if (next >= tokens.length) {
          setEndTime(Date.now());
          setTimeout(() => setScreen("results"), 400);
        }
        return next;
      });
    } else {
      // Only flash/count error if single printable char or Enter
      if (typedChar.length === 1 || typedChar === "\n") {
        setTotalErrors(p => p + 1);
        setErrors(prev => new Set([...prev, cursor]));
        setErrorFlash(true);
        setCurrentInput(typedChar);
        setTimeout(() => setErrorFlash(false), 150);
      }
    }
  }, [screen, tokens, cursor, startTime]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // ── RESULTS ──
  const getResults = () => {
    if (!startTime || !endTime) return { cpm: 0, accuracy: 0, time: 0 };
    const seconds = (endTime - startTime) / 1000;
    const cpm = Math.round((tokens.length / seconds) * 60);
    const accuracy = Math.round(((tokens.length - totalErrors) / tokens.length) * 100);
    return { cpm, accuracy, time: Math.round(seconds) };
  };

  // ── RENDER TOKENS ──
  const renderTokens = () => {
    const lines = [];
    let currentLine = [];
    let lineIdx = 0;

    tokens.forEach((token, idx) => {
      if (token.char === "\n") {
        lines.push({ tokens: currentLine, lineIdx });
        currentLine = [];
        lineIdx++;
      } else {
        currentLine.push({ ...token, idx });
      }
    });
    if (currentLine.length > 0) lines.push({ tokens: currentLine, lineIdx });

    return lines;
  };

  // ─── SCREENS ──────────────────────────────────────────────────────────────

  // MENU
  if (screen === "menu") {
    return (
      <div style={styles.root}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { width: 4px; } 
          ::-webkit-scrollbar-track { background: #0d1117; }
          ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 2px; }
          @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
          @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
          @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(130,170,255,0.2)} 50%{box-shadow:0 0 0 8px rgba(130,170,255,0)} }
          .snippet-card:hover { background: #161b22 !important; border-color: #82aaff !important; transform: translateY(-1px); transition: all 0.15s ease; }
          .lang-btn:hover { background: #161b22 !important; }
          .lang-btn.active { background: #1c2333 !important; border-color: #82aaff !important; color: #82aaff !important; }
          .start-btn:hover { background: #82aaff !important; color: #0d1117 !important; }
        `}</style>

        <div style={styles.menuWrap}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.logo}>
              <span style={styles.logoAccent}>&gt;_</span>
              <span style={styles.logoText}>CodeTyper</span>
            </div>
            <p style={styles.tagline}>Aprende sintaxis con los dedos, no solo con los ojos</p>
          </div>

          {/* Lang selector */}
          <div style={styles.section}>
            <div style={styles.sectionLabel}>// selecciona lenguaje</div>
            <div style={styles.langRow}>
              {languages.map(lang => (
                <button
                  key={lang}
                  className={`lang-btn ${selectedLang === lang ? "active" : ""}`}
                  style={{ ...styles.langBtn, ...(selectedLang === lang ? styles.langBtnActive : {}) }}
                  onClick={() => setSelectedLang(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Snippets */}
          <div style={styles.section}>
            <div style={styles.sectionLabel}>// elige un snippet</div>
            <div style={styles.snippetGrid}>
              {SNIPPETS[selectedLang].map(snippet => (
                <div
                  key={snippet.id}
                  className="snippet-card"
                  style={styles.snippetCard}
                  onClick={() => startPractice(snippet)}
                >
                  <div style={styles.snippetTitle}>{snippet.title}</div>
                  <div style={styles.snippetMeta}>
                    <span style={{ ...styles.badge, background: snippet.difficulty === "beginner" ? "#1a3a2a" : "#2a2a1a", color: snippet.difficulty === "beginner" ? "#4ec994" : "#ffcb6b" }}>
                      {snippet.difficulty}
                    </span>
                    <span style={styles.snippetLines}>{snippet.code.split("\n").length} líneas</span>
                  </div>
                  <div style={styles.snippetPreview}>
                    {snippet.code.split("\n")[0]}
                  </div>
                  <div style={styles.startHint}>→ click para empezar</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.footer}>
            <span style={{ color: "#546e7a" }}>Usa el teclado para escribir • Tab está desactivado • Enter para nueva línea</span>
          </div>
        </div>
      </div>
    );
  }

  // PRACTICE
  if (screen === "practice") {
    const lines = renderTokens();
    const currentToken = tokens[cursor];

    // Which line is cursor on?
    let cursorLine = 0;
    let lineStart = 0;
    for (let i = 0; i < cursor; i++) {
      if (tokens[i].char === "\n") { cursorLine++; lineStart = i + 1; }
    }

    return (
      <div style={styles.root}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
          @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-3px)} 40%,80%{transform:translateX(3px)} }
          @keyframes errorFlash { 0%,100%{background:transparent} 50%{background:rgba(255,85,85,0.08)} }
          .cursor-blink { animation: blink 1s step-end infinite; }
        `}</style>
        <div
          ref={containerRef}
          tabIndex={0}
          style={{ outline: "none", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
        >
          {/* Top bar */}
          <div style={styles.topBar}>
            <button style={styles.backBtn} onClick={() => setScreen("menu")}>← volver</button>
            <div style={styles.topCenter}>
              <span style={{ color: "#546e7a" }}>{selectedLang}</span>
              <span style={{ color: "#30363d", margin: "0 8px" }}>/</span>
              <span style={{ color: "#c9d1d9" }}>{selectedSnippet.title}</span>
            </div>
            <div style={styles.topRight}>
              <span style={{ color: "#4ec994" }}>{cursor}</span>
              <span style={{ color: "#546e7a" }}>/{tokens.length} chars</span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${(cursor / tokens.length) * 100}%` }} />
          </div>

          {/* Code area */}
          <div style={{
            ...styles.codeArea,
            animation: errorFlash ? "errorFlash 0.15s ease" : "none"
          }}>
            <div style={styles.codeBlock}>
              {lines.map(({ tokens: lineTokens, lineIdx }) => (
                <div key={lineIdx} style={styles.codeLine}>
                  {/* Line number */}
                  <span style={styles.lineNum}>{lineIdx + 1}</span>

                  {/* Tokens */}
                  <span style={styles.lineContent}>
                    {lineTokens.map(({ char, type, idx }) => {
                      const isTyped = idx < cursor;
                      const isCursor = idx === cursor;
                      const isError = errors.has(idx);

                      let charColor = isTyped
                        ? (isError ? "#ff5555" : TOKEN_COLORS[type] || "#c9d1d9")
                        : "#2a3a4a"; // not yet typed = dim

                      return (
                        <span key={idx} style={{ position: "relative", display: "inline-block" }}>
                          {/* Cursor indicator */}
                          {isCursor && (
                            <span className="cursor-blink" style={styles.cursor} />
                          )}
                          <span style={{
                            color: charColor,
                            fontWeight: isTyped && type === "keyword" ? "500" : "300",
                            transition: "color 0.05s",
                            ...(isError ? { textDecoration: "underline", textDecorationColor: "#ff5555" } : {}),
                          }}>
                            {char === " " ? "\u00A0" : char}
                          </span>
                        </span>
                      );
                    })}
                    {/* Cursor at end of line */}
                    {lineTokens.length > 0 && lineTokens[lineTokens.length - 1].idx === cursor - 1 && cursor < tokens.length && tokens[cursor]?.char === "\n" && (
                      <span className="cursor-blink" style={styles.cursor} />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <div style={styles.bottomBar}>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>errores</span>
              <span style={{ ...styles.statValue, color: totalErrors > 0 ? "#ff5555" : "#4ec994" }}>{totalErrors}</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>precisión</span>
              <span style={{ ...styles.statValue, color: "#ffcb6b" }}>
                {cursor > 0 ? Math.round(((cursor - totalErrors) / cursor) * 100) : 100}%
              </span>
            </div>
            {startTime && (
              <div style={styles.statItem}>
                <span style={styles.statLabel}>tiempo</span>
                <span style={{ ...styles.statValue, color: "#82aaff" }}>
                  {Math.round((Date.now() - startTime) / 1000)}s
                </span>
              </div>
            )}
            <div style={styles.statItem}>
              <span style={styles.statLabel}>próximo</span>
              <span style={{ ...styles.statValue, color: "#c792ea", fontWeight: "400", fontSize: "14px" }}>
                {currentToken?.char === "\n" ? "↵ Enter" : currentToken?.char === " " ? "· space" : `"${currentToken?.char}"`}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS
  if (screen === "results") {
    const { cpm, accuracy, time } = getResults();
    const grade = accuracy >= 98 ? "S" : accuracy >= 95 ? "A" : accuracy >= 90 ? "B" : accuracy >= 80 ? "C" : "D";
    const gradeColor = { S: "#ffcb6b", A: "#4ec994", B: "#82aaff", C: "#f78c6c", D: "#ff5555" }[grade];

    return (
      <div style={styles.root}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @keyframes popIn { 0%{transform:scale(0.5);opacity:0} 80%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
          .result-btn:hover { background: #82aaff !important; color: #0d1117 !important; }
        `}</style>
        <div style={{ ...styles.menuWrap, animation: "fadeUp 0.5s ease" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "14px", color: "#546e7a", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>
              resultado
            </div>
            <div style={{ fontSize: "80px", fontWeight: "800", fontFamily: "'Syne', sans-serif", color: gradeColor, animation: "popIn 0.6s cubic-bezier(0.34,1.56,0.64,1)", lineHeight: 1 }}>
              {grade}
            </div>
          </div>

          <div style={styles.resultsGrid}>
            <div style={styles.resultCard}>
              <div style={styles.resultNum}>{cpm}</div>
              <div style={styles.resultLabel}>CPM</div>
              <div style={styles.resultSub}>caracteres por minuto</div>
            </div>
            <div style={styles.resultCard}>
              <div style={{ ...styles.resultNum, color: accuracy >= 95 ? "#4ec994" : "#f78c6c" }}>{accuracy}%</div>
              <div style={styles.resultLabel}>precisión</div>
              <div style={styles.resultSub}>{totalErrors} errores cometidos</div>
            </div>
            <div style={styles.resultCard}>
              <div style={{ ...styles.resultNum, color: "#82aaff" }}>{time}s</div>
              <div style={styles.resultLabel}>tiempo</div>
              <div style={styles.resultSub}>{tokens.length} caracteres en total</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "40px" }}>
            <button
              className="result-btn"
              style={{ ...styles.actionBtn, background: "#161b22", color: "#82aaff", border: "1px solid #30363d" }}
              onClick={() => startPractice(selectedSnippet)}
            >
              ↺ repetir
            </button>
            <button
              className="result-btn"
              style={{ ...styles.actionBtn, background: "#161b22", color: "#c9d1d9", border: "1px solid #30363d" }}
              onClick={() => setScreen("menu")}
            >
              ← elegir snippet
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = {
  root: {
    minHeight: "100vh",
    background: "#0d1117",
    color: "#c9d1d9",
    fontFamily: "'JetBrains Mono', monospace",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  menuWrap: {
    width: "100%",
    maxWidth: "780px",
    padding: "48px 24px",
    animation: "fadeIn 0.4s ease",
  },
  header: {
    marginBottom: "48px",
    textAlign: "center",
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "10px",
    letterSpacing: "-0.02em",
  },
  logoAccent: {
    color: "#82aaff",
    marginRight: "8px",
  },
  logoText: {
    color: "#c9d1d9",
  },
  tagline: {
    color: "#546e7a",
    fontSize: "13px",
    letterSpacing: "0.05em",
  },
  section: {
    marginBottom: "36px",
  },
  sectionLabel: {
    color: "#546e7a",
    fontSize: "12px",
    marginBottom: "12px",
    letterSpacing: "0.05em",
  },
  langRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  langBtn: {
    padding: "6px 16px",
    background: "#0d1117",
    border: "1px solid #21262d",
    borderRadius: "4px",
    color: "#8b949e",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "0.05em",
    transition: "all 0.12s",
  },
  langBtnActive: {
    background: "#1c2333",
    borderColor: "#82aaff",
    color: "#82aaff",
  },
  snippetGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "12px",
  },
  snippetCard: {
    background: "#0d1117",
    border: "1px solid #21262d",
    borderRadius: "8px",
    padding: "16px",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  snippetTitle: {
    fontSize: "13px",
    color: "#c9d1d9",
    fontWeight: "500",
    marginBottom: "8px",
  },
  snippetMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "10px",
  },
  badge: {
    padding: "2px 8px",
    borderRadius: "3px",
    fontSize: "11px",
    letterSpacing: "0.04em",
  },
  snippetLines: {
    color: "#546e7a",
    fontSize: "11px",
  },
  snippetPreview: {
    fontSize: "11px",
    color: "#546e7a",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginBottom: "8px",
  },
  startHint: {
    fontSize: "11px",
    color: "#30363d",
  },
  footer: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "12px",
  },
  // Practice
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    borderBottom: "1px solid #21262d",
    background: "#0d1117",
    width: "100%",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#546e7a",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "'JetBrains Mono', monospace",
    padding: "4px 0",
  },
  topCenter: {
    fontSize: "12px",
  },
  topRight: {
    fontSize: "12px",
  },
  progressBar: {
    width: "100%",
    height: "2px",
    background: "#21262d",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #82aaff, #c792ea)",
    transition: "width 0.1s ease",
  },
  codeArea: {
    flex: 1,
    padding: "32px 24px",
    overflowY: "auto",
    cursor: "text",
    width: "100%",
  },
  codeBlock: {
    maxWidth: "760px",
    margin: "0 auto",
  },
  codeLine: {
    display: "flex",
    alignItems: "flex-start",
    minHeight: "28px",
    lineHeight: "28px",
  },
  lineNum: {
    color: "#30363d",
    fontSize: "12px",
    minWidth: "32px",
    userSelect: "none",
    paddingRight: "16px",
    textAlign: "right",
  },
  lineContent: {
    fontSize: "15px",
    letterSpacing: "0.02em",
    lineHeight: "28px",
    whiteSpace: "pre",
  },
  cursor: {
    position: "absolute",
    left: 0,
    top: "2px",
    width: "2px",
    height: "22px",
    background: "#82aaff",
    borderRadius: "1px",
    zIndex: 10,
  },
  bottomBar: {
    display: "flex",
    gap: "32px",
    padding: "16px 24px",
    borderTop: "1px solid #21262d",
    background: "#0d1117",
    justifyContent: "center",
    width: "100%",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
  },
  statLabel: {
    color: "#546e7a",
    fontSize: "10px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#c9d1d9",
  },
  // Results
  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  resultCard: {
    background: "#161b22",
    border: "1px solid #21262d",
    borderRadius: "8px",
    padding: "24px 16px",
    textAlign: "center",
  },
  resultNum: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#ffcb6b",
    marginBottom: "4px",
  },
  resultLabel: {
    fontSize: "11px",
    color: "#546e7a",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: "4px",
  },
  resultSub: {
    fontSize: "11px",
    color: "#30363d",
  },
  actionBtn: {
    padding: "10px 24px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "'JetBrains Mono', monospace",
    transition: "all 0.15s",
    letterSpacing: "0.05em",
  },
};
