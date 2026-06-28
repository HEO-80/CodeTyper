"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import TerminalMode from "@/components/screens/TerminalMode";
import { CATEGORIES, getSnippets } from "@/data/snippets";
import { DIFFICULTIES } from "@/lib/constants";
import { useNav } from "@/components/ui/LayoutClient";
import "./terminal.css";

function TerminalPageInner() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setBackAction } = useNav();

  // Read query params from CodeTyperTerminal launch
  const paramLang       = searchParams.get("lang");
  const paramSnippetId  = searchParams.get("snippetId");
  const paramDifficulty = searchParams.get("difficulty");

  const [selectedCategory,   setSelectedCategory]   = useState("programming");
  const [selectedLang,       setSelectedLang]       = useState(paramLang || "javascript");
  const [selectedDifficulty, setSelectedDifficulty] = useState(paramDifficulty || "beginner");
  const [activeSnippet,      setActiveSnippet]      = useState(null);
  const [finished,           setFinished]           = useState(false);
  const [lastResult,         setLastResult]         = useState(null);

  const currentCategory = CATEGORIES[selectedCategory];
  const difficulties    = selectedCategory === "languages" ? ["b1", "b2", "c1"] : DIFFICULTIES;
  const snippets        = getSnippets(selectedLang, selectedDifficulty);

  // Auto-launch snippet from query params
  useEffect(() => {
    if (paramSnippetId && paramLang) {
      const allSnippets = getSnippets(paramLang, paramDifficulty || "beginner");
      const found = allSnippets.find((s) => s.id === paramSnippetId);
      if (found) {
        setSelectedLang(paramLang);
        setSelectedDifficulty(paramDifficulty || "beginner");
        setActiveSnippet(found);
      }
    }
  }, [paramSnippetId, paramLang, paramDifficulty]);

  const handleFinish = async (resultData) => {
    setFinished(true);
    setLastResult(resultData);

    if (session?.user?.id) {
      try {
        const { snippet, language, tokens, totalErrors, startTime, endTime } = resultData;
        const duration   = Math.round((endTime - startTime) / 1000);
        const totalChars = tokens.length;
        const cpm        = Math.round((totalChars / Math.max(duration, 1)) * 60);
        const accuracy   = Math.round(((totalChars - totalErrors) / totalChars) * 100);

        await fetch("/api/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language,
            snippetId:    snippet.id,
            snippetTitle: snippet.title,
            difficulty:   selectedDifficulty,
            cpm, accuracy,
            errors:   totalErrors,
            duration, totalChars,
          }),
        });
      } catch (err) {
        console.error("Failed to save terminal stats:", err);
      }
    }
  };

  const handleBack = () => {
    setActiveSnippet(null);
    setFinished(false);
    setLastResult(null);
  };

  // Back en el Navbar: dentro de snippet vuelve al selector; en el selector va al home
  useEffect(() => {
    if (activeSnippet) {
      setBackAction(handleBack);
    } else {
      setBackAction(() => router.push("/"));
    }
    return () => setBackAction(null);
  }, [activeSnippet, setBackAction, router]);

  const handleSwitchMode = () => {
    // Go back to editor mode on home page with same snippet
    if (activeSnippet) {
      router.push(`/?lang=${selectedLang}&snippetId=${activeSnippet.id}`);
    } else {
      router.push("/");
    }
  };

  // ── Active snippet → full TerminalMode ─────────────────────────────────
  if (activeSnippet) {
    return (
      <TerminalMode
        snippet={activeSnippet}
        language={selectedLang}
        showComments={false}
        onFinish={handleFinish}
        onBack={handleBack}
        onToggleComments={() => {}}
        onSwitchMode={handleSwitchMode}
      />
    );
  }

  // ── Selector ────────────────────────────────────────────────────────────
  return (
    <div className="tp-root">

      {/* Header */}
      <div className="tp-header">
        <div className="tp-header-badge">TERMINAL MODE</div>
        <h1 className="tp-title">
          <span className="tp-title-prompt">$</span> practice
        </h1>
        <p className="tp-subtitle">Escribe código como si fuera una sesión de terminal real</p>
      </div>

      {/* Last result banner */}
      {finished && lastResult && (
        <div className="tp-result-banner">
          <span className="tp-result-icon">✓</span>
          <span>snippet completado —</span>
          <span className="tp-result-stat" style={{ color: "#82aaff" }}>
            {Math.round((lastResult.tokens.length / Math.max(Math.round((lastResult.endTime - lastResult.startTime) / 1000), 1)) * 60)} CPM
          </span>
          <span className="tp-result-sep">·</span>
          <span className="tp-result-stat" style={{ color: "#4ec994" }}>
            {Math.round(((lastResult.tokens.length - lastResult.totalErrors) / lastResult.tokens.length) * 100)}% precisión
          </span>
          {session && <span className="tp-result-saved">· guardado ✓</span>}
        </div>
      )}

      {/* Category */}
      <div className="tp-section">
        <div className="tp-label">// category</div>
        <div className="tp-row">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              className={`tp-btn${selectedCategory === key ? " active" : ""}`}
              onClick={() => {
                setSelectedCategory(key);
                setSelectedLang(CATEGORIES[key].languages[0]);
                setSelectedDifficulty(key === "languages" ? "b1" : "beginner");
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="tp-section">
        <div className="tp-label">// language</div>
        <div className="tp-row">
          {currentCategory.languages.map((lang) => (
            <button
              key={lang}
              className={`tp-btn lang${selectedLang === lang ? " active" : ""}`}
              onClick={() => {
                setSelectedLang(lang);
                setSelectedDifficulty(difficulties[0]);
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="tp-section">
        <div className="tp-label">// difficulty</div>
        <div className="tp-row">
          {difficulties.map((diff) => (
            <button
              key={diff}
              className={`tp-btn diff${selectedDifficulty === diff ? " active" : ""}`}
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Snippets */}
      <div className="tp-section">
        <div className="tp-label">
          // choose a snippet{" "}
          <span style={{ color: "#30363d" }}>({snippets.length} available)</span>
        </div>
        {snippets.length === 0 ? (
          <div className="tp-empty">🚧 snippets coming soon...</div>
        ) : (
          <div className="tp-grid">
            {snippets.map((snippet) => (
              <button
                key={snippet.id}
                className="tp-snippet-card"
                onClick={() => {
                  setActiveSnippet(snippet);
                  setFinished(false);
                }}
              >
                <div className="tp-snip-top">
                  <span className="tp-snip-prompt">$</span>
                  <span className="tp-snip-title">{snippet.title}</span>
                </div>
                <div className="tp-snip-meta">
                  <span className="tp-snip-lines">{snippet.code?.split("\n").length || 0} lines</span>
                  <span className="tp-snip-diff">{snippet.difficulty || selectedDifficulty}</span>
                </div>
                {snippet.description && (
                  <div className="tp-snip-desc">{snippet.description}</div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TerminalPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: "48px", color: "#546e7a", fontFamily: "monospace" }}>
        loading terminal...
      </div>
    }>
      <TerminalPageInner />
    </Suspense>
  );
}
