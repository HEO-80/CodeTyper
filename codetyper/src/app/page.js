"use client";

import { useState, useEffect } from "react";
import MenuScreen from "@/components/screens/MenuScreen";
import PracticeScreen from "@/components/screens/PracticeScreen";
import ResultsScreen from "@/components/screens/ResultsScreen";

export default function Home() {
  const [screen, setScreen] = useState("menu");
  const [session, setSession] = useState(null);
  const [result, setResult] = useState(null);
  const [showComments, setShowComments] = useState(false);

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

  const handleRepeat = () => setScreen("practice");

  const handleMenu = () => {
    setSession(null);
    setResult(null);
    setScreen("menu");
  };

  const toggleComments = () => setShowComments((prev) => !prev);

  return (
    <main style={{ minHeight: "100vh", background: "#0d1117", color: "#c9d1d9" }}>
      {screen === "menu" && (
        <MenuScreen
          onStart={handleStart}
          showComments={showComments}
          onToggleComments={toggleComments}
        />
      )}
      {screen === "practice" && session && (
        <PracticeScreen
          snippet={session.snippet}
          language={session.language}
          showComments={showComments}
          onFinish={handleFinish}
          onBack={handleMenu}
          onToggleComments={toggleComments}
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