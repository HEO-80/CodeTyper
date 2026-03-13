"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { tokenize, getTokenColor } from "@/lib/tokenizer";
import { ProgressBar, TopBar, BottomBar } from "@/components/ui/SharedComponents";

// ─── Inyectar comentarios en inglés encima de bloques relevantes ──────────────
function injectComments(code, language) {
  const lines = code.split("\n");
  const result = [];

  const commentChar = ["sql"].includes(language) ? "--" : "//";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const indent = line.match(/^(\s*)/)[1];
    let comment = null;

    if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("--") || trimmed.startsWith("#")) {
      result.push(line);
      continue;
    }

    if (/^(function\s+\w+|const\s+\w+\s*=\s*(async\s*)?\()/.test(trimmed))
      comment = "Define a function";
    else if (/^class\s+/.test(trimmed))
      comment = "Define a class";
    else if (/^export default/.test(trimmed))
      comment = "Export as default";
    else if (/^constructor/.test(trimmed))
      comment = "Initialize the instance";
    else if (/^return\s*[\({]/.test(trimmed))
      comment = "Return the result";
    else if (/^(if|} else if)\s*\(/.test(trimmed))
      comment = "Check the condition";
    else if (/^for[\s(]/.test(trimmed))
      comment = "Iterate over items";
    else if (/^try\s*\{/.test(trimmed))
      comment = "Handle errors safely";
    else if (/^catch\s*\(/.test(trimmed))
      comment = "Catch and handle the error";
    else if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)/i.test(trimmed))
      comment = "SQL statement";
    else if (/^pragma solidity/.test(trimmed))
      comment = "Set the Solidity compiler version";
    else if (/^contract\s+/.test(trimmed))
      comment = "Define the smart contract";
    else if (/^event\s+/.test(trimmed))
      comment = "Declare an on-chain event";
    else if (/^modifier\s+/.test(trimmed))
      comment = "Define an access modifier";
    else if (/^emit\s+/.test(trimmed))
      comment = "Emit the event to the blockchain";
    else if (/^mapping\s*\(/.test(trimmed))
      comment = "Mapping: key => value store";
    else if (/^interface\s+/.test(trimmed))
      comment = "Define the interface";

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
  const [errors, setErrors] = useState(new Set());
  const [totalErrors, setTotalErrors] = useState(0);
  const [errorFlash, setErrorFlash] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [tick, setTick] = useState(0);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const code = showComments
      ? injectComments(snippet.code, language)
      : snippet.code;
    const t = tokenize(code, language);
    setTokens(t);
    setCursor(0);
    setErrors(new Set());
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

  const buildResult = useCallback(() => ({
    snippet,
    language,
    tokens,
    totalErrors,
    startTime: startTime || Date.now(),
    endTime: Date.now(),
  }), [snippet, language, tokens, totalErrors, startTime]);

  const handleKeyDown = useCallback(
    (e) => {
      if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Escape"].includes(e.key)) return;

      const expected = tokens[cursor];
      if (!expected) return;

      // ── TAB: avanza automáticamente toda la indentación pendiente ───────────
      if (e.key === "Tab") {
        e.preventDefault();
        if (!startTime) setStartTime(Date.now());

        setCursor((prev) => {
          let next = prev;
          // Avanzar mientras sean espacios al inicio de línea
          while (next < tokens.length && tokens[next].char === " ") {
            next++;
            // Parar si llegamos a un carácter no-espacio
            if (tokens[next] && tokens[next].char !== " ") break;
          }
          if (next === prev) next = prev + 1; // fallback: avanzar 1
          if (next >= tokens.length) {
            clearInterval(timerRef.current);
            setTimeout(() => onFinish(buildResult()), 300);
          }
          return next;
        });
        return;
      }

      if (!startTime) setStartTime(Date.now());
      const typedChar = e.key === "Enter" ? "\n" : e.key;

      if (typedChar === expected.char) {
        setCursor((prev) => {
          const next = prev + 1;
          if (next >= tokens.length) {
            clearInterval(timerRef.current);
            setTimeout(() => onFinish(buildResult()), 300);
          }
          return next;
        });
      } else {
        if (typedChar.length === 1 || typedChar === "\n") {
          setTotalErrors((p) => p + 1);
          setErrors((prev) => new Set([...prev, cursor]));
          setErrorFlash(true);
          setTimeout(() => setErrorFlash(false), 150);
        }
      }
    },
    [tokens, cursor, startTime, buildResult, onFinish]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Agrupar en líneas
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
  const accuracy = cursor > 0 ? Math.round(((cursor - totalErrors) / cursor) * 100) : 100;
  const currentToken = tokens[cursor];

  // Detectar si el cursor está en indentación (para hint del Tab)
  const isOnIndent =
    currentToken?.char === " " &&
    cursor > 0 &&
    tokens[cursor - 1]?.char === "\n";

  return (
    <div ref={containerRef} tabIndex={0} style={styles.root}>
      <style>{`
        @keyframes errorFlash {
          0%,100% { background: #0d1117; }
          50% { background: #1a0d0d; }
        }
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

      <div style={{
        ...styles.codeArea,
        animation: errorFlash ? "errorFlash 0.15s ease" : "none",
      }}>
        <div style={styles.codeBlock}>
          {lines.map((lineTokens, lineIdx) => {
            const isCommentLine =
              lineTokens.length > 0 && lineTokens[0]?.type === "comment";

            return (
              <div key={lineIdx} style={styles.codeLine}>
                <span style={styles.lineNum}>{lineIdx + 1}</span>
                <span style={styles.lineContent}>
                  {isCommentLine && (
                    <span style={styles.commentTag}>EN</span>
                  )}
                  {lineTokens.map(({ char, type, idx }) => {
                    const isTyped = idx < cursor;
                    const isCursor = idx === cursor;
                    const isError = errors.has(idx);
                    const color = isTyped
                      ? isError ? "#ff5555" : getTokenColor(type)
                      : isCommentLine ? "#1e3a2a" : "#1e2d3d";

                    return (
                      <span key={idx} style={{ position: "relative", display: "inline-block" }}>
                        {isCursor && <span style={styles.cursor} />}
                        <span style={{
                          color,
                          fontWeight: isTyped && type === "keyword" ? "500" : "300",
                          transition: "color 0.04s",
                          fontStyle: isCommentLine ? "italic" : "normal",
                          ...(isError
                            ? { textDecoration: "underline", textDecorationColor: "#ff5555" }
                            : {}),
                        }}>
                          {char === " " ? "\u00A0" : char}
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
        nextChar={currentToken?.char}
        isOnIndent={isOnIndent}
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
