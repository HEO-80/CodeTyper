"use client";

import { useState } from "react";
import MenuScreen from "@/components/screens/MenuScreen";
import PracticeScreen from "@/components/screens/PracticeScreen";
import ResultsScreen from "@/components/screens/ResultsScreen";

// Importar fuentes
import { useEffect } from "react";

export default function Home() {
  const [screen, setScreen] = useState("menu"); // menu | practice | results
  const [session, setSession] = useState(null); // { snippet, language, difficulty }
  const [result, setResult] = useState(null);   // datos al terminar

  // Cargar fuentes JetBrains Mono + Syne
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleStart = (snippet, language, difficulty) => {
    setSession({ snippet, language, difficulty });
    setScreen("practice");
  };

  const handleFinish = (resultData) => {
    setResult(resultData);
    setScreen("results");
  };

  const handleRepeat = () => {
    setScreen("practice");
  };

  const handleMenu = () => {
    setSession(null);
    setResult(null);
    setScreen("menu");
  };

  return (
    <main style={styles.main}>
      {screen === "menu" && (
        <MenuScreen onStart={handleStart} />
      )}

      {screen === "practice" && session && (
        <PracticeScreen
          snippet={session.snippet}
          language={session.language}
          onFinish={handleFinish}
          onBack={handleMenu}
        />
      )}

      {screen === "results" && result && (
        <ResultsScreen
          result={result}
          onRepeat={handleRepeat}
          onMenu={handleMenu}
        />
      )}
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    background: "#0d1117",
    color: "#c9d1d9",
  },
};
