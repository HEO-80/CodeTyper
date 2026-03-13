"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { tokenize, getTokenColor } from "@/lib/tokenizer";
import TopBar from "@/components/layout/TopBar";
import BottomBar from "@/components/layout/BottomBar";
import ProgressBar from "@/components/ui/ProgressBar";

export default function PracticeScreen({ snippet, language, onFinish, onBack }) {
  const [tokens, setTokens] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [errors, setErrors] = useState(new Set());
  const [totalErrors, setTotalErrors] = useState(0);
  const [errorFlash, setErrorFlash] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [tick, setTick] = useState(0);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  // Tokenizar el snippet al montar
  useEffect(() => {
    const t = tokenize(snippet.code, language);
    setTokens(t);
    setCursor(0);
    setErrors(new Set());
    setTotalErrors(0);
    setStartTime(null);
    setTimeout(() => containerRef.current?.focus(), 50);
  }, [snippet, language]);

  // Timer para actualizar el tiempo en pantalla
  useEffect(() => {
    if (startTime) {
      timerRef.current = setInterval(() => setTick((t) => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime]);

  const handleKeyDown = useCallback(
    (e) => {
      if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Escape"].includes(e.key)) return;
      if (e.key === "Tab") { e.preventDefault(); return; }

      const expected = tokens[cursor];
      if (!expected) return;

      if (!startTime) setStartTime(Date.now());

      const typedChar = e.key === "Enter" ? "\n" : e.key;

      if (typedChar === expected.char) {
        setCursor((prev) => {
          const next = prev + 1;
          if (next >= tokens.length) {
            clearInterval(timerRef.current);
            setTimeout(() => {
              onFinish({
                snippet,
                language,
                tokens,
                totalErrors,
                startTime: startTime || Date.now(),
                endTime: Date.now(),
              });
            }, 300);
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
    [tokens, cursor, startTime, totalErrors, snippet, language, onFinish]
  );

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
  const accuracy = cursor > 0 ? Math.round(((cursor - totalErrors) / cursor) * 100) : 100;
  const currentToken = tokens[cursor];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      style={styles.root}
      onFocus={() => {}}
    >
      <TopBar
        language={language}
        title={snippet.title}
        cursor={cursor}
        total={tokens.length}
        onBack={onBack}
      />
      <ProgressBar value={cursor} max={tokens.length} />

      {/* Code area */}
      <div
        style={{
          ...styles.codeArea,
          animation: errorFlash ? "errorFlash 0.15s ease" : "none",
        }}
      >
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

        <div style={styles.codeBlock}>
          {lines.map((lineTokens, lineIdx) => (
            <div key={lineIdx} style={styles.codeLine}>
              <span style={styles.lineNum}>{lineIdx + 1}</span>
              <span style={styles.lineContent}>
                {lineTokens.map(({ char, type, idx }) => {
                  const isTyped = idx < cursor;
                  const isCursor = idx === cursor;
                  const isError = errors.has(idx);

                  const color = isTyped
                    ? isError
                      ? "#ff5555"
                      : getTokenColor(type)
                    : "#1e2d3d";

                  return (
                    <span key={idx} style={{ position: "relative", display: "inline-block" }}>
                      {isCursor && <span style={styles.cursor} />}
                      <span
                        style={{
                          color,
                          fontWeight: isTyped && type === "keyword" ? "500" : "300",
                          transition: "color 0.04s",
                          ...(isError
                            ? { textDecoration: "underline", textDecorationColor: "#ff5555" }
                            : {}),
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    </span>
                  );
                })}
                {/* Cursor al final de línea antes de \n */}
                {cursor < tokens.length &&
                  tokens[cursor]?.char === "\n" &&
                  lineTokens.length > 0 &&
                  lineTokens[lineTokens.length - 1].idx === cursor - 1 && (
                    <span style={styles.cursor} />
                  )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <BottomBar
        errors={totalErrors}
        accuracy={accuracy}
        elapsed={elapsed}
        nextChar={currentToken?.char}
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
    transition: "background 0.1s",
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
