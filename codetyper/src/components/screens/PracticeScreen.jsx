"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { tokenize, getTokenColor } from "@/lib/tokenizer";
import { ProgressBar, TopBar, BottomBar } from "@/components/ui/SharedComponents";
import "./PracticeScreen.css";

const SCROLL_KEYS = [" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown"];
const IGNORE_KEYS = ["Shift", "Control", "Alt", "Meta", "CapsLock", "Escape",
  "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12"];

function injectComments(code, language) {
  const lines = code.split("\n");
  const result = [];
  const ch = language === "sql" ? "--" : "//";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();
    const ind = line.match(/^(\s*)/)[1];
    let comment = null;
    if (!t || t.startsWith("//") || t.startsWith("--") || t.startsWith("#")) { result.push(line); continue; }
    if (/^(function\s+\w+|const\s+\w+\s*=\s*(async\s*)?\()/.test(t))     comment = "Define a function";
    else if (/^class\s+/.test(t))                                           comment = "Define a class";
    else if (/^export default/.test(t))                                     comment = "Export as default";
    else if (/^constructor/.test(t))                                        comment = "Initialize the instance";
    else if (/^return\s*[\({]/.test(t))                                     comment = "Return the result";
    else if (/^(if|} else if)\s*\(/.test(t))                               comment = "Check the condition";
    else if (/^for[\s(]/.test(t))                                           comment = "Iterate over items";
    else if (/^try\s*\{/.test(t))                                           comment = "Handle errors safely";
    else if (/^catch\s*\(/.test(t))                                         comment = "Catch and handle the error";
    else if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)/i.test(t))  comment = "SQL statement";
    else if (/^pragma solidity/.test(t))                                    comment = "Set Solidity compiler version";
    else if (/^contract\s+/.test(t))                                        comment = "Define the smart contract";
    else if (/^event\s+/.test(t))                                           comment = "Declare an on-chain event";
    else if (/^modifier\s+/.test(t))                                        comment = "Define an access modifier";
    else if (/^emit\s+/.test(t))                                            comment = "Emit the event";
    else if (/^mapping\s*\(/.test(t))                                       comment = "Mapping: key => value";
    else if (/^interface\s+/.test(t))                                       comment = "Define the interface";
    if (comment) result.push(`${ind}${ch} ${comment}`);
    result.push(line);
  }
  return result.join("\n");
}

// Strip trailing newlines from token array to avoid end-of-snippet freeze
function stripTrailingNewlines(tokens) {
  let end = tokens.length;
  while (end > 0 && tokens[end - 1].char === "\n") end--;
  return tokens.slice(0, end);
}

export default function PracticeScreen({
  snippet, language, showComments,
  onFinish, onBack, onToggleComments,
}) {
  const [tokens, setTokens]       = useState([]);
  const [cursor, setCursor]       = useState(0);
  const [wrongChar, setWrongChar] = useState(null);
  const [totalErrors, setTotalErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [tick, setTick]           = useState(0);
  const containerRef = useRef(null);
  const timerRef     = useRef(null);

  useEffect(() => {
    const code = showComments ? injectComments(snippet.code, language) : snippet.code;
    const raw  = tokenize(code, language);
    const t    = stripTrailingNewlines(raw);
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
      timerRef.current = setInterval(() => setTick((n) => n + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime]);

  const buildResult = useCallback(() => ({
    snippet, language, tokens, totalErrors,
    startTime: startTime || Date.now(),
    endTime: Date.now(),
  }), [snippet, language, tokens, totalErrors, startTime]);

  const finish = useCallback(() => {
    clearInterval(timerRef.current);
    setTimeout(() => onFinish(buildResult()), 300);
  }, [buildResult, onFinish]);

  const handleKeyDown = useCallback((e) => {
    if (SCROLL_KEYS.includes(e.key)) e.preventDefault();
    if (IGNORE_KEYS.includes(e.key)) return;

    const expected = tokens[cursor];

    // BACKSPACE
    if (e.key === "Backspace") {
      e.preventDefault();
      if (wrongChar !== null) {
        setWrongChar(null);
      } else if (cursor > 0) {
        setCursor((p) => p - 1);
      }
      return;
    }

    // TAB — skip indentation
    if (e.key === "Tab") {
      e.preventDefault();
      if (wrongChar !== null) return;
      if (!startTime) setStartTime(Date.now());
      setCursor((prev) => {
        let next = prev;
        while (next < tokens.length && tokens[next].char === " ") next++;
        if (next === prev) next = prev + 1;
        if (next >= tokens.length) finish();
        return Math.min(next, tokens.length);
      });
      return;
    }

    if (!expected) return;
    if (!startTime) setStartTime(Date.now());

    const typedChar = e.key === "Enter" ? "\n" : e.key;
    if (typedChar.length !== 1 && typedChar !== "\n") return;

    // CORRECT
    if (typedChar === expected.char && wrongChar === null) {
      setCursor((prev) => {
        const next = prev + 1;
        if (next >= tokens.length) finish();
        return next;
      });
    } else {
      // WRONG
      if (wrongChar === null) setTotalErrors((p) => p + 1);
      setWrongChar(typedChar);
    }
  }, [tokens, cursor, wrongChar, startTime, finish]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Group into lines
  const lines = [];
  let current = [];
  tokens.forEach((token, idx) => {
    if (token.char === "\n") { lines.push(current); current = []; }
    else current.push({ ...token, idx });
  });
  if (current.length > 0) lines.push(current);

  const elapsed  = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
  const accuracy = cursor > 0 ? Math.round(((cursor - totalErrors) / cursor) * 100) : 100;
  const currentToken = tokens[cursor];
  const isOnIndent   = currentToken?.char === " " && cursor > 0 && tokens[cursor - 1]?.char === "\n";

  return (
    <div ref={containerRef} tabIndex={0} style={styles.root}>

      <TopBar
        language={language}
        title={snippet.title}
        cursor={cursor}
        total={tokens.length}
        onBack={onBack}
        showComments={showComments}
        onToggleComments={onToggleComments}
        errors={totalErrors}
        accuracy={accuracy}
        elapsed={elapsed}
        nextChar={wrongChar !== null ? null : currentToken?.char}
        isOnIndent={isOnIndent && wrongChar === null}
        typedWrong={wrongChar !== null}
      />

      <ProgressBar value={cursor} max={tokens.length} />

      <div style={styles.codeArea}>
        <div style={styles.codeBlock}>
          {lines.map((lineTokens, lineIdx) => {
            const isCommentLine = lineTokens.length > 0 && lineTokens[0]?.type === "comment";
            return (
              <div key={lineIdx} style={styles.codeLine}>
                <span style={styles.lineNum}>{lineIdx + 1}</span>
                <span style={styles.lineContent}>
                  {isCommentLine && <span className="comment-tag">EN</span>}
                  {lineTokens.map(({ char, type, idx }) => {
                    const isTyped  = idx < cursor;
                    const isCursor = idx === cursor;

                    let color;
                    if (isCursor && wrongChar !== null) {
                      color = "#ff5555";
                    } else if (isTyped) {
                      color = getTokenColor(type);
                    } else {
                      color = isCommentLine ? "#2d5a3d" : "#4a5568";
                    }

                    const display = isCursor && wrongChar !== null ? wrongChar : char;

                    return (
                      <span key={idx} style={{ position: "relative", display: "inline-block" }}>
                        {isCursor && wrongChar === null && <span className="code-cursor" />}
                        <span style={{
                          color,
                          fontWeight: isTyped && (type === "keyword" || type === "class") ? "500" : "300",
                          fontStyle: isCommentLine ? "italic" : "normal",
                          transition: "color 0.06s",
                        }}>
                          {display === " " ? "\u00A0" : display}
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
    width: "100%", minHeight: "100vh", background: "#0d1117",
    display: "flex", flexDirection: "column",
    outline: "none", fontFamily: "'JetBrains Mono', monospace",
  },
  codeArea: { flex: 1, padding: "32px 24px", overflowY: "auto", background: "#0d1117" },
  codeBlock: { maxWidth: "780px", margin: "0 auto" },
  codeLine: {
    display: "flex", alignItems: "flex-start",
    minHeight: "28px", lineHeight: "28px",
  },
  lineNum: {
    color: "#30363d", fontSize: "12px", minWidth: "36px",
    userSelect: "none", paddingRight: "16px", textAlign: "right", paddingTop: "1px",
  },
  lineContent: {
    fontSize: "15px", letterSpacing: "0.02em", lineHeight: "28px",
    whiteSpace: "pre", display: "flex", alignItems: "center", gap: "6px",
  },
};
