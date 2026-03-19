// src/hooks/useCodeStructure.js
"use client";

import { useMemo } from "react";

// ─── Section definitions per language ────────────────────────────────────────
const PARSERS = {
  solidity: [
    { pattern: /^\s*pragma\s+solidity/,         type: "pragma",      icon: "⚙",  label: "Compiler Version",  color: "#89ddff" },
    { pattern: /^\s*import\s+/,                  type: "import",      icon: "📦", label: "Import",            color: "#82aaff" },
    { pattern: /^\s*(interface|abstract)\s+/,    type: "interface",   icon: "◈",  label: "Interface",         color: "#c792ea" },
    { pattern: /^\s*contract\s+\w+/,             type: "contract",    icon: "◆",  label: "Contract",          color: "#ffcb6b" },
    { pattern: /^\s*mapping\s*\(/,               type: "mapping",     icon: "⬡",  label: "Storage Mapping",   color: "#f78c6c" },
    { pattern: /^\s*(uint|int|address|bool|bytes|string)\s+\w+\s*[=;]/,
                                                  type: "storage",     icon: "▪",  label: "State Variable",    color: "#f78c6c" },
    { pattern: /^\s*event\s+\w+/,                type: "event",       icon: "◎",  label: "Event",             color: "#4ec994" },
    { pattern: /^\s*modifier\s+\w+/,             type: "modifier",    icon: "⬟",  label: "Modifier",          color: "#c792ea" },
    { pattern: /^\s*constructor\s*\(/,            type: "constructor", icon: "★",  label: "Constructor",       color: "#ffcb6b" },
    { pattern: /^\s*function\s+(\w+)/,           type: "function",    icon: "▶",  label: "Function",          color: "#82aaff", capture: 1 },
    { pattern: /^\s*emit\s+(\w+)/,               type: "emit",        icon: "→",  label: "Emit",              color: "#4ec994", capture: 1 },
  ],

  javascript: [
    { pattern: /^\s*import\s+/,                  type: "import",      icon: "📦", label: "Import",            color: "#82aaff" },
    { pattern: /^\s*class\s+(\w+)/,              type: "class",       icon: "◆",  label: "Class",             color: "#ffcb6b", capture: 1 },
    { pattern: /^\s*(export\s+)?(async\s+)?function\s+(\w+)/,
                                                  type: "function",    icon: "▶",  label: "Function",          color: "#82aaff", capture: 3 },
    { pattern: /^\s*const\s+(\w+)\s*=\s*(async\s*)?\(/,
                                                  type: "function",    icon: "▶",  label: "Arrow Fn",          color: "#82aaff", capture: 1 },
    { pattern: /^\s*constructor\s*\(/,            type: "constructor", icon: "★",  label: "Constructor",       color: "#ffcb6b" },
    { pattern: /^\s*(if|else\s+if)\s*\(/,        type: "condition",   icon: "⬦",  label: "Condition",         color: "#89ddff" },
    { pattern: /^\s*(for|while|forEach)\s*[\s(]/, type: "loop",       icon: "↻",  label: "Loop",              color: "#4ec994" },
    { pattern: /^\s*try\s*\{/,                   type: "try",         icon: "⚠",  label: "Error Handling",    color: "#f78c6c" },
    { pattern: /^\s*\/\/\s+\d+\./,               type: "section",     icon: "◉",  label: "Section",           color: "#ffcb6b" },
  ],

  typescript: [
    { pattern: /^\s*import\s+/,                  type: "import",      icon: "📦", label: "Import",            color: "#82aaff" },
    { pattern: /^\s*(export\s+)?interface\s+(\w+)/,
                                                  type: "interface",   icon: "◈",  label: "Interface",         color: "#89ddff", capture: 2 },
    { pattern: /^\s*(export\s+)?type\s+(\w+)/,   type: "type",        icon: "⬡",  label: "Type",              color: "#c792ea", capture: 2 },
    { pattern: /^\s*(export\s+)?enum\s+(\w+)/,   type: "enum",        icon: "▪",  label: "Enum",              color: "#f78c6c", capture: 2 },
    { pattern: /^\s*(export\s+)?(abstract\s+)?class\s+(\w+)/,
                                                  type: "class",       icon: "◆",  label: "Class",             color: "#ffcb6b", capture: 3 },
    { pattern: /^\s*(public|private|protected)?\s*(async\s+)?\w+\s*\(/,
                                                  type: "method",      icon: "▶",  label: "Method",            color: "#82aaff" },
    { pattern: /^\s*constructor\s*\(/,            type: "constructor", icon: "★",  label: "Constructor",       color: "#ffcb6b" },
  ],

  csharp: [
    { pattern: /^\s*using\s+/,                   type: "using",       icon: "📦", label: "Using",             color: "#82aaff" },
    { pattern: /^\s*namespace\s+(\w+)/,           type: "namespace",   icon: "◉",  label: "Namespace",         color: "#ffcb6b", capture: 1 },
    { pattern: /^\s*(public|internal)?\s*(abstract|sealed)?\s*class\s+(\w+)/,
                                                  type: "class",       icon: "◆",  label: "Class",             color: "#ffcb6b", capture: 3 },
    { pattern: /^\s*(public|private)?\s*(interface)\s+(\w+)/,
                                                  type: "interface",   icon: "◈",  label: "Interface",         color: "#89ddff", capture: 3 },
    { pattern: /^\s*\[HttpGet/,                  type: "endpoint",    icon: "→",  label: "GET Endpoint",      color: "#4ec994" },
    { pattern: /^\s*\[HttpPost/,                 type: "endpoint",    icon: "→",  label: "POST Endpoint",     color: "#ffcb6b" },
    { pattern: /^\s*\[HttpPut/,                  type: "endpoint",    icon: "→",  label: "PUT Endpoint",      color: "#82aaff" },
    { pattern: /^\s*\[HttpDelete/,               type: "endpoint",    icon: "→",  label: "DELETE Endpoint",   color: "#ff5555" },
    { pattern: /^\s*(public|private|protected)\s+(async\s+)?[\w<>]+\s+(\w+)\s*\(/,
                                                  type: "method",      icon: "▶",  label: "Method",            color: "#82aaff", capture: 3 },
    { pattern: /^\s*try\s*\{/,                   type: "try",         icon: "⚠",  label: "Error Handling",    color: "#f78c6c" },
  ],

  sql: [
    { pattern: /^\s*CREATE\s+TABLE/i,            type: "create",      icon: "◆",  label: "Create Table",      color: "#ffcb6b" },
    { pattern: /^\s*SELECT/i,                     type: "select",      icon: "▶",  label: "SELECT Query",      color: "#82aaff" },
    { pattern: /^\s*INSERT/i,                     type: "insert",      icon: "→",  label: "INSERT",            color: "#4ec994" },
    { pattern: /^\s*UPDATE/i,                     type: "update",      icon: "↻",  label: "UPDATE",            color: "#ffcb6b" },
    { pattern: /^\s*DELETE/i,                     type: "delete",      icon: "✕",  label: "DELETE",            color: "#ff5555" },
    { pattern: /^\s*(INNER|LEFT|RIGHT|FULL)\s+JOIN/i,
                                                  type: "join",        icon: "⬡",  label: "JOIN",              color: "#c792ea" },
    { pattern: /^\s*WHERE/i,                      type: "where",       icon: "⬦",  label: "WHERE Filter",      color: "#89ddff" },
    { pattern: /^\s*GROUP\s+BY/i,                type: "group",       icon: "▪",  label: "GROUP BY",          color: "#f78c6c" },
    { pattern: /^\s*CREATE\s+(PROCEDURE|FUNCTION)/i,
                                                  type: "procedure",   icon: "★",  label: "Procedure/Function",color: "#ffcb6b" },
    { pattern: /^\s*CREATE\s+TRIGGER/i,          type: "trigger",     icon: "◎",  label: "Trigger",           color: "#c792ea" },
  ],

  powershell: [
    { pattern: /^\s*param\s*\(/,                 type: "param",       icon: "▪",  label: "Parameters",        color: "#5391FE" },
    { pattern: /^\s*function\s+(\w+-\w+|\w+)/,  type: "function",    icon: "▶",  label: "Function",          color: "#82aaff", capture: 1 },
    { pattern: /^\s*\[CmdletBinding/,            type: "cmdlet",      icon: "⚙",  label: "CmdletBinding",     color: "#5391FE" },
    { pattern: /^\s*try\s*\{/,                   type: "try",         icon: "⚠",  label: "Error Handling",    color: "#f78c6c" },
    { pattern: /^\s*(foreach|for|while)\s*[\s(]/,type: "loop",        icon: "↻",  label: "Loop",              color: "#4ec994" },
    { pattern: /^\s*\$\w+\s*=\s*(Get|Set|New|Remove|Invoke|Start|Stop)-\w+/,
                                                  type: "cmdlet-call", icon: "→",  label: "Cmdlet Call",       color: "#89ddff" },
    { pattern: /^\s*#\s*[─━]+/,                  type: "section",     icon: "◉",  label: "Section",           color: "#ffcb6b" },
  ],

  bash: [
    { pattern: /^\s*#!\//,                       type: "shebang",     icon: "⚙",  label: "Shebang",           color: "#89ddff" },
    { pattern: /^\s*\w+\s*\(\s*\)\s*\{/,        type: "function",    icon: "▶",  label: "Function",          color: "#82aaff" },
    { pattern: /^\s*(if|elif)\s+\[/,             type: "condition",   icon: "⬦",  label: "Condition",         color: "#89ddff" },
    { pattern: /^\s*(for|while|until)\s+/,       type: "loop",        icon: "↻",  label: "Loop",              color: "#4ec994" },
    { pattern: /^\s*case\s+/,                    type: "case",        icon: "⬟",  label: "Case",              color: "#c792ea" },
    { pattern: /^\s*(export|readonly)\s+\w+=/,  type: "variable",    icon: "▪",  label: "Variable",          color: "#f78c6c" },
    { pattern: /^\s*curl\s+/,                    type: "http",        icon: "→",  label: "HTTP Request",      color: "#4ec994" },
    { pattern: /^\s*ssh\s+/,                     type: "ssh",         icon: "⬡",  label: "SSH",               color: "#ffcb6b" },
    { pattern: /^\s*#\s*[─━#]+/,                type: "section",     icon: "◉",  label: "Section",           color: "#ffcb6b" },
  ],

  python: [
    { pattern: /^\s*import\s+|^\s*from\s+\w+\s+import/,
                                                  type: "import",      icon: "📦", label: "Import",            color: "#82aaff" },
    { pattern: /^\s*class\s+(\w+)/,              type: "class",       icon: "◆",  label: "Class",             color: "#ffcb6b", capture: 1 },
    { pattern: /^\s*def\s+(\w+)/,               type: "function",    icon: "▶",  label: "Function",          color: "#82aaff", capture: 1 },
    { pattern: /^\s*@\w+/,                       type: "decorator",   icon: "⬟",  label: "Decorator",         color: "#c792ea" },
    { pattern: /^\s*try\s*:/,                    type: "try",         icon: "⚠",  label: "Error Handling",    color: "#f78c6c" },
    { pattern: /^\s*(if|elif)\s+/,               type: "condition",   icon: "⬦",  label: "Condition",         color: "#89ddff" },
    { pattern: /^\s*(for|while)\s+/,             type: "loop",        icon: "↻",  label: "Loop",              color: "#4ec994" },
  ],
};

// ─── Main hook ────────────────────────────────────────────────────────────────
export function useCodeStructure(code, language, cursorPosition) {
  const structure = useMemo(() => {
    if (!code || !language) return [];
    const parsers = PARSERS[language] || PARSERS.javascript;
    const lines = code.split("\n");
    const sections = [];

    lines.forEach((line, lineIndex) => {
      for (const p of parsers) {
        const match = line.match(p.pattern);
        if (match) {
          const name = p.capture ? match[p.capture] || p.label : p.label;
          sections.push({
            id:        `${lineIndex}-${p.type}`,
            type:      p.type,
            icon:      p.icon,
            label:     name,
            sublabel:  p.label !== name ? p.label : null,
            color:     p.color,
            lineStart: lineIndex,
            lineEnd:   lineIndex,
            charStart: lines.slice(0, lineIndex).join("\n").length + (lineIndex > 0 ? 1 : 0),
          });
          break;
        }
      }
    });

    // Compute lineEnd for each section
    sections.forEach((sec, i) => {
      sec.lineEnd = sections[i + 1] ? sections[i + 1].lineStart - 1 : lines.length - 1;
      // charEnd
      const endLine = sec.lineEnd;
      sec.charEnd = lines.slice(0, endLine + 1).join("\n").length;
    });

    return sections;
  }, [code, language]);

  // Find active section based on cursor position
  const activeIndex = useMemo(() => {
    if (!structure.length) return -1;
    // Convert cursor (char index) to line number
    const codeUpToCursor = code ? code.slice(0, cursorPosition) : "";
    const currentLine = codeUpToCursor.split("\n").length - 1;

    let active = -1;
    structure.forEach((sec, i) => {
      if (currentLine >= sec.lineStart) active = i;
    });
    return active;
  }, [structure, cursorPosition, code]);

  return { structure, activeIndex };
}
