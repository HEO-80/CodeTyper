"use client";

import { useState, useEffect } from "react";
import { useSession }      from "next-auth/react";
import MenuScreen          from "@/components/screens/MenuScreen";
import PracticeScreen      from "@/components/screens/PracticeScreen";
import ResultsScreen       from "@/components/screens/ResultsScreen";
import AuthPanel           from "@/components/ui/AuthPanel";
import CodeTyperTerminal   from "@/components/ui/CodeTyperTerminal";
import { SNIPPETS }        from "@/data/snippets";

export default function Home() {
  const { data: session } = useSession();

  const [screen,       setScreen]      = useState("menu");
  const [sessionData,  setSessionData] = useState(null);
  const [result,       setResult]      = useState(null);
  const [showComments, setShowComments]= useState(false);
  const [terminalOpen, setTerminalOpen]= useState(false);
  const [stats,        setStats]       = useState(null);

  // Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Load stats when logged in
  useEffect(() => {
    if (session?.user?.id) {
      fetch("/api/stats").then(r => r.json()).then(setStats).catch(console.error);
    } else {
      setStats(null);
    }
  }, [session?.user?.id]);

  // Alt+T terminal toggle
  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleStart = (snippet, language, difficulty) => {
    setSessionData({ snippet, language, difficulty });
    setScreen("practice");
    setTerminalOpen(false);
  };

  const handleFinish = async (resultData) => {
    setResult(resultData);
    setScreen("results");

    // Save stats if logged in
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
            difficulty:   sessionData?.difficulty,
            cpm, accuracy,
            errors:     totalErrors,
            duration,   totalChars,
          }),
        });

        // Refresh stats
        fetch("/api/stats").then(r => r.json()).then(setStats);
      } catch (err) {
        console.error("Failed to save stats:", err);
      }
    }
  };

  const handleMenu = () => {
    setSessionData(null);
    setResult(null);
    setScreen("menu");
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0d1117", color: "#c9d1d9", display: "flex" }}>

      {/* Auth panel — left sidebar */}
      <AuthPanel session={session} stats={stats} />

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {screen === "menu" && (
          <MenuScreen
            onStart={handleStart}
            showComments={showComments}
            onToggleComments={() => setShowComments(p => !p)}
            onOpenTerminal={() => setTerminalOpen(true)}
            terminalOpen={terminalOpen}
          />
        )}
        {screen === "practice" && sessionData && (
          <PracticeScreen
            snippet={sessionData.snippet}
            language={sessionData.language}
            showComments={showComments}
            onFinish={handleFinish}
            onBack={handleMenu}
            onToggleComments={() => setShowComments(p => !p)}
          />
        )}
        {screen === "results" && result && (
          <ResultsScreen
            result={result}
            onRepeat={() => setScreen("practice")}
            onMenu={handleMenu}
          />
        )}
      </div>

      {/* Floating terminal */}
      <CodeTyperTerminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onLaunchSnippet={handleStart}
        snippetsData={SNIPPETS}
      />
    </main>
  );
}
