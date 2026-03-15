"use client";

import { useState, useEffect } from "react";
import MenuScreen from "@/components/screens/MenuScreen";
import PracticeScreen from "@/components/screens/PracticeScreen";
import ResultsScreen from "@/components/screens/ResultsScreen";
import CodeTyperTerminal from "@/components/ui/CodeTyperTerminal";
import { SNIPPETS } from "@/data/snippets";

export default function Home() {
  const [screen,       setScreen]       = useState("menu");
  const [session,      setSession]      = useState(null);
  const [result,       setResult]       = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Fuentes
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Alt+T — toggle terminal desde cualquier pantalla
  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleStart = (snippet, language, difficulty) => {
    setSession({ snippet, language, difficulty });
    setScreen("practice");
    setTerminalOpen(false);
  };

  const handleFinish = (resultData) => {
    setResult(resultData);
    setScreen("results");
  };

  const handleMenu = () => {
    setSession(null);
    setResult(null);
    setScreen("menu");
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0d1117", color: "#c9d1d9" }}>
      {screen === "menu" && (
        <MenuScreen
          onStart={handleStart}
          showComments={showComments}
          onToggleComments={() => setShowComments((p) => !p)}
          onOpenTerminal={() => setTerminalOpen(true)}
          terminalOpen={terminalOpen}
        />
      )}
      {screen === "practice" && session && (
        <PracticeScreen
          snippet={session.snippet}
          language={session.language}
          showComments={showComments}
          onFinish={handleFinish}
          onBack={handleMenu}
          onToggleComments={() => setShowComments((p) => !p)}
        />
      )}
      {screen === "results" && result && (
        <ResultsScreen
          result={result}
          onRepeat={() => setScreen("practice")}
          onMenu={handleMenu}
        />
      )}

      <CodeTyperTerminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onLaunchSnippet={handleStart}
        snippetsData={SNIPPETS}
      />
    </main>
  );
}
