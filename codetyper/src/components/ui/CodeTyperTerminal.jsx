"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "./CodeTyperTerminal.css";

const LANGUAGES    = ["javascript", "typescript", "python", "sql", "solidity", "java", "csharp", "english", "mindset"];
const DIFFICULTIES = ["beginner", "intermediate", "advanced"];
const THEMES       = ["hacker", "cyber-yellow", "cyber-cyan"];
const CURSOR_MODES = ["block", "line", "under"];

const HELP_TEXT = `
  CODETYPER OS v1.0 — available commands:

  help              → show this menu
  clear             → clear terminal
  whoami            → current session info

  ls                → list available languages
  cd <language>     → select a language
  difficulty <lvl>  → set difficulty [beginner|intermediate|advanced]
  snippets          → list snippets for current selection
  run <id>          → launch snippet by id (e.g. run js-beg-001)
  start             → launch first snippet of current selection

  theme <name>      → change theme [hacker|cyber-yellow|cyber-cyan]
  cursor <type>     → change cursor [block|line|under]

  mode editor       → switch to editor mode
  mode terminal     → switch to terminal mode

  status            → show current session state
  exit              → close this terminal
`;

function parseCommand(input) {
  const parts = input.trim().split(/\s+/);
  const cmd   = parts[0]?.toLowerCase();
  const args  = parts.slice(1);

  switch (cmd) {
    case "help":      return { type: "help" };
    case "clear":     return { type: "clear" };
    case "whoami":    return { type: "whoami" };
    case "ls":        return { type: "ls" };
    case "snippets":  return { type: "snippets" };
    case "start":     return { type: "start" };
    case "status":    return { type: "status" };
    case "exit":      return { type: "exit" };
    case "": case undefined: return { type: "empty" };

    case "cd": {
      const lang = args[0]?.toLowerCase();
      if (!lang) return { type: "error", msg: "Usage: cd <language>" };
      const match = LANGUAGES.find((l) => l.startsWith(lang));
      if (!match) return { type: "error", msg: `Language not found: "${lang}". Try: ls` };
      return { type: "cd", lang: match };
    }
    case "difficulty": {
      const lvl = args[0]?.toLowerCase();
      if (!lvl) return { type: "error", msg: "Usage: difficulty <beginner|intermediate|advanced>" };
      const match = DIFFICULTIES.find((d) => d.startsWith(lvl));
      if (!match) return { type: "error", msg: `Unknown difficulty: "${lvl}"` };
      return { type: "difficulty", level: match };
    }
    case "run": {
      const id = args[0];
      if (!id) return { type: "error", msg: "Usage: run <snippet-id>" };
      return { type: "run", id };
    }
    case "mode": {
      const m = args[0]?.toLowerCase();
      if (m !== "editor" && m !== "terminal")
        return { type: "error", msg: "Usage: mode <editor|terminal>" };
      return { type: "mode", mode: m };
    }
    case "theme": {
      const t = args[0]?.toLowerCase();
      if (!t) return { type: "error", msg: `Usage: theme <${THEMES.join("|")}>` };
      const match = THEMES.find((th) => th.startsWith(t));
      if (!match) return { type: "error", msg: `Unknown theme: "${t}". Options: ${THEMES.join(", ")}` };
      return { type: "theme", theme: match };
    }
    case "cursor": {
      const c = args[0]?.toLowerCase();
      if (!c) return { type: "error", msg: `Usage: cursor <${CURSOR_MODES.join("|")}>` };
      const match = CURSOR_MODES.find((m) => m.startsWith(c));
      if (!match) return { type: "error", msg: `Unknown cursor: "${c}". Options: ${CURSOR_MODES.join(", ")}` };
      return { type: "cursor", mode: match };
    }
    default:
      return { type: "unknown", cmd };
  }
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CodeTyperTerminal({
  open, onClose, onLaunchSnippet, onSetMode, snippetsData,
}) {
  const [history,    setHistory]    = useState([]);
  const [input,      setInput]      = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex,   setCmdIndex]   = useState(-1);
  const [session,    setSession]    = useState({ lang: "javascript", difficulty: "beginner", user: "user" });
  const [theme,      setTheme]      = useState("hacker");
  const [cursorMode, setCursorMode] = useState("block");
  const [minimized,  setMinimized]  = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [pos,        setPos]        = useState({ x: null, y: null });

  const dragging   = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const terminalRef = useRef(null);
  const inputRef    = useRef(null);
  const bottomRef   = useRef(null);

  // Boot
  useEffect(() => {
    if (open) {
      setPos({ x: null, y: null });
      setMinimized(false);
      setFullscreen(false);
      setHistory([
        { type: "banner" },
        { type: "system", text: `Logged in as ${session.user}` },
        { type: "system", text: 'Type "help" for available commands.' },
        { type: "spacer" },
      ]);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    if (!minimized) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, minimized]);

  // Alt+T — cerrar (abrir está en page.js)
  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        if (open) onClose?.();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // ── Drag ──────────────────────────────────────────────────────────────────
  const onMouseDown = useCallback((e) => {
    if (e.target.closest(".ct-dot") || e.target.closest(".ct-tb-close")) return;
    if (fullscreen) return;
    dragging.current = true;
    const rect = terminalRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    e.preventDefault();
  }, [fullscreen]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // ── Dot handlers ─────────────────────────────────────────────────────────
  const handleRedDot    = () => onClose?.();
  const handleYellowDot = () => setMinimized((m) => !m);
  const handleGreenDot  = () => { setFullscreen((f) => !f); setMinimized(false); };

  const pushLine = useCallback((lines) => {
    setHistory((h) => [...h, ...(Array.isArray(lines) ? lines : [lines])]);
  }, []);

  const handleSubmit = useCallback(() => {
    const raw = input.trim();
    if (!raw) { pushLine({ type: "prompt", input: "" }); setInput(""); return; }

    setCmdHistory((h) => [raw, ...h.filter((c) => c !== raw)].slice(0, 50));
    setCmdIndex(-1);
    pushLine({ type: "prompt", input: raw });

    const result = parseCommand(raw);

    switch (result.type) {
      case "help":      pushLine({ type: "help" }); break;
      case "clear":
        setHistory([{ type: "system", text: "Terminal cleared." }]);
        setInput(""); return;
      case "whoami":
        pushLine([
          { type: "info", text: `User:       ${session.user}` },
          { type: "info", text: `Language:   ${session.lang}` },
          { type: "info", text: `Difficulty: ${session.difficulty}` },
          { type: "info", text: `Theme:      ${theme}` },
          { type: "info", text: `Cursor:     ${cursorMode}` },
        ]); break;
      case "ls":
        pushLine([
          { type: "section", text: "Available languages:" },
          ...LANGUAGES.map((l) => ({ type: "item", text: l, active: l === session.lang })),
        ]); break;
      case "cd":
        setSession((s) => ({ ...s, lang: result.lang }));
        pushLine({ type: "success", text: `Switched to: ${result.lang}` }); break;
      case "difficulty":
        setSession((s) => ({ ...s, difficulty: result.level }));
        pushLine({ type: "success", text: `Difficulty set to: ${result.level}` }); break;
      case "snippets": {
        const snips = snippetsData?.[session.lang]?.[session.difficulty] || [];
        if (!snips.length) {
          pushLine({ type: "warn", text: `No snippets for ${session.lang}/${session.difficulty}` });
        } else {
          pushLine([
            { type: "section", text: `${session.lang} / ${session.difficulty} (${snips.length}):` },
            ...snips.map((s) => ({ type: "snippet-item", id: s.id, title: s.title, lines: s.code.split("\n").length })),
          ]);
        } break;
      }
      case "run": {
        const snips = snippetsData?.[session.lang]?.[session.difficulty] || [];
        const found = snips.find((s) => s.id === result.id);
        if (!found) {
          pushLine({ type: "error", text: `Snippet not found: "${result.id}"` });
        } else {
          pushLine({ type: "success", text: `Launching: ${found.title}` });
          setTimeout(() => onLaunchSnippet?.(found, session.lang, session.difficulty), 300);
          onClose?.();
        } break;
      }
      case "start": {
        const snips = snippetsData?.[session.lang]?.[session.difficulty] || [];
        if (!snips.length) {
          pushLine({ type: "warn", text: "No snippets available. Try: cd <language> + difficulty <level>" });
        } else {
          pushLine({ type: "success", text: `Launching: ${snips[0].title}` });
          setTimeout(() => onLaunchSnippet?.(snips[0], session.lang, session.difficulty), 300);
          onClose?.();
        } break;
      }
      case "mode":
        pushLine({ type: "success", text: `Mode set to: ${result.mode}` });
        onSetMode?.(result.mode); break;
      case "status":
        pushLine([
          { type: "section", text: "Session status:" },
          { type: "info", text: `Language:   ${session.lang}` },
          { type: "info", text: `Difficulty: ${session.difficulty}` },
          { type: "info", text: `Theme:      ${theme}` },
          { type: "info", text: `Cursor:     ${cursorMode}` },
          { type: "info", text: `Snippets:   ${snippetsData?.[session.lang]?.[session.difficulty]?.length || 0} available` },
        ]); break;
      case "theme":
        setTheme(result.theme);
        pushLine({ type: "success", text: `Theme set to: ${result.theme}` }); break;
      case "cursor":
        setCursorMode(result.mode);
        pushLine({ type: "success", text: `Cursor set to: ${result.mode}` }); break;
      case "exit":     onClose?.(); break;
      case "error":    pushLine({ type: "error", text: result.msg }); break;
      case "unknown":  pushLine({ type: "error", text: `Command not found: "${result.cmd}". Type "help".` }); break;
      default: break;
    }
    setInput("");
  }, [input, session, theme, cursorMode, snippetsData, pushLine, onLaunchSnippet, onSetMode, onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") { e.preventDefault(); handleSubmit(); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(next); setInput(cmdHistory[next] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(cmdIndex - 1, -1);
      setCmdIndex(next); setInput(next === -1 ? "" : cmdHistory[next]);
    } else if (e.key === "Escape") {
      onClose?.();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.trim().split(/\s+/);
      if (parts[0] === "cd" && parts.length === 2) {
        const match = LANGUAGES.find((l) => l.startsWith(parts[1]));
        if (match) setInput(`cd ${match}`);
      } else if (parts[0] === "difficulty" && parts.length === 2) {
        const match = DIFFICULTIES.find((d) => d.startsWith(parts[1]));
        if (match) setInput(`difficulty ${match}`);
      } else if (parts[0] === "theme" && parts.length === 2) {
        const match = THEMES.find((t) => t.startsWith(parts[1]));
        if (match) setInput(`theme ${match}`);
      } else if (parts[0] === "cursor" && parts.length === 2) {
        const match = CURSOR_MODES.find((c) => c.startsWith(parts[1]));
        if (match) setInput(`cursor ${match}`);
      } else if (parts.length === 1 && parts[0]) {
        // Autocomplete comando
        const cmds = ["help","clear","whoami","ls","cd","difficulty","snippets","run","start","theme","cursor","mode","status","exit"];
        const match = cmds.find((c) => c.startsWith(parts[0]));
        if (match) setInput(match);
      }
    }
  }, [handleSubmit, cmdHistory, cmdIndex, input, onClose]);

  if (!open) return null;

  const promptSymbol = `${session.user}@codetyper:~$`;
  const termStyle = fullscreen
    ? {}
    : pos.x !== null
      ? { left: pos.x, top: pos.y, transform: "none" }
      : { left: "50%", top: "50%", transform: "translate(-50%, -50%)" };

  const termClass = [
    "ct-terminal",
    minimized  ? "ct-minimized"  : "",
    fullscreen ? "ct-fullscreen" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className="ct-backdrop" onClick={onClose}>
      <div
        ref={terminalRef}
        className={termClass}
        data-theme={theme}
        style={termStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="ct-titlebar" onMouseDown={onMouseDown}>
          <div className="ct-tb-dots">
            <span className="ct-dot ct-red"    onClick={handleRedDot}    title="Close" />
            <span className="ct-dot ct-yellow" onClick={handleYellowDot} title="Minimize" />
            <span className="ct-dot ct-green"  onClick={handleGreenDot}  title="Fullscreen" />
          </div>
          <span className="ct-tb-title">
            ▸ CODETYPER TERMINAL — {session.lang.toUpperCase()} · {session.user}
          </span>
          <button className="ct-tb-close" onClick={onClose}>ESC para cerrar</button>
        </div>

        <div className="ct-scanlines" />

        {/* Output */}
        <div className="ct-output" onClick={() => inputRef.current?.focus()}>
          {history.map((line, i) => (
            <TerminalLine key={i} line={line} promptSymbol={promptSymbol} />
          ))}

          <div className="ct-input-line">
            <span className="ct-prompt-sym">{promptSymbol}&nbsp;</span>
            <div className="ct-input-wrap">
              <input
                ref={inputRef}
                className="ct-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
              />
              <span className={`ct-fake-cursor cursor-${cursorMode}`} />
            </div>
          </div>

          <div ref={bottomRef} />
        </div>

        <span className="ct-hotkey-hint">Alt+T · drag to move</span>
      </div>
    </div>
  );
}

// ── Line renderer ─────────────────────────────────────────────────────────────
function TerminalLine({ line, promptSymbol }) {
  switch (line.type) {
    case "banner":
      return (
        <div className="ct-banner">
          <div className="ct-banner-box">
            <span className="ct-banner-text">▌ CODETYPER OS v1.0 · HEO-80 ▐</span>
          </div>
        </div>
      );
    case "help":         return <pre className="ct-help">{HELP_TEXT}</pre>;
    case "prompt":
      return (
        <div className="ct-line">
          <span className="ct-prompt-sym">{promptSymbol}&nbsp;</span>
          <span className="ct-typed-cmd">{line.input}</span>
        </div>
      );
    case "system":       return <div className="ct-line ct-system">{line.text}</div>;
    case "success":      return <div className="ct-line ct-success">✓ {line.text}</div>;
    case "error":        return <div className="ct-line ct-error">✗ {line.text}</div>;
    case "warn":         return <div className="ct-line ct-warn">⚠ {line.text}</div>;
    case "info":         return <div className="ct-line ct-info">&nbsp;&nbsp;{line.text}</div>;
    case "section":      return <div className="ct-line ct-section">{line.text}</div>;
    case "item":
      return (
        <div className={`ct-line ct-item${line.active ? " ct-item-active" : ""}`}>
          {line.active ? "  ▸ " : "    "}{line.text}
        </div>
      );
    case "snippet-item":
      return (
        <div className="ct-line ct-snippet-item">
          <span className="ct-snip-id">{line.id}</span>
          <span className="ct-snip-sep">·</span>
          <span className="ct-snip-title">{line.title}</span>
          <span className="ct-snip-lines">{line.lines}L</span>
        </div>
      );
    case "spacer":       return <div className="ct-spacer" />;
    default:             return null;
  }
}
