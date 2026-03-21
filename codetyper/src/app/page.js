"use client";

import { useState, useEffect }   from "react";
import { useSession }             from "next-auth/react";
import MenuScreen                 from "@/components/screens/MenuScreen";
import PracticeScreen             from "@/components/screens/PracticeScreen";
import ResultsScreen              from "@/components/screens/ResultsScreen";
import { useStatsRefresh }        from "@/components/ui/LayoutClient";

export default function Home() {
  const { data: session } = useSession();
  const refreshStats      = useStatsRefresh();

  const [screen,       setScreen]      = useState("menu");
  const [sessionData,  setSessionData] = useState(null);
  const [result,       setResult]      = useState(null);
  const [showComments, setShowComments]= useState(false);

  // Cargar fuentes
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleStart = (snippet, language, difficulty) => {
    setSessionData({ snippet, language, difficulty });
    setScreen("practice");
  };

  const handleFinish = async (resultData) => {
    setResult(resultData);
    setScreen("results");

    // Guardar stats si está logueado
    if (session?.user?.id) {
      try {
        const { snippet, language, tokens, totalErrors, startTime, endTime } = resultData;
        const duration   = Math.round((endTime - startTime) / 1000);
        const totalChars = tokens.length;
        const cpm        = Math.round((totalChars / Math.max(duration, 1)) * 60);
        const accuracy   = Math.round(((totalChars - totalErrors) / totalChars) * 100);

        await fetch("/api/stats", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            language,
            snippetId:    snippet.id,
            snippetTitle: snippet.title,
            difficulty:   sessionData?.difficulty,
            cpm, accuracy,
            errors:     totalErrors,
            duration,   totalChars,
          }),
        });

        // Refrescar el panel lateral
        await refreshStats();
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
    <main style={{
      width: "100%", height: "100%",
      background: "#0d1117", color: "#c9d1d9",
      display: "flex",
      overflow: screen === "practice" ? "hidden" : "auto",
    }}>
      {screen === "menu" && (
        <MenuScreen
          onStart={handleStart}
          showComments={showComments}
          onToggleComments={() => setShowComments(p => !p)}
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
    </main>
  );
}
