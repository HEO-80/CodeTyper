"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { tokenize, getTokenColor } from "@/lib/tokenizer";
import "./TerminalMode.css";

const SCROLL_KEYS = [" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown"];
const IGNORE_KEYS = ["Shift", "Control", "Alt", "Meta", "CapsLock", "Escape",
  "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12"];

const PROMPTS = {
  javascript: "node >",
  typescript: "ts-node >",
  python:     "python3 >",
  java:       "javac >",
  csharp:     "dotnet >",
  sql:        "sql >",
  solidity:   "forge >",
  bash:       "bash >",
  powershell: "ps >",
  cloud:      "cloud >",
  english:    "write >",
  mindset:    "think >",
};

export default function TerminalMode({
  snippet,
  language,
  showComments,
  onFinish,
  onBack,
  onToggleComments,
  onSwitchMode,
  embedded = false,   // ← true when mounted inside PracticeScreen
}) {
  const [tokens,      setTokens]      = useState([]);
  const [cursor,      setCursor]      = useState(0);
  const [wrongChar,   setWrongChar]   = useState(null);
  const [totalErrors, setTotalErrors] = useState(0);
  const [startTime,   setStartTime]   = useState(null);
  const [tick,        setTick]        = useState(0);
  const [lines,       setLines]       = useState([]);

  const containerRef = useRef(null);
  const bottomRef    = useRef(null);
  const timerRef     = useRef(null);

  const prompt = PROMPTS[language] || ">";

  useEffect(() => {
    const t = tokenize(snippet.code, language);
    let end = t.length;
    while (end > 0 && t[end - 1].char === "\n") end--;
    setTokens(t.slice(0, end));
    setCursor(0);
    setWrongChar(null);
    setTotalErrors(0);
    setStartTime(null);
    setLines([]);
    clearInterval(timerRef.current);
    setTimeout(() => containerRef.current?.focus(), 80);
  }, [snippet, language]);

  useEffect(() => {
    if (startTime) {
      timerRef.current = setInterval(() => setTick((n) => n + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, cursor]);

  const buildResult = useCallback(() => ({
    snippet, language, tokens, totalErrors,
    startTime: startTime || Date.now(),
    endTime: Date.now(),
  }), [snippet, language, tokens, totalErrors, startTime]);

  const finish = useCallback(() => {
    clearInterval(timerRef.current);
    setTimeout(() => onFinish(buildResult()), 400);
  }, [buildResult, onFinish]);

  const handleKeyDown = useCallback((e) => {
    if (SCROLL_KEYS.includes(e.key)) e.preventDefault();
    if (IGNORE_KEYS.includes(e.key)) return;

    const expected = tokens[cursor];

    if (e.key === "Backspace") {
      e.preventDefault();
      if (wrongChar !== null) {
        setWrongChar(null);
      } else if (cursor > 0 && tokens[cursor - 1]?.char !== "\n") {
        setCursor((p) => p - 1);
      }
      return;
    }

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

    if (typedChar === expected.char && wrongChar === null) {
      setCursor((prev) => {
        const next = prev + 1;
        if (typedChar === "\n") {
          const lineTokens = getCurrentLineTokens(tokens, prev);
          setLines((old) => [...old, lineTokens]);
        }
        if (next >= tokens.length) finish();
        return next;
      });
    } else {
      if (wrongChar === null) setTotalErrors((p) => p + 1);
      setWrongChar(typedChar);
    }
  }, [tokens, cursor, wrongChar, startTime, finish]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  function getCurrentLineTokens(allTokens, cursorPos) {
    let start = cursorPos;
    while (start > 0 && allTokens[start - 1]?.char !== "\n") start--;
    const result = [];
    for (let i = start; i <= cursorPos; i++) {
      if (allTokens[i]) result.push({ ...allTokens[i], idx: i });
    }
    return result;
  }

  const activeLineStart = (() => {
    let i = cursor;
    while (i > 0 && tokens[i - 1]?.char !== "\n") i--;
    return i;
  })();

  const activeLineTokens = [];
  for (let i = activeLineStart; i < tokens.length; i++) {
    if (tokens[i].char === "\n") break;
    activeLineTokens.push({ ...tokens[i], idx: i });
  }

  const elapsed  = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
  const accuracy = cursor > 0 ? Math.round(((cursor - totalErrors) / cursor) * 100) : 100;
  const progress = tokens.length > 0 ? Math.round((cursor / tokens.length) * 100) : 0;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="tm-root"
      style={embedded ? { flex: 1, minHeight: 0 } : {}}
    >
      {/* Titlebar — only when NOT embedded (standalone page use) */}
      {!embedded && (
        <div className="tm-titlebar">
          <div className="tm-dots">
            <span className="tm-dot red"    onClick={onBack}       title="Exit" />
            <span className="tm-dot yellow" onClick={onSwitchMode} title="Switch to editor" />
            <span className="tm-dot green" />
          </div>
          <span className="tm-title">{language} — {snippet.title}</span>
          <div className="tm-titlebar-right">
            <span className="tm-stat">
              <span style={{ color: totalErrors > 0 ? "var(--hl-red)" : "var(--hl-green)" }}>{totalErrors}</span>
              <span className="tm-stat-label">err</span>
            </span>
            <span className="tm-stat">
              <span style={{ color: accuracy >= 95 ? "var(--hl-green)" : "var(--hl-yellow)" }}>{accuracy}%</span>
              <span className="tm-stat-label">acc</span>
            </span>
            <span className="tm-stat">
              <span style={{ color: "var(--hl-blue)" }}>{elapsed}s</span>
              <span className="tm-stat-label">time</span>
            </span>
            <button className="tm-mode-btn" onClick={onSwitchMode}>
              ⌨ editor
            </button>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="tm-progress-track">
        <div className="tm-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Terminal body */}
      <div className="tm-body">
        <div className="tm-banner">
          <span className="tm-banner-text">
            {language} — {snippet.title} — {snippet.difficulty || "beginner"}
          </span>
        </div>

        {/* Completed lines */}
        {lines.map((lineTokens, lineIdx) => (
          <div key={lineIdx} className="tm-line">
            <span className="tm-prompt">{prompt}</span>
            <span className="tm-line-content">
              {lineTokens.map(({ char, type, idx }) => (
                <span key={idx} style={{
                  color: getTokenColor(type),
                  fontWeight: type === "keyword" ? "500" : "300",
                }}>
                  {char === " " ? "\u00A0" : char === "\n" ? "" : char}
                </span>
              ))}
            </span>
          </div>
        ))}

        {/* Active line */}
        <div className="tm-line tm-active">
          <span className="tm-prompt">{prompt}</span>
          <span className="tm-line-content">
            {activeLineTokens.map(({ char, type, idx }) => {
              const isTyped  = idx < cursor;
              const isCursor = idx === cursor;
              let color;
              if (isCursor && wrongChar !== null) color = "var(--hl-red)";
              else if (isTyped) color = getTokenColor(type);
              else color = "var(--c-un)";
              const display = isCursor && wrongChar !== null ? wrongChar : char;
              return (
                <span key={idx} style={{ position: "relative", display: "inline-block" }}>
                  {isCursor && wrongChar === null && <span className="tm-cursor" />}
                  <span style={{
                    color,
                    fontWeight: isTyped && type === "keyword" ? "500" : "300",
                    transition: "color 0.05s",
                  }}>
                    {display === " " ? "\u00A0" : display}
                  </span>
                </span>
              );
            })}

            {cursor >= activeLineStart + activeLineTokens.length && wrongChar === null && (
              <span className="tm-cursor-end" />
            )}

            {activeLineTokens.slice(cursor - activeLineStart).map(({ char, idx }) => {
              if (idx < cursor) return null;
              return (
                <span key={`ghost-${idx}`} style={{ color: "var(--tx5)", fontWeight: "300" }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </span>
        </div>

        {cursor >= tokens.length && (
          <div className="tm-line tm-done-line">
            <span className="tm-prompt" style={{ color: "var(--hl-green)" }}>{prompt}</span>
            <span style={{ color: "var(--hl-green)" }}>✓ snippet complete</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Status bar */}
      <div className="tm-statusbar">
        <span className="tm-status-left">
          <span className="tm-status-dot" />
          {language}
        </span>
        <span className="tm-status-center">
          {wrongChar !== null
            ? <span style={{ color: "var(--hl-red)" }}>⌫ backspace to fix</span>
            : cursor < tokens.length && tokens[cursor]?.char === "\n"
            ? <span style={{ color: "var(--hl-blue)" }}>↵ press Enter</span>
            : cursor < tokens.length && tokens[cursor]?.char === " "
            ? <span style={{ color: "var(--tx3)" }}>· space</span>
            : cursor < tokens.length
            ? <span style={{ color: "var(--hl-purple)" }}>"{tokens[cursor]?.char}"</span>
            : <span style={{ color: "var(--hl-green)" }}>✓ done</span>
          }
        </span>
        <span className="tm-status-right">
          ln {lines.length + 1} · col {cursor - activeLineStart + 1}
        </span>
      </div>
    </div>
  );
}
