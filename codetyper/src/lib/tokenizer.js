import { KEYWORDS, TOKEN_COLORS } from "./constants";

// ─── TOKENIZER ────────────────────────────────────────────────────────────────
export function tokenize(code, language) {
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

    // String (double or single quote)
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let str = ch; i++;
      while (i < code.length && code[i] !== quote && code[i] !== "\n") {
        str += code[i]; i++;
      }
      if (i < code.length) { str += code[i]; i++; }
      for (const c of str) tokens.push({ char: c, type: "string" });
      continue;
    }

    // Comment // or --
    if (
      (ch === "/" && code[i + 1] === "/") ||
      (ch === "-" && code[i + 1] === "-")
    ) {
      let comment = "";
      while (i < code.length && code[i] !== "\n") {
        comment += code[i]; i++;
      }
      for (const c of comment) tokens.push({ char: c, type: "comment" });
      continue;
    }

    // Comment #
    if (ch === "#" && language !== "csharp") {
      let comment = "";
      while (i < code.length && code[i] !== "\n") {
        comment += code[i]; i++;
      }
      for (const c of comment) tokens.push({ char: c, type: "comment" });
      continue;
    }

    // Decorator / Annotation (Java, C#, Python)
    if (ch === "@") {
      let word = "@"; i++;
      while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
        word += code[i]; i++;
      }
      for (const c of word) tokens.push({ char: c, type: "keyword" });
      continue;
    }

    // Bracket annotations [HttpGet] etc (C#)
    if (ch === "[" && language === "csharp") {
      let word = "["; i++;
      while (i < code.length && code[i] !== "]") {
        word += code[i]; i++;
      }
      if (i < code.length) { word += code[i]; i++; }
      // Check if it's a known annotation
      if (KEYWORDS.csharp.includes(word)) {
        for (const c of word) tokens.push({ char: c, type: "keyword" });
      } else {
        for (const c of word) tokens.push({ char: c, type: "punctuation" });
      }
      continue;
    }

    // Number
    if (/[0-9]/.test(ch)) {
      let num = "";
      while (i < code.length && /[0-9._x]/.test(code[i])) {
        num += code[i]; i++;
      }
      for (const c of num) tokens.push({ char: c, type: "number" });
      continue;
    }

    // Word: keyword, class-name, function, identifier
    if (/[a-zA-Z_$]/.test(ch)) {
      let word = "";
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
      } else if (
        ["number","string","boolean","void","any","never","null","undefined"].includes(word)
      ) {
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

// ─── GET COLOR FOR TOKEN ──────────────────────────────────────────────────────
export function getTokenColor(type) {
  return TOKEN_COLORS[type] || "var(--tx)";
}
