"use client";
"use no memo";

import { useState, useEffect, useRef, useCallback } from "react";
import { tokenize, getTokenColor } from "@/lib/tokenizer";
import { ProgressBar, TopBar, BottomBar } from "@/components/ui/SharedComponents";
import { useCodeStructure } from "@/hooks/useCodeStructure";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSpeech } from "@/hooks/useSpeech";
import { useAudio } from "@/components/ui/LayoutClient";
import TerminalMode from "@/components/screens/TerminalMode";
import { KeyboardPanel } from "@/components/ui/KeyboardOverlay";
import "./PracticeScreen.css";

// ─── Inject English comments ──────────────────────────────────────────────────
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
      result.push(line); continue;
    }
    if (/^(function\s+\w+|const\s+\w+\s*=\s*(async\s*)?\()/.test(trimmed)) comment = "Define a function";
    else if (/^class\s+/.test(trimmed)) comment = "Define a class";
    else if (/^export default/.test(trimmed)) comment = "Export as default";
    else if (/^constructor/.test(trimmed)) comment = "Initialize the instance";
    else if (/^return\s*[\({]/.test(trimmed)) comment = "Return the result";
    else if (/^(if|} else if)\s*\(/.test(trimmed)) comment = "Check the condition";
    else if (/^for[\s(]/.test(trimmed)) comment = "Iterate over items";
    else if (/^try\s*\{/.test(trimmed)) comment = "Handle errors safely";
    else if (/^catch\s*\(/.test(trimmed)) comment = "Catch and handle the error";
    else if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)/i.test(trimmed)) comment = "SQL statement";
    else if (/^pragma solidity/.test(trimmed)) comment = "Set the Solidity compiler version";
    else if (/^contract\s+/.test(trimmed)) comment = "Define the smart contract";
    else if (/^event\s+/.test(trimmed)) comment = "Declare an on-chain event";
    else if (/^modifier\s+/.test(trimmed)) comment = "Define an access modifier";
    else if (/^emit\s+/.test(trimmed)) comment = "Emit the event to the blockchain";
    else if (/^mapping\s*\(/.test(trimmed)) comment = "Mapping: key => value store";
    else if (/^interface\s+/.test(trimmed)) comment = "Define the interface";
    if (comment) result.push(`${indent}${commentChar} ${comment}`);
    result.push(line);
  }
  return result.join("\n");
}

const LANG_META = {
  solidity:   { label: "Smart Contract",  icon: "◆", color: "#c792ea" },
  javascript: { label: "JavaScript",      icon: "⬡", color: "#ffcb6b" },
  typescript: { label: "TypeScript",      icon: "⬡", color: "#82aaff" },
  csharp:     { label: ".NET Web API",    icon: "◈", color: "#82aaff" },
  sql:        { label: "SQL Script",      icon: "▪", color: "#f78c6c" },
  powershell: { label: "PowerShell",      icon: "▶", color: "#5391FE" },
  bash:       { label: "Bash Script",     icon: "▶", color: "#4ec994" },
  python:     { label: "Python",          icon: "⬡", color: "#4ec994" },
  java:       { label: "Java",            icon: "◆", color: "#f89820" },
  cloud:      { label: "Cloud Script",    icon: "⬡", color: "#f78c6c" },
  english:    { label: "English",         icon: "⬡", color: "#4ec994" },
  french:     { label: "Français",        icon: "⬡", color: "#82aaff" },
  german:     { label: "Deutsch",         icon: "⬡", color: "#ffcb6b" },
  italian:    { label: "Italiano",        icon: "⬡", color: "#f78c6c" },
  portuguese: { label: "Português",       icon: "⬡", color: "#4ec994" },
  romanian:   { label: "Română",          icon: "⬡", color: "#c792ea" },
  japanese:   { label: "日本語",           icon: "⬡", color: "#f89820" },
  russian:    { label: "Русский",         icon: "⬡", color: "#82aaff" },
  chinese:    { label: "中文",             icon: "⬡", color: "#ff5555" },
};

const LINE_HEIGHT = 28;

// ─── Obtener líneas del código ────────────────────────────────────────────────
function getCodeLines(code) {
  return code.split("\n");
}

// ─── Obtener índice de línea actual ──────────────────────────────────────────
function getCurrentLineIndex(tokens, cursor) {
  let lineIndex = 0;
  for (let i = 0; i < cursor && i < tokens.length; i++) {
    if (tokens[i].char === "\n") lineIndex++;
  }
  return lineIndex;
}

export default function PracticeScreen({
  snippet, language, showComments,
  onFinish, onBack, onToggleComments,
  onNext, hasNext,
}) {
  const [mode, setMode] = useState("editor");
  const [tokens, setTokens] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [errors, setErrors] = useState(new Set());
  const [totalErrors, setTotalErrors] = useState(0);
  const [errorFlash, setErrorFlash] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [tick, setTick] = useState(0);
  const [panelMode, setPanelMode] = useState("structure");
  const [dictado, setDictado] = useState(false);
  const [transOpen, setTransOpen] = useState(false);
  const lastSpokenLine = useRef(-1);
  const speakTimeoutRef = useRef(null);
  const tokensRef = useRef(tokens);
  tokensRef.current = tokens;

  const containerRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const timerRef = useRef(null);
  const isMobile = useIsMobile(768);

  const { speak, stop, isSupported } = useSpeech(language);
  const audio = useAudio();

  const showPanel = panelMode !== null && !isMobile;
  const panelWidth = panelMode === "keyboard" ? 320 : 280;
  const rawCode = showComments ? injectComments(snippet.code, language) : snippet.code;
  const { structure, activeIndex } = useCodeStructure(rawCode, language, cursor);
  const meta = LANG_META[language] || { label: language, icon: "◉", color: "#82aaff" };

  // ─── Inicializar snippet ──────────────────────────────────────────────────
  useEffect(() => {
    const newTokens = tokenize(rawCode, language);
    setTokens(newTokens);
    setCursor(0);
    setErrors(new Set());
    setTotalErrors(0);
    setStartTime(null);
    lastSpokenLine.current = -1;
    clearInterval(timerRef.current);
    setTimeout(() => containerRef.current?.focus(), 50);

    // Leer la primera línea si dictado está activo
    if (dictado && isSupported) {
      const lines = getCodeLines(rawCode);
      if (lines[0]) {
        setTimeout(() => speak(lines[0]), 300);
        lastSpokenLine.current = 0;
      }
    }
  }, [snippet, language]);

  useEffect(() => {
    setTokens(tokenize(rawCode, language));
    setTimeout(() => containerRef.current?.focus(), 50);
  }, [showComments]);

  useEffect(() => {
    if (startTime) timerRef.current = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [startTime]);

  // ─── Al desactivar dictado, callar y olvidar la última línea leída ───────
  useEffect(() => {
    if (!dictado) {
      clearTimeout(speakTimeoutRef.current);
      stop();
      lastSpokenLine.current = -1;
    }
  }, [dictado, stop]);

  // ─── Leer la línea actual cuando cambia de línea o se activa el dictado ──
  // No devolvemos una función de limpieza: cursor cambia en cada pulsación,
  // así que un cleanup por-render cancelaría la voz programada antes de que
  // sonara si el usuario escribe más rápido que el pequeño delay de abajo.
  // Usamos una ref para tokens (no el array en las deps): pasar el array
  // completo aquí confundía la memoización entre renders y a veces
  // desincronizaba el efecto de las pulsaciones rápidas.
  useEffect(() => {
    if (!dictado || !isSupported || tokensRef.current.length === 0) return;
    const currentLine = getCurrentLineIndex(tokensRef.current, cursor);
    const lines = getCodeLines(rawCode);
    if (currentLine === lastSpokenLine.current || lines[currentLine] === undefined) return;
    lastSpokenLine.current = currentLine;
    clearTimeout(speakTimeoutRef.current);
    // Pequeño delay para que no se solape con el tipeo
    speakTimeoutRef.current = setTimeout(() => speak(lines[currentLine]), 200);
  }, [cursor, dictado, rawCode, isSupported, speak]);

  // ─── Limpiar el timeout pendiente al desmontar ───────────────────────────
  useEffect(() => () => clearTimeout(speakTimeoutRef.current), []);

  // Cursor centering
  useEffect(() => {
    const area = scrollAreaRef.current;
    if (!area) return;
    const rawLines = rawCode.split("\n");
    let lineIndex = 0;
    let charCount = 0;
    for (let i = 0; i < rawLines.length; i++) {
      charCount += rawLines[i].length + 1;
      if (charCount > cursor) { lineIndex = i; break; }
    }
    const cursorY = lineIndex * LINE_HEIGHT;
    const targetScrollTop = cursorY - area.clientHeight / 2 + LINE_HEIGHT / 2;
    area.scrollTo({ top: Math.max(0, targetScrollTop), behavior: "smooth" });
  }, [cursor]);

  const buildResult = useCallback(() => ({
    snippet, language, tokens, totalErrors,
    startTime: startTime || Date.now(), endTime: Date.now(),
  }), [snippet, language, tokens, totalErrors, startTime]);

  const repeatCurrentLine = useCallback(() => {
    if (!isSupported || tokens.length === 0) return;
    const currentLine = getCurrentLineIndex(tokens, cursor);
    const lines = getCodeLines(rawCode);
    if (lines[currentLine]) speak(lines[currentLine]);
  }, [isSupported, tokens, cursor, rawCode, speak]);

  const handleKeyDown = useCallback((e) => {
    if (mode !== "editor") return;
    if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Escape"].includes(e.key)) return;
    audio?.playKeyClick?.();
    if (e.key === " " || e.key === "Enter" || e.key === "Tab") e.preventDefault();
    const expected = tokens[cursor];
    if (!expected) return;
    if (e.key === "Tab") {
      if (!startTime) setStartTime(Date.now());
      setCursor((prev) => {
        let next = prev;
        while (next < tokens.length && tokens[next].char === " ") next++;
        if (next === prev) next = prev + 1;
        if (next >= tokens.length) { clearInterval(timerRef.current); setTimeout(() => onFinish(buildResult()), 300); }
        return next;
      });
      return;
    }
    if (!startTime) setStartTime(Date.now());
    const typedChar = e.key === "Enter" ? "\n" : e.key;
    if (typedChar === expected.char) {
      setCursor((prev) => {
        const next = prev + 1;
        if (next >= tokens.length) { clearInterval(timerRef.current); setTimeout(() => onFinish(buildResult()), 300); }
        return next;
      });
    } else if (typedChar.length === 1 || typedChar === "\n") {
      setTotalErrors(p => p + 1);
      setErrors(prev => new Set([...prev, cursor]));
      setErrorFlash(true);
      setTimeout(() => setErrorFlash(false), 150);
    }
  }, [mode, tokens, cursor, startTime, buildResult, onFinish, audio]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const lines = [];
  let currentLine = [];
  tokens.forEach((token, idx) => {
    if (token.char === "\n") { lines.push(currentLine); currentLine = []; }
    else currentLine.push({ ...token, idx });
  });
  if (currentLine.length > 0) lines.push(currentLine);

  const elapsed = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
  const accuracy = cursor > 0 ? Math.round(((cursor - totalErrors) / cursor) * 100) : 100;
  const currentToken = tokens[cursor];
  const isOnIndent = currentToken?.char === " " && cursor > 0 && tokens[cursor - 1]?.char === "\n";
  const progress = tokens.length > 0 ? Math.round((cursor / tokens.length) * 100) : 0;

  // ─── Botón de dictado ─────────────────────────────────────────────────────
  const DictadoButton = () => {
    if (!isSupported) return null;
    return (
      <button
        className={`subnav-toggle-btn${dictado ? " is-active" : ""}`}
        onClick={() => setDictado(d => !d)}
        title={dictado ? "Desactivar dictado" : "Activar dictado — te lee cada línea antes de escribirla"}
        style={{
          padding: "4px 10px",
          border: `1px solid ${dictado ? "#4ec994" : "var(--bd3)"}`,
          borderRadius: "4px",
          cursor: "pointer",
          background: dictado ? "#4ec99415" : "transparent",
          color: dictado ? "#4ec994" : "var(--tx3)",
          fontSize: "11px",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.06em",
          transition: "all 0.15s",
        }}
      >
        {dictado ? "🔊 VOZ ON" : "🔇 VOZ OFF"}
      </button>
    );
  };

  // ─── Botón de repetir línea ───────────────────────────────────────────────
  const RepeatButton = () => {
    if (!isSupported || !dictado) return null;
    return (
      <button
        onClick={repeatCurrentLine}
        title="Repetir la línea actual"
        style={{
          padding: "4px 8px",
          border: "1px solid var(--bd3)",
          borderRadius: "4px",
          cursor: "pointer",
          background: "transparent",
          color: "var(--tx3)",
          fontSize: "12px",
          fontFamily: "'JetBrains Mono', monospace",
          transition: "all 0.15s",
        }}
      >
        🔁
      </button>
    );
  };

  const ModeToggle = ({ current }) => (
    <div className="mode-toggle">
      <button
        className={`mode-toggle-btn${current === "editor" ? " active-editor" : ""}`}
        onClick={() => setMode("editor")}
      >⌨ editor</button>
      <button
        className={`mode-toggle-btn${current === "terminal" ? " active-terminal" : ""}`}
        onClick={() => setMode("terminal")}
      >$ terminal</button>
    </div>
  );

  // ── Terminal mode ─────────────────────────────────────────────────────────
  if (mode === "terminal") {
    return (
      <div className="practice-root">
        <TopBar
          language={language} title={snippet.title}
          cursor={0} total={0} onBack={onBack}
          showComments={showComments} onToggleComments={onToggleComments}
          onNext={onNext} hasNext={hasNext}
          extraRight={<ModeToggle current="terminal" />}
        />
        <ProgressBar value={0} max={0} />
        <TerminalMode
          snippet={snippet} language={language}
          showComments={showComments} embedded={true}
          onFinish={(result) => { setMode("editor"); onFinish(result); }}
          onBack={() => setMode("editor")}
          onToggleComments={onToggleComments}
          onSwitchMode={() => setMode("editor")}
        />
      </div>
    );
  }

  // ── Editor mode ───────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} tabIndex={0} className="practice-root">

      <TopBar
        language={language} title={snippet.title}
        cursor={cursor} total={tokens.length} onBack={onBack}
        showComments={showComments} onToggleComments={onToggleComments}
        errors={totalErrors} accuracy={accuracy} elapsed={elapsed}
        nextChar={currentToken?.char} isOnIndent={isOnIndent}
        onNext={onNext} hasNext={hasNext}
        extraLeft={
          !isMobile ? (
            <button
              className={`subnav-trans-btn${transOpen ? " is-active" : ""}`}
              onClick={() => setTransOpen(v => !v)}
              title="Traducción de las líneas al idioma nativo"
            >⇄ traducción</button>
          ) : null
        }
        extraRight={
          !isMobile ? (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <DictadoButton />
              <RepeatButton />
              <ModeToggle current="editor" />
              <button
                className={`subnav-toggle-btn subnav-toggle-btn--structure${panelMode === "structure" ? " is-active" : ""}`}
                onClick={() => setPanelMode(m => m === "structure" ? null : "structure")}
                style={{
                  padding: "4px 10px",
                  border: `1px solid ${panelMode === "structure" ? meta.color : "var(--bd3)"}`,
                  borderRadius: "4px", cursor: "pointer",
                  background: panelMode === "structure" ? `${meta.color}15` : "transparent",
                  color: panelMode === "structure" ? meta.color : "var(--tx3)",
                  fontSize: "11px", fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.06em", transition: "all 0.15s",
                }}
              >⬡ STRUCTURE</button>
              <button
                className={`subnav-toggle-btn subnav-toggle-btn--kbd${panelMode === "keyboard" ? " is-active" : ""}`}
                onClick={() => setPanelMode(m => m === "keyboard" ? null : "keyboard")}
                style={{
                  padding: "4px 10px",
                  border: `1px solid ${panelMode === "keyboard" ? "#c792ea" : "var(--bd3)"}`,
                  borderRadius: "4px", cursor: "pointer",
                  background: panelMode === "keyboard" ? "#c792ea15" : "transparent",
                  color: panelMode === "keyboard" ? "#c792ea" : "var(--tx3)",
                  fontSize: "11px", fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.06em", transition: "all 0.15s",
                }}
              >⌨ KBD</button>
            </div>
          ) : null
        }
      />
      <ProgressBar value={cursor} max={tokens.length} />

      <div className="practice-layout">

        {/* Translation panel — left counterpart of the right practice-panel */}
        {transOpen && !isMobile && (
          <div className="trans-panel">
            <div className="trans-panel__head">
              <span>⇄ traducción · {meta.label}</span>
              <button className="trans-panel__close" onClick={() => setTransOpen(false)}>✕</button>
            </div>
            <div className="trans-panel__body">
              {Array.isArray(snippet?.translations) && snippet.translations.length > 0 ? (
                snippet.translations.map((text, i) => (
                  <div key={i} className="trans-card">
                    <span className="trans-card__num">{i + 1}</span>
                    <span className="trans-card__text">{text}</span>
                  </div>
                ))
              ) : (
                <div className="trans-card trans-card--empty">
                  <span className="trans-card__text">Traducción no disponible todavía para este fragmento.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Code area */}
        <div
          ref={scrollAreaRef}
          className={`practice-code-area${errorFlash ? " error-flash" : ""}`}
          style={{
            left: transOpen && !isMobile ? "320px" : "0",
            right: showPanel ? `${panelWidth}px` : "0",
          }}
        >
          <div className="practice-code-block">
            {lines.map((lineTokens, lineIdx) => {
              const isCommentLine = lineTokens.length > 0 && lineTokens[0]?.type === "comment";
              return (
                <div key={lineIdx} className="practice-line">
                  <span className="practice-line-num">{lineIdx + 1}</span>
                  <span className="practice-line-content">
                    {isCommentLine && !isMobile && (
                      <span className="comment-tag">EN</span>
                    )}
                    {lineTokens.map(({ char, type, idx }) => {
                      const isTyped = idx < cursor;
                      const isCursor = idx === cursor;
                      const isError = errors.has(idx);
                      const color = isTyped
                        ? isError ? "#ff5555" : isCommentLine ? "#4ec994" : getTokenColor(type)
                        : isCommentLine ? "var(--c-cm-dim)" : "var(--c-un)";
                      return (
                        <span key={idx} style={{ position: "relative", display: "inline-block" }}>
                          {isCursor && <span className="code-cursor" />}
                          <span style={{
                            color,
                            fontWeight: isTyped && type === "keyword" ? "500" : "300",
                            fontStyle: isCommentLine ? "italic" : "normal",
                            transition: "color 0.04s",
                            ...(isError ? { textDecoration: "underline", textDecorationColor: "#ff5555" } : {}),
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

        {/* Right panel overlay */}
        {showPanel && (
          <div className="practice-panel" style={{ width: `${panelWidth}px` }}>

            {panelMode === "keyboard" && (
              <KeyboardPanel
                accentColor={meta.color}
                nextChar={currentToken?.char}
                isOnIndent={isOnIndent}
              />
            )}

            {panelMode === "structure" && (<>
            <div className="practice-panel-header">
              <span style={{ color: meta.color, fontSize: "16px" }}>{meta.icon}</span>
              <div style={{ overflow: "hidden", flex: 1 }}>
                <div className="practice-panel-lang" style={{ color: meta.color }}>{meta.label}</div>
                <div className="practice-panel-title">{snippet?.title}</div>
              </div>
              <span style={{ color: meta.color, fontSize: "11px", fontWeight: "700" }}>{progress}%</span>
            </div>

            <div className="practice-panel-progress-track">
              <div
                className="practice-panel-progress-fill"
                style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${meta.color}, #82aaff)` }}
              />
            </div>

            <div className="practice-panel-tree">
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px 4px" }}>
                <svg width="14" height="14"><circle cx="7" cy="7" r="4" fill={meta.color} /></svg>
                <span style={{ color: meta.color, fontSize: "11px", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {snippet?.title || meta.label}
                </span>
              </div>
              {structure.length === 0 && (
                <div style={{ color: "var(--tx8)", fontSize: "12px", padding: "20px", textAlign: "center" }}>No structure detected</div>
              )}
              {structure.map((sec, i) => {
                const isActive = i === activeIndex;
                const isDone = i < activeIndex;
                const isLast = i === structure.length - 1;
                const nodeColor = isDone ? "var(--tx8)" : isActive ? sec.color : "var(--bd)";
                const textColor = isDone ? "var(--tx6)" : isActive ? sec.color : "var(--tx8)";
                return (
                  <div key={sec.id} style={{
                    display: "flex", alignItems: "center",
                    padding: "2px 8px", borderRadius: "4px", margin: "0 4px",
                    background: isActive ? `${sec.color}12` : "transparent",
                    transition: "background 0.2s",
                    animation: isActive ? "slide-in 0.2s ease" : "none",
                  }}>
                    <svg width="18" height="26" style={{ flexShrink: 0 }}>
                      <line x1="9" y1="0" x2="9" y2="13" stroke={nodeColor} strokeWidth="1" opacity="0.5" />
                      {!isLast && <line x1="9" y1="13" x2="9" y2="26" stroke={nodeColor} strokeWidth="1" opacity="0.5" />}
                      <line x1="9" y1="13" x2="18" y2="13" stroke={nodeColor} strokeWidth="1" opacity="0.5" />
                    </svg>
                    <div style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      border: `1px solid ${nodeColor}`,
                      background: isActive ? sec.color : isDone ? "var(--bg4)" : "transparent",
                      flexShrink: 0, marginRight: "6px",
                      boxShadow: isActive ? `0 0 5px ${sec.color}90` : "none",
                      animation: isActive ? "pulse-node 1.5s ease-in-out infinite" : "none",
                      transition: "all 0.2s",
                    }} />
                    <span style={{ color: textColor, fontSize: "12px", marginRight: "4px", flexShrink: 0 }}>{sec.icon}</span>
                    <div style={{ flex: 1, overflow: "hidden" }}>
                      <div style={{ fontSize: "12px", color: textColor, fontWeight: isActive ? "600" : "400", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "color 0.2s" }}>
                        {sec.label}
                      </div>
                      {sec.sublabel && <div style={{ fontSize: "10px", color: "var(--tx8)" }}>{sec.sublabel}</div>}
                    </div>
                    {isDone && <span style={{ color: "#4ec994", fontSize: "11px", flexShrink: 0, marginLeft: "4px" }}>✓</span>}
                    {isActive && (
                      <span style={{ fontSize: "10px", color: sec.color, border: `1px solid ${sec.color}`, borderRadius: "3px", padding: "1px 4px", flexShrink: 0, marginLeft: "4px", letterSpacing: "0.04em" }}>
                        here
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="practice-panel-footer">
              {[
                { label: "sections", value: structure.length },
                { label: "done",     value: Math.max(0, activeIndex) },
                { label: "left",     value: Math.max(0, structure.length - activeIndex - 1) },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ color: "var(--tx)", fontSize: "17px", fontWeight: "600" }}>{value}</div>
                  <div style={{ color: "var(--tx8)", fontSize: "11px", letterSpacing: "0.05em" }}>{label}</div>
                </div>
              ))}
            </div>
            </>)}
          </div>
        )}
      </div>

      <BottomBar
        errors={totalErrors} accuracy={accuracy} elapsed={elapsed}
        nextChar={currentToken?.char} isOnIndent={isOnIndent}
      />
    </div>
  );
}
