"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { tokenize, getTokenColor } from "@/lib/tokenizer";
import { ProgressBar, TopBar, BottomBar } from "@/components/ui/SharedComponents";
import "./PracticeScreen.css";

// ─── Inyectar comentarios en inglés ──────────────────────────────────────────
function injectComments(code, language) {
  const lines = code.split("\n");
  const result = [];
  const commentChar = language === "sql" ? "--" : "//";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const indent = line.match(/^(\s*)/)[1];
    let comment = null;

    if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("--") || trimmed.startsWith("#")) {
      result.push(line);
      continue;
    }

    if (/^(function\s+\w+|const\s+\w+\s*=\s*(async\s*)?\()/.test(trimmed))       comment = "Define a function";
    else if (/^class\s+/.test(trimmed))                                            comment = "Define a class";
    else if (/^export default/.test(trimmed))                                      comment = "Export as default";
    else if (/^constructor/.test(trimmed))                                         comment = "Initialize the instance";
    else if (/^return\s*[\({]/.test(trimmed))                                      comment = "Return the result";
    else if (/^(if|} else if)\s*\(/.test(trimmed))                                comment = "Check the condition";
    else if (/^for[\s(]/.test(trimmed))                                            comment = "Iterate over items";
    else if (/^try\s*\{/.test(trimmed))                                            comment = "Handle errors safely";
    else if (/^catch\s*\(/.test(trimmed))                                          comment = "Catch and handle the error";
    else if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)/i.test(trimmed))   comment = "SQL statement";
    else if (/^pragma solidity/.test(trimmed))                                     comment = "Set the Solidity compiler version";
    else if (/^contract\s+/.test(trimmed))                                         comment = "Define the smart contract";
    else if (/^event\s+/.test(trimmed))                                            comment = "Declare an on-chain event";
    else if (/^modifier\s+/.test(trimmed))                                         comment = "Define an access modifier";
    else if (/^emit\s+/.test(trimmed))                                             comment = "Emit the event to the blockchain";
    else if (/^mapping\s*\(/.test(trimmed))                                        comment = "Mapping: key => value store";
    else if (/^interface\s+/.test(trimmed))                                        comment = "Define the interface";

    if (comment) result.push(`${indent}${commentChar} ${comment}`);
    result.push(line);
  }
  return result.join("\n");
}

export default function PracticeScreen({
  snippet,
  language,
  showComments,
  onFinish,
  onBack,
  onToggleComments,
}) {
  const [tokens, setTokens] = useState([]);
  const [cursor, setCursor] = useState(0);
  // wrongChar: el carácter incorrecto que el usuario escribió en la posición actual
  const [wrongChar, setWrongChar] = useState(null);
  const [totalErrors, setTotalErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [tick, setTick] = useState(0);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const code = showComments ? injectComments(snippet.code, language) : snippet.code;
    const t = tokenize(code, language);
    setTokens(t);
    setCursor(0);
    setWrongChar(null);
    setTotalErrors(0);
    setStartTime(null);
    clearInterval(timerRef.current);
    setTimeout(() => containerRef.current?.focus(), 50);
  }, [snippet, language, showComments]);

  useEffect(() => {
    if (startTime) {
      timerRef.current = setInterval(() => setTick((t) => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime]);

  const handleKeyDown = useCallback((e) => {
    if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Escape"].includes(e.key)) return;

    const expected = tokens[cursor];
    if (!expected && cursor >= tokens.length) return;

    // ── BACKSPACE ─────────────────────────────────────────────────────────────
    if (e.key === "Backspace") {
      e.preventDefault();
      if (wrongChar !== null) {
        // Había un error en la posición actual → limpiar el error
        setWrongChar(null);
      } else if (cursor > 0) {
        // Sin error → retroceder una posición
        setCursor((prev) => prev - 1);
        setWrongChar(null);
      }
      return;
    }

    // ── TAB: avanza toda la indentación automáticamente ───────────────────────
    if (e.key === "Tab") {
      e.preventDefault();
      if (wrongChar !== null) return; // no avanzar si hay error pendiente
      if (!startTime) setStartTime(Date.now());

      setCursor((prev) => {
        let next = prev;
        while (next < tokens.length && tokens[next].char === " ") {
          next++;
          if (tokens[next] && tokens[next].char !== " ") break;
        }
        if (next === prev) next = prev + 1;
        if (next >= tokens.length) {
          clearInterval(timerRef.current);
          setTimeout(() => onFinish({
            snippet, language, tokens, totalErrors,
            startTime: startTime || Date.now(), endTime: Date.now(),
          }), 300);
        }
        return next;
      });
      return;
    }

    if (!startTime) setStartTime(Date.now());

    const typedChar = e.key === "Enter" ? "\n" : e.key;
    if (typedChar.length !== 1 && typedChar !== "\n") return;

    // ── CARÁCTER CORRECTO ─────────────────────────────────────────────────────
    if (typedChar === expected.char && wrongChar === null) {
      setWrongChar(null);
      setCursor((prev) => {
        const next = prev + 1;
        if (next >= tokens.length) {
          clearInterval(timerRef.current);
          setTimeout(() => onFinish({
            snippet, language, tokens, totalErrors,
            startTime: startTime || Date.now(), endTime: Date.now(),
          }), 300);
        }
        return next;
      });
    } else {
      // ── CARÁCTER INCORRECTO ─────────────────────────────────────────────────
      // Solo contar error si no había ya uno (evitar spam de errores)
      if (wrongChar === null) {
        setTotalErrors((p) => p + 1);
      }
      setWrongChar(typedChar);
    }
  }, [tokens, cursor, wrongChar, startTime, totalErrors, snippet, language, onFinish]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Agrupar tokens en líneas
  const lines = [];
  let currentLine = [];
  tokens.forEach((token, idx) => {
    if (token.char === "\n") {
      lines.push(currentLine);
      currentLine = [];
    } else {
      currentLine.push({ ...token, idx });
    }
  });
  if (currentLine.length > 0) lines.push(currentLine);

  const elapsed = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
  const accuracy = cursor > 0
    ? Math.round(((cursor - totalErrors) / cursor) * 100)
    : 100;
  const currentToken = tokens[cursor];
  const isOnIndent =
    currentToken?.char === " " &&
    cursor > 0 &&
    tokens[cursor - 1]?.char === "\n";

  return (
    <div ref={containerRef} tabIndex={0} style={styles.root}>
      <style>{`
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <TopBar
        language={language}
        title={snippet.title}
        cursor={cursor}
        total={tokens.length}
        onBack={onBack}
        showComments={showComments}
        onToggleComments={onToggleComments}
      />
      <ProgressBar value={cursor} max={tokens.length} />

      <div style={styles.codeArea}>
        <div style={styles.codeBlock}>
          {lines.map((lineTokens, lineIdx) => {
            const isCommentLine =
              lineTokens.length > 0 && lineTokens[0]?.type === "comment";

            return (
              <div key={lineIdx} style={styles.codeLine}>
                <span style={styles.lineNum}>{lineIdx + 1}</span>
                <span style={styles.lineContent}>
                  {isCommentLine && <span style={styles.commentTag}>EN</span>}
                  {lineTokens.map(({ char, type, idx }) => {
                    const isTyped = idx < cursor;
                    const isCursor = idx === cursor;
                    const isCommentChar = isCommentLine;

                    // Color del carácter
                    let color;
                    if (isCursor && wrongChar !== null) {
                      color = "#ff5555"; // error en posición actual
                    } else if (isTyped) {
                      color = getTokenColor(type); // ya escrito correctamente
                    } else {
                      color = isCommentChar ? "#1e3a2a" : "#1e2d3d"; // pendiente
                    }

                    // Qué mostrar: si es el cursor con error, mostrar el char incorrecto
                    const displayChar = isCursor && wrongChar !== null
                      ? wrongChar
                      : char;

                    return (
                      <span key={idx} style={{ position: "relative", display: "inline-block" }}>
                        {/* Cursor (solo si no hay error) */}
                        {isCursor && wrongChar === null && (
                          <span style={styles.cursor} />
                        )}
                        <span style={{
                          color,
                          fontWeight: isTyped && type === "keyword" ? "500" : "300",
                          fontStyle: isCommentChar ? "italic" : "normal",
                          transition: "color 0.04s",
                        }}>
                          {displayChar === " " ? "\u00A0" : displayChar}
                        </span>
                      </span>
                    );
                  })}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <BottomBar
        errors={totalErrors}
        accuracy={accuracy}
        elapsed={elapsed}
        nextChar={wrongChar !== null ? null : currentToken?.char}
        isOnIndent={isOnIndent && wrongChar === null}
        typedWrong={wrongChar !== null}
      />
    </div>
  );
}

const styles = {
  root: {
    width: "100%",
    minHeight: "100vh",
    background: "#0d1117",
    display: "flex",
    flexDirection: "column",
    outline: "none",
    fontFamily: "'JetBrains Mono', monospace",
  },
  codeArea: {
    flex: 1,
    padding: "32px 24px",
    overflowY: "auto",
    background: "#0d1117",
  },
  codeBlock: { maxWidth: "780px", margin: "0 auto" },
  codeLine: {
    display: "flex",
    alignItems: "flex-start",
    minHeight: "28px",
    lineHeight: "28px",
  },
  lineNum: {
    color: "#30363d",
    fontSize: "12px",
    minWidth: "36px",
    userSelect: "none",
    paddingRight: "16px",
    textAlign: "right",
    paddingTop: "1px",
  },
  lineContent: {
    fontSize: "15px",
    letterSpacing: "0.02em",
    lineHeight: "28px",
    whiteSpace: "pre",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  commentTag: {
    fontSize: "9px",
    color: "#4ec994",
    border: "1px solid #1e3a2a",
    borderRadius: "3px",
    padding: "1px 4px",
    letterSpacing: "0.08em",
    userSelect: "none",
    flexShrink: 0,
  },
  cursor: {
    position: "absolute",
    left: 0,
    top: "3px",
    width: "2px",
    height: "21px",
    background: "#82aaff",
    borderRadius: "1px",
    zIndex: 10,
    animation: "blink 1s step-end infinite",
  },
};
