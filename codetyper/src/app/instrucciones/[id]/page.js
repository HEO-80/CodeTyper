"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { INSTRUCTION_CARDS } from "@/data/instructions";
import { INSTRUCTION_CONTENT } from "@/data/instructionContent";
import { tokenize, getTokenColor } from "@/lib/tokenizer";
import { useNav } from "@/components/ui/LayoutClient";
import "./InstructionPage.css";

function CodeBlock({ code, language }) {
  const lines = tokenize(code, language)
    .reduce((acc, tok) => {
      if (tok.type === "newline") { acc.push([]); return acc; }
      acc[acc.length - 1].push(tok);
      return acc;
    }, [[]]);

  return (
    <div className="instr-code-block">
      {lines.map((lineTokens, i) => (
        <div key={i} className="instr-code-line">
          <span className="instr-code-linenum">{i + 1}</span>
          <span className="instr-code-content">
            {lineTokens.map((tok, j) => (
              <span key={j} style={{ color: getTokenColor(tok.type) }}>
                {tok.char === " " ? " " : tok.char}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function InstructionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { setBackAction } = useNav();

  const card = INSTRUCTION_CARDS.find((c) => c.id === id);
  const content = INSTRUCTION_CONTENT[id];
  const notFound = !card || !content;

  const handleBack = () => router.back();

  useEffect(() => {
    if (notFound) {
      router.replace("/");
      return;
    }
    setBackAction(handleBack);
    return () => setBackAction(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notFound, id]);

  if (notFound) return null;

  const index = INSTRUCTION_CARDS.findIndex((c) => c.id === id);
  const prev  = INSTRUCTION_CARDS[(index - 1 + INSTRUCTION_CARDS.length) % INSTRUCTION_CARDS.length];
  const next  = INSTRUCTION_CARDS[(index + 1) % INSTRUCTION_CARDS.length];

  return (
    <div className="instr-page">
      <div className="instr-page-inner">
        <button className="instr-back-btn" onClick={handleBack}>
          <span className="instr-back-arrow">←</span> volver
        </button>

        <div className="instr-page-header" style={{ "--card-color": card.color }}>
          <div className="instr-page-icon">{card.icon}</div>
          <h1 className="instr-page-title">{card.title}</h1>
          <p className="instr-page-intro">{content.intro}</p>
        </div>

        <div className="instr-page-sections">
          {content.sections.map((section, i) => (
            <div key={i} className="instr-section-card" style={{ "--card-color": card.color }}>
              <h2 className="instr-section-title">{section.title}</h2>
              <p className="instr-section-text">{section.content}</p>

              {section.code && (
                <CodeBlock code={section.code} language={section.codeLang} />
              )}

              {section.swatches && (
                <div className="instr-swatch-row">
                  {section.swatches.map((sw) => (
                    <span
                      key={sw.name}
                      className="instr-swatch"
                      style={{ "--swatch-color": sw.color }}
                    >
                      <span className="instr-swatch-dot" />
                      {sw.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {card.isIndex && (
          <div className="instr-index-section">
            <div className="instr-index-label">// todas las guías</div>
            <div className="instr-index-grid">
              {INSTRUCTION_CARDS.filter((c) => c.id !== card.id).map((c) => (
                <div
                  key={c.id}
                  className="instr-index-card"
                  style={{ "--card-color": c.color }}
                  onClick={() => router.push(`/instrucciones/${c.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(`/instrucciones/${c.id}`);
                    }
                  }}
                >
                  <div className="instr-index-card-head">
                    <span className="instr-index-card-icon">{c.icon}</span>
                    <span className="instr-index-card-title">{c.title}</span>
                  </div>
                  <div className="instr-index-card-desc">{c.description}</div>
                  <div className="instr-index-card-arrow">→</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="instr-page-footer">
          <button
            className="instr-nav-btn instr-nav-prev"
            style={{ "--nav-color": prev.color }}
            onClick={() => router.push(`/instrucciones/${prev.id}`)}
          >
            <span className="instr-nav-arrow">←</span>
            <span className="instr-nav-text">
              <span className="instr-nav-label">anterior</span>
              <span className="instr-nav-title">{prev.icon} {prev.title}</span>
            </span>
          </button>

          <button
            className="instr-nav-btn instr-nav-next"
            style={{ "--nav-color": next.color }}
            onClick={() => router.push(`/instrucciones/${next.id}`)}
          >
            <span className="instr-nav-text">
              <span className="instr-nav-label">siguiente</span>
              <span className="instr-nav-title">{next.icon} {next.title}</span>
            </span>
            <span className="instr-nav-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
