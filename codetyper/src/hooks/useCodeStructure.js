// src/hooks/useCodeStructure.js
"use client";

import { useMemo } from "react";

// ─── Section definitions per language ────────────────────────────────────────
const PARSERS = {
  solidity: [
    { pattern: /^\s*pragma\s+solidity/,         type: "pragma",      icon: "⚙",  label: "Compiler Version",  color: "var(--hl-cyan)" },
    { pattern: /^\s*import\s+/,                  type: "import",      icon: "📦", label: "Import",            color: "var(--hl-blue)" },
    { pattern: /^\s*(interface|abstract)\s+/,    type: "interface",   icon: "◈",  label: "Interface",         color: "var(--hl-purple)" },
    { pattern: /^\s*contract\s+\w+/,             type: "contract",    icon: "◆",  label: "Contract",          color: "var(--hl-yellow)" },
    { pattern: /^\s*mapping\s*\(/,               type: "mapping",     icon: "⬡",  label: "Storage Mapping",   color: "var(--hl-orange)" },
    { pattern: /^\s*(uint|int|address|bool|bytes|string)\s+\w+\s*[=;]/,
                                                  type: "storage",     icon: "▪",  label: "State Variable",    color: "var(--hl-orange)" },
    { pattern: /^\s*event\s+\w+/,                type: "event",       icon: "◎",  label: "Event",             color: "var(--hl-green)" },
    { pattern: /^\s*modifier\s+\w+/,             type: "modifier",    icon: "⬟",  label: "Modifier",          color: "var(--hl-purple)" },
    { pattern: /^\s*constructor\s*\(/,            type: "constructor", icon: "★",  label: "Constructor",       color: "var(--hl-yellow)" },
    { pattern: /^\s*function\s+(\w+)/,           type: "function",    icon: "▶",  label: "Function",          color: "var(--hl-blue)", capture: 1 },
    { pattern: /^\s*emit\s+(\w+)/,               type: "emit",        icon: "→",  label: "Emit",              color: "var(--hl-green)", capture: 1 },
  ],

  javascript: [
    { pattern: /^\s*import\s+/,                  type: "import",      icon: "📦", label: "Import",            color: "var(--hl-blue)" },
    { pattern: /^\s*class\s+(\w+)/,              type: "class",       icon: "◆",  label: "Class",             color: "var(--hl-yellow)", capture: 1 },
    { pattern: /^\s*(export\s+)?(async\s+)?function\s+(\w+)/,
                                                  type: "function",    icon: "▶",  label: "Function",          color: "var(--hl-blue)", capture: 3 },
    { pattern: /^\s*const\s+(\w+)\s*=\s*(async\s*)?\(/,
                                                  type: "function",    icon: "▶",  label: "Arrow Fn",          color: "var(--hl-blue)", capture: 1 },
    { pattern: /^\s*constructor\s*\(/,            type: "constructor", icon: "★",  label: "Constructor",       color: "var(--hl-yellow)" },
    { pattern: /^\s*(if|else\s+if)\s*\(/,        type: "condition",   icon: "⬦",  label: "Condition",         color: "var(--hl-cyan)" },
    { pattern: /^\s*(for|while|forEach)\s*[\s(]/, type: "loop",       icon: "↻",  label: "Loop",              color: "var(--hl-green)" },
    { pattern: /^\s*try\s*\{/,                   type: "try",         icon: "⚠",  label: "Error Handling",    color: "var(--hl-orange)" },
    { pattern: /^\s*\/\/\s+\d+\./,               type: "section",     icon: "◉",  label: "Section",           color: "var(--hl-yellow)" },
  ],

  typescript: [
    { pattern: /^\s*import\s+/,                  type: "import",      icon: "📦", label: "Import",            color: "var(--hl-blue)" },
    { pattern: /^\s*(export\s+)?interface\s+(\w+)/,
                                                  type: "interface",   icon: "◈",  label: "Interface",         color: "var(--hl-cyan)", capture: 2 },
    { pattern: /^\s*(export\s+)?type\s+(\w+)/,   type: "type",        icon: "⬡",  label: "Type",              color: "var(--hl-purple)", capture: 2 },
    { pattern: /^\s*(export\s+)?enum\s+(\w+)/,   type: "enum",        icon: "▪",  label: "Enum",              color: "var(--hl-orange)", capture: 2 },
    { pattern: /^\s*(export\s+)?(abstract\s+)?class\s+(\w+)/,
                                                  type: "class",       icon: "◆",  label: "Class",             color: "var(--hl-yellow)", capture: 3 },
    { pattern: /^\s*(public|private|protected)?\s*(async\s+)?\w+\s*\(/,
                                                  type: "method",      icon: "▶",  label: "Method",            color: "var(--hl-blue)" },
    { pattern: /^\s*constructor\s*\(/,            type: "constructor", icon: "★",  label: "Constructor",       color: "var(--hl-yellow)" },
  ],

  csharp: [
    { pattern: /^\s*using\s+/,                   type: "using",       icon: "📦", label: "Using",             color: "var(--hl-blue)" },
    { pattern: /^\s*namespace\s+(\w+)/,           type: "namespace",   icon: "◉",  label: "Namespace",         color: "var(--hl-yellow)", capture: 1 },
    { pattern: /^\s*(public|internal)?\s*(abstract|sealed)?\s*class\s+(\w+)/,
                                                  type: "class",       icon: "◆",  label: "Class",             color: "var(--hl-yellow)", capture: 3 },
    { pattern: /^\s*(public|private)?\s*(interface)\s+(\w+)/,
                                                  type: "interface",   icon: "◈",  label: "Interface",         color: "var(--hl-cyan)", capture: 3 },
    { pattern: /^\s*\[HttpGet/,                  type: "endpoint",    icon: "→",  label: "GET Endpoint",      color: "var(--hl-green)" },
    { pattern: /^\s*\[HttpPost/,                 type: "endpoint",    icon: "→",  label: "POST Endpoint",     color: "var(--hl-yellow)" },
    { pattern: /^\s*\[HttpPut/,                  type: "endpoint",    icon: "→",  label: "PUT Endpoint",      color: "var(--hl-blue)" },
    { pattern: /^\s*\[HttpDelete/,               type: "endpoint",    icon: "→",  label: "DELETE Endpoint",   color: "var(--hl-red)" },
    { pattern: /^\s*(public|private|protected)\s+(async\s+)?[\w<>]+\s+(\w+)\s*\(/,
                                                  type: "method",      icon: "▶",  label: "Method",            color: "var(--hl-blue)", capture: 3 },
    { pattern: /^\s*try\s*\{/,                   type: "try",         icon: "⚠",  label: "Error Handling",    color: "var(--hl-orange)" },
  ],

  sql: [
    { pattern: /^\s*CREATE\s+TABLE/i,            type: "create",      icon: "◆",  label: "Create Table",      color: "var(--hl-yellow)" },
    { pattern: /^\s*SELECT/i,                     type: "select",      icon: "▶",  label: "SELECT Query",      color: "var(--hl-blue)" },
    { pattern: /^\s*INSERT/i,                     type: "insert",      icon: "→",  label: "INSERT",            color: "var(--hl-green)" },
    { pattern: /^\s*UPDATE/i,                     type: "update",      icon: "↻",  label: "UPDATE",            color: "var(--hl-yellow)" },
    { pattern: /^\s*DELETE/i,                     type: "delete",      icon: "✕",  label: "DELETE",            color: "var(--hl-red)" },
    { pattern: /^\s*(INNER|LEFT|RIGHT|FULL)\s+JOIN/i,
                                                  type: "join",        icon: "⬡",  label: "JOIN",              color: "var(--hl-purple)" },
    { pattern: /^\s*WHERE/i,                      type: "where",       icon: "⬦",  label: "WHERE Filter",      color: "var(--hl-cyan)" },
    { pattern: /^\s*GROUP\s+BY/i,                type: "group",       icon: "▪",  label: "GROUP BY",          color: "var(--hl-orange)" },
    { pattern: /^\s*CREATE\s+(PROCEDURE|FUNCTION)/i,
                                                  type: "procedure",   icon: "★",  label: "Procedure/Function",color: "var(--hl-yellow)" },
    { pattern: /^\s*CREATE\s+TRIGGER/i,          type: "trigger",     icon: "◎",  label: "Trigger",           color: "var(--hl-purple)" },
  ],

  powershell: [
    { pattern: /^\s*param\s*\(/,                 type: "param",       icon: "▪",  label: "Parameters",        color: "var(--hl-msblue)" },
    { pattern: /^\s*function\s+(\w+-\w+|\w+)/,  type: "function",    icon: "▶",  label: "Function",          color: "var(--hl-blue)", capture: 1 },
    { pattern: /^\s*\[CmdletBinding/,            type: "cmdlet",      icon: "⚙",  label: "CmdletBinding",     color: "var(--hl-msblue)" },
    { pattern: /^\s*try\s*\{/,                   type: "try",         icon: "⚠",  label: "Error Handling",    color: "var(--hl-orange)" },
    { pattern: /^\s*(foreach|for|while)\s*[\s(]/,type: "loop",        icon: "↻",  label: "Loop",              color: "var(--hl-green)" },
    { pattern: /^\s*\$\w+\s*=\s*(Get|Set|New|Remove|Invoke|Start|Stop)-\w+/,
                                                  type: "cmdlet-call", icon: "→",  label: "Cmdlet Call",       color: "var(--hl-cyan)" },
    { pattern: /^\s*#\s*[─━]+/,                  type: "section",     icon: "◉",  label: "Section",           color: "var(--hl-yellow)" },
  ],

  bash: [
    { pattern: /^\s*#!\//,                       type: "shebang",     icon: "⚙",  label: "Shebang",           color: "var(--hl-cyan)" },
    { pattern: /^\s*\w+\s*\(\s*\)\s*\{/,        type: "function",    icon: "▶",  label: "Function",          color: "var(--hl-blue)" },
    { pattern: /^\s*(if|elif)\s+\[/,             type: "condition",   icon: "⬦",  label: "Condition",         color: "var(--hl-cyan)" },
    { pattern: /^\s*(for|while|until)\s+/,       type: "loop",        icon: "↻",  label: "Loop",              color: "var(--hl-green)" },
    { pattern: /^\s*case\s+/,                    type: "case",        icon: "⬟",  label: "Case",              color: "var(--hl-purple)" },
    { pattern: /^\s*(export|readonly)\s+\w+=/,  type: "variable",    icon: "▪",  label: "Variable",          color: "var(--hl-orange)" },
    { pattern: /^\s*curl\s+/,                    type: "http",        icon: "→",  label: "HTTP Request",      color: "var(--hl-green)" },
    { pattern: /^\s*ssh\s+/,                     type: "ssh",         icon: "⬡",  label: "SSH",               color: "var(--hl-yellow)" },
    { pattern: /^\s*#\s*[─━#]+/,                type: "section",     icon: "◉",  label: "Section",           color: "var(--hl-yellow)" },
  ],

  python: [
    { pattern: /^\s*import\s+|^\s*from\s+\w+\s+import/,
                                                  type: "import",      icon: "📦", label: "Import",            color: "var(--hl-blue)" },
    { pattern: /^\s*class\s+(\w+)/,              type: "class",       icon: "◆",  label: "Class",             color: "var(--hl-yellow)", capture: 1 },
    { pattern: /^\s*def\s+(\w+)/,               type: "function",    icon: "▶",  label: "Function",          color: "var(--hl-blue)", capture: 1 },
    { pattern: /^\s*@\w+/,                       type: "decorator",   icon: "⬟",  label: "Decorator",         color: "var(--hl-purple)" },
    { pattern: /^\s*try\s*:/,                    type: "try",         icon: "⚠",  label: "Error Handling",    color: "var(--hl-orange)" },
    { pattern: /^\s*(if|elif)\s+/,               type: "condition",   icon: "⬦",  label: "Condition",         color: "var(--hl-cyan)" },
    { pattern: /^\s*(for|while)\s+/,             type: "loop",        icon: "↻",  label: "Loop",              color: "var(--hl-green)" },
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
